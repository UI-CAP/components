"use client";

import React, { useState } from "react";
import data from "@/data/aboutUs-page/data.json";

const StoryTimeline = () => {
    const storyData = data.storyTimeline;
    if (!storyData) return null;

    const { title, events } = storyData;

    // Set default active event (2003)
    const [activeEvent, setActiveEvent] = useState(events[1] || events[0]);

    return (
        <section className="w-full bg-white py-16 px-[7%] md:py-20 lg:py-24">
            <div>
                <div className="bg-black rounded-[3rem] overflow-hidden relative min-h-[600px] flex items-center">
                    {/* Topographic Background Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            {/* Organic contour lines */}
                            <path
                                d="M0 100 Q 200 150 400 100 T 800 100"
                                fill="none"
                                stroke="#333"
                                strokeWidth="1"
                            />
                            <path
                                d="M0 200 Q 250 250 500 200 T 1000 200"
                                fill="none"
                                stroke="#333"
                                strokeWidth="1"
                            />
                            <path
                                d="M0 400 Q 300 350 600 400 T 1200 400"
                                fill="none"
                                stroke="#333"
                                strokeWidth="1"
                            />
                            <path
                                d="M-100 0 Q 100 100 300 0 T 700 0"
                                fill="none"
                                stroke="#333"
                                strokeWidth="1"
                            />
                            <path
                                d="M800 600 Q 600 500 400 600 T 0 600"
                                fill="none"
                                stroke="#333"
                                strokeWidth="1"
                            />
                            <circle cx="80%" cy="20%" r="300" stroke="#222" strokeWidth="1" fill="none" />
                            <circle cx="20%" cy="80%" r="400" stroke="#222" strokeWidth="1" fill="none" />
                        </svg>
                    </div>

                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                        {/* Left Side - Typography + Arc */}
                        <div className="relative h-[500px] lg:h-[600px] flex items-center overflow-visible">

                            {/* Typography "Our Story" */}
                            <div className="absolute left-8 md:left-16 z-10 flex flex-col justify-center h-full pointer-events-none">
                                <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                                    Our
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-800">
                                        Story
                                    </span>
                                </h2>
                            </div>

                            {/* The Thick Arc Timeline */}
                            {/* Positioned absolutely to the right of this column, creating the curve */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] hidden lg:block">
                                <div className="relative w-full h-full">
                                    {/* The Arc Graphic */}
                                    <svg viewBox="0 0 800 800" className="w-full h-full rotate-180">
                                        <defs>
                                            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#222" />
                                                <stop offset="100%" stopColor="#1a1a1a" />
                                            </linearGradient>
                                        </defs>
                                        {/* Thick Arc Track */}
                                        <circle
                                            cx="400"
                                            cy="400"
                                            r="320"
                                            fill="none"
                                            stroke="#1A1A1A"
                                            strokeWidth="120"
                                            strokeLinecap="round"
                                        />
                                        {/* Inner thin line for detail */}
                                        <circle
                                            cx="400"
                                            cy="400"
                                            r="320"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="1"
                                        />
                                    </svg>

                                    {/* Interactive Years placed along the arc */}
                                    {/* We map years to specific angles. roughly -45 to +45 degrees from the left center? 
                      Since we rotated 180, center left is now center right relative to the circle. 
                      Let's use absolute positioning relative to the container for simplicity.
                  */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        {/* We manually position items based on known approximate arc positions for visual perfection matching the design */}

                                        {/* Center Item (Active) */}
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-full h-full flex items-center justify-start pl-[50px] pointer-events-auto">
                                            {/* Connector Line for Active Item */}
                                            <div className="absolute left-[80px] top-1/2 w-[135px] h-[1px] bg-purple-600 z-20"></div>
                                            {/* Center Square Dot */}
                                            <div className="absolute left-[215px] top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 z-20 shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>
                                        </div>

                                        {/* Year Labels - positioned using trigonometry or fixed percentages relative to the 800x800 box */}
                                        {/* 2003 is roughly at 180 degrees (left middle) of the circle circle center is at 400,400. r=320. x = 400 + 320*cos(pi) = 80 */}

                                        {/* 
                         We need to distribute events. 
                         Let's assume the arc visible covers about 60-80 degrees vertically.
                       */}
                                        {events.map((event, index) => {
                                            // Find index of active event to calculate relative offset
                                            const activeIndex = events.findIndex(e => e.id === activeEvent.id);
                                            const offset = index - activeIndex;

                                            // Spacing factor (degrees)
                                            const spacing = 18;
                                            const angleDeg = 180 + (offset * spacing);
                                            const fsAngle = (angleDeg * Math.PI) / 180;

                                            // Radius for text placement (slightly inside the thick stroke)
                                            const rText = 320;

                                            // Parent is 800x800. Center 400,400.
                                            const x = 400 + rText * Math.cos(fsAngle);
                                            const y = 400 + rText * Math.sin(fsAngle);

                                            const isVisible = angleDeg > 130 && angleDeg < 230;
                                            if (!isVisible) return null;

                                            return (
                                                <div
                                                    key={event.id}
                                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 pointer-events-auto hover:text-white
                                    ${activeEvent.id === event.id ? 'text-white text-xl font-bold' : 'text-gray-600 text-lg'}
                                `}
                                                    style={{
                                                        left: `${x}px`,
                                                        top: `${y}px`,
                                                    }}
                                                    onClick={() => setActiveEvent(event)}
                                                >
                                                    {event.year}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex flex-col justify-center relative z-10 px-8 py-12 lg:pl-16 lg:pr-24">
                            {/* Mobile Timeline (Horizontal) */}
                            <div className="flex overflow-x-auto gap-4 mb-8 lg:hidden pb-4 scrollbar-hide">
                                {events.map((event) => (
                                    <button
                                        key={event.id}
                                        onClick={() => setActiveEvent(event)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm transition-all duration-300 ${activeEvent.id === event.id
                                                ? 'bg-purple-600 border-purple-600 text-white'
                                                : 'bg-transparent border-gray-700 text-gray-400'
                                            }`}
                                    >
                                        {event.year}
                                    </button>
                                ))}
                            </div>

                            {/* Content Text */}
                            <div className="lg:max-w-xl">
                                {/* Mobile Header Active Year */}
                                <div className="flex items-center gap-3 mb-6 lg:mb-4 lg:hidden">
                                    <div className="w-2 h-2 bg-purple-600"></div>
                                    <span className="text-purple-500 font-bold">{activeEvent.year}</span>
                                </div>

                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                                    {activeEvent.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoryTimeline;
