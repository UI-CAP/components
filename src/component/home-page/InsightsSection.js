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
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-8 md:mb-12">
                        {title}
                    </h2>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-8 md:px-12 py-2.5 md:py-3 rounded-full button transition-all duration-300 ${
                                    activeFilter === category
                                        ? 'bg-[#F22E62] text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
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
        <a
            href={article.link}
            className="group block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold text-gray-800">
                        {article.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold text-black mb-3 leading-tight group-hover:text-[#F22E62] transition-colors duration-300">
                    {article.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {article.description}
                </p>
            </div>
        </a>
    );
};

export default InsightsSection;
