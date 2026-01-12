"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from '@/data/industry-page/data.json';

const IndustryRecognition = () => {
  const { recognition } = data;
  const [selectedYear, setSelectedYear] = useState(recognition.awards[0].year);

  const selectedAward = recognition.awards.find(award => award.year === selectedYear);
  const years = recognition.awards.map(award => award.year);
  const currentIndex = years.indexOf(selectedYear);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1]);
    }
  };

  // Generate timeline years
  const timelineYears = [];
  for (let year = recognition.timelineStart; year <= recognition.timelineEnd; year++) {
    timelineYears.push(year);
  }

  const [sectionVh, setSectionVh] = useState(0);

  useEffect(() => {
    const update = () => {
      const vhValue = (760 / window.innerHeight) * 100;
      setSectionVh(vhValue);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const background = recognition.background || data.background;

  return (
    <section
      className="w-full px-[2%] md:px-[4%] lg:px-[7%] relative overflow-hidden"
      style={{ height: sectionVh ? `${sectionVh}vh` : undefined }}
    >
      {/* Background layer (image or video) */}
      {background && (
        <div className="absolute bg-gray-100 inset-0 z-0 pointer-events-none">
          {background.type === 'video' ? (
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
              <Image src={background.src} alt={background.alt || ''} fill className="object-cover" priority />
            </div>
          )}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="font-extrabold text-black mb-2 leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            {recognition.title}
          </h2>
          <p
            className="text-gray-500 leading-relaxed"
            style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}
          >
            {recognition.subtitle}
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {selectedAward?.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3
                className="font-semibold text-black mb-4"
                style={{ fontSize: 'clamp(16px, 1.8vw, 20px)' }}
              >
                {item.title}
              </h3>
              {item.description && (
                <p
                  className="text-gray-500 leading-relaxed"
                  style={{ fontSize: 'clamp(13px, 1.4vw, 15px)' }}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        
        <div className="relative">
          {/* Timeline Line */}
          <div className="relative h-px bg-gray-300 mb-8">
            {/* Year markers */}
            {timelineYears.map((year, index) => {
              const isSelected = years.includes(year);
              const position = ((year - recognition.timelineStart) / (recognition.timelineEnd - recognition.timelineStart)) * 100;
              
              return (
                <div
                  key={year}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                >
                  {/* Tick mark */}
                  <div
                    className={`w-px ${isSelected ? 'h-3 bg-gray-600' : 'h-2 bg-gray-400'}`}
                  />
                  
                  {/* Year label */}
                  {index % 1 === 0 && (
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                      {year}
                    </span>
                  )}
                </div>
              );
            })}
            
            {/* Selected year indicator line (slightly below timeline) */}
            {years.includes(selectedYear) && (
              <div
                className="absolute w-1 h-6 bg-[#F22E62] rounded-full z-10"
                style={{
                  left: `${((selectedYear - recognition.timelineStart) / (recognition.timelineEnd - recognition.timelineStart)) * 100}%`,
                  top: 'calc(50% + 26px)',
                  transform: 'translateX(-50%)'
                }}
              />
            )}
          </div>

          {/* Year Navigation (stacked: dots above, chevrons + year pill) */}
          <div className="absolute left-0 right-0 flex flex-col items-center z-20" style={{ top: 'calc(50% - 40px)' }}>
            {/* Dots (represent active award items) */}
            <div className="flex items-center gap-2 mb-3">
              {(selectedAward?.items || []).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-[#3B4A8C]' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentIndex === 0
                    ? 'bg-white border border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'bg-[#0F1B4C] text-white hover:bg-[#13205f]'
                }`}
                aria-label="Previous year"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Year Display */}
              <div className="w-12 h-8 rounded-full bg-[#3B4A8C] flex items-center justify-center">
                <span className="text-white font-semibold" style={{ fontSize: '14px' }}>{selectedYear}</span>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentIndex === years.length - 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentIndex === years.length - 1
                    ? 'bg-white border border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'bg-[#0F1B4C] text-white hover:bg-[#13205f]'
                }`}
                aria-label="Next year"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Timeline Section */}
    </section>
  );
};

export default IndustryRecognition;
