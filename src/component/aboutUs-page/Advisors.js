"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from "@/data/aboutUs-page/data.json";

const Advisors = () => {
    const advisorsData = data.advisors;
    const { title, subtitle, members } = advisorsData || {};

    if (!advisorsData) return null;

    return (
        <section className="w-full bg-white py-16 md:py-20 lg:py-24">
            <div className="px-[7%]">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-bold text-black mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Advisors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {members && (() => {
                        const [cardWidthVw, setCardWidthVw] = useState(null);
                        const [cardHeightVh, setCardHeightVh] = useState(null);

                        useEffect(() => {
                            const update = () => {
                                if (typeof window === 'undefined') return;
                                const vw = (400 / window.innerWidth) * 100; // 315px target -> vw
                                const vh = (108 / window.innerHeight) * 100; // 108px target -> vh
                                const widthValue = window.innerWidth < 640 ? 100 : vw; // mobile: full width
                                setCardWidthVw(widthValue);
                                setCardHeightVh(vh);
                            };
                            update();
                            window.addEventListener('resize', update);
                            return () => window.removeEventListener('resize', update);
                        }, []);

                        return members.map((advisor) => (
                            <div
                                key={advisor.id}
                                className="advisor-card flex items-start gap-3 p-4 rounded-2xl bg-[#F6F6F699] hover:shadow-md transition-shadow duration-300"
                                style={{
                                    width: cardWidthVw ? `${cardWidthVw}vw` : undefined,
                                    height: cardHeightVh ? `${cardHeightVh}vh` : undefined,
                                    minWidth: '320px'
                                }}
                            >
                            {/* Circular Profile Image */}
                            <div className="flex-shrink-0">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                                    <Image
                                        src={advisor.image}
                                        alt={advisor.name}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-black ">
                                    {advisor.name}
                                </p>
                                <span className="text-gray-600 leading-tight">
                                    {advisor.title}
                                </span>
<div>
                                {/* LinkedIn Icon */}
                                {advisor.linkedin && (
                                    <a
                                        href={advisor.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-6 h-6 rounded-lg bg-black items-center justify-center hover:bg-gray-800 transition-colors duration-300"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                                fill="white"
                                            />
                                        </svg>
                                    </a>
                                )}
</div>

                            </div>
                        </div>
                        ));
                    })()}
                </div>
            </div>
        </section>
    );
};

export default Advisors;
