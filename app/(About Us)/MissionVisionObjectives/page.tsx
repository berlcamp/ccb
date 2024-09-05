'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function MissionVisionObjectives() {
  return (
    <div className="bg-[#f0f2f5]">
      {/* Header */}
      <Header />

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          Mission, Vision, Objectives
        </h1>

        {/* Mission */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to provide accessible, high-quality education that
            fosters critical thinking, innovation, and lifelong learning. We
            strive to create a dynamic environment that supports the
            intellectual, cultural, and personal growth of our students and
            prepares them to make meaningful contributions to their communities.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision is to be a leading institution recognized for academic
            excellence, research, and community engagement. We aim to empower
            our students with the knowledge and skills to lead, innovate, and
            succeed in a rapidly changing global society.
          </p>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-2xl font-semibold text-black mb-4">Objectives</h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
            <li>
              To provide a comprehensive and diverse curriculum that meets the
              needs of our students and community.
            </li>
            <li>
              To foster a culture of critical thinking, creativity, and ethical
              decision-making.
            </li>
            <li>
              To support faculty development and encourage research and
              innovation.
            </li>
            <li>
              To promote inclusivity, diversity, and a sense of belonging for
              all students.
            </li>
            <li>
              To engage with local, national, and international communities
              through partnerships and service.
            </li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
