import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { fetchPages, logError } from '@/utils/fetchApi'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// @ts-ignore
import 'react-quill/dist/quill.snow.css'

// Types
import {
  PagesFormTypes,
  type MenuTypes,
  type PageSlugsTypes,
  type SubmenuTypes
} from '@/types'

// Redux imports
import { CustomButton } from '@/components'
import { pageTypes } from '@/constants'
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import { useDispatch, useSelector } from 'react-redux'

interface ModalProps {
  hideModal: () => void
  editData: MenuTypes | null
}

const AddEditModal = ({ hideModal, editData }: ModalProps) => {
  const { setToast } = useFilter()
  const { supabase } = useSupabase()
  const [saving, setSaving] = useState(false)

  // sub menu items
  const [pages, setPages] = useState<PagesFormTypes[] | []>([])
  const [submenus, setSubmenus] = useState<SubmenuTypes[] | []>(
    editData ? editData.sub_menus : []
  )
  const [submenuTitle, setSubmenuTitle] = useState('')
  const [submenuType, setSubmenuType] = useState('')
  const [submenuSlug, setSubmenuSlug] = useState('')

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<MenuTypes>({
    mode: 'onSubmit'
  })

  const onSubmit = async (formdata: MenuTypes) => {
    if (saving) return

    setSaving(true)

    if (editData) {
      void handleUpdate(formdata)
    } else {
      void handleCreate(formdata)
    }
  }

  const handleCreate = async (formdata: MenuTypes) => {
    const newData = {
      title: formdata.title,
      type: formdata.type,
      sub_menus: submenus
    }

    let newId

    try {
      const { data, error } = await supabase
        .from('ccb_menu')
        .insert(newData)
        .select()

      if (error) {
        void logError(
          'Add menu',
          'ccb_menu',
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

  const handleUpdate = async (formdata: MenuTypes) => {
    if (!editData) return

    const newData = {
      title: formdata.title,
      type: formdata.type,
      sub_menus: submenus
    }

    try {
      const { error } = await supabase
        .from('ccb_menu')
        .update(newData)
        .eq('id', editData.id)

      if (error) {
        void logError(
          'Update menu',
          'ccb_menu',
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

  const handleAddSubmenu = () => {
    const newRow = {
      title: submenuTitle,
      type: submenuType,
      slug: submenuSlug,
      ref: Math.floor(Math.random() * 20000) + 1
    }

    setSubmenus([...submenus, newRow])
    // Reset
    setSubmenuTitle('')
    setSubmenuType('')
  }

  const handleRemoveSubmenu = (item: SubmenuTypes) => {
    const updatedData = submenus.filter((i: any) => i.ref !== item.ref)
    setSubmenus(updatedData)
  }

  const handleTypeChange = (index: number, newType: string) => {
    const updatedSubmenu = submenus.map((item, idx) =>
      idx === index ? { ...item, type: newType } : item
    )
    setSubmenus(updatedSubmenu)
  }
  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedSubmenu = submenus.map((item, idx) =>
      idx === index ? { ...item, title: newTitle } : item
    )
    setSubmenus(updatedSubmenu)
  }

  const handleSlugChange = (index: number, newSlug: string) => {
    const updatedSubmenu = submenus.map((item, idx) =>
      idx === index ? { ...item, slug: newSlug } : item
    )
    setSubmenus(updatedSubmenu)
  }

  // manually set the defaultValues of use-form-hook whenever the component receives new props.
  useEffect(() => {
    reset({
      title: editData ? editData.title : '',
      type: editData ? editData.type : ''
    })
    // Fetch pages
    ;(async () => {
      const result = await fetchPages({}, 99, 0)
      if (result.data) {
        const p = result.data.filter(
          (p: PagesFormTypes) => p.status === 'published'
        )
        setPages(p)
      }
    })()
  }, [editData, reset])

  return (
    <>
      <div className="app__modal_wrapper">
        <div className="app__modal_wrapper2_large">
          <div className="app__modal_wrapper3">
            <div className="app__modal_header">
              <h5 className="app__modal_header_text">Menu Details</h5>
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
                  <div className="app__label_standard">Menu Title:</div>
                  <div>
                    <input
                      {...register('title', { required: true })}
                      type="text"
                      className="app__input_standard"
                    />
                    {errors.title && (
                      <div className="app__error_message">
                        Menu Title is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="app__form_field_container">
                <div className="w-full">
                  <fieldset className="border p-4 mt-8 bg-gray-100">
                    <legend className="text-center text-gray-700 text-lg font-semibold">
                      Sub-menus
                    </legend>
                    <div className="app__form_field_container">
                      <div className="flex items-start justify-start space-x-2">
                        <div>
                          <div className="app__label_standard">Title</div>
                          <div>
                            <input
                              type="text"
                              value={submenuTitle}
                              className="app__input_standard"
                              onChange={(e) => setSubmenuTitle(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="app__label_standard">Type</div>
                          <div className="flex space-x-2">
                            <select
                              value={submenuType}
                              onChange={(e) => setSubmenuType(e.target.value)}
                              className="app__select_standard"
                            >
                              <option value="">Choose Type</option>
                              {pageTypes?.map(
                                (item: PageSlugsTypes, i: number) => (
                                  <option key={i} value={item.slug}>
                                    {item.title}
                                  </option>
                                )
                              )}
                              <option value="custom-url">Custom URL</option>
                            </select>
                            {submenuType === 'static-page' && (
                              <select
                                value={submenuSlug}
                                onChange={(e) => setSubmenuSlug(e.target.value)}
                                className="app__select_standard"
                              >
                                <option value="">Choose Page</option>
                                {pages?.map(
                                  (item: PagesFormTypes, i: number) => (
                                    <option key={i} value={item.id}>
                                      {item.title}
                                    </option>
                                  )
                                )}
                              </select>
                            )}
                            {submenuType === 'custom-url' && (
                              <input
                                value={submenuSlug}
                                placeholder="URL"
                                onChange={(e) => setSubmenuSlug(e.target.value)}
                                className="app__input_standard"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div>&nbsp;</div>
                          <div>
                            <CustomButton
                              btnType="button"
                              // isDisabled={saving}
                              title="Add"
                              handleClick={handleAddSubmenu}
                              containerStyles="app__btn_blue"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="app__form_field_container">
                      <table className="w-full text-sm text-left text-gray-600">
                        {submenus.length > 0 && (
                          <thead className="app__thead">
                            <tr>
                              <th className="app__th">Title</th>
                              <th className="app__th">Type</th>
                              <th className="app__th"></th>
                            </tr>
                          </thead>
                        )}
                        <tbody className="app__thead">
                          {submenus.map((item: SubmenuTypes, index) => (
                            <tr key={index} className="app__tr">
                              <td className="app__td">
                                <input
                                  type="text"
                                  value={item.title}
                                  className="app__input_standard"
                                  onChange={(e) =>
                                    handleTitleChange(index, e.target.value)
                                  }
                                />
                              </td>
                              <td className="app__td">
                                <div className="flex space-x-2">
                                  <select
                                    value={item.type}
                                    onChange={(e) =>
                                      handleTypeChange(index, e.target.value)
                                    }
                                    className="app__select_standard"
                                  >
                                    {pageTypes?.map(
                                      (item: PageSlugsTypes, i: number) => (
                                        <option key={i} value={item.slug}>
                                          {item.title}
                                        </option>
                                      )
                                    )}
                                    <option value="custom-url">
                                      Custom URL
                                    </option>
                                  </select>
                                  {item.type === 'static-page' && (
                                    <select
                                      value={item.slug}
                                      onChange={(e) =>
                                        handleSlugChange(index, e.target.value)
                                      }
                                      className="app__select_standard"
                                    >
                                      <option value="">Choose Page</option>
                                      {pages?.map(
                                        (item: PagesFormTypes, i: number) => (
                                          <option key={i} value={item.id}>
                                            {item.title}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  )}
                                  {item.type === 'custom-url' && (
                                    <input
                                      value={item.slug}
                                      placeholder="URL"
                                      onChange={(e) =>
                                        handleSlugChange(index, e.target.value)
                                      }
                                      className="app__input_standard"
                                    />
                                  )}
                                </div>
                              </td>
                              <td className="app__td">
                                {/* Disable remove on hard code pages */}
                                {![6918, 630, 8585, 4913, 10909].includes(
                                  item.ref
                                ) && (
                                  <CustomButton
                                    btnType="button"
                                    isDisabled={saving}
                                    title="Remove"
                                    handleClick={() =>
                                      handleRemoveSubmenu(item)
                                    }
                                    containerStyles="app__btn_red_xs"
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </fieldset>
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
