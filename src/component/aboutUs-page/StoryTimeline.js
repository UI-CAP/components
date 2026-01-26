"use client";

import React, { useState, useMemo } from "react";
import data from "@/data/aboutUs-page/data.json";

const StoryTimeline = () => {
    const storyData = data.storyTimeline || {};
    const { events = [] } = storyData;

    // Default to the middle event or the first one
    const [activeId, setActiveId] = useState(events[2]?.id || events[0]?.id);

    const activeIndex = useMemo(() =>
        events.findIndex((e) => e.id === activeId),
        [events, activeId]);

    const activeEvent = events[activeIndex] || {};
    
    // Get previous and next events
    const prevIndex = activeIndex > 0 ? activeIndex - 1 : events.length - 1;
    const nextIndex = activeIndex < events.length - 1 ? activeIndex + 1 : 0;
    const prevEvent = events[prevIndex] || {};
    const nextEvent = events[nextIndex] || {};

    // GEOMETRY CONSTANTS
    // Large circle so arc looks shallow. Adjusted radii so years sit inside the visible arc.
    const CIRCLE_SIZE = 1200;
    const RADIUS = 420; // base radius for the arc
    const YEAR_RADIUS = RADIUS - 60; // where years are positioned (inside the thick arc)
    const DOT_RADIUS = RADIUS + 160; // where the clickable white dots sit (further below the arc)
    const DOT_X_OFFSET = 80; // extra px to shift dots to the right
    const DOT_Y_OFFSET = 24; // extra px to push dots downward so they don't overlap the arc
    const SPACING_ANGLE = 20; // degrees between each year (increased for more gap between dots)
    const LEFT_OFFSET = 40; // px to shift markers to the right — adjust as needed
    // Simple single constant to control the violet line horizontal position.
    // Change `LINE_LEFT` to move the line left/right quickly.
    // Add an extra numeric offset here (change +120) for quick adjustments.
    const LINE_LEFT = (CIRCLE_SIZE / 2) + RADIUS + LEFT_OFFSET + 90;

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
                        <div className="relative pl-12 md:pl-24 z-30 py-10 pointer-events-none">
                            <h2 className="font-bold leading-[0.9] text-left">
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
                                className="absolute inset-0 rounded-full border-[100px] border-[#121212]"
                                style={{ clipPath: 'inset(0 0 0 50%)' }} // Only show the right half
                            />

                            {/* Rotating Year and Dot Container */}
                            <div
                                className="relative w-full h-full transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
                                style={{ transform: `rotate(${activeIndex * -SPACING_ANGLE}deg)` }}
                            >
                                {events.map((event, index) => {
                                    // Show 5 years: 2 before, current, 2 after
                                    const prev2Index = activeIndex > 1 ? activeIndex - 2 : (activeIndex === 1 ? events.length - 1 : events.length - 2);
                                    const prevIndex = activeIndex > 0 ? activeIndex - 1 : events.length - 1;
                                    const nextIndex = activeIndex < events.length - 1 ? activeIndex + 1 : 0;
                                    const next2Index = activeIndex < events.length - 2 ? activeIndex + 2 : (activeIndex === events.length - 2 ? 0 : 1);
                                    
                                    const isYearVisible = index === prev2Index || index === prevIndex || index === activeIndex || index === nextIndex || index === next2Index;
                                    
                                    if (!isYearVisible) return null;
                                    
                                    // Show only 3 dots: previous, current, next
                                    const isDotVisible = index === prevIndex || index === activeIndex || index === nextIndex;

                                    // Calculate position (0 degrees is East/Right side)
                                    const angleDeg = (index * SPACING_ANGLE);
                                    const angleRad = (angleDeg * Math.PI) / 180;

                                    // x, y relative to the center of the CIRCLE_SIZE box (place years inside the arc)
                                    const x = (CIRCLE_SIZE / 2) + YEAR_RADIUS * Math.cos(angleRad) + LEFT_OFFSET;
                                    const y = (CIRCLE_SIZE / 2) + YEAR_RADIUS * Math.sin(angleRad);

                                    // Dot positions (further out)
                                    const dx = (CIRCLE_SIZE / 2) + DOT_RADIUS * Math.cos(angleRad);
                                    const dy = (CIRCLE_SIZE / 2) + DOT_RADIUS * Math.sin(angleRad);
                                    const isActive = activeId === event.id;

                                    return (
                                        <React.Fragment key={event.id}>
                                            {/* Year Label */}
                                            <div
                                                onClick={() => setActiveId(event.id)}
                                                className={`absolute cursor-pointer transition-all duration-500 text-2xl font-medium tracking-tighter
                                                    ${activeId === event.id ? "text-white scale-110" : "text-white/20 hover:text-white/40"}`}
                                                style={{
                                                    left: `${x}px`,
                                                    top: `${y}px`,
                                                    // counter-rotate so text stays upright as the wheel turns
                                                    transform: `translate(-50%, -50%) rotate(${activeIndex * SPACING_ANGLE}deg)`
                                                }}
                                            >
                                                {event.year}
                                            </div>
                                            
                                            {/* Dot - Only show for previous, current, next */}
                                            {isDotVisible && (
                                                <button
                                                    onClick={() => setActiveId(event.id)}
                                                    className={`absolute z-40 transition-all duration-300 ${isActive ? 'w-5 h-5 bg-violet-600 shadow-lg shadow-violet-500/50' : 'w-3 h-3 bg-white/60 hover:bg-white'}`}
                                                    style={{ left: `${dx + DOT_X_OFFSET}px`, top: `${dy + DOT_Y_OFFSET}px`, transform: `translate(-50%, -50%) rotate(${activeIndex * SPACING_ANGLE}deg)` }}
                                                    aria-label={`Select ${event.year}`}
                                                />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            {/* Fixed Violet Line at Center (always horizontal) */}
                            <div
                                className="absolute z-50 pointer-events-none"
                                style={{ 
                                    left: `${LINE_LEFT}px`, 
                                    top: `${CIRCLE_SIZE / 2}px`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className="w-26 h-[3px] -mt-6 bg-violet-600/80 rounded" />
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SECTION: Content */}
                    <div className="px-8 lg:pr-24 h-full flex flex-col justify-center lg:pl-20 z-20">
                        <div className="relative max-w-md space-y-8">
                            
                            {/* Previous Description - Top with low opacity */}
                            <div className="opacity-30 transition-opacity duration-500">
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                                    {prevEvent.description}
                                </p>
                            </div>
                            
                            {/* Current/Active Description - Full opacity */}
                            <div className="transition-all duration-700" key={activeId}>
                                <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                                    {activeEvent.description}
                                </p>
                            </div>
                            
                            {/* Next Description - Bottom with low opacity */}
                            <div className="opacity-30 transition-opacity duration-500">
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                                    {nextEvent.description}
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