"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import data from '@/data/product-page/data.json';

const SmartDiscoverySection = () => {
    const [expandedItem, setExpandedItem] = useState(4); // Default to item 4 as shown in screenshot
    const [vhHeight, setVhHeight] = useState(null);
    const { smartDiscovery } = data;

    useEffect(() => {
        function updateVh() {
            const vh = (1000 / window.innerHeight) * 100;
            setVhHeight(Number(vh.toFixed(4)));
        }

        updateVh();
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    const toggleItem = (id) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    return (
        <section
            className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[4%] lg:px-[7%] bg-white"
            style={{ height: vhHeight ? `${vhHeight}vh` : undefined }}
        >
            <div >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Left Side - Image */}
                    <div className="w-full flex justify-center">
                        <div className="relative" style={{ width: '724px', height: '824px' }}>
                            <Image
                                src={smartDiscovery.image}
                                alt={smartDiscovery.imageAlt}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full">
                        <div className="w-full">
                            <h2 className="text-black font-bold mb-4 tracking-tight">
                                {smartDiscovery.title}
                            </h2>
                            <h5 className="text-gray-600 mb-8 md:mb-12 ">
                                {smartDiscovery.subtitle}
                            </h5>

                            {/* Accordion */}
                            <div className="flex flex-col">
                                {smartDiscovery.features.map((feature) => (
                                    <div 
                                        key={feature.id} 
                                        className="border-b border-gray-200 last:border-b-0"
                                    >
                                        <button
                                            className="w-full flex items-center gap-3 md:gap-4 py-5 md:py-6 bg-transparent border-none cursor-pointer text-left transition-all duration-200 hover:opacity-80"
                                            onClick={() => toggleItem(feature.id)}
                                            aria-expanded={expandedItem === feature.id}
                                        >
                                            <h5 className="font-semibold text-gray-500 min-w-[48px]">
                                                {feature.number}
                                            </h5>
                                            <h5 className="flex-1 font-medium text-gray-800 leading-relaxed">
                                                {feature.title}
                                            </h5>
                                            <h5 className="flex items-center justify-center min-w-[24px]">
                                                {expandedItem === feature.id ? (
                                                    <svg 
                                                        className="w-6 h-6 text-[#F22E62] font-bold transition-transform duration-200" 
                                                        viewBox="0 0 24 24" 
                                                        fill="none" 
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                ) : (
                                                    <svg 
                                                        className="w-6 h-6 text-[#F22E62] transition-transform duration-200" 
                                                        viewBox="0 0 24 24" 
                                                        fill="none" 
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                )}
                                            </h5>
                                        </button>

                                        {expandedItem === feature.id && (
                                            <div className="pb-6 md:pb-8 pl-0 md:pl-16 animate-slide-down">
                                                <p className="text-gray-600 leading-relaxed mb-5">
                                                    {feature.description}
                                                </p>
                                                {feature.details && feature.details.length > 0 && (
                                                    <ul className="list-none p-0 m-0 flex flex-col gap-4">
                                                        {feature.details.map((detail, index) => (
                                                            <li 
                                                                key={index} 
                                                                className="text-gray-600 leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[#F22E62] before:font-bold"
                                                            >
                                                                <strong className="font-semibold text-gray-800">
                                                                    {detail.heading}
                                                                </strong>{' '}
                                                                <span className="font-normal">
                                                                    {detail.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SmartDiscoverySection;
