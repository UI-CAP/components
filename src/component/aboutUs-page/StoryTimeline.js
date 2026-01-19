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

    // GEOMETRY CONSTANTS
    // Large circle so arc looks shallow. Adjusted radii so years sit inside the visible arc.
    const CIRCLE_SIZE = 1200;
    const RADIUS = 420; // base radius for the arc
    const YEAR_RADIUS = RADIUS - 60; // where years are positioned (inside the thick arc)
    const DOT_RADIUS = RADIUS + 80; // where the clickable white dots sit (below the arc)
    const SPACING_ANGLE = 15; // degrees between each year

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

                                    // x, y relative to the center of the CIRCLE_SIZE box (place years inside the arc)
                                    const x = (CIRCLE_SIZE / 2) + YEAR_RADIUS * Math.cos(angleRad);
                                    const y = (CIRCLE_SIZE / 2) + YEAR_RADIUS * Math.sin(angleRad);

                                    return (
                                        <div
                                            key={event.id}
                                            onClick={() => setActiveId(event.id)}
                                            className={`absolute cursor-pointer transition-all duration-500 text-2xl font-medium tracking-tighter -translate-x-1/2 -translate-y-1/2
                                                ${activeId === event.id ? "text-white scale-110" : "text-white/20 hover:text-white/40"}`}
                                            style={{
                                                left: `${x}px`,
                                                top: `${y}px`,
                                                // counter-rotate so text stays upright as the wheel turns
                                                transform: `rotate(${activeIndex * SPACING_ANGLE}deg)`
                                            }}
                                        >
                                            {event.year}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Clickable White Dots (below the arc) */}
                            {events.map((event, index) => {
                                const angleDeg = (index * SPACING_ANGLE);
                                const angleRad = (angleDeg * Math.PI) / 180;
                                const dx = (CIRCLE_SIZE / 2) + DOT_RADIUS * Math.cos(angleRad);
                                const dy = (CIRCLE_SIZE / 2) + DOT_RADIUS * Math.sin(angleRad);
                                const isActive = activeId === event.id;

                                return (
                                    <button
                                        key={`dot-${event.id}`}
                                        onClick={() => setActiveId(event.id)}
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-40 rounded-full transition-all duration-300 ${isActive ? 'w-5 h-5 bg-white shadow-lg' : 'w-3 h-3 bg-white/60 hover:bg-white'}`}
                                        style={{ left: `${dx}px`, top: `${dy}px` }}
                                        aria-label={`Select ${event.year}`}
                                    />
                                );
                            })}

                            {/* Violet Marker & Line at active year (on the arc) */}
                            {(() => {
                                const aDeg = activeIndex * SPACING_ANGLE;
                                const aRad = (aDeg * Math.PI) / 180;
                                const mx = (CIRCLE_SIZE / 2) + (RADIUS - 10) * Math.cos(aRad);
                                const my = (CIRCLE_SIZE / 2) + (RADIUS - 10) * Math.sin(aRad);
                                return (
                                    <div
                                        className="absolute z-50 pointer-events-none"
                                        style={{ left: `${mx}px`, top: `${my}px`, transform: 'translate(-50%,-50%)' }}
                                    >
                                        <div style={{ transform: `rotate(${aDeg}deg)` }} className="flex items-center -translate-y-1/2">
                                            <div className="w-10 h-[3px] bg-violet-600/80 rounded" />
                                            <div className="w-4 h-4 bg-violet-600 rounded-full ml-3 shadow-[0_0_14px_#7c3aed]" />
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Active white dot on the arc (on top) */}
                            {(() => {
                                const aDeg = activeIndex * SPACING_ANGLE;
                                const aRad = (aDeg * Math.PI) / 180;
                                const ax = (CIRCLE_SIZE / 2) + (YEAR_RADIUS) * Math.cos(aRad);
                                const ay = (CIRCLE_SIZE / 2) + (YEAR_RADIUS) * Math.sin(aRad);
                                return (
                                    <div className="absolute z-50 pointer-events-none" style={{ left: `${ax}px`, top: `${ay}px`, transform: 'translate(-50%,-50%)' }}>
                                        <div className="w-3 h-3 bg-white rounded-full shadow-md" />
                                    </div>
                                );
                            })()}

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