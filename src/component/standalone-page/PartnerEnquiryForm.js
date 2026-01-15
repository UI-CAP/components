'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import data from '../../data/standalone-page/data.json';

const PartnerEnquiryForm = () => {
  const formData = data.partnerEnquiryForm;

  const bgAsset = formData.background?.src || '/assets/image/partner1.jpg';
  const isVideo = (src) => typeof src === 'string' && src.toLowerCase().endsWith('.mp4');

  const [formValues, setFormValues] = useState({
    fullName: '',
    companyName: '',
    websiteUrl: '',
    businessEmail: '',
    contactNumber: '',
    country: formData.fields.country.defaultValue,
    partnerProgram: ''
  });

  /** @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  /** @param {React.FormEvent<HTMLFormElement>} e */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[#02006DB5] justify-center px-6 py-16">

      {/* Background (image or video) moved to main section */}
      {isVideo(bgAsset) ? (
        <video
          src={bgAsset}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <Image
          src={bgAsset}
          alt="Background"
          fill
          className="absolute inset-0 w-full h-full  object-cover z-0"
          priority
        />
      )}

      {/* Overlay (70%): #02006DB5 */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#02006DB5', opacity: 0.9 }} />

      <div className="relative z-10 max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT SECTION */}
        <div className="relative flex flex-col items-center justify-center text-white py-20">

          {/* Orbits Container - Centered relative to this panel */}
          <div className="relative flex items-center justify-center">

            {/* Orbit 1 (Smallest) */}
            <div className="absolute w-[280px] h-[280px] border border-dashed border-white/20 rounded-full animate-[spin_60s_linear_infinite]" />

            {/* Orbit 2 (Medium) */}
            <div className="absolute w-[440px] h-[440px] border border-dashed border-white/20 rounded-full animate-[spin_80s_linear_infinite]" />

            {/* Orbit 3 (Largest) */}
            <div className="absolute w-[600px] h-[600px] border border-dashed border-white/10 rounded-full animate-[spin_100s_linear_infinite]" />

            {/* Glowing Center Orb */}
            <div className="relative z-20 w-28 h-28 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/assets/image/partner3.png" width={100} height={100} className="object-contain" alt="Logo" />
              </div>
            </div>

            {/* Avatars on Orbits */}
            {/* Top Right on Inner Orbit */}
            <div className="absolute top-[-80px] right-[20px] z-20">
              <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <Image src="/assets/image/partner2.png" width={56} height={56} className="w-full h-full object-cover" alt="Partner" />
              </div>
            </div>

            {/* Top Left on Outer Orbit */}
            <div className="absolute top-[-100px] left-[-80px] z-20">
              <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <Image src="/assets/image/partner2.png" width={64} height={64} className="w-full h-full object-cover" alt="Partner" />
              </div>
            </div>

            {/* Bottom Right on Middle Orbit */}
            <div className="absolute bottom-[-40px] right-[-100px] z-20">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <Image src="/assets/image/partner2.png" width={48} height={48} className="w-full h-full object-cover" alt="Partner" />
              </div>
            </div>
            {/* Top Middle on Middle Orbit */}
            <div className="absolute top-[-160px] left-[10px] z-20">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <Image src="/assets/image/partner2.png" width={40} height={40} className="w-full h-full object-cover" alt="Partner" />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="relative text-center w-full z-20 mt-20">
            <h2 className="font-normal leading-tight">
              {formData.title} <br />
              <h2 className="font-bold">{formData.brandName} <h2 className="relative inline-block border-b-4 border-red-500 font-bold italic">

                {formData.highlightedText}
              </h2></h2>

            </h2>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-3xl flex items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
            <p className=" text-gray-800">
              {formData.formTitle}
            </p>

            <input
              name="fullName"
              placeholder={formData.fields.fullName.placeholder}
              value={formValues.fullName}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 py-3 outline-none focus:border-indigo-600"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center border-b border-gray-300 focus-within:border-indigo-600">
                <Image src="/assets/icon/telephone.png" width={20} height={20} alt="icon" className="mr-3 opacity-40" />
                <input
                  name="companyName"
                  placeholder={formData.fields.companyName.placeholder}
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  className="w-full py-3 outline-none"
                />
              </div>
              <div className="flex items-center border-b border-gray-300 focus-within:border-indigo-600">
                <Image src="/assets/icon/telephone.png" width={20} height={20} alt="icon" className="mr-3 opacity-40" />
                <input
                  name="websiteUrl"
                  placeholder={formData.fields.websiteUrl.placeholder}
                  value={formValues.websiteUrl}
                  onChange={handleInputChange}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center border-b border-gray-300 focus-within:border-indigo-600">
                <Image src="/assets/icon/email.png" width={20} height={20} alt="icon" className="mr-3 opacity-40" />
                <input
                  name="businessEmail"
                  placeholder={formData.fields.businessEmail.placeholder}
                  value={formValues.businessEmail}
                  onChange={handleInputChange}
                  className="w-full py-3 outline-none"
                />
              </div>
              <div className="flex items-center border-b border-gray-300 focus-within:border-indigo-600">
                <Image src="/assets/icon/telephone.png" width={20} height={20} alt="icon" className="mr-3 opacity-40" />
                <input
                  name="contactNumber"
                  placeholder={formData.fields.contactNumber.placeholder}
                  value={formValues.contactNumber}
                  onChange={handleInputChange}
                  className="w-full py-3 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center border-b border-gray-300 focus-within:border-indigo-600">
              <Image src="/assets/icon/location.png" width={20} height={20} alt="icon" className="mr-3 opacity-40" />
              <select
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
                className="w-full py-3 outline-none bg-transparent"
              >
                {formData.fields.country.options.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </select>
            </div>

            <select
              name="partnerProgram"
              value={formValues.partnerProgram}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 py-3 outline-none"
            >
              <option value="">{formData.fields.partnerProgram.placeholder}</option>
              {formData.fields.partnerProgram.options.map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </select>

            {/* CTA */}
            <button
              type="submit"
              className="ml-auto flex items-center gap-3 bg-[#F22E62] text-white px-8 py-6 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              {formData.submitButton.text}
              <span className="bg-white text-[#F43F5E] w-7 h-7 rounded-full flex items-center justify-center">
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PartnerEnquiryForm;
