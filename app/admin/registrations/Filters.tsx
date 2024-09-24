import { CustomButton } from '@/components'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

const schoolTypes = ['Elementary', 'Secondary', 'Integrated', 'SPED Centers']

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
    <div className="">
      <div className="flex items-center">
        <form onSubmit={handleSubmit} className="items-center">
          <div className="app__filter_container">
            <MagnifyingGlassIcon className="w-4 h-4 mr-1" />
            <input
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="app__filter_input"
            />
          </div>
        </form>
        <div className="w-40">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="app__select_standard"
          >
            <option value="">Choose Type</option>
            <option value="new">New Student</option>
            <option value="old">Old Student</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <CustomButton
          containerStyles="app__btn_green"
          title="Apply Filter"
          btnType="button"
          handleClick={handleApply}
        />
        <CustomButton
          containerStyles="app__btn_gray"
          title="Clear Filter"
          btnType="button"
          handleClick={handleClear}
        />
      </div>
    </div>
  )
}

export default Filters
