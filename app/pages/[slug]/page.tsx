'use client'
import { OneColLayoutLoading, ShowMore } from '@/components'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageSidebar from '@/components/PageSidebar'
import { updateList } from '@/GlobalRedux/Features/listSlice'
import { updateResultCounter } from '@/GlobalRedux/Features/resultsCounterSlice'
import { PagesFormTypes } from '@/types'
import { fetchDynamicPages } from '@/utils/fetchApi'
import { createBrowserClient } from '@supabase/ssr'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const serviceAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabase = createBrowserClient(supabaseUrl, serviceAnonKey)

export default function Pages({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<PagesFormTypes[]>([])
  const [perPageCount, setPerPageCount] = useState<number>(10)

  // Redux staff
  const globallist = useSelector((state: any) => state.list.value)
  const resultsCounter = useSelector((state: any) => state.results.value)
  const dispatch = useDispatch()

  const fetchData = async () => {
    setLoading(true)

    try {
      const result = await fetchDynamicPages(slug, perPageCount, 0)

      // update the list in redux
      dispatch(updateList(result.data))

      // Updating showing text in redux
      dispatch(
        updateResultCounter({
          showing: result.data.length,
          results: result.count ? result.count : 0
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Append data to existing list whenever 'show more' button is clicked
  const handleShowMore = async () => {
    setLoading(true)

    try {
      const result = await fetchDynamicPages(slug, perPageCount, list.length)

      // update the list in redux
      const newList = [...list, ...result.data]
      dispatch(updateList(newList))

      // Updating showing text in redux
      dispatch(
        updateResultCounter({
          showing: newList.length,
          results: result.count ? result.count : 0
        })
      )
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const createExcerpt = (content: string, length: number) => {
    const strippedContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    return strippedContent.length > length
      ? strippedContent.substring(0, length) + '...'
      : strippedContent
  }

  const getImg = (content: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')

    // Get the first <img> tag
    const imgTag = doc.querySelector('img')

    if (imgTag) {
      return imgTag.src
    } else {
      return ''
    }
  }

  // Update list whenever list in redux updates
  useEffect(() => {
    setList(globallist)
  }, [globallist])

  // Featch data
  useEffect(() => {
    setList([])
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, perPageCount])

  const isDataEmpty = !Array.isArray(list) || list.length < 1 || !list

  return (
    <div className="flex flex-col min-h-screen pt-[74px]">
      <Header />
      {/* Main Content Wrapper */}
      <main className="flex-grow">
        <div className="container min-h-screen mx-auto px-4 md:px-8 py-8 my-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center text-black mb-8 capitalize">
            {slug}
          </h1>
          <div className="md:flex items-start justify-start space-x-2">
            <div className="md:w-2/3">
              {!isDataEmpty &&
                list?.map((page: PagesFormTypes, i: number) => (
                  <div
                    key={i}
                    className="mb-8 p-4 border border-gray-200 rounded-md"
                  >
                    {/* Title and Date */}
                    <Link href={`/page/${page.id}`}>
                      <h2 className="text-2xl font-semibold mb-2">
                        {page.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">
                      {page.publish_date &&
                        format(new Date(page.publish_date), 'MMM dd, yyyy')}
                    </p>

                    {/* Thumbnail Image */}
                    <div className="mb-4">
                      {getImg(page.content) && (
                        <Image
                          src={getImg(page.content)}
                          width={200}
                          height={200}
                          alt=""
                        />
                      )}
                    </div>

                    {/* Excerpt */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: createExcerpt(page.content, 200)
                      }}
                    />
                  </div>
                ))}
              {loading && <OneColLayoutLoading rows={2} />}
              {/* Show More */}
              {resultsCounter.results > resultsCounter.showing && !loading && (
                <ShowMore handleShowMore={handleShowMore} />
              )}
            </div>
            <PageSidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
