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

      <div className="relative z-10 max-w-[1400px] w-full flex justify-center lg:justify-end overflow-hidden">

        {/* RIGHT FORM (only) */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
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
