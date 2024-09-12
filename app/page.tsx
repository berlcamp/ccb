'use client'

import Courses from '@/components/Courses'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MissionVision from '@/components/MissionVision'
import News from '@/components/News'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [<Courses />, <MissionVision />]
  const slideInterval = 5000 // 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, slideInterval)

    return () => clearInterval(interval)
  }, [currentSlide])

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    )
  }

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
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  {slide}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Section */}
        <section className="py-16 px-4 md:px-8 border-t border-gray-300">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-black">Latest News</h2>
            <News />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
