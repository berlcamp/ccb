'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import News from '@/components/News'
import { useSupabase } from '@/context/SupabaseProvider'
import { SliderTypes } from '@/types'
import { fetchSlider } from '@/utils/fetchApi'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  // const [slides, setSlides] = useState([<Courses />, <MissionVision />])
  const [slides, setSlides] = useState<SliderTypes[] | []>([])
  const slideInterval = 5000 // 5 seconds

  const { news } = useSupabase()

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, slideInterval)

    return () => clearInterval(interval)
  }, [currentSlide, slides.length])

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    )
  }

  useEffect(() => {
    // Fetch sliders
    ;(async () => {
      const result = await fetchSlider(99, 0)
      const filtered = result.data.filter((i) => i.status === 'published')
      setSlides(filtered)
    })()
  }, [])

  return (
    <div className="flex flex-col min-h-screen pt-[74px]">
      {/* Main Menu */}
      <Header />
      {/* Main Content Wrapper */}
      <main className="flex-grow">
        {/* Sliding div */}
        <div className="relative overflow-hidden">
          <div className="relative">
            {/* Arrow icons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-500" />
            </button>

            {/* Slide container */}
            <div
              className="flex h-[500px] transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.length > 0 &&
                slides.map((slide, index) => (
                  <div key={index} className="relative w-full flex-shrink-0">
                    {/* Background image */}
                    <div className="absolute inset-0 w-full h-full -z-10">
                      <Image
                        src={`https://nuhirhfevxoonendpfsm.supabase.co/storage/v1/object/public/${slide.content}`}
                        alt="background cover"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        className="blur-md" // Adds a blur effect to the background
                        priority
                      />
                    </div>

                    {/* Foreground image */}
                    <div className="relative w-full h-full flex justify-center items-center">
                      <Image
                        src={`https://nuhirhfevxoonendpfsm.supabase.co/storage/v1/object/public/${slide.content}`}
                        alt="main image"
                        fill={true}
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* News Section */}
        <section className="py-8 px-4 md:px-8 border-t border-gray-300">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-black">Latest News</h2>
            <News news={news} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
