'use client'
import { MenuTypes, SubmenuTypes } from '@/types'
import { fetchMenu } from '@/utils/fetchApi'
import { Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SubMenuLink = ({
  submenu,
  menuItem,
  j
}: {
  submenu: SubmenuTypes
  menuItem: MenuTypes
  j: number
}) => {
  // Check if the link is a custom external URL
  const isExternalLink = submenu.type === 'custom-url'

  return isExternalLink ? (
    <a
      key={j}
      href={`${submenu.slug}`}
      rel="noopener noreferrer"
      className="block px-4 py-2 text-sm text-white hover:bg-green-800"
    >
      {submenu.title}
    </a>
  ) : (
    <Link
      key={j}
      href={{
        pathname:
          submenu.type === 'static-page'
            ? `/page/${submenu.slug}`
            : `/pages/${submenu.type}`,
        query: { mref: menuItem.id }
      }}
      className="block px-4 py-2 text-sm text-white hover:bg-green-800"
    >
      {submenu.title}
    </Link>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  const [dynamicMenu, setDynamicMenu] = useState<MenuTypes[] | []>([])

  useEffect(() => {
    // Fetch menus
    ;(async () => {
      const result = await fetchMenu(99, 0)
      setDynamicMenu(result.data)
    })()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center">
              <div className="relative w-16 h-16">
                <Image src="/logo.png" alt="Logo" width={60} height={60} />
              </div>
              <div className="text-base font-bold uppercase text-white ml-2">
                City College of Bayugan
              </div>
            </div>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Main Menu for Desktop */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          {dynamicMenu.length > 0 &&
            dynamicMenu.map((menuItem, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredMenu(menuItem.title)}
                onMouseLeave={() => setHoveredMenu(null)}
                className="relative"
              >
                <button className="inline-flex text-sm font-medium uppercase justify-center w-full text-white hover:text-blue-500 transition duration-300">
                  {menuItem.title}
                </button>

                {/* Submenu on Hover */}
                <Transition
                  show={hoveredMenu === menuItem.title}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="absolute mt-2 w-56 origin-top-right bg-green-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {menuItem.sub_menus.length > 0 &&
                      menuItem.sub_menus.map((submenu, j) => (
                        <SubMenuLink
                          submenu={submenu}
                          menuItem={menuItem}
                          j={j}
                        />
                        // <Link
                        //   key={j}
                        //   href={{
                        //     pathname:
                        //       submenu.type === 'static-page'
                        //         ? `/page/${submenu.slug}`
                        //         : submenu.type === 'custom-url'
                        //         ? `${submenu.slug}`
                        //         : `/pages/${submenu.type}`,
                        //     query: { mref: menuItem.id }
                        //   }}
                        //   className="block px-4 py-2 text-sm text-white hover:bg-green-800"
                        // >
                        //   {submenu.title}
                        // </Link>
                      ))}
                  </div>
                </Transition>
              </div>
            ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden fixed inset-0 bg-gradient-to-r from-lime-500 via-green-400 to-green-600 z-50 h-screen overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-4 right-4 text-white bg-gray-800 rounded-full"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="mt-20 space-y-6 py-4 px-6 bg-green-700">
            {dynamicMenu.length > 0 &&
              dynamicMenu.map((menuItem, i) => (
                <div key={i} className="text-gray-200 text-lg space-y-2">
                  <p className="text-sm font-bold uppercase">
                    {menuItem.title}
                  </p>
                  {menuItem.sub_menus.length > 0 &&
                    menuItem.sub_menus.map((submenu, j) => (
                      <Link
                        key={j}
                        href={{
                          pathname:
                            submenu.type === 'static-page'
                              ? `/page/${submenu.slug}`
                              : `/pages/${submenu.type}`,
                          query: { mref: menuItem.id }
                        }}
                        className="block text-sm text-white hover:text-gray-200 transition duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {submenu.title}
                      </Link>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </Transition>
    </header>
  )
}
