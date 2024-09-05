'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function ContactUs() {
  return (
    <div className="bg-[#f0f2f5]">
      <Header />
      <div className="container mx-auto px-4 md:px-8 py-8 my-24 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-8">
          Contact Us
        </h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-black mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            If you have any questions, feedback, or inquiries, please feel free
            to contact us. Our team is here to assist you and provide you with
            the information you need.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Contact Information
              </h3>
              <ul className="list-none text-lg text-gray-700">
                <li className="mb-4">
                  <strong className="text-black">Address:</strong> City College
                  of Bayugan, Barangay 4, Bayugan City, Agusan del Sur,
                  Philippines
                </li>
                <li className="mb-4">
                  <strong className="text-black">Phone:</strong> +63 85 123 4567
                </li>
                <li className="mb-4">
                  <strong className="text-black">Email:</strong>{' '}
                  info@citycollegebayugan.edu.ph
                </li>
                <li>
                  <strong className="text-black">Website:</strong>{' '}
                  <a
                    href="https://www.citycollegebayugan.edu.ph"
                    className="text-blue-600 hover:underline"
                  >
                    www.citycollegebayugan.edu.ph
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Send Us a Message
              </h3>
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-4">Find Us</h2>
          <div className="relative w-full h-64">
            <Image
              src="/campus-map.png"
              alt="Campus Map"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
