'use client'
import { useSupabase } from '@/context/SupabaseProvider'
import { MenuTypes, SubmenuTypes } from '@/types'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import SidebarNews from './SidebarNews'

export default function PageSidebar() {
  const searchParams = useSearchParams()
  const mref = searchParams.get('mref') // Get the "mref" query parameter
  const destinationQuery = mref ? { mref } : {} // Add "mref" if it exists

  const { menu }: { menu: MenuTypes[] } = useSupabase()

  let submenu: SubmenuTypes[] = []
  if (mref) {
    submenu = menu.filter((m) => m.id.toString() === mref)[0].sub_menus
  }

  return (
    <div className="md:w-1/3 border p-4 mt-10 md:mt-0">
      {mref && mref === '3' && (
        <div className="flex flex-col items-center justify-center mb-8">
          <Image
            src="/avatar.png"
            alt="CCB President"
            width={180}
            height={180}
          />
          <div className="font-bold">John Doe</div>
          <div className="font-light italic text-sm">College President</div>
        </div>
      )}
      {submenu.length > 0 && (
        <div>
          <ul className="space-y-2">
            {submenu.map((submenu, i) => (
              <li key={i}>
                <Link
                  href={{
                    pathname:
                      submenu.type === 'static-page'
                        ? `/page/${submenu.slug}`
                        : submenu.type === 'custom-url'
                        ? `${submenu.slug}`
                        : `/pages/${submenu.type}`,
                    query: destinationQuery
                  }}
                  className="flex items-center justify-start space-x-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>{submenu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <SidebarNews />
    </div>
  )
}
