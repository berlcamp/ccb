import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { logError } from '@/utils/fetchApi'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// @ts-ignore
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// Types
import type { PagesFormTypes, PageSlugsTypes } from '@/types'

// Redux imports
import { pageTypes } from '@/constants'
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import { useDispatch, useSelector } from 'react-redux'

interface ModalProps {
  hideModal: () => void
  editData: PagesFormTypes | null
}

const AddEditModal = ({ hideModal, editData }: ModalProps) => {
  const { setToast } = useFilter()
  const { supabase } = useSupabase()
  const [saving, setSaving] = useState(false)

  const [content, setContent] = useState(editData ? editData.content : '')

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<PagesFormTypes>({
    mode: 'onSubmit'
  })

  const onSubmit = async (formdata: PagesFormTypes) => {
    if (saving) return

    setSaving(true)

    if (editData) {
      void handleUpdate(formdata)
    } else {
      void handleCreate(formdata)
    }
  }

  const handleCreate = async (formdata: PagesFormTypes) => {
    const newData = {
      title: formdata.title,
      excerpt: createExcerpt(content, 200),
      thumbnail_photo: getImg(content),
      type: formdata.type,
      publish_date: formdata.publish_date ? formdata.publish_date : null,
      content: content,
      is_deleted: false,
      status: 'draft'
    }

    let newId

    try {
      const { data, error } = await supabase
        .from('ccb_pages')
        .insert(newData)
        .select()

      if (error) {
        void logError(
          'Add page',
          'ccb_pages',
          JSON.stringify(newData),
          error.message
        )
        setToast(
          'error',
          'Saving failed, please reload the page and try again.'
        )
        throw new Error(error.message)
      }

      newId = data[0].id // newly created ID use this on 'finally' block

      // Append new data in redux
      const updatedData = {
        ...newData,
        id: newId
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

  const handleUpdate = async (formdata: PagesFormTypes) => {
    if (!editData) return

    const newData = {
      title: formdata.title,
      excerpt: createExcerpt(content, 200),
      thumbnail_photo: getImg(content),
      type: formdata.type,
      publish_date: formdata.publish_date ? formdata.publish_date : null,
      content: content
    }

    try {
      const { error } = await supabase
        .from('ccb_pages')
        .update(newData)
        .eq('id', editData.id)

      if (error) {
        void logError(
          'Update page',
          'ccb_pages',
          JSON.stringify(newData),
          error.message
        )
        setToast(
          'error',
          'Saving failed, please reload the page and try again.'
        )
        throw new Error(error.message)
      }

      // Update data in redux
      const items = [...globallist]
      const updatedData = {
        ...newData,
        id: editData.id
      }
      const foundIndex = items.findIndex((x) => x.id === updatedData.id)
      items[foundIndex] = { ...items[foundIndex], ...updatedData }
      dispatch(updateList(items))

      // pop up the success message
      setToast('success', 'Successfully saved.')

      setSaving(false)

      // hide the modal
      hideModal()

      // reset all form fields
      reset()
    } catch (e) {
      console.error(e)
    }
  }

  const createExcerpt = (content: string, length: number) => {
    const strippedContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    return strippedContent.length > length
      ? strippedContent.substring(0, length) + '...'
      : strippedContent
  }

  const getImg = (content: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')

    // Get the first <img> tag
    const imgTag = doc.querySelector('img')

    if (imgTag) {
      return imgTag.src
    } else {
      return ''
    }
  }

  // manually set the defaultValues of use-form-hook whenever the component receives new props.
  useEffect(() => {
    reset({
      title: editData ? editData.title : '',
      type: editData ? editData.type : '',
      sidebar_type: editData ? editData.sidebar_type : '',
      publish_date: editData ? editData.publish_date : ''
    })
  }, [editData, reset])

  return (
    <>
      <div className="app__modal_wrapper">
        <div className="app__modal_wrapper2_large">
          <div className="app__modal_wrapper3">
            <div className="app__modal_header">
              <h5 className="app__modal_header_text">Page Details</h5>
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
                      {pageTypes?.map((item: PageSlugsTypes, i: number) => (
                        <option key={i} value={item.slug}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <div className="app__error_message">
                        Page type is required
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="app__form_field_container">
                <div className="w-full">
                  <div className="app__label_standard">Title:</div>
                  <div>
                    <input
                      {...register('title', { required: true })}
                      type="text"
                      className="app__input_standard"
                    />
                    {errors.title && (
                      <div className="app__error_message">
                        Title is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  <div className="app__label_standard">Publish Date:</div>
                  <div>
                    <input
                      {...register('publish_date')}
                      type="date"
                      className="app__input_standard"
                    />
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  <div className="app__label_standard">Content:</div>
                  <div>
                    <ReactQuill
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          [
                            'bold',
                            'italic',
                            'underline',
                            'strike',
                            'blockquote'
                          ],
                          [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' }
                          ],
                          [
                            { align: '' },
                            { align: 'center' },
                            { align: 'right' },
                            { align: 'justify' }
                          ],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                      formats={[
                        'header',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'align',
                        'bullet',
                        'indent',
                        'link',
                        'image'
                      ]}
                      value={content}
                      placeholder="Write your content here.."
                      onChange={setContent}
                    />
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  <div className="app__label_standard">Displayed Sidebar:</div>
                  <div>
                    <select
                      {...register('type', { required: true })}
                      className="app__select_standard"
                    >
                      <option value="None">None</option>
                      <option value="news">News Sidebar</option>
                      <option value="aboutus">About Us Sidebar</option>
                      <option value="administration">
                        Administration Sidebar
                      </option>
                      <option value="administration">Academics Sidebar</option>
                      <option value="administration">Research Sidebar</option>
                      <option value="administration">Services Sidebar</option>
                      <option value="administration">Updates Sidebar</option>
                    </select>
                  </div>
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
