"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from '@/data/industry-page/data.json';

const SolutionSection = () => {
    const { solution } = data;
    const [activeTab, setActiveTab] = useState(4); // Default to item 4 (Generative AI)

    const activeSolution = solution.solutions.find(s => s.id === activeTab);

    // compute vh equivalent for 707px so image height equals 707px visually
    const [imgVh, setImgVh] = useState(0);

    useEffect(() => {
        const update = () => {
            const vhValue = (707 / window.innerHeight) * 100;
            setImgVh(vhValue);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return (
        <section className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[3%] lg:px-[6%] bg-white">
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_500px] gap-4 items-start">
                    
                    {/* Left Side - Solution List */}
                    <div className="flex h-full rounded-3xl pb-8 w-full flex-col">
                        <h2 className="text-black flex items-start font-bold mb-4">
                            {solution.title}
                        </h2>
                        <p className="text-gray-700 mb-8 md:mb-12 leading-relaxed">
                            {solution.subtitle}
                        </p>

                        {/* Solution Tabs */}
                        <div className="flex justify-end mt-[15%] flex-col gap-6">
                            {solution.solutions.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`text-left flex items-start cursor-pointer border-b border-gray-300 py-2 gap-3 transition-all duration-200 ${
                                        activeTab === item.id
                                            ? 'text-[#F22E62] font-medium'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <p className="font-medium">{item.number}</p>
                                    <p className="leading-relaxed">{item.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center - Image */}
                    <div className="w-full flex justify-center">
                        <div
                            className="relative w-full max-w-[500px] rounded-3xl overflow-hidden"
                            style={{ height: imgVh ? `${imgVh}vh` : undefined }}
                        >
                            <Image
                                src={activeSolution?.image || solution.image}
                                alt={activeSolution?.imageAlt || solution.imageAlt}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full h-full p-8 rounded-3xl bg-[#F7F7FF]">
                        <h5 className="text-black font-bold mb-6">
                            {activeSolution?.title}
                        </h5>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {activeSolution?.description}
                        </p>

                        {/* Details List */}
                        {activeSolution?.details && activeSolution.details.length > 0 && (
                            <ul className="list-none p-0 m-0 flex flex-col gap-5 mb-8">
                                {activeSolution.details.map((detail, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-600 leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[#F22E62] before:font-bold"
                                    >
                                        {detail.heading && (
                                            <span className="font-semibold text-gray-800">
                                                {detail.heading}
                                            </span>
                                        )}{' '}
                                        {detail.text && (
                                            <span className="font-normal">
                                                {detail.text}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Read More Link */}
                        <a
                            href="#"
                            className="inline-block text-black font-semibold underline hover:text-[#F22E62] transition-colors"
                        >
                            <span>Read More</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
