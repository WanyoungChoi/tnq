"use client";

import { init_classic_menu_resize } from "@/utlis/menuToggle";
import { scrollToElement } from "@/utlis/scrollToElement";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav2({ links }) {
  const t = useTranslations("menu");
  const [menuOpen, setMenuOpen] = useState([-1, -1]);

  const toggleParent1 = (i) => {
    const tempMenuOpen = [...menuOpen];
    if (menuOpen[0] == i) {
      tempMenuOpen[0] = -1;
    } else {
      tempMenuOpen[0] = i;
    }
    setMenuOpen(tempMenuOpen);
  };
  const toggleParent2 = (i) => {
    const tempMenuOpen = [...menuOpen];
    if (menuOpen[1] == i) {
      tempMenuOpen[1] = -1;
    } else {
      tempMenuOpen[1] = i;
    }
    setMenuOpen(tempMenuOpen);
  };
  const pathname = usePathname();
  const pathWithoutLocale = pathname.split("/").filter(Boolean).slice(1).join("/");
  const isActive = (href) => href.replace(/^\//, "") === pathWithoutLocale;

  useEffect(() => {
    setTimeout(() => {
      scrollToElement();
    }, 1000);
    init_classic_menu_resize();
    // window.addEventListener("scroll", addScrollspy);

    window.addEventListener("resize", init_classic_menu_resize);

    return () => {
      // window.removeEventListener("scroll", addScrollspy);
      window.removeEventListener("resize", init_classic_menu_resize);
    };
  }, []);

  return (
    <>
      {links.map((item, index) => (
        <li className={menuOpen[0] == index ? "js-opened" : ""} key={index}>
          <a
            href="#"
            onClick={() => toggleParent1(index)}
            className={`mn-has-sub ${
              item.subMenu?.some((e1) =>
                e1.links.some(
                  (e2) => isActive(e2.href)
                )
              )
                ? "active"
                : ""
            }`}
          >
            {t(item.title)} <i className="mi-chevron-down" />
          </a>
          {item.subMenu && (
            <ul
              className={`mn-sub mn-has-multi ${
                menuOpen[0] == index ? "mobile-sub-active" : ""
              } `}
            >
              {item.subMenu.map((subItem, subIndex) => (
                <li className="mn-sub-multi" key={subIndex}>
                  {subItem.title && (
                    <span className="mn-group-title">{subItem.title}</span>
                  )}
                  <ul>
                    {subItem.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          className={
                            isActive(link.href) ? "active" : ""
                          }
                          href={link.href}
                        >
                          {link.icon && <i className={link.icon} />} {t(link.text)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
}
