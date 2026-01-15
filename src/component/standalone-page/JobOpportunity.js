'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import data from '../../data/standalone-page/data.json';

const JobOpportunity = () => {
    const { jobOpportunity, jobPortal } = data;
    const [expandedId, setExpandedId] = useState(1);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    const toggleAccordion = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="w-full bg-white px-[2%] md:px-[4%] lg:px-[7%] py-12 lg:py-20">
            {/* Header: Title */}
            <div className="text-center mb-12">
                <h2 className="text-gray-900 font-bold mb-10 tracking-tight">{jobPortal.title}</h2>

                {/* Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 max-w-5xl mx-auto">
                    {/* Job Title Search */}
                    <div className="relative w-full md:w-[35%]">
                        <input
                            type="text"
                            placeholder={jobPortal.search.job.placeholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-5 py-3.5 pr-12 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-gray-200 text-gray-700 placeholder:text-gray-400"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-50/80">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>

                    {/* Location Search */}
                    <div className="relative w-full md:w-[35%]">
                        <input
                            type="text"
                            placeholder={jobPortal.search.location.placeholder}
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            className="w-full px-5 py-3.5 pr-12 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:border-gray-200 text-gray-700 placeholder:text-gray-400"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-50/80">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="w-full md:w-auto px-12 py-3.5 bg-[#F6F6F6] hover:bg-gray-100 text-gray-700 font-medium rounded-full transition-colors border border-gray-200">
                        {jobPortal.search.buttonText}
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto shadow-md px-2 py-3 rounded-[2rem]">
                    {jobPortal.filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-8 py-2.5 rounded-full transition-all cursor-pointer duration-300 ${activeFilter === filter
                                    ? 'bg-[#383E5B] text-white shadow-md'
                                    : 'bg-[#F6F6F6] text-gray-600 hover:bg-gray-100/80'
                                }`}
                        >
                            <p>{filter}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {jobOpportunity.map((job) => (
                    <div
                        key={job.id}
                        className="border border-gray-200 bg-[#FAFAFA] rounded-2xl overflow-hidden shadow-sm"
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() => toggleAccordion(job.id)}
                            className="w-full flex items-center justify-between p-6 bg-gray-50/30 hover:bg-gray-50/60 transition-colors text-left"
                        >
                            <h4 className="font-semibold text-gray-900 tracking-tight">
                                {job.title}
                            </h4>
                            <div className="flex-shrink-0 ml-4">
                                {expandedId === job.id ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                )}
                            </div>
                        </button>

                        {/* Accordion Content */}
                        {expandedId === job.id && (
                            <div className="border-t border-gray-200 flex flex-col lg:flex-row">

                                {/* Left Section - Info & Apply */}
                                <div className="p-8 md:p-10 lg:w-[30%] lg:border-r border-gray-200 flex flex-col space-y-8">
                                    <div className="space-y-5">
                                        {/* Job Type */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 relative text-[#F43F5E]">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 font-medium">
                                                <span className="text-gray-500 font-semibold">Job Type : </span>
                                                {job.jobType}
                                            </span>
                                        </div>

                                        {/* Location */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 relative text-[#F43F5E]">
                                                <Image
                                                    src="/assets/icon/location.png"
                                                    alt="Location"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="text-gray-700 font-medium">
                                                <span className="text-gray-500 font-semibold">Location : </span>
                                                {job.location}
                                            </span>
                                        </div>

                                        {/* Date Opened */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 relative text-[#F43F5E]">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 font-medium">
                                                <span className="text-gray-500 font-semibold">Date Opened : </span>
                                                {job.dateOpened}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Apply Button */}
                                    <button className="w-full md:w-fit px-10 py-4 bg-[#F43F5E] text-white font-semibold rounded-full hover:bg-[#e11d48] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-200">
                                        {job.applyButtonText}
                                    </button>
                                </div>

                                {/* Right Section - Description & Responsibilities */}
                                <div className="p-8 md:p-10 lg:w-[70%] space-y-8">
                                    <div className="space-y-3">
                                        <span className="font-bold text-gray-900">Job Description :</span>
                                        <span className="text-gray-600 leading-relaxed max-w-4xl">
                                            {job.description}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <span className="font-bold text-gray-900 mb-1">Key Responsibilities:</span>
                                        <ul className="space-y-1">
                                            {job.responsibilities.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-gray-600 leading-relaxed">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default JobOpportunity;
