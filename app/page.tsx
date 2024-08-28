"use client";

import Courses from "@/components/Courses";
import Header from "@/components/Header";
import MissionVision from "@/components/MissionVision";
import News from "@/components/News";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div className="bg-[#f0f2f5]">
      {/* Main Menu */}
      <Header />
      {/* Slider */}
      <div className="relative">
        <Slider />

        {/* Courses Section */}
        <section className="absolute inset-0 flex items-center justify-center z-20 py-16">
          <Courses />
        </section>
      </div>
      {/* Mission/Vision Section */}
      <MissionVision />
      {/* News Section */}
      <section className="py-16 border-t border-gray-300">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-black">Latest News</h2>
          <News />
        </div>
      </section>
    </div>
  );
}
