// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0 mb-6 md:mb-0">
            <a
              href="#privacy-policy"
              className="hover:text-blue-500 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#about-us"
              className="hover:text-blue-500 transition duration-300"
            >
              About Us
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} City College of Bayugan. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
