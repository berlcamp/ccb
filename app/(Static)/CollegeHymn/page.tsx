'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function CollegeHymn() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          College Hymn
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">Our Hymn</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The college hymn is a cherished part of our institution's tradition,
            embodying the spirit and values that define the City College of
            Bayugan community. It is sung at official events, ceremonies, and
            gatherings, inspiring unity and pride among students, faculty, and
            alumni.
          </p>

          <h3 className="text-lg font-semibold text-black mb-4">Lyrics</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Verse 1:</strong>
            <br />
            In the heart of Bayugan, our pride we proclaim,
            <br />
            City College stands, with a beacon of flame.
            <br />
            Guiding our path through the journey of light,
            <br />
            With knowledge and wisdom, we reach for new heights.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Chorus:</strong>
            <br />
            Hail to our college, the pride of our land,
            <br />
            With courage and honor, we take our stand.
            <br />
            Through trials and triumphs, we’ll rise and we'll strive,
            <br />
            Forever united, our spirits alive.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <strong>Verse 2:</strong>
            <br />
            Let the echoes of learning resound in the hall,
            <br />
            With every endeavor, we answer the call.
            <br />
            Together we journey, in quest of the best,
            <br />
            City College of Bayugan, in thee we invest.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Audio Recording
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            For a full experience of our college hymn, listen to the official
            audio recording below. The hymn captures the essence of our
            institution and is performed by the City College choir.
          </p>
          <audio controls className="w-full">
            <source src="/path/to/college-hymn.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Historical Significance
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The College Hymn was first introduced in 1995 as part of the
            institution's 10th anniversary celebration. Written by renowned
            composer and alumnus Dr. Juan Dela Cruz, the hymn symbolizes the
            values and aspirations of City College of Bayugan. Over the years,
            it has become an integral part of our college's tradition, inspiring
            pride and camaraderie among all members of our community.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  )
}
