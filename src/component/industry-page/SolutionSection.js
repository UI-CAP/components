"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import data from '@/data/industry-page/data.json';

const SolutionSection = () => {
    const { solution } = data;
    const [activeTab, setActiveTab] = useState(4); // Default to item 4 (Generative AI)

    const activeSolution = solution.solutions.find(s => s.id === activeTab);

    return (
        <section className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[4%] lg:px-[7%] bg-white">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr_500px] gap-8 md:gap-12 lg:gap-16 items-start">
                    
                    {/* Left Side - Solution List */}
                    <div className="flex flex-col">
                        <h2 className="text-black font-bold mb-4">
                            {solution.title}
                        </h2>
                        <p className="text-gray-700 mb-8 md:mb-12 leading-relaxed">
                            {solution.subtitle}
                        </p>

                        {/* Solution Tabs */}
                        <div className="flex flex-col gap-6">
                            {solution.solutions.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`text-left flex items-start gap-3 transition-all duration-200 ${
                                        activeTab === item.id
                                            ? 'text-[#F22E62] font-medium'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <span className="font-medium">{item.number}</span>
                                    <span className="leading-relaxed">{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center - Image */}
                    <div className="w-full flex justify-center">
                        <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden">
                            <Image
                                src={solution.image}
                                alt={solution.imageAlt}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full">
                        <h3 className="text-black font-bold mb-6">
                            {activeSolution?.title}
                        </h3>

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
                                            <strong className="font-semibold text-gray-800">
                                                {detail.heading}
                                            </strong>
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
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
