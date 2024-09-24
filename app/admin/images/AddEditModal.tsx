import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { logError } from '@/utils/fetchApi'

import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
// @ts-ignore
import 'react-quill/dist/quill.snow.css'

// Types
import type { SliderTypes } from '@/types'

// Redux imports
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import { useDispatch, useSelector } from 'react-redux'

interface ModalProps {
  hideModal: () => void
  editData: SliderTypes | null
}

const AddEditModal = ({ hideModal, editData }: ModalProps) => {
  const { setToast } = useFilter()
  const { supabase } = useSupabase()
  const [saving, setSaving] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<File | undefined>(undefined)
  const [imageId, setImageId] = useState(null)

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<SliderTypes>({
    mode: 'onSubmit'
  })

  const onSubmit = async (formdata: SliderTypes) => {
    if (saving) return

    setSaving(true)

    void handleCreate(formdata)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file && file.type.startsWith('image/')) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImage(undefined)
      setPreview(null)
    }
  }

  const handleRemoveImage = () => {
    setImage(undefined)
    setPreview(null)
  }

  const handleCreate = async (formdata: SliderTypes) => {
    if (!image) {
      return
    }

    const newData = {
      is_deleted: false,
      status: 'draft'
    }

    let insertId: string

    try {
      const { data, error } = await supabase
        .from('ccb_images')
        .insert(newData)
        .select()

      if (error) {
        void logError(
          'Add Image',
          'ccb_images',
          JSON.stringify(newData),
          error.message
        )
        setToast(
          'error',
          'Saving failed, please reload the page and try again.'
        )
        throw new Error(error.message)
      }

      insertId = data[0].id

      // delete the existing image on supabase storage
      const { data: files, error: error2 } = await supabase.storage
        .from('hrm_public')
        .list(`ccb_images/${insertId}`)
      if (error2) throw new Error(error2.message)
      if (files.length > 0) {
        const filesToRemove = files.map(
          (x: { name: string }) => `ccb_images/${insertId}/${x.name}`
        )
        const { error: error3 } = await supabase.storage
          .from('hrm_public')
          .remove(filesToRemove)
        if (error3) throw new Error(error3.message)
      }

      // upload the image
      const newFileName = `image-${insertId}`
      const customFilePath =
        `ccb_images/${insertId}/${newFileName}.` +
        (image.name.split('.').pop() as string)
      const { data: uploadData, error: error4 } = await supabase.storage
        .from('hrm_public')
        .upload(`${customFilePath}`, image, {
          cacheControl: '3600',
          upsert: true
        })

      // Delete the new slider database row if error occur
      if (error4) {
        await supabase.from('ccb_images').delete().eq('id', insertId)
        throw new Error(error4.message)
      } else {
        // Update the path to the database
        await supabase
          .from('ccb_images')
          .update({ content: uploadData.fullPath })
          .eq('id', insertId)
      }

      // Append new data in redux
      const updatedData = {
        ...newData,
        content: uploadData.fullPath,
        id: insertId
      }

      dispatch(updateList([updatedData, ...globallist]))

      // pop up the success message
      setToast('success', 'Successfully saved.')

      // Updating showing text in redux
      dispatch(
        updateResultCounter({
          showing: Number(resultsCounter.showing) + 1,
          results: Number(resultsCounter.results) + 1
        })
      )

      setSaving(false)

      // hide the modal
      hideModal()

      // reset all form fields
      reset()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="app__modal_wrapper">
        <div className="app__modal_wrapper2">
          <div className="app__modal_wrapper3">
            <div className="app__modal_header">
              <h5 className="app__modal_header_text">Image</h5>
              <button
                disabled={saving}
                onClick={hideModal}
                type="button"
                className="app__modal_header_btn"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="app__modal_body">
              <div className="app__form_field_container">
                <div className="w-full">
                  {preview && (
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src={preview}
                        alt="Selected"
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'contain',
                          border: '1px solid #ddd',
                          borderRadius: '8px'
                        }}
                      />
                      <button
                        className="app__btn_red_xs"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                  {!preview && (
                    <div className="relative">
                      <div className="text-center mt-4">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-input"
                          accept="image/*"
                        />
                        {!saving ? (
                          <label
                            htmlFor="file-input"
                            className="cursor-pointer text-gray-600 p-4 bg-gray-200 text-center rounded-full"
                          >
                            Choose Image
                          </label>
                        ) : (
                          <span className="py-px px-1 text-xs text-white">
                            Uploading...
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="app__modal_footer">
                <button type="submit" className="app__btn_green_sm">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEditModal
