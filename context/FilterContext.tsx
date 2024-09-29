'use client'
import { useSupabase } from '@/context/SupabaseProvider'
import type { UserAccessTypes } from '@/types'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'

const FilterContext = React.createContext<any | ''>('')

export function useFilter() {
  return useContext(FilterContext)
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const { systemAccess, session } = useSupabase()
  const [filters, setFilters] = useState({})
  const [perPage, setPerPage] = useState(10)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [ipcrfTotalScore, setIpcrfTotalScore] = useState([])

  const setToast = (type: string, message: string) => {
    if (type === 'success') {
      toast.success(message)
    }
    if (type === 'error') {
      toast.error(message)
    }
  }

  const hasAccess = (type: string) => {
    const find = systemAccess.find((item: UserAccessTypes) => {
      return (
        item.type === type && item.ccb_user.id.toString() === session.user.id
      )
    })

    if (find) {
      return true
    } else {
      return false
    }
  }

  const value = {
    filters,
    setFilters,
    hasAccess,
    setToast,
    perPage,
    session,
    setPerPage,
    isDarkMode,
    setIsDarkMode,
    ipcrfTotalScore,
    setIpcrfTotalScore
  }

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
