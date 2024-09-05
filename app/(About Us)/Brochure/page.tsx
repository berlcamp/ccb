'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Brochure() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          College Brochure
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Welcome to City College of Bayugan
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At City College of Bayugan, we are committed to providing
            high-quality education and fostering a nurturing environment that
            empowers students to achieve their full potential. Our brochure
            provides detailed information about our programs, campus facilities,
            admission procedures, and much more. We invite you to explore the
            opportunities that await you at our institution.
          </p>

          <h2 className="text-xl font-semibold text-black mb-4">
            Download Our Brochure
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our comprehensive brochure is available for download in PDF format.
            It contains detailed information about our academic programs, campus
            life, student services, and application guidelines. Click the link
            below to download the brochure and learn more about City College of
            Bayugan.
          </p>

          <div className="flex justify-center mb-8">
            <a
              href="#"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Download Brochure
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-4">
            Brochure Preview
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Here is a preview of what you will find in our brochure. The
            brochure highlights our various academic programs, extracurricular
            activities, and the vibrant campus life that makes City College of
            Bayugan a great place to study.
          </p>
          <div className="flex justify-center">
            <Image
              src="/campus-map.png"
              alt="Brochure Preview"
              width={800}
              height={600}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
