import { superAdmins } from '@/constants'
import { useFilter } from '@/context/FilterContext'
import { useSupabase } from '@/context/SupabaseProvider'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SettingsSideBar = () => {
  const currentRoute = usePathname()

  const { hasAccess } = useFilter()
  const { session } = useSupabase()

  return (
    <>
      <ul className="pt-8 mt-4 space-y-2 border-gray-700">
        <li>
          <div className="flex items-center text-gray-500 items-centers space-x-1 px-2">
            <Cog6ToothIcon className="w-4 h-4" />
            <span>Website Content</span>
          </div>
        </li>
        <li>
          <Link
            href="/admin/pages"
            className={`app__menu_link ${
              currentRoute === '/admin/pages' ? 'app_menu_link_active' : ''
            }`}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">Pages</span>
          </Link>
        </li>
        {hasAccess('settings') && (
          <>
            <li>
              <Link
                href="/admin/menus"
                className={`app__menu_link ${
                  currentRoute === '/admin/menus' ? 'app_menu_link_active' : ''
                }`}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Main Menu</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/slider"
                className={`app__menu_link ${
                  currentRoute === '/admin/slider' ? 'app_menu_link_active' : ''
                }`}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Homepage Slider
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/images"
                className={`app__menu_link ${
                  currentRoute === '/admin/images' ? 'app_menu_link_active' : ''
                }`}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Image Library
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
      {hasAccess('settings') && (
        <ul className="pt-8 mt-4 space-y-2 border-t border-gray-700">
          <li>
            <div className="flex items-center text-gray-500 items-centers space-x-1 px-2">
              <Cog6ToothIcon className="w-4 h-4" />
              <span>Students</span>
            </div>
          </li>
          <li>
            <Link
              href="/admin/registrations"
              className={`app__menu_link ${
                currentRoute === '/admin/registrations'
                  ? 'app_menu_link_active'
                  : ''
              }`}
            >
              <span className="flex-1 ml-3 whitespace-nowrap">
                Pre-enrollment
              </span>
            </Link>
          </li>
        </ul>
      )}
      {(hasAccess('settings') || superAdmins.includes(session.user.email)) && (
        <ul className="pt-8 mt-4 space-y-2 border-t border-gray-700">
          <li>
            <div className="flex items-center text-gray-500 items-centers space-x-1 px-2">
              <Cog6ToothIcon className="w-4 h-4" />
              <span>Permissions</span>
            </div>
          </li>
          <li>
            <Link
              href="/admin/settings/accounts"
              className={`app__menu_link ${
                currentRoute === '/admin/settings/accounts'
                  ? 'app_menu_link_active'
                  : ''
              }`}
            >
              <span className="flex-1 ml-3 whitespace-nowrap">Accounts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings/system"
              className={`app__menu_link ${
                currentRoute === '/admin/settings/system'
                  ? 'app_menu_link_active'
                  : ''
              }`}
            >
              <span className="flex-1 ml-3 whitespace-nowrap">
                System Access
              </span>
            </Link>
          </li>
          {session.user.email === 'berlcamp@gmail.com' && (
            <li>
              <Link
                href="/admin/settings/errorlogs"
                className={`app__menu_link ${
                  currentRoute === '/admin/settings/errorlogs'
                    ? 'app_menu_link_active'
                    : ''
                }`}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Error Logs
                </span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </>
  )
}

export default SettingsSideBar
