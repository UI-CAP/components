"use client";

import { useState } from "react";
import Image from "next/image";
import data from "@/data/home-page/data.json";

export default function BannerSection({
  name = data.banner.title,
  subtitle = data.banner.subtitle,
  profileImage,
  bannerImages
}) {
  // Use centralized default images if no props provided
  const defaultImages = data.banner.images;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine which images to use
  const images = bannerImages && bannerImages.length > 0
    ? bannerImages
    : profileImage
      ? [profileImage]
      : defaultImages;

  // Removed automatic image/video rotation. Now only switches on preview click.

  const isVideo = (src) => src?.toString().endsWith(".mp4");

  return (
    <div
      className="w-full min-h-[1080px] h-screen relative overflow-hidden flex flex-col"
      style={{ backgroundColor: '#1A1F37F2' }}
    >
      {/* 2. Global Dynamic Background Video/Image */}
      {isVideo(images[currentImageIndex]) ? (
        <video
          key={images[currentImageIndex]} // Force re-render on source change
          className="absolute inset-0 w-full h-full object-contain z-0"
          src={images[currentImageIndex]}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={images[currentImageIndex]}
          alt={name || "Banner Background"}
          fill
          className="absolute inset-0 w-full h-full object-contain z-0"
          priority
          key={images[currentImageIndex]}
        />
      )}

      {/* Gradient Shadows - Left (70%) and Right (Lower Opacity) */}
      <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black via-black/60 to-transparent z-[5] pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/40 to-transparent z-[5] pointer-events-none"></div>
      
      {/* Bottom to Top Gradient Shadow */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/90 to-transparent z-[5] pointer-events-none"></div>

      <div className="absolute inset-0 z-0"></div>

      {/* 3. Main Layout Container - Full Width Overlay */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[3%] lg:px-[7%]">

        {/* Text Content */}
        <div className="w-full lg:max-w-3xl z-10">
          <h1 className="text-white mb-6">
            Let&rsquo;s AI Your <br /> Business.
          </h1>
          <p className="text-white my-6 max-w-xl">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="group flex items-center gap-2 p-6 rounded-full cursor-pointer transition-all duration-300 bg-white text-black border border-transparent button group-hover:bg-[#F22E62] group-hover:text-white"
            >
              Start Your AI Journey Today
              <span className="flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-45">
                <Image src="/assets/icon/grayBtn.png" alt="arrow" width={36} height={36} />
              </span>
            </button>
            <button
              className="group flex items-center gap-2 p-6 rounded-full transition-all duration-300 border border-white text-white hover:bg-white hover:text-black transition-colors button bg-transparent group-hover:bg-[#F22E62] group-hover:text-white"
            >
              Talk to Us
              <span className="bg-[#F22E62] text-white rounded-full p-1 transition-colors transform transition-transform duration-300 group-hover:rotate-45 flex items-center justify-center">
          <Image src="/assets/icon/redBtn.png" alt="arrow" width={32} height={32} /> 
               </span>
            </button>
          </div>
        </div>

        {/* Previews - Positioned at bottom right on large screens, centered on small */}
        {images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-10 w-full left-4 md:left-2/3 flex gap-2 md:gap-4 z-50 justify-start md:justify-start">
            {images.map((imgSrc, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-16 h-8 md:w-24 md:h-12 overflow-hidden cursor-pointer transition-all p-0.5 duration-300 border-2 ${index === currentImageIndex
                  ? "border-white scale-110 shadow-lg"
                  : "opacity-80 border-none hover:opacity-100 hover:scale-105"
                  }`}
              >
                {isVideo(imgSrc) ? (
                  <video
                    src={imgSrc}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt={`Banner preview ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trusted Partners Section */}
      <section
        className="relative z-20 py-14 rounded-t-[40px] md:rounded-t-[80px] bg-[#30354FB2] lg:rounded-t-[90px] overflow-hidden backdrop-blur-[50px]"
      >
        <div className="max-w-7xl mx-auto mb-8">
          <h4 className="text-gray-400 text-center font-semibold tracking-[0.2em] uppercase">
            {data.banner.partners.title}
          </h4>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Marquee Container */}
          <div className="flex animate-marquee whitespace-nowrap min-w-max">
            {[...data.banner.partners.items, ...data.banner.partners.items].map((logo, index) => (
              <div
                key={index}
                className="relative w-28 h-8 md:w-36 md:h-12 mx-8 md:mx-12 lg:mx-16 flex-shrink-0 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain grayscale brightness-200 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Gradient Fades for Smooth Edges */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#30354F] to-transparent z-10 pointer-events-none opacity-50"></div>
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#30354F] to-transparent z-10 pointer-events-none opacity-50"></div>
        </div>
      </section>
    </div>
  );
}

