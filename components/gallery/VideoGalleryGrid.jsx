"use client";

import { galleryVideoFilters, galleryVideoItems } from "@/data/galleryVideo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useTranslations } from "next-intl";

const FILTER_LABEL_KEYS = {
  all: "galleryFilterAll",
  "cat-2026-factory": "galleryFilterFactory",
  "cat-2026-simu": "galleryFilterSimu",
};

export default function VideoGalleryGrid() {
  const t = useTranslations("video");
  const [currentCategory, setCurrentCategory] = useState("all");
  const isotopContainer = useRef();
  const isotope = useRef();

  useEffect(() => {
    const initIsotope = async () => {
      const Isotope = (await import("isotope-layout")).default;
      const imagesloaded = (await import("imagesloaded")).default;
      if (!isotopContainer.current) return;
      isotope.current = new Isotope(isotopContainer.current, {
        itemSelector: ".work-item",
        layoutMode: "masonry",
      });
      imagesloaded(isotopContainer.current).on("progress", function () {
        isotope.current?.layout();
      });
    };
    initIsotope();
  }, []);

  const updateCategory = (val) => {
    setCurrentCategory(val);
    if (isotope.current) {
      isotope.current.arrange({
        filter: val === "all" ? "*" : "." + val,
      });
    }
  };

  return (
    <div className="container">
      <div className="works-filter text-center mb-60 mb-sm-40 z-index-1">
        {galleryVideoFilters.map((elm, i) => (
          <a
            onClick={() => updateCategory(elm.category)}
            key={i}
            className={`filter ${currentCategory === elm.category ? "active" : ""}`}
          >
            {t(FILTER_LABEL_KEYS[elm.category] ?? "galleryFilterAll")}
          </a>
        ))}
      </div>
      <ul
        ref={isotopContainer}
        className="works-grid work-grid-4 work-grid-gut-lg hover-white work-grid-hover-alt clearfix masonry"
        id="work-grid"
      >
        <Gallery>
          {galleryVideoItems.map((item, index) => (
            <li key={index} className={item.className}>
              <a className="work-ext-link" href="#" onClick={(e) => e.preventDefault()}>
                <Item
                  original={item.src}
                  thumbnail={item.src}
                  width={800}
                  height={600}
                >
                  {({ ref, open }) => (
                    <>
                      <div className="work-img" ref={ref} onClick={open} style={{ cursor: "pointer" }}>
                        <div className="work-img-bg" />
                        <Image
                          src={item.src}
                          alt={t("galleryImageAlt", { index: index + 1 })}
                          width={400}
                          height={300}
                          className="w-100 h-auto object-fit-cover"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    </>
                  )}
                </Item>
              </a>
            </li>
          ))}
        </Gallery>
      </ul>
    </div>
  );
}
