import Image from "next/image";
import { useEffect, useState } from "react";

export default function Slider() {
  const slides = [
    { id: 1, image: "/slider1.png" },
    { id: 2, image: "/slider2.png" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Blurry Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      ></div>

      {/* Main Slide Image */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Image
          src={slides[currentSlide].image}
          alt={`Slide ${currentSlide + 1}`}
          layout="fill"
          objectFit="cover"
          priority // Ensures the image loads quickly
        />
        {/* Removed text overlay */}
      </div>
    </div>
  );
}
