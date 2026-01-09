"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import data from "@/data/data.json";

const SuccessStoriesSection = () => {
  const scrollContainerRef = useRef(null);

  const successStoriesData = data.successStories;
  if (!successStoriesData) return null;

  const { title, description, items, backgroundMedia } = successStoriesData;

  // Framer Motion removed: using simple CSS transitions instead
  const isVideo = (src) =>
    src?.toLowerCase().endsWith(".mp4") || src?.toLowerCase().endsWith(".webm");

  return (
    <section
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
      style={{ minHeight: "80.7vh" }}
    >
      {/* Background Media or Gradient Fallback */}
      {backgroundMedia ? (
        <>
          {isVideo(backgroundMedia) ? (
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={backgroundMedia}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={backgroundMedia}
              alt="Success Stories Background"
              fill
              className="absolute inset-0 w-full h-full object-cover z-0"
              priority
            />
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d3a] via-[#252850] to-[#1a1d3a] z-0"></div>
      )}

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl z-[2]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl z-[2]"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8 px-[7%]">
          <h2 className="text-white mb-4 md:mb-6">{title}</h2>
          <p className="text-gray-300 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Scrollable Stories Grid */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row flex-nowrap gap-6 md:gap-8 items-end overflow-x-auto scrollbar-hide px-[7%]"
        >
          {items.map((story) => (
            <div key={story.id} className="h-full flex-shrink-0 w-[32rem]">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryCard = ({ story }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative cursor-pointer flex flex-col h-full"
    >
      <a href={story.link} className="flex flex-col justify-end h-full">
        {/* Top Text Container */}
        <div className="relative overflow-hidden bg-transparent flex flex-col pb-6 transition-all duration-300">
          <span className="text-gray-400 mb-3 block">{story.subtitle}</span>
          <div className="flex items-end justify-between gap-3 border-b border-white py-2">
            <p className="text-white leading-tight flex-1">{story.title}</p>
            <ArrowUpRight className="text-[#F22E62] flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 w-5 h-5" />
          </div>
        </div>

        {/* Image Container - Slides down below text on hover */}
        <div
          className="overflow-hidden rounded-md transition-all duration-500 ease-out"
          style={{
            height: isHovered ? "240px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/assets/image/sucess.jpg"
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default SuccessStoriesSection;
