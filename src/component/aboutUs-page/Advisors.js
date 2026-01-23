"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from "@/data/aboutUs-page/data.json";

const Advisors = () => {
    const advisorsData = data.advisors || {};
    const { title, subtitle, members = [] } = advisorsData;

    const [cardWidthVw, setCardWidthVw] = useState(null);
    const [cardHeightVh, setCardHeightVh] = useState(null);

    useEffect(() => {
        const update = () => {
            if (typeof window === 'undefined') return;
            const vw = (400 / window.innerWidth) * 100; // 400px target -> vw
            const vh = (108 / window.innerHeight) * 100; // 108px target -> vh
            const widthValue = window.innerWidth < 640 ? 100 : vw; // mobile: full width
            setCardWidthVw(widthValue);
            setCardHeightVh(vh);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    if (members.length === 0) return null;

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
                    {members.map((advisor) => (
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
                                        className="inline-flex"
                                        aria-label="LinkedIn"
                                    >
                                        <img
                                            src="/assets/icon/Frame.png"
                                            alt="LinkedIn"
                                            className="w-6 h-6"
                                        />
                                    </a>
                                )}
</div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Advisors;
