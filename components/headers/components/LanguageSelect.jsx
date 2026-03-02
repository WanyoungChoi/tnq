"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { localeNames, locales } from "@/i18n/routing";

export default function LanguageSelect() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLocale = (newLocale) => {
    setIsDropdownOpen(false);
    if (newLocale === currentLocale) return;
    // pathname is like /en/page or /ko/main-multi-page-typed-text-dark
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const isLocaleSegment = locales.includes(firstSegment);
    if (isLocaleSegment) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  return (
    <li className="languageSelect">
      <a
        href="#"
        className="mn-has-sub opacity-1"
        onClick={(e) => {
          e.preventDefault();
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {localeNames[currentLocale] || currentLocale}{" "}
        <i className="mi-chevron-down" />
      </a>

      <ul
        className={`mn-sub to-left ${isDropdownOpen ? "open" : "closed"}`}
      >
        {locales.map((code) => (
          <li key={code}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                switchLocale(code);
              }}
            >
              {localeNames[code]}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
