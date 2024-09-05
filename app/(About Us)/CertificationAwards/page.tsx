'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function CertificationAwards() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          Certification Awards
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            City College of Bayugan has earned several prestigious
            certifications and awards in recognition of its commitment to
            excellence in education, research, and community service. These
            awards reflect our dedication to providing high-quality programs and
            fostering a supportive learning environment for our students.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Recent Awards
          </h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
            <li>
              <strong>Best Higher Education Institution</strong> - Awarded by
              the National Education Association in 2023 for outstanding
              contributions to higher education and student success.
            </li>
            <li>
              <strong>Excellence in Research</strong> - Recognized by the
              Research Foundation for our innovative research projects and
              significant contributions to various academic fields in 2022.
            </li>
            <li>
              <strong>Community Service Excellence</strong> - Given by the
              Regional Development Council in 2021 for our active involvement
              and impact in community outreach and service programs.
            </li>
            <li>
              <strong>Green Campus Award</strong> - Honored by the Environmental
              Advocacy Group in 2020 for our commitment to sustainability and
              environmental responsibility on campus.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Certification Highlights
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our institution is proud to be certified by several esteemed
            organizations that validate our educational standards and
            operational excellence:
          </p>
          <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
            <li>
              <strong>ISO 9001:2015 Certification</strong> - Recognizes our
              adherence to international standards in quality management and
              continuous improvement.
            </li>
            <li>
              <strong>ABET Accreditation</strong> - Ensures that our engineering
              and technology programs meet the rigorous standards set by the
              Accreditation Board for Engineering and Technology.
            </li>
            <li>
              <strong>
                Accreditation by the Commission on Higher Education (CHED)
              </strong>{' '}
              - Validates our compliance with national higher education
              standards and regulatory requirements.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Future Goals
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We are committed to continuously improving and achieving new
            milestones in education and research. Our future goals include
            pursuing additional certifications, expanding our research
            capabilities, and enhancing our community engagement initiatives to
            further our mission of excellence.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  )
}
