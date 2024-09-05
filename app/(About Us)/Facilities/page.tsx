'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Facilities() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          Facilities
        </h1>

        {/* Library */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Library</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our state-of-the-art library is a hub of academic resources and
            study spaces. It houses an extensive collection of books, journals,
            and digital resources across various disciplines. With comfortable
            reading areas, study rooms, and access to online databases, the
            library supports both individual and collaborative learning.
          </p>
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/library.jpg"
              alt="Library"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            The library is open seven days a week and offers a range of
            services, including research assistance, interlibrary loans, and
            digital media access.
          </p>
        </section>

        {/* Science Laboratories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Science Laboratories
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our modern science laboratories are equipped with the latest
            technology to facilitate hands-on experiments and research. The
            laboratories are designed for various scientific disciplines,
            including biology, chemistry, and physics. Each lab is fitted with
            safety equipment, state-of-the-art instruments, and materials to
            support comprehensive scientific education.
          </p>
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/labs.jpg"
              alt="Science Laboratories"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our facilities provide a conducive environment for students to
            conduct experiments, engage in research, and develop practical
            skills.
          </p>
        </section>

        {/* Computer Labs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Computer Labs
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The computer labs at City College of Bayugan are equipped with
            high-performance computers and the latest software to support
            various academic and research activities. The labs are available to
            students for programming, data analysis, graphic design, and more.
            High-speed internet access and technical support are also provided.
          </p>
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/computer-labs.jpg"
              alt="Computer Labs"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            The computer labs are open during regular academic hours and provide
            a quiet, focused environment for students to work on their
            assignments and projects.
          </p>
        </section>

        {/* Sports Facilities */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Sports Facilities
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our campus features a range of sports facilities, including a
            gymnasium, swimming pool, and outdoor sports fields. These
            facilities support various sports and physical activities, from team
            sports like basketball and soccer to individual workouts and
            swimming. The facilities are open to all students and are designed
            to promote physical fitness and well-being.
          </p>
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/sports-facilities.jpg"
              alt="Sports Facilities"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            We offer a variety of sports programs and activities throughout the
            academic year, encouraging students to stay active and engaged.
          </p>
        </section>

        {/* Cafeteria */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Cafeteria</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The campus cafeteria offers a diverse menu of healthy and delicious
            meals, snacks, and beverages. It provides a comfortable space for
            students and staff to enjoy their meals, socialize, and relax
            between classes. The cafeteria caters to various dietary preferences
            and offers both local and international cuisine.
          </p>
          <div className="relative w-full h-64 mb-4">
            <Image
              src="/cafeteria.jpg"
              alt="Cafeteria"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            With its vibrant atmosphere and extensive menu, the cafeteria is a
            popular gathering spot on campus.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  )
}
