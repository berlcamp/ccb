'use client'

import {
  CustomButton,
  DeleteModal,
  PerPage,
  SettingsSideBar,
  ShowMore,
  Sidebar,
  TableRowLoading,
  Title,
  TopBar
} from '@/components'
import { fetchPages } from '@/utils/fetchApi'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/20/solid'
import React, { Fragment, useEffect, useState } from 'react'

import Filters from './Filters'

// Types
import type { PagesFormTypes } from '@/types'

// Redux imports
import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import AddEditModal from './AddEditModal'

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const [list, setList] = useState<PagesFormTypes[]>([])
  const [editData, setEditData] = useState<PagesFormTypes | null>(null)
  const [perPageCount, setPerPageCount] = useState<number>(10)

  const [toTrash, setToTrash] = useState(true)

  // Filters
  const [filterKeyword, setFilterKeyword] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')

  const { setToast, hasAccess } = useFilter()
  const { supabase } = useSupabase()

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const fetchData = async () => {
    setLoading(true)

    try {
      const result = await fetchPages(
        { filterKeyword, filterType },
        perPageCount,
        0
      )

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
      const result = await fetchPages(
        { filterKeyword, filterType },
        perPageCount,
        list.length
      )

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
        .from('ccb_pages')
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
        .from('ccb_pages')
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
        .from('ccb_pages')
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

  const handleEdit = (item: PagesFormTypes) => {
    setShowAddModal(true)
    setEditData(item)
  }

  const handleDelete = (id: string, trash: boolean) => {
    setSelectedId(id)
    setToTrash(trash)
    setShowDeleteModal(true)
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
  }, [filterKeyword, filterType, perPageCount])

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
            <Title title="Pages" />
            <CustomButton
              containerStyles="app__btn_green"
              title="Add New Page"
              btnType="button"
              handleClick={handleAdd}
            />
          </div>

          {/* Filters */}
          <div className="app__filters">
            <Filters
              setFilterType={setFilterType}
              setFilterKeyword={setFilterKeyword}
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
                  <th className="app__th">Type</th>
                  <th className="app__th">Title</th>
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
                                    onClick={() => handleEdit(item)}
                                    className="app__dropdown_item"
                                  >
                                    <PencilSquareIcon className="w-4 h-4" />
                                    <span>Edit</span>
                                  </div>
                                </Menu.Item>
                                {hasAccess('page_publishers') &&
                                  !item.is_deleted && (
                                    <Menu.Item>
                                      <div
                                        onClick={() =>
                                          handleDelete(item.id, true)
                                        }
                                        className="app__dropdown_item"
                                      >
                                        <TrashIcon className="w-4 h-4" />
                                        <span>Move to Trashed</span>
                                      </div>
                                    </Menu.Item>
                                  )}
                                {hasAccess('page_publishers') &&
                                  item.is_deleted && (
                                    <Menu.Item>
                                      <div
                                        onClick={() =>
                                          handleDelete(item.id, false)
                                        }
                                        className="app__dropdown_item"
                                      >
                                        <TrashIcon className="w-4 h-4" />
                                        <span>Delete Permanently</span>
                                      </div>
                                    </Menu.Item>
                                  )}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                      <th className="app__th_firstcol">
                        <div className="space-x-2">
                          <span className="capitalize">{item.type}</span>
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
                      </th>
                      <td className="app__td">
                        <div>{item.title}</div>
                      </td>
                      <td className="app__td">
                        {item.is_deleted ? (
                          <CustomButton
                            containerStyles={`app__btn_blue ${
                              !hasAccess('page_publishers') && 'hidden'
                            }`}
                            title="Restore"
                            btnType="button"
                            handleClick={() => handleRestore(item.id)}
                          />
                        ) : (
                          <>
                            {item.status === 'draft' && (
                              <CustomButton
                                containerStyles={`app__btn_green_xs ${
                                  !hasAccess('page_publishers') && 'hidden'
                                }`}
                                title="Publish"
                                btnType="button"
                                handleClick={() => handlePublish(item.id)}
                              />
                            )}
                            {item.status === 'published' && (
                              <div className="flex space-x-2">
                                <CustomButton
                                  containerStyles={`app__btn_red_xs ${
                                    !hasAccess('page_publishers') && 'hidden'
                                  }`}
                                  title="Unpublish"
                                  btnType="button"
                                  handleClick={() => handleUnpublish(item.id)}
                                />
                                <Link
                                  target="_blank"
                                  href={
                                    item.type === 'static-page'
                                      ? `/page/${item.id}`
                                      : `/pages/${item.type}`
                                  }
                                  className="app__btn_blue_xs"
                                >
                                  View Page
                                </Link>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                {loading && <TableRowLoading cols={4} rows={2} />}
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
            <DeleteModal
              id={selectedId}
              table="ccb_pages"
              trash={toTrash}
              hideModal={() => setShowDeleteModal(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default Page
