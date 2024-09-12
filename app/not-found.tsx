'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
export default function NotFound() {
  return (
    <div className="bg-gray-900 h-screen">
      {/* Main Menu */}
      <Header />
      <section className="py-16 px-4 md:px-8 border-t border-gray-300 bg-[#f0f2f5]">
        <div className="container mx-auto">
          <div className="text-xl flex flex-col justify-start py-32 items-center text-black">
            Error 404 - Page not Found
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
