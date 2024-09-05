'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function BriefHistory() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          Brief History
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          City College of Bayugan was established in 1988 as a response to the
          growing need for accessible higher education in the region. The
          college was founded by a group of visionary educators and community
          leaders who recognized the importance of providing quality education
          to students from all walks of life.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Initially starting as a small institution offering a handful of
          programs, the college quickly gained recognition for its commitment to
          academic excellence and community service. In 1992, the college
          expanded its offerings to include a wider range of undergraduate
          programs, responding to the diverse educational needs of its growing
          student population.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The turn of the millennium brought significant growth, with the
          construction of new facilities and the introduction of graduate
          programs. The college's focus on research and development also
          intensified, leading to the establishment of several research centers
          dedicated to advancing knowledge in various fields.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          By 2010, the college had earned accreditation from national
          educational bodies, further solidifying its reputation as a leading
          institution of higher learning. The college's dedication to innovation
          and excellence continued to drive its growth, and in recent years, it
          has embraced new technologies and teaching methods to enhance the
          learning experience for its students.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Today, City College of Bayugan stands as a beacon of educational
          excellence, committed to fostering a nurturing environment that
          empowers students to achieve their full potential. The college remains
          dedicated to its mission of providing accessible, high-quality
          education and making a positive impact on the community.
        </p>
      </div>
      <Footer />
    </div>
  )
}
