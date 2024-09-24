'use client'

import { createContext, useContext, useState } from 'react'
import { createBrowserClient } from '../utils/supabase-browser'

const Context = createContext()

export default function SupabaseProvider({
  children,
  session,
  systemAccess,
  systemUsers,
  news,
  menu
}) {
  const [supabase] = useState(() => createBrowserClient())

  return (
    <Context.Provider
      value={{ supabase, session, systemAccess, systemUsers, news, menu }}
    >
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
