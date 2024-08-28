export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-black bg-opacity-20 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold text-white">
          City College of Bayugan
        </div>

        {/* Main Menu */}
        <ul className="flex space-x-6">
          {[
            "About Us",
            "Administration",
            "Academics",
            "Admission",
            "Research",
            "Services",
            "Updates",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
