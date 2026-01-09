import React, { useState, useEffect } from 'react';
import { FaYoutube, FaLinkedin } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import data from "@/data/data.json";

const Footer = () => {
  const [email, setEmail] = useState('');
  // Set CSS variable for vh equivalent of 850px
  useEffect(() => {
    function setFooterVH() {
      const vh = window.innerHeight;
      // Calculate what vh value equals 850px
      const footerVH = (850 / vh) * 100;
      document.documentElement.style.setProperty('--footer-vh', `${footerVH}vh`);
    }
    setFooterVH();
    window.addEventListener('resize', setFooterVH);
    return () => window.removeEventListener('resize', setFooterVH);
  }, []);

  const footerLinks = data.footer.links;
  const footerVideo = data.footer.video;
  const copyrightText = data.footer.copyright || '';
  const hasBullet = copyrightText.includes('•');
  const [beforeBullet, afterBullet] = hasBullet ? copyrightText.split('•') : [copyrightText, ''];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <footer
      className="relative mx-auto overflow-hidden flex items-center"
      style={{ backgroundColor: '#1A1F37F2', minHeight: 'var(--footer-vh, 850px)' }}
    >
      {/* Background Video (Conditional) */}
      {footerVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src={footerVideo} type="video/mp4" />
        </video>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0" />

      {/* Footer Content Container - Glass morphism */}
      <div className="relative bg-[#42424299] w-[86%] mx-auto backdrop-blur-2xl rounded-2xl  shadow-2xl border border-gray-700/30">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 p-8 md:p-12 lg:p-16">

          {/* Left Section - Logo and Newsletter */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            {/* Logo */}
            <div className="mb-6">
              <img src={data.footer.image} alt="Vishleshan Logo" className="h-10 object-contain" />
            </div>

            {/* Description */}
            <p className="text-white/50 mb-8  leading-relaxed max-w-md">
              {data.footer.description}
            </p>

            {/* Newsletter Signup */}
            <div className="mb-0">
              <p className="text-white font-semibold mb-4 ">
                STAY UPDATED
              </p>
              <form onSubmit={handleSubmit} className="relative flex items-center border-b border-gray-500 max-w-xs pb-2">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none py-2 "
                />
                <button
                  type="submit"
                  className="absolute right-0 -bottom-4 bg-white text-[#292F44] rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-all shadow-lg transform translate-y-[-50%]"
                >
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">

            {/* Company */}
            <div>
              <p className="text-white font-semibold mb-4 ">Company</p>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      <p className="text-white/50  hover:text-white/80">{link.label}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investment Strategies */}
            <div>
              <p className="text-white font-semibold mb-4 ">Investment Strategies</p>
              <ul className="space-y-2.5">
                {footerLinks.investmentStrategies.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      <p className="text-white/50 hover:text-white/80">{link.label}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-white font-semibold mb-4 ">Resources</p>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      <p className="text-white/50  hover:text-white/80">{link.label}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <p className="text-white font-semibold mb-4 ">Platform</p>
              <ul className="space-y-2.5">
                {footerLinks.platform.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      <p className="text-white/50  hover:text-white/80">{link.label}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section - Copyright and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-b border-[#FFFFFF1A] py-6">

          {/* Copyright */}
          <div className="text-gray-400/70 px-8 md:px-12 lg:px-16">
            <p className="text-white">
              {beforeBullet}
              {hasBullet && (
                <span className="text-[#F22E62] text-2xl px-6">•</span>
              )}
              {afterBullet}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex px-8 md:px-12 lg:px-16 gap-3">
            <a href="#" className="text-gray-400/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
              <FaYoutube size={18} />
            </a>
            <a href="#" className="text-gray-400/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-8 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16 pt-10 text-gray-400/60">
          <span className="block mb-3 leading-relaxed">
            <strong className="text-gray-300">Important Disclaimer:</strong> {data.footer.disclaimer.important}
          </span>
          <span className="block text-xs leading-relaxed">
            {data.footer.disclaimer.additional}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
