'use client'
import { useSupabase } from '@/context/SupabaseProvider'
import { PagesFormTypes } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function SidebarNews() {
  const { news } = useSupabase()

  if (news.length === 0) {
    return ''
  }

  return (
    <div>
      <div className="font-bold text-xl mb-2">Latest News</div>
      <div>
        {news.map((page: PagesFormTypes, i: number) => (
          <div key={i} className="mb-4">
            {/* Title and Date */}
            <Link href={`/page/${page.id}`}>
              <h2 className="text-sm font-semibold">{page.title}</h2>
            </Link>

            <div className="flex space-x-2">
              {/* Thumbnail Image */}
              <div>
                {page.thumbnail_photo && (
                  <Image
                    src={page.thumbnail_photo}
                    width={200}
                    height={200}
                    alt=""
                  />
                )}
              </div>

              {/* Excerpt */}
              <div className="text-xs">{page.excerpt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
