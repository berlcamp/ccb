import '@/app/globals.css'
import { FilterProvider } from '@/context/FilterContext'
import SupabaseProvider from '@/context/SupabaseProvider'
import { Providers } from '@/GlobalRedux/provider'
import SupabaseListener from '@/utils/supabase-listener'
import { createServerClient } from '@/utils/supabase-server'
import { Toaster } from 'react-hot-toast'
import 'server-only'

import type { Employee, UserAccessTypes } from '@/types'
import { logError } from '@/utils/fetchApi'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'City College of Bayugan',
  description: 'City College of Bayugan by BTC'
}

// do not cache this layout
export const revalidate = 0

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  let sysAccess: UserAccessTypes[] | null = []
  let sysUsers: Employee[] | null = []

  if (session) {
    try {
      const { data: systemAccess, error } = await supabase
        .from('ccb_system_access')
        .select('*, ccb_user:user_id(id,firstname,lastname,middlename)')

      if (error) {
        void logError(
          'root layout system access',
          'ccb_system_access',
          '',
          error.message
        )
        throw new Error(error.message)
      }

      const { data: systemUsers, error: error2 } = await supabase
        .from('ccb_users')
        .select()
        .eq('status', 'Active')

      if (error2) {
        void logError('root layout ccb users', 'ccb_users', '', error2.message)
        throw new Error(error2.message)
      }

      sysAccess = systemAccess
      sysUsers = systemUsers
    } catch (err) {
      return 'Something went wrong, please contact the system administrator.'
    }
  }

  return (
    <html lang="en">
      <body className="relative bg-gradient-to-r from-lime-500 via-green-400 to-green-600">
        <SupabaseProvider
          systemAccess={sysAccess}
          session={session}
          systemUsers={sysUsers}
        >
          <SupabaseListener serverAccessToken={session?.access_token} />
          {!session && children}
          {session && (
            <Providers>
              <FilterProvider>
                <Toaster />
                {children}
              </FilterProvider>
            </Providers>
          )}
        </SupabaseProvider>
      </body>
    </html>
  )
}
