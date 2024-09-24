'use client'
import { SettingsSideBar, Sidebar, Title } from '@/components'
import TopBar from '@/components/TopBar'
import { useSupabase } from '@/context/SupabaseProvider'
import React, { useEffect, useState } from 'react'

import type { UserAccessTypes } from '@/types'
import { logError } from '@/utils/fetchApi'
import ChooseUsers from './ChooseUsers'

const Page: React.FC = () => {
  const [users, setUsers] = useState<UserAccessTypes[] | []>([])
  const [loadedSettings, setLoadedSettings] = useState(false)
  const { supabase } = useSupabase()

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('ccb_system_access')
        .select('*, ccb_user:user_id(id,firstname,lastname,middlename)')

      if (error) {
        void logError('system access', 'system_access', '', error.message)
        throw new Error(error.message)
      }

      setUsers(data)

      setLoadedSettings(true)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Sidebar>
        <SettingsSideBar />
      </Sidebar>
      <TopBar />
      <div className="app__main">
        <div>
          <div className="app__title">
            <Title title="System Permissions" />
          </div>

          <div className="app__content pb-20">
            {loadedSettings && (
              <>
                <ChooseUsers
                  multiple={true}
                  type="settings"
                  users={users}
                  title="Who can manage Website Settings"
                />
                <ChooseUsers
                  multiple={true}
                  type="page_publishers"
                  users={users}
                  title="Page Publishers - Page publishers can both create and publish content."
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
