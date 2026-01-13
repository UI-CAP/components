"use client";

import React, { useState, useMemo } from "react";
import data from "@/data/aboutUs-page/data.json";

const StoryTimeline = () => {
    const storyData = data.storyTimeline || {};
    const { title, events = [] } = storyData;

    // Default to the middle event or the first one
    const [activeId, setActiveId] = useState(events[2]?.id || events[0]?.id);

    const activeIndex = useMemo(() =>
        events.findIndex((e) => e.id === activeId),
        [events, activeId]);

    const activeEvent = events[activeIndex] || {};

    // GEOMETRY CONSTANTS
    // We make the circle very large so the curve looks shallow like the screenshot
    const CIRCLE_SIZE = 1200;
    const RADIUS = 540; // The radius where the years sit
    const SPACING_ANGLE = 15; // How many degrees between each year

    if (!events.length) return null;

    return (
        <section className="w-full bg-white py-16 px-[7%] md:py-20 lg:py-24">
            <div className="bg-[#080808] rounded-[3rem] overflow-hidden relative min-h-[650px] flex items-center border border-white/5 shadow-2xl">

                {/* Background Topographic Style */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                        <path d="M0,100 Q300,50 600,150 T1200,100" stroke="#333" fill="none" strokeWidth="0.5" />
                        <path d="M0,200 Q400,150 700,250 T1300,200" stroke="#333" fill="none" strokeWidth="0.5" />
                        <path d="M0,300 Q200,250 500,350 T1100,300" stroke="#333" fill="none" strokeWidth="0.5" />
                    </svg>
                </div>

                <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center z-10">

                    {/* LEFT SECTION: Arc and Title */}
                    <div className="relative h-[650px] flex items-center overflow-visible">

                        {/* "Our Story" Text */}
                        <div className="relative pl-12 md:pl-24 z-30 pointer-events-none">
                            <h2 className="font-bold leading-[0.9]">
                                <div className="text-[108px] text-white block">Our</div>
                                <div className="text-[108px] text-white block">Story</div>
                            </h2>
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                        </div>

                        {/* THE WHEEL SYSTEM (Positioned far left) */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{
                                width: `${CIRCLE_SIZE}px`,
                                height: `${CIRCLE_SIZE}px`,
                                left: `-${CIRCLE_SIZE * 0.45}px` // Pushes center off-screen to the left
                            }}
                        >
                            {/* The Thick Dark Arc Background */}
                            <div
                                className="absolute inset-0 rounded-full border-[140px] border-[#121212]"
                                style={{ clipPath: 'inset(0 0 0 50%)' }} // Only show the right half
                            />

                            {/* Rotating Year Container */}
                            <div
                                className="relative w-full h-full transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
                                style={{ transform: `rotate(${activeIndex * -SPACING_ANGLE}deg)` }}
                            >
                                {events.map((event, index) => {
                                    // Calculate position (0 degrees is East/Right side)
                                    const angleDeg = (index * SPACING_ANGLE);
                                    const angleRad = (angleDeg * Math.PI) / 180;

                                    // x, y relative to the center of the CIRCLE_SIZE box
                                    const x = (CIRCLE_SIZE / 2) + RADIUS * Math.cos(angleRad);
                                    const y = (CIRCLE_SIZE / 2) + RADIUS * Math.sin(angleRad);

                                    return (
                                        <div
                                            key={event.id}
                                            onClick={() => setActiveId(event.id)}
                                            className={`absolute -translate-y-1/2 cursor-pointer transition-all duration-500 text-2xl font-medium tracking-tighter
                                                ${activeId === event.id ? "text-white scale-110" : "text-white/20 hover:text-white/40"}`}
                                            style={{
                                                left: `${x}px`,
                                                top: `${y}px`,
                                                // Keep years readable while rotating
                                                transform: `translateY(-50%) rotate(${activeIndex * SPACING_ANGLE}deg)`
                                            }}
                                        >
                                            {event.year}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Violet Marker & Line (Fixed at the center-right of the arc) */}
                            <div className="absolute top-1/2 -translate-y-1/2 z-40 pointer-events-none"
                                style={{ left: `${(CIRCLE_SIZE / 2) + RADIUS - 40}px` }}>
                                <div className="flex items-center">
                                    <div className="w-16 h-[2px] bg-purple-600/50" />
                                    <div className="w-4 h-4 bg-purple-600 rotate-45 shadow-[0_0_20px_#9333ea] ml-4" />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SECTION: Content */}
                    <div className="px-8 lg:pr-24 lg:pl-20 z-20">
                        <div className="max-w-md" key={activeId}>
                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {activeEvent.description}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StoryTimeline;