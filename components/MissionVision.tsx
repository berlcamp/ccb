// components/MissionVision.js
import { LightBulbIcon, StarIcon } from "@heroicons/react/24/outline";

export default function MissionVision() {
  return (
    <section className="py-16 bg-[#f0f2f5] border-t border-gray-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Column */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <LightBulbIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
                <span>Our Mission</span>
              </h3>
              <p className="text-gray-700">
                Our mission is to provide high-quality education and training to
                students, equipping them with the skills and knowledge needed to
                excel in their chosen fields.
              </p>
            </div>
          </div>

          {/* Vision Column */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
            <StarIcon className="w-10 h-10 text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
                <span>Our Vision</span>
              </h3>
              <p className="text-gray-700">
                We envision a future where our graduates lead with innovation,
                integrity, and a commitment to making a positive impact in their
                communities and professions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
