"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// Removed framer-motion for simplicity
import { ArrowRight } from 'lucide-react';
import data from "@/data/home-page/data.json";

const InsightsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const insightsData = data.insights;
    if (!insightsData) return null;

    const { subtitle, title, categories, items } = insightsData;

    // Filter articles based on active filter
    const filteredArticles = activeFilter === 'All' 
        ? items 
        : items.filter(article => article.category === activeFilter.replace('s', ''));



    return (
        <section className="w-full bg-[#F8F9FB] py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-gray-600 mb-3 md:mb-4 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-black mb-6 md:mb-8 leading-tight">
                        {title}
                    </h2>

                    {/* Filter Tabs - pill container */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center bg-white rounded-full p-2 shadow-lg">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-6 py-2 rounded-full font-medium cursor-pointer transition-all duration-200 ${
                                        activeFilter === category
                                            ? 'bg-[#252A41] text-white'
                                            : 'bg-transparent text-gray-600 hover:text-black'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                    {filteredArticles.slice(0, 4).map((article) => (
                        <div key={article.id}>
                            <ArticleCard article={article} />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <button
                        className="group flex items-center gap-3 p-6 bg-white border-1 border-gray-900 rounded-full button text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-lg"
                    >
                        View All
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900 group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                            <ArrowRight 
                                size={20} 
                                className="text-white group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300" 
                            />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

const ArticleCard = ({ article }) => {
    return (
        <div className='border border-gray-100 p-3 rounded-4xl bg-white'>
        <a
            href={article.link}
            className="group block bg-white rounded-4xl"
        >
            {/* Image Container */}
            <div className="relative aspect-square rounded-t-4xl overflow-hidden bg-gray-100">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-white rounded-full font-semibold text-gray-800 shadow-sm">
                        {article.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="py-4">
                <p className="font-bold text-black mb-3 leading-tight group-hover:text-[#F22E62] transition-colors duration-300 line-clamp-2">
                    {article.title}
                </p>
                <span className="text-gray-600 leading-relaxed">
                    {article.description}
                </span>
            </div>
        </a>
        </div>

    );
};

export default InsightsSection;
