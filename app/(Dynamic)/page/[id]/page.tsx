import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageSidebar from '@/components/PageSidebar'
import { PagesFormTypes } from '@/types'
import { createBrowserClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page({ params }: { params: { id: string } }) {
  const pageID = params.id

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const serviceAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  const supabase = createBrowserClient(supabaseUrl, serviceAnonKey)

  const { data } = await supabase
    .from('ccb_pages')
    .select()
    .eq('id', pageID)
    .maybeSingle()

  const details: PagesFormTypes | null = data

  return (
    <div className="flex flex-col min-h-screen pt-[74px]">
      <Header />
      <div className="container min-h-screen mx-auto px-4 md:px-8 py-8 my-8 bg-white shadow-md rounded-lg">
        {!details && (
          <div className="text-xl flex flex-col justify-start py-32 items-center text-black">
            Error 404 - Page not Found
          </div>
        )}
        {details && (details.is_deleted || details.status !== 'published') && (
          <div className="text-xl flex flex-col justify-start py-32 items-center text-black">
            Error 404 - Page not Found
          </div>
        )}
        {details && !details.is_deleted && details.status === 'published' && (
          <>
            <div className="md:flex items-start justify-start space-x-4">
              <div className="md:w-2/3">
                <h1 className="text-2xl font-bold text-black mb-6">
                  {details.title}
                </h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: details.content
                  }}
                />
              </div>
              <PageSidebar />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
