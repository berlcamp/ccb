import { Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Dropdown Links
  const dropdownLinks: Record<string, string[]> = {
    "About Us": [
      "Mission, Vision, Objectives",
      "Brief History",
      "Certification Awards",
      "College/School Hymn",
      "Campus Map",
      "Facilities",
      "Contact Us",
      "Brochure",
    ],
    Administration: [
      "Board of Trustees",
      "Executive Management",
      "Academic Council",
      "Administrative Council",
    ],
    Academics: ["Academic offerings", "School and departments", "BCC Students"],
    Admission: [
      "Admission requirements",
      "Admission policy",
      "Enrollment guide",
      "Scholarships",
      "Application for admission",
      "Pre-registration",
    ],
    Research: ["Journal", "BCC Research center"],
    Services: [
      "Online grace inquiry",
      "School/college library",
      "Guidance and counseling",
      "Student affairs",
      "Community extension program",
    ],
    Updates: ["News", "Photo gallery", "Job opportunity"],
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-black bg-opacity-20 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src="/logo.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="text-2xl font-bold text-white">
            City College of Bayugan
          </div>
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
                    <a
                      key={link}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {link}
                    </a>
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
        <div className="md:hidden fixed inset-0 bg-[#f0f2f5] z-40">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-black"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-end mt-20 space-y-4 px-6 bg-white">
            {Object.keys(dropdownLinks).map((menuItem) => (
              <div key={menuItem} className="text-black text-lg">
                <p className="font-bold">{menuItem}</p>
                {dropdownLinks[menuItem].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-black hover:text-blue-500 transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </header>
  );
}
