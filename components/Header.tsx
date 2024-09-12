'use client'
import { Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  // Dropdown Links
  const dropdownLinks: Record<string, { name: string; href: string }[]> = {
    'About Us': [
      { name: 'Mission, Vision, Objectives', href: '/MissionVisionObjectives' },
      { name: 'Brief History', href: '/BriefHistory' },
      { name: 'Certification Awards', href: '/pages/certificates' },
      { name: 'College/School Hymn', href: '/CollegeHymn' },
      { name: 'Campus Map', href: '/CampusMap' },
      { name: 'Facilities', href: '/Facilities' },
      { name: 'Contact Us', href: '/ContactUs' },
      { name: 'Brochure', href: '/Brochure' }
    ],
    Administration: [
      { name: 'Board of Trustees', href: '/BoardOfTrustees' },
      { name: 'Executive Management', href: '/ExecutiveManagement' },
      { name: 'Academic Council', href: '/AcademicCouncil' },
      { name: 'Administrative Council', href: '/AdministrativeCouncil' }
    ],
    Academics: [
      { name: 'Academic Offerings', href: '/AcademicOfferings' },
      { name: 'School and Departments', href: '/SchoolsAndDepartments' },
      { name: 'BCC Students', href: '/BCCStudents' }
    ],
    Admission: [
      { name: 'Admission Requirements', href: '/AdmissionRequirements' },
      { name: 'Admission Policy', href: '/AdmissionPolicy' },
      { name: 'Enrollment Guide', href: '/EnrollmentGuide' },
      { name: 'Scholarships', href: '/Scholarships' },
      { name: 'Application for Admission', href: '/ApplicationForAdmission' },
      { name: 'Pre-Registration', href: '/PreRegistration' }
    ],
    Research: [
      { name: 'Journal', href: '/Journal' },
      { name: 'BCC Research Center', href: '/BCCResearchCenter' }
    ],
    Services: [
      { name: 'Online Grade Inquiry', href: '/OnlineGradeInquiry' },
      { name: 'School/College Library', href: '/SchoolLibrary' },
      { name: 'Guidance and Counseling', href: '/GuidanceAndCounseling' },
      { name: 'Student Affairs', href: '/StudentAffairs' },
      {
        name: 'Community Extension Program',
        href: '/CommunityExtensionProgram'
      }
    ],
    Updates: [
      { name: 'News', href: '/pages/news' },
      { name: 'Photo Gallery', href: '/PhotoGallery' },
      { name: 'Job Opportunity', href: '/JobOpportunity' }
    ]
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-black bg-opacity-50 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="text-2xl font-bold text-white ml-2">
                City College of Bayugan
              </div>
            </div>
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Main Menu for Desktop */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          {Object.keys(dropdownLinks).map((menuItem) => (
            <div
              key={menuItem}
              onMouseEnter={() => setHoveredMenu(menuItem)}
              onMouseLeave={() => setHoveredMenu(null)}
              className="relative"
            >
              <button className="inline-flex justify-center w-full text-white hover:text-blue-500 transition duration-300">
                {menuItem}
              </button>

              {/* Submenu on Hover */}
              <Transition
                show={hoveredMenu === menuItem}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {dropdownLinks[menuItem].map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </Transition>
            </div>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden fixed inset-0 bg-[#f0f2f5] z-40 h-screen overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-4 right-4 text-white bg-gray-800 rounded-full"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="mt-20 space-y-4 px-6 bg-white">
            {Object.keys(dropdownLinks).map((menuItem) => (
              <div key={menuItem} className="text-black text-lg">
                <p className="font-bold">{menuItem}</p>
                {dropdownLinks[menuItem].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-sm text-black hover:text-blue-500 transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </header>
  )
}
