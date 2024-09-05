'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function CampusMap() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          Campus Map
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to the City College of Bayugan campus! Our campus is
            designed to provide a dynamic and enriching environment for
            students, faculty, and visitors. This page provides a comprehensive
            map of our campus facilities, including academic buildings,
            administrative offices, recreational areas, and essential services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">Campus Map</h2>
          <div className="relative">
            <Image
              src="/campus-map.png"
              alt="Campus Map"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Click on the map for a detailed view of each area.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">Key Areas</h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
            <li>
              <strong>Main Academic Building:</strong> Houses classrooms,
              laboratories, and faculty offices. It is the central hub for most
              academic activities.
            </li>
            <li>
              <strong>Library:</strong> A state-of-the-art facility offering a
              vast collection of books, journals, and digital resources.
              Includes study rooms and computer stations.
            </li>
            <li>
              <strong>Student Center:</strong> Features dining facilities, a
              bookstore, and spaces for student activities and events.
            </li>
            <li>
              <strong>Administrative Offices:</strong> Includes the
              Registrar&apos;s Office, Financial Aid Office, and other essential
              administrative services.
            </li>
            <li>
              <strong>Recreational Complex:</strong> Provides sports facilities,
              a gymnasium, and outdoor recreational areas for student fitness
              and relaxation.
            </li>
            <li>
              <strong>Health Services:</strong> Offers medical and counseling
              services to support the well-being of our campus community.
            </li>
            <li>
              <strong>Parking Areas:</strong> Designated parking zones for
              students, faculty, and visitors are conveniently located
              throughout the campus.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Getting Around
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our campus is designed to be easily navigable, with clear signage
            and pathways connecting the various facilities. For any assistance
            or inquiries regarding campus navigation, please visit the campus
            information desk located at the Main Academic Building entrance.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  )
}
