import React from "react";
import Image from "next/image";
import { BsArrowUpRight } from 'react-icons/bs';
import { BsDownload } from 'react-icons/bs';
import data from "@/data/home-page/data.json";

// Utility to check if asset is video
const isVideo = (src) => src && src.match(/\.mp4$/);

/**
 * AgenticCtaSection - Dynamic, responsive, and reusable CTA section
 * Data is fetched from data.json
 *
 * @returns {JSX.Element}
 */
const AgenticCtaSection = () => {
  const ctaData = data.agenticCta;
  if (!ctaData) return null;

  // Main background asset (image/video) or fallback color
  const bgImage = ctaData.image || ctaData.video || null;
  const bgType = isVideo(bgImage) ? "video" : bgImage ? "image" : "color";

  // Right section asset (image/video)
  const secondaryImage = ctaData.secondaryImage || ctaData.secondaryVideo || null;
  const secondaryType = isVideo(secondaryImage) ? "video" : secondaryImage ? "image" : "none";

  return (
    <section className={`relative rounded-[40px] overflow-hidden h-[49.2vh] min-h-[49.2vh] my-10 mx-auto max-w-[1800px] w-[95%] flex items-center justify-center shadow-lg ${bgType === "color" ? "bg-[#252A41]" : ""}`}>
      {/* Main BG */}
      {bgType === "video" && (
        <video
          src={bgImage}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {bgType === "image" && (
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex flex-row items-center justify-between px-[4vw] py-12 gap-8">
        {/* Left Section */}
        <div className="flex-1 min-w-[260px] max-w-[600px] text-white flex flex-col items-start justify-center gap-6">
          <h2
            className="text-[2.4rem] font-bold leading-tight m-0 text-white tracking-tight"
            dangerouslySetInnerHTML={{ __html: ctaData.title }}
          />
          <p className="text-[1.1rem] font-normal m-0 text-[#E0E3F1]">
            {ctaData.description}
          </p>
          <div className="flex gap-6 mt-6">
            {ctaData.cta?.map((btn, i) => (
              <button
                key={i}
                href={btn.link || "#"}
                className={`flex items-center gap-3 px-9 py-[18px] rounded-full transition-all duration-200 no-underline cursor-pointer
                  ${btn.variant === "primary" 
                    ? "bg-white text-[#252A41] border-2 border-transparent shadow-sm hover:bg-[#252A41] hover:text-white hover:border-white" 
                    : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#252A41]"
                  }`}
              >
                {btn.title}
                {btn.title.includes("Demo") ? <BsArrowUpRight size={16} /> : <BsDownload size={16} />}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section (Image/Video) */}
        <div className="flex-1 min-w-[260px] flex items-center justify-center relative h-80">
          {secondaryType === "video" && (
            <video
              src={secondaryImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain rounded-3xl bg-[#181B2B]"
            />
          )}
          {secondaryType === "image" && (
            <Image
              src={secondaryImage}
              alt="Visual"
              width={400}
              height={320}
              className="object-contain rounded-3xl bg-[#181B2B]"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AgenticCtaSection;
