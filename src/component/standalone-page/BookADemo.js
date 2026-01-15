'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import data from '../../data/standalone-page/data.json';

const BookADemo = () => {
    const { bookADemo } = data;
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        websiteUrl: '',
        businessEmail: '',
        contactNumber: '',
        country: bookADemo.fields.country.defaultValue || '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    return (
        <section className="relative w-full bg-white px-[2%] md:px-[4%] lg:px-[7%] py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Section - Image and Title */}
                <div className="flex flex-col items-start pr-[35%] space-y-8">
                    {/* Title and Description */}
                    <div className="space-y-4 flex flex-col items-start">
                        <h2 className="font-medium text-gray-900">{bookADemo.title}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {bookADemo.description}
                        </p>
                    </div>

                    {/* Book Image */}
                    <div className="relative w-full max-w-[600px] h-[350px]">
                        <Image
                            src={bookADemo.image}
                            alt={bookADemo.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full h-full">
                    <div className="border border-gray-200 rounded-[20px] p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* Full Name */}
                            <div className="relative border-b border-gray-200 pb-2">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder={bookADemo.fields.fullName.placeholder}
                                    required={bookADemo.fields.fullName.required}
                                    className="w-full py-2 bg-transparent focus:outline-none placeholder:text-gray-400"
                                />
                            </div>

                            {/* Company Name and Website URL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="relative flex items-center border-b border-gray-200 pb-2">
                                    <div className="w-5 h-5 relative mr-3 flex-shrink-0">
                                        <Image
                                            src={bookADemo.fields.companyName.icon || "/assets/icon/telephone.png"}
                                            alt="Company"
                                            fill
                                            className="object-contain opacity-40"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder={bookADemo.fields.companyName.placeholder}
                                        className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="relative flex items-center border-b border-gray-200 pb-2">
                                    <div className="w-5 h-5 relative mr-3 flex-shrink-0">
                                        <Image
                                            src={bookADemo.fields.websiteUrl.icon || "/assets/icon/telephone.png"}
                                            alt="Website"
                                            fill
                                            className="object-contain opacity-40"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="websiteUrl"
                                        value={formData.websiteUrl}
                                        onChange={handleChange}
                                        placeholder={bookADemo.fields.websiteUrl.placeholder}
                                        className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Business Email and Contact Number */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="relative flex items-center border-b border-gray-200 pb-2">
                                    <div className="w-5 h-5 relative mr-3 flex-shrink-0">
                                        <Image
                                            src={bookADemo.fields.businessEmail.icon || "/assets/icon/email.png"}
                                            alt="Email"
                                            fill
                                            className="object-contain opacity-40"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="businessEmail"
                                        value={formData.businessEmail}
                                        onChange={handleChange}
                                        placeholder={bookADemo.fields.businessEmail.placeholder}
                                        required={bookADemo.fields.businessEmail.required}
                                        className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="relative flex items-center border-b border-gray-200 pb-2">
                                    <div className="w-5 h-5 relative mr-3 flex-shrink-0">
                                        <Image
                                            src={bookADemo.fields.contactNumber.icon || "/assets/icon/telephone.png"}
                                            alt="Phone"
                                            fill
                                            className="object-contain opacity-40"
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        placeholder={bookADemo.fields.contactNumber.placeholder}
                                        required={bookADemo.fields.contactNumber.required}
                                        className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Country Dropdown */}
                            <div className="relative flex items-center border-b border-gray-200 pb-2">
                                <div className="w-5 h-5 relative mr-3 flex-shrink-0">
                                    <Image
                                        src={bookADemo.fields.country.icon || "/assets/icon/location.png"}
                                        alt="Location"
                                        fill
                                        className="object-contain opacity-40"
                                    />
                                </div>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required={bookADemo.fields.country.required}
                                    className="flex-1 bg-transparent outline-none appearance-none cursor-pointer text-gray-700"
                                >
                                    {bookADemo.fields.country.options.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="ml-2 text-gray-800 pointer-events-none"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>

                            {/* Message Textarea */}
                            <div className="relative border-b border-gray-200 pb-2">
                                <input
                                    type="text"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={bookADemo.fields.message.placeholder}
                                    className="w-full py-2 bg-transparent focus:outline-none placeholder:text-gray-400"
                                />
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BookADemo;
