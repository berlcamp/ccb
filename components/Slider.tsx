import Image from 'next/image'
import Courses from './Courses'

export default function Slider() {
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
      <Courses />
    </div>
  )
}
