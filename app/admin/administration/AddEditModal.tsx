import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { logError } from '@/utils/fetchApi'

import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// @ts-ignore
import 'react-quill/dist/quill.snow.css'

// Types
import type { AdministrationTypes } from '@/types'

// Redux imports
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

interface ModalProps {
  hideModal: () => void
  editData: AdministrationTypes | null
}

const AddEditModal = ({ hideModal, editData }: ModalProps) => {
  const { setToast } = useFilter()
  const { supabase } = useSupabase()
  const [saving, setSaving] = useState(false)

  const [preview, setPreview] = useState<string | null>(null)
  const [image, setImage] = useState<File | undefined>(undefined)

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<AdministrationTypes>({
    mode: 'onSubmit'
  })

  const onSubmit = async (formdata: AdministrationTypes) => {
    if (saving) return

    setSaving(true)

    if (editData) {
      void handleUpdate(formdata)
    } else {
      void handleCreate(formdata)
    }
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

  const handleCreate = async (formdata: AdministrationTypes) => {
    const newData = {
      name: formdata.name,
      position: formdata.position,
      type: formdata.type
    }

    let insertId: string

    try {
      const { data, error } = await supabase
        .from('ccb_administration')
        .insert(newData)
        .select()

      if (error) {
        void logError(
          'Add Image',
          'ccb_administration',
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

      if (image) {
        // delete the existing image on supabase storage
        const { data: files, error: error2 } = await supabase.storage
          .from('hrm_public')
          .list(`ccb_administration/${insertId}`)
        if (error2) throw new Error(error2.message)
        if (files.length > 0) {
          const filesToRemove = files.map(
            (x: { name: string }) => `ccb_administration/${insertId}/${x.name}`
          )
          const { error: error3 } = await supabase.storage
            .from('hrm_public')
            .remove(filesToRemove)
          if (error3) throw new Error(error3.message)
        }

        // upload the image
        const newFileName = `image-${insertId}`
        const customFilePath =
          `ccb_administration/${insertId}/${newFileName}.` +
          (image.name.split('.').pop() as string)
        const { data: uploadData, error: error4 } = await supabase.storage
          .from('hrm_public')
          .upload(`${customFilePath}`, image, {
            cacheControl: '3600',
            upsert: true
          })

        // Delete the new slider database row if error occur
        if (error4) {
          await supabase.from('ccb_administration').delete().eq('id', insertId)
          throw new Error(error4.message)
        } else {
          // Update the path to the database
          await supabase
            .from('ccb_administration')
            .update({ image_url: uploadData.fullPath })
            .eq('id', insertId)
        }

        // Append new data in redux
        const updatedData = {
          ...newData,
          image_url: uploadData.fullPath,
          id: insertId
        }
        dispatch(updateList([updatedData, ...globallist]))
      } else {
        dispatch(updateList([newData, ...globallist]))
      }

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

  const handleUpdate = async (formdata: AdministrationTypes) => {
    if (!editData) return

    const newData = {
      name: formdata.name,
      position: formdata.position,
      type: formdata.type
    }

    const insertId = editData.id

    try {
      const { data, error } = await supabase
        .from('ccb_administration')
        .update(newData)
        .eq('id', editData.id)
        .select()

      if (error) {
        void logError(
          'Add Image',
          'ccb_administration',
          JSON.stringify(newData),
          error.message
        )
        setToast(
          'error',
          'Saving failed, please reload the page and try again.'
        )
        throw new Error(error.message)
      }

      let imagePath = ''

      if (image) {
        // delete the existing image on supabase storage
        const { data: files, error: error2 } = await supabase.storage
          .from('hrm_public')
          .list(`ccb_administration/${insertId}`)
        if (error2) throw new Error(error2.message)
        if (files.length > 0) {
          const filesToRemove = files.map(
            (x: { name: string }) => `ccb_administration/${insertId}/${x.name}`
          )
          const { error: error3 } = await supabase.storage
            .from('hrm_public')
            .remove(filesToRemove)
          if (error3) throw new Error(error3.message)
        }

        // upload the image
        const newFileName = `image-${insertId}`
        const customFilePath =
          `ccb_administration/${insertId}/${newFileName}.` +
          (image.name.split('.').pop() as string)
        const { data: uploadData, error: error4 } = await supabase.storage
          .from('hrm_public')
          .upload(`${customFilePath}`, image, {
            cacheControl: '3600',
            upsert: true
          })

        // Delete the new slider database row if error occur
        if (error4) {
          await supabase.from('ccb_administration').delete().eq('id', insertId)
          throw new Error(error4.message)
        } else {
          // Update the path to the database
          await supabase
            .from('ccb_administration')
            .update({ image_url: uploadData.fullPath })
            .eq('id', insertId)

          imagePath = uploadData.fullPath
        }
      }
      // Update data in redux
      const items = [...globallist]
      const updatedData = {
        ...newData,
        image_url: imagePath,
        id: editData.id
      }

      const foundIndex = items.findIndex((x) => x.id === updatedData.id)
      items[foundIndex] = { ...items[foundIndex], ...updatedData }
      dispatch(updateList(items))

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

  // manually set the defaultValues of use-form-hook whenever the component receives new props.
  useEffect(() => {
    reset({
      type: editData ? editData.type : '',
      name: editData ? editData.name : '',
      position: editData ? editData.position : ''
    })
  }, [editData, reset])

  return (
    <>
      <div className="app__modal_wrapper">
        <div className="app__modal_wrapper2">
          <div className="app__modal_wrapper3">
            <div className="app__modal_header">
              <h5 className="app__modal_header_text">Position Details</h5>
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
                  <div className="app__label_standard">Type:</div>
                  <div>
                    <select
                      {...register('type', { required: true })}
                      className="app__select_standard"
                    >
                      <option value="">Choose Type</option>
                      <option value="board-of-trustees">
                        Board of Trustees
                      </option>
                      <option value="executive-management">
                        Executive Management
                      </option>
                      <option value="academic-council">Academic Council</option>
                      <option value="administrative-council">
                        Administrative Council
                      </option>
                    </select>
                    {errors.type && (
                      <div className="app__error_message">Type is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  <div className="app__label_standard">Fullname:</div>
                  <div>
                    <input
                      {...register('name', { required: true })}
                      type="text"
                      className="app__input_standard"
                    />
                    {errors.name && (
                      <div className="app__error_message">Name is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  <div className="app__label_standard">Position:</div>
                  <div>
                    <input
                      {...register('position', { required: true })}
                      type="text"
                      className="app__input_standard"
                    />
                    {errors.position && (
                      <div className="app__error_message">
                        Position is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  {!preview && editData && (
                    <Image
                      src={
                        editData.image_url
                          ? `https://nuhirhfevxoonendpfsm.supabase.co/storage/v1/object/public/${editData.image_url}`
                          : '/avatar.png'
                      }
                      alt=""
                      className="object-cover"
                      width={100}
                      height={100}
                    />
                  )}
                  {preview && (
                    <div>
                      <Image
                        src={preview}
                        alt=""
                        className="object-cover"
                        width={100}
                        height={100}
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
