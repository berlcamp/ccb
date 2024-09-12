import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: 'Bachelor of Science in Criminology',
      description:
        'Prepare for a career in law enforcement, criminal justice, and forensic science.',
      icon: <AcademicCapIcon className="w-10 h-10 text-blue-500" />
    },
    {
      id: 2,
      title: 'Bachelor of Science in Information Science',
      description:
        'Learn the latest in data management, information systems, and technology.',
      icon: <ComputerDesktopIcon className="w-10 h-10 text-green-500" />
    },
    {
      id: 3,
      title: 'Bachelor of Science in Tourism Management',
      description:
        'Develop skills in hospitality, travel management, and customer service.',
      icon: <GlobeAltIcon className="w-10 h-10 text-red-500" />
    },
    {
      id: 4,
      title: 'Bachelor of Science in Physical Education',
      description: 'Focus on sports science, coaching, and fitness management.',
      icon: <UserGroupIcon className="w-10 h-10 text-yellow-500" />
    }
  ]

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Blurry Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url("/slider1.png")` }}
      ></div>

      {/* Main Slide Image */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Image
          src="/slider1.png"
          alt="cover photo"
          layout="fill"
          objectFit="cover"
          priority // Ensures the image loads quickly
        />
        {/* Removed text overlay */}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-8 max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <div className="flex-shrink-0">{course.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-black flex items-center space-x-2">
                  <span>{course.title}</span>
                </h3>
                <p className="text-black">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
