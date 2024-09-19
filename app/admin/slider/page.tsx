'use client'

import {
  ConfirmModal,
  CustomButton,
  PerPage,
  SettingsSideBar,
  ShowMore,
  Sidebar,
  TableRowLoading,
  Title,
  TopBar
} from '@/components'
import { fetchSlider } from '@/utils/fetchApi'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import React, { Fragment, useEffect, useState } from 'react'

// Types
import type { SliderTypes } from '@/types'

// Redux imports
import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import AddEditModal from './AddEditModal'

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const [list, setList] = useState<SliderTypes[]>([])
  const [editData, setEditData] = useState<SliderTypes | null>(null)
  const [perPageCount, setPerPageCount] = useState<number>(10)

  const [deleting, setDeleting] = useState(false)

  const { setToast } = useFilter()
  const { supabase } = useSupabase()

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const fetchData = async () => {
    setLoading(true)

    try {
      const result = await fetchSlider(perPageCount, 0)

      // update the list in redux
      dispatch(updateList(result.data))

      // Updating showing text in redux
      dispatch(
        updateResultCounter({
          showing: result.data.length,
          results: result.count ? result.count : 0
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Append data to existing list whenever 'show more' button is clicked
  const handleShowMore = async () => {
    setLoading(true)

    try {
      const result = await fetchSlider(perPageCount, list.length)

      // update the list in redux
      const newList = [...list, ...result.data]
      dispatch(updateList(newList))

      // Updating showing text in redux
      dispatch(
        updateResultCounter({
          showing: newList.length,
          results: result.count ? result.count : 0
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ccb_sliders')
        .update({ is_deleted: false })
        .eq('id', id)
      if (error) throw new Error(error.message)

      // Update data in redux
      const items = [...globallist]
      const updatedData = {
        is_deleted: false,
        id
      }
      const foundIndex = items.findIndex((x) => x.id === updatedData.id)
      items[foundIndex] = { ...items[foundIndex], ...updatedData }
      dispatch(updateList(items))

      // pop up the success message
      setToast('success', 'Successfully saved.')
    } catch (e) {
      console.error(e)
    }
  }

  const handlePublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ccb_sliders')
        .update({ status: 'published' })
        .eq('id', id)
      if (error) throw new Error(error.message)

      // Update data in redux
      const items = [...globallist]
      const updatedData = {
        status: 'published',
        id
      }
      const foundIndex = items.findIndex((x) => x.id === updatedData.id)
      items[foundIndex] = { ...items[foundIndex], ...updatedData }
      dispatch(updateList(items))

      // pop up the success message
      setToast('success', 'Successfully saved.')
    } catch (e) {
      console.error(e)
    }
  }

  const handleUnpublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ccb_sliders')
        .update({ status: 'draft' })
        .eq('id', id)
      if (error) throw new Error(error.message)

      // Update data in redux
      const items = [...globallist]
      const updatedData = {
        status: 'draft',
        id
      }
      const foundIndex = items.findIndex((x) => x.id === updatedData.id)
      items[foundIndex] = { ...items[foundIndex], ...updatedData }
      dispatch(updateList(items))

      // pop up the success message
      setToast('success', 'Successfully saved.')
    } catch (e) {
      console.error(e)
    }
  }

  const handleAdd = () => {
    setShowAddModal(true)
    setEditData(null)
  }

  const confirmDelete = (id: string) => {
    setSelectedId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (deleting) return

    setDeleting(true)

    try {
      // delete permanently
      const { error } = await supabase
        .from('ccb_sliders')
        .delete()
        .eq('id', selectedId)
      if (error) throw new Error(error.message)

      // delete the existing image on supabase storage
      const { data: files, error: error2 } = await supabase.storage
        .from('hrm_public')
        .list(`ccb_slider/${selectedId}`)
      if (error2) throw new Error(error2.message)
      if (files.length > 0) {
        const filesToRemove = files.map(
          (x: { name: string }) => `ccb_slider/${selectedId}/${x.name}`
        )
        const { error: error3 } = await supabase.storage
          .from('hrm_public')
          .remove(filesToRemove)
        if (error3) throw new Error(error3.message)
      }

      // Update data in redux
      const items = [...globallist]
      const updatedList = items.filter((item) => item.id !== selectedId)
      dispatch(updateList(updatedList))

      // Updating showing text in redux
      dispatch(
        updateResultCounter({
          showing: Number(resultsCounter.showing) - 1,
          results: Number(resultsCounter.results) - 1
        })
      )
      setShowDeleteModal(false)
      setDeleting(false)
      // pop up the success message
      setToast('success', 'Successfully Deleted!')
    } catch (e) {
      console.error(e)
    }
  }

  // Update list whenever list in redux updates
  useEffect(() => {
    setList(globallist)
  }, [globallist])

  // Featch data
  useEffect(() => {
    setList([])
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPageCount])

  const isDataEmpty = !Array.isArray(list) || list.length < 1 || !list

  return (
    <>
      <Sidebar>
        <SettingsSideBar />
      </Sidebar>
      <TopBar />
      <div className="app__main">
        <div>
          <div className="app__title">
            <Title title="Homepage Slider" />
            <CustomButton
              containerStyles="app__btn_green"
              title="Add New Slide"
              btnType="button"
              handleClick={handleAdd}
            />
          </div>

          {/* Per Page */}
          <PerPage
            showingCount={resultsCounter.showing}
            resultsCount={resultsCounter.results}
            perPageCount={perPageCount}
            setPerPageCount={setPerPageCount}
          />

          {/* Main Content */}
          <div>
            <table className="app__table">
              <thead className="app__thead">
                <tr>
                  <th className="app__th pl-4"></th>
                  <th className="app__th">Image</th>
                  <th className="app__th">Status</th>
                  <th className="app__th">Action</th>
                </tr>
              </thead>
              <tbody>
                {!isDataEmpty &&
                  list.map((item, i: number) => (
                    <tr key={i} className="app__tr">
                      <td className="w-6 pl-4 app__td">
                        <Menu as="div" className="app__menu_container">
                          <div>
                            <Menu.Button className="app__dropdown_btn">
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="app__dropdown_items">
                              <div className="py-1">
                                <Menu.Item>
                                  <div
                                    onClick={() => confirmDelete(item.id)}
                                    className="app__dropdown_item"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                    <span>Delete</span>
                                  </div>
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                      <th className="app__th_firstcol">
                        <Image
                          src={`https://nuhirhfevxoonendpfsm.supabase.co/storage/v1/object/public/${item.content}`}
                          alt="slider image"
                          width={100}
                          height={100}
                        />
                      </th>
                      <td className="app__td">
                        <div className="space-x-2">
                          {item.is_deleted ? (
                            <span className="bg-red-200 border border-red-300 font-bold p-px text-red-900">
                              Trashed
                            </span>
                          ) : (
                            <>
                              {item.status === 'draft' && (
                                <span className="bg-blue-200 border border-blue-300 font-bold p-px text-blue-900">
                                  Draft
                                </span>
                              )}
                              {item.status === 'published' && (
                                <span className="bg-green-200 border border-green-300 font-bold p-px text-green-900">
                                  Published
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="app__td">
                        {item.is_deleted ? (
                          <CustomButton
                            containerStyles="app__btn_blue"
                            title="Restore"
                            btnType="button"
                            handleClick={() => handleRestore(item.id)}
                          />
                        ) : (
                          <>
                            {item.status === 'draft' && (
                              <CustomButton
                                containerStyles="app__btn_green_xs"
                                title="Publish"
                                btnType="button"
                                handleClick={() => handlePublish(item.id)}
                              />
                            )}
                            {item.status === 'published' && (
                              <CustomButton
                                containerStyles="app__btn_red_xs"
                                title="Unpublish"
                                btnType="button"
                                handleClick={() => handleUnpublish(item.id)}
                              />
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                {loading && <TableRowLoading cols={3} rows={2} />}
              </tbody>
            </table>
            {!loading && isDataEmpty && (
              <div className="app__norecordsfound">No records found.</div>
            )}
          </div>

          {/* Show More */}
          {resultsCounter.results > resultsCounter.showing && !loading && (
            <ShowMore handleShowMore={handleShowMore} />
          )}

          {/* Add/Edit Modal */}
          {showAddModal && (
            <AddEditModal
              editData={editData}
              hideModal={() => setShowAddModal(false)}
            />
          )}

          {/* Delete Modal */}
          {showDeleteModal && (
            <ConfirmModal
              header="Confirmation"
              btnText="Confirm"
              message="Please confirm this action"
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteModal(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default Page
