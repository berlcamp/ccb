import UserDropdown from '@/components/TopBars/UserDropdown'
import Link from 'next/link'

function TopBar() {
  return (
    <div className="fixed top-0 right-0 z-20 lg:z-40 flex items-center w-full bg-gray-50 lg:bg-gray-800 shadow-md">
      <div className="-translate-x-full lg:translate-x-0 z-30 w-64">&nbsp;</div>
      <div className="flex flex-1 p-2 space-x-4 items-center bg-gray-50 justify-end">
        <div>
          <Link target="_blank" href="/">
            Go to Website
          </Link>
        </div>
        {/* <Notifications darkMode={false} /> */}
        <UserDropdown darkMode={false} />
      </div>
    </div>
  )
}

export default TopBar
