"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/data/industry-page/data.json";

const IndustryRecognition = () => {
  const { recognition } = data;
  // full timeline years (used for navigation)
  const timelineYears = [];
  for (
    let year = recognition.timelineStart;
    year <= recognition.timelineEnd;
    year++
  ) {
    timelineYears.push(year);
  }
  const initialYear = recognition.awards.find((a) => a.year === 2019)?.year || recognition.awards[0].year;
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedAward, setDisplayedAward] = useState(
    recognition.awards.find((award) => award.year === initialYear)
  );

  const selectedAward = recognition.awards.find(
    (award) => award.year === selectedYear,
  );
  const awardYears = recognition.awards.map((award) => award.year);

  const handlePrevious = () => {
    const idx = timelineYears.indexOf(selectedYear);
    if (idx > 0) {
      setSelectedYear(timelineYears[idx - 1]);
    }
  };

  const handleNext = () => {
    const idx = timelineYears.indexOf(selectedYear);
    if (idx < timelineYears.length - 1) {
      setSelectedYear(timelineYears[idx + 1]);
    }
  };

  // position (percent) of the selected year along the timeline (0-100)
  const selectedPositionPercent = ((selectedYear - recognition.timelineStart) / (recognition.timelineEnd - recognition.timelineStart)) * 100;
  
  const [sectionVh, setSectionVh] = useState(0);

  useEffect(() => {
    const update = () => {
      const vhValue = (760 / window.innerHeight) * 100;
      setSectionVh(vhValue);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const background = recognition.background || data.background;

  // Handle year change animation
  useEffect(() => {
    if (selectedAward && selectedAward.year !== displayedAward?.year) {
      setIsAnimating(true);
      
      // After slide-out completes, update the displayed award
      const timer = setTimeout(() => {
        setDisplayedAward(selectedAward);
        // Small delay for slide-in
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [selectedYear, selectedAward, displayedAward]);

  return (
    <section
      className="w-full px-[2%] md:px-[4%] lg:px-[7%] relative overflow-hidden"
      style={{ height: sectionVh ? `${sectionVh}vh` : undefined }}
    >
      {/* Background layer (image or video) */}
      {background && (
        <div className="absolute bg-violet-50 inset-0 z-0 pointer-events-none">
          {background.type === "video" ? (
            <video
              src={background.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={background.src}
                alt={background.alt || ""}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      )}

      <div className="relative flex flex-col h-full justify-between z-10">
        {/* Header */}
        <div className="text-center mt-20">
          <h2
            className="font-extrabold text-black mb-6 leading-tight"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            {recognition.title}
          </h2>
          <p
            className="text-gray-500 leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
          >
            {recognition.subtitle}
          </p>
        </div>

        {/* Awards Cards Grid - horizontal scroll (no wrapping) */}
        <div>
          <div
            className="flex flex-row gap-6 overflow-x-auto items-stretch pb-4 hide-scrollbar"
            style={{ 
              WebkitOverflowScrolling: "touch", 
              msOverflowStyle: "none", 
              scrollbarWidth: "none",
              transform: isAnimating ? "translateX(100%)" : "translateX(0)",
              opacity: isAnimating ? 0 : 1,
              transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out"
            }}
          >
            {displayedAward?.items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ width: "381px", height: "210px", boxSizing: "border-box" }}
              >
                <h3
                  className="font-semibold text-black mb-4"
                  style={{ fontSize: "clamp(16px, 1.8vw, 20px)" }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className="text-gray-500 leading-relaxed overflow-hidden"
                    style={{ fontSize: "clamp(13px, 1.4vw, 15px)", maxHeight: "110px" }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
        </div>

        <div className="relative">
          {/* Dots (represent active award items) - at the very top */}
          <div className="flex items-center justify-center gap-2 pb-[8%]">
            {(selectedAward?.items || []).map((_, idx) => (
              <span
                key={idx}
                className={`inline-block transition-all duration-300 ${
                  idx === 0
                    ? "w-8 h-2 rounded-full bg-[#0F1B4C]"
                    : "w-2 h-2 rounded-full bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Year Navigation (prev/next + year pill) */}
          <div className="flex items-center justify-center gap-4 mb-20" />

          {/* Timeline Line (pinned to bottom of section) */}
          <div className="absolute left-0 right-0 bottom-0 bg-transparent h-20" style={{ transform: `translateX(${50 - selectedPositionPercent}%)`, transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          
            {/* Year markers above the line */}
            {timelineYears.map((year) => {
              const position =
                ((year - recognition.timelineStart) /
                  (recognition.timelineEnd - recognition.timelineStart)) *
                100;
              const hasAward = awardYears.includes(year);
              const isCenterYear = year === selectedYear;
              return (
                <div
                  key={year}
                  className="absolute"
                  style={{
                    left: `${position}%`,
                    bottom: "0",
                    transform: "translateX(-50%)",
                  }}
                >
                  {/* Year label (above the line) - show for all years */}
                  {isCenterYear ? (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-24">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handlePrevious}
                          disabled={timelineYears.indexOf(selectedYear) === 0}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer  transition-all ${
                            timelineYears.indexOf(selectedYear) === 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-300 text-[#0F1B4C] hover:bg-gray-50"
                          }`}
                          aria-label="Previous year"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 18L9 12L15 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        <div className="px-6 py-2 rounded-full bg-[#0F1B4C] flex items-center justify-center shadow-lg transform scale-110">
                          <span className="m-0 text-white font-bold">
                            {year}
                          </span>
                        </div>

                        <button
                          onClick={handleNext}
                          disabled={timelineYears.indexOf(selectedYear) === timelineYears.length - 1}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                            timelineYears.indexOf(selectedYear) === timelineYears.length - 1
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-300 text-[#0F1B4C] hover:bg-gray-50"
                          }`}
                          aria-label="Next year"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${hasAward ? "bottom-6 text-sm text-gray-600" : "bottom-6 text-xs text-gray-400"}`}
                    >
                      {year}
                    </span>
                  )}

                  {/* Tick mark above the line - uniform size; selected year is highlighted by label only */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${isCenterYear ? "w-px h-20 bg-[#0F1B4C]" : hasAward ? "w-px h-4 bg-gray-600" : "w-px h-2 bg-gray-400"}`}
                  />
                </div>
              );
            })}

            {/* Small repeating ticks for all years */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                bottom: "0",
                height: "8px",
                backgroundImage:
                  "repeating-linear-gradient(to right, #d1d5db 0 1px, transparent 1px 1.2%)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Timeline Section */}
    </section>
  );
};

export default IndustryRecognition;
