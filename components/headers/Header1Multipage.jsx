"use client";
import { toggleMobileMenu } from "@/utlis/toggleMobileMenu";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import Nav2 from "./components/Nav2";
import LanguageSelect from "./components/LanguageSelect";

export default function Header1Multipage({ links }) {
  return (
    <div className="main-nav-sub full-wrapper">
      {/* Logo  (* Add your text or image to the link tag. Use SVG or PNG image format. 
              If you use a PNG logo image, the image resolution must be equal 200% of the visible logo
              image size for support of retina screens. See details in the template documentation. *) */}
      <div className="nav-logo-wrap local-scroll">
        <Link href={`/`} className="logo">
          <Image
            src="/assets/images/logo_tp.png"
            alt="TNQ 로고"
            width={105}
            height={34}
          />
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <div
        onClick={toggleMobileMenu}
        className="mobile-nav"
        role="button"
        tabIndex={0}
      >
        <i className="mobile-nav-icon" />
        <span className="visually-hidden">Menu</span>
      </div>
      {/* Main Menu */}
      <div className="inner-nav desktop-nav">
        <ul className="clearlist local-scroll">
          {/* Item With Sub */}
          <Nav2 links={links} />
          {/* End Item With Sub */}
        </ul>
        <ul className="items-end clearlist">
          {/* Languages */}
          <LanguageSelect />
          {/* End Languages */}
        </ul>
      </div>
      {/* End Main Menu */}
    </div>
  );
}
