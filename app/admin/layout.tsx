import '@/app/globals.css'
import { createServerClient } from '@/utils/supabase-server'
import 'server-only'

import Unauthorized from '@/components/Unauthorized'
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

  if (!session) {
    return <Unauthorized />
  } else {
    return (
      <div className="bg-[#f0f2f5] h-screen">
        <div className="h-px">Admin</div>
        {children}
      </div>
    )
  }
}
