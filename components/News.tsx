import { PagesFormTypes } from '@/types'
import { format } from 'date-fns'
import Link from 'next/link'

// components/News.js
export default function News({ news }: { news: PagesFormTypes[] }) {
  return (
    <section className="py-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.length > 0 &&
            news.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                <Link href={`/page/${item.id}`}>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                </Link>
                {item.publish_date && (
                  <p className="text-gray-500 mb-2">
                    {format(item.publish_date, 'MMMM d, yyyy')}
                  </p>
                )}
                <p className="text-gray-700">{item.excerpt}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
