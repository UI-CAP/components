"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Reusable CTA Button Component
 * Matches BannerSection design with dynamic data
 * 
 * @param {string} label - Button text
 * @param {string} href - Link destination
 * @param {string} bg - Background color (default: #FFFFFF)
 * @param {string} textColor - Text color (default: #000000)
 * @param {string} hoverBg - Hover background color (default: #F22E62)
 * @param {string} hoverTextColor - Hover text color (default: #FFFFFF)
 * @param {string} icon - Default icon path
 * @param {string} hoverIcon - Hover icon path
 * @param {number} iconSize - Icon width/height (default: 44)
 * @param {string} borderColor - Border color for secondary variant
 * @param {string} variant - "primary" or "secondary"
 * @param {string} target - Link target (_blank, _self, etc.)
 * @param {string} className - Additional CSS classes
 */
export default function CTAButton({
  label = "Learn More",
  href = "#",
  bg = "#FFFFFF",
  textColor = "#000000",
  hoverBg = "#F22E62",
  hoverTextColor = "#FFFFFF",
  icon = "/assets/icon/grayBtn.png",
  hoverIcon = "/assets/icon/whiteBtn.png",
  iconSize = 44,
  borderColor = "transparent",
  hoverBorderColor = "#F22E62",
  variant = "primary",
  target,
  className = "",
  iconWrapperClass = ""
  , rotateOnHover
}) {
  const [isHover, setIsHover] = useState(false);

  const baseStyles = {
    backgroundColor: isHover ? hoverBg : bg,
    color: isHover ? hoverTextColor : textColor,
    borderColor: isHover ? hoverBorderColor : borderColor
  };

  const baseClasses = "group flex items-center gap-2 py-5 px-8 rounded-full cursor-pointer w-fit transition-all duration-300 border";

  const variantClasses = variant === "secondary" 
    ? "border-white" 
    : "border-transparent";

  return (
    <Link
      href={href}
      target={target}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={baseStyles}
    >
      <p className="font-medium">{label}</p>
      <span className={`flex items-center justify-center relative ${iconWrapperClass}`} style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
        <Image
          src={icon}
          alt="arrow"
          width={iconSize}
          height={iconSize}
          className="absolute inset-0 m-auto transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <Image
          src={hoverIcon}
          alt="arrow-hover"
          width={iconSize}
          height={iconSize}
          className={
            "absolute inset-0 m-auto transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 transform " +
            ( (typeof rotateOnHover === 'boolean' ? rotateOnHover : (variant !== 'secondary')) ? 'group-hover:rotate-45' : '' )
          }
        />
      </span>
    </Link>
  );
}
