import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon, TagIcon } from '@heroicons/react/20/solid'
import { CustomButton } from '@/components'

const schoolTypes = [
  'Elementary',
  'Secondary',
  'Integrated',
  'SPED Centers'
]

interface FilterTypes {
  setFilterKeyword: (keyword: string) => void
  setFilterType: (type: string) => void
}

const Filters = ({ setFilterKeyword, setFilterType }: FilterTypes) => {
  const [selectedType, setSelectedType] = useState('')
  const [keyword, setKeyword] = useState<string>('')

  const handleApply = () => {
    if (keyword.trim() === '' && selectedType.trim() === '') return

    // pass filter values to parent
    setFilterKeyword(keyword)
    setFilterType(selectedType)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (keyword.trim() === '' && selectedType.trim() === '') return

    // pass filter values to parent
    setFilterKeyword(keyword)
    setFilterType(selectedType)
  }

  // clear all filters
  const handleClear = () => {
    setFilterKeyword('')
    setKeyword('')
    setFilterType('')
    setSelectedType('')
  }

  return (
    <div className=''>
      <div className='flex items-center'>
        <form onSubmit={handleSubmit} className='items-center'>
          <div className='app__filter_container'>
            <MagnifyingGlassIcon className="w-4 h-4 mr-1"/>
            <input
              placeholder='Search'
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="app__filter_input"/>
          </div>
        </form>
        <div className="w-40">
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative">
              <Listbox.Button className="app__listbox_btn">
                <span><TagIcon className="w-4 h-4 mr-1"/></span>
                <span className="block truncate text-xs">
                  Type: {selectedType}
                </span>
                <span className="app__listbox_icon">
                  <ChevronDownIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="app__listbox_options">
                  {schoolTypes.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-50 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate text-xs ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item}
                          </span>
                          {
                            selected
                              ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                )
                              : null
                          }
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className='flex items-center space-x-2 mt-4'>
        <CustomButton
              containerStyles='app__btn_green'
              title='Apply Filter'
              btnType='button'
              handleClick={handleApply}
            />
          <CustomButton
              containerStyles='app__btn_gray'
              title='Clear Filter'
              btnType='button'
              handleClick={handleClear}
            />
      </div>
    </div>
  )
}

export default Filters
