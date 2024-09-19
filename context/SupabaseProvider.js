'use client'

import { createContext, useContext, useState } from 'react'
import { createBrowserClient } from '../utils/supabase-browser'

const Context = createContext()

export default function SupabaseProvider({
  children,
  session,
  systemAccess,
  systemUsers,
  news
}) {
  const [supabase] = useState(() => createBrowserClient())

  return (
    <Context.Provider
      value={{ supabase, session, systemAccess, systemUsers, news }}
    >
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
