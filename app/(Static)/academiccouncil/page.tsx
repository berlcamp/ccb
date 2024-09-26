'use client'
// pages/board-of-trustees.tsx
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageSidebar from '@/components/PageSidebar'
import { AdministrationTypes } from '@/types'
import { fetchAdministration } from '@/utils/fetchApi'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const BoardOfTrustees = () => {
  const [members, setMembers] = useState<AdministrationTypes[] | []>([])

  useEffect(() => {
    ;(async () => {
      const result = await fetchAdministration('academic-council', 99, 0)
      setMembers(result.data)
    })()
  }, [])
  return (
    <div className="flex flex-col min-h-screen pt-[74px]">
      <Header />

      <div className="container min-h-screen mx-auto px-4 md:px-8 py-8 my-8 bg-white shadow-md rounded-lg">
        <div className="md:flex items-start justify-start space-x-4">
          <div className="md:w-2/3">
            <div className="flex items-center justify-center">
              <div className="border border-green-700 rounded-lg px-4 py-1 text-green-800 text-lg">
                Academic Council
              </div>
            </div>
            <div className="space-y-20">
              {members.length > 0 &&
                members.map((mem, i: number) => (
                  <div
                    key={i}
                    className="inline-flex mr-10 md:mr-20 relative group"
                  >
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <Image
                        src={
                          mem.image_url
                            ? `https://nuhirhfevxoonendpfsm.supabase.co/storage/v1/object/public/${mem.image_url}`
                            : '/avatar.png'
                        }
                        alt=""
                        className="rounded-full aspect-square object-cover"
                        width={100}
                        height={100}
                      />
                      <div className="font-bold">{mem.name}</div>
                      <div className="font-light italic w-32 text-sm text-center">
                        {mem.position}
                      </div>
                    </div>
                    {/* Show div on hover (group-hover) or when clicked (activeMember === i) */}
                    <div
                      className={`absolute z-30 w-[400px] bottom-0 left-0 bg-white p-4 border rounded-md transition-opacity duration-300 opacity-0 
              group-hover:opacity-100`}
                    >
                      <div className="text-sm">
                        Fullname: <span className="font-bold">{mem.name}</span>
                      </div>
                      <div className="text-sm">Position: {mem.position}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <PageSidebar />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BoardOfTrustees
