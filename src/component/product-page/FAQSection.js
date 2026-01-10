"use client";

import React, { useState } from 'react';
import data from '@/data/product-page/data.json';

const FAQSection = () => {
    const { faq } = data;
    const [expandedItem, setExpandedItem] = useState(1); // Default to first item expanded

    const toggleItem = (id) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    return (
        <section className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[7%] lg:px-[14%] bg-[#F0EFFF]">
            <div>
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-black mb-4">
                        {faq.title}
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        {faq.subtitle}
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="flex flex-col gap-4 md:gap-5">
                    {faq.questions.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                        >
                            {/* Question Header */}
                            <button
                                className="w-full flex items-start justify-between p-6 md:p-8 text-left bg-transparent border-none cursor-pointer"
                                onClick={() => toggleItem(item.id)}
                                aria-expanded={expandedItem === item.id}
                            >
                                <div className="flex items-start gap-3 flex-1">
                                    <p className="font-semibold text-black">Q.</p>
                                    <p className="font-semibold text-black leading-relaxed flex-1">
                                        {item.question}
                                    </p>
                                </div>
                                
                                {/* Toggle Icon */}
                                <div className="flex-shrink-0 mt-1">
                                    {expandedItem === item.id ? (
                                        <svg
                                            className="w-6 h-6 text-[#F22E62] transition-transform duration-200"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18 6L6 18M6 6L18 18"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-6 h-6 text-[#F22E62] transition-transform duration-200"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 5V19M5 12H19"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </button>
                            

                            {/* Answer Content */}
                            {expandedItem === item.id && (
                                
                                <div className="px-6 md:px-8 pb-6 md:pb-8 animate-slide-down">
                                    <hr className='text-gray-200 -mt-6 mb-4'></hr>
                                    <div className="pl-0 md:pl-8">
                                        <span className="text-gray-600 leading-relaxed">
                                            {item.answer}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
