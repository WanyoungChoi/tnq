import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
import { menuTNQ21 } from "@/data/menuTNQ21";

const ABOUT_IMG = "/assets/images/tnq21/about";
const B = "/assets/images/tnq21/business";

/**
 * 섹션별 이미지(image001~) ↔ 텍스트(1.~) 1:1 매칭
 * 각 항목: { imageSrc, title, items } — image001→1번 텍스트, image002→2번 텍스트 ...
 */

import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("businessTitle"), description: t("businessDesc") };
}

function SectionTitle({ caption, title }) {
  return (
    <div className="row mb-60 mb-xs-30">
      <div className="col-md-6">
        {caption != null && caption !== "" && (
          <h2
            className="section-caption mb-xs-10 wow fadeInUp"
            data-wow-duration="1.2s"
          >
            {caption}
          </h2>
        )}
        <h3
          className="section-title mb-0 wow fadeInUp"
          data-wow-duration="1.2s"
          data-wow-delay="0.1s"
        >
          <AnimatedText text={title} />
        </h3>
      </div>
    </div>
  );
}

/** 한 블록: 왼쪽 이미지, 오른쪽 텍스트(레이어 박스) */
function BusinessContentBlock({ imageSrc, imageAlt, title, children }) {
  return (
    <div className="row mb-80 mb-md-60 mb-sm-40 mb-xs-30 business-content-block wow fadeInUp" data-wow-delay="0.5s">
      <div className="col-12 col-lg-6 mb-md-60 business-block-img-col">
        <div className="position-relative overflow-hidden">
          <Image
            width={960}
            height={539}
            className="image-fullwidth w-100"
            src={imageSrc}
            alt={imageAlt}
          />
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl-5 offset-xl-1 wow fadeInUp business-block-text-col" data-wow-delay="0.7s" data-wow-duration="0.8s">
        <div className="business-text-wrap">
          <div className="business-text-layer">
            <h4 className="business-text-title">{title}</h4>
            <div className="text-gray mb-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 리스트만 렌더 (제목은 BusinessContentBlock의 business-text-title에서 사용) */
function ItemList({ items }) {
  return (
    <ul className="list-unstyled mb-0 ps-3 business-block-list">
      {items.map((item, i) => (
        <li key={i}>- {item}</li>
      ))}
    </ul>
  );
}

// 이미지 경로만 유지, 제목·리스트는 messages에서 로드. 각 섹션별 블록 수·항목 수.
const HSDIE1_CONFIG = [
  { imageSrc: `${B}/HSDIE1/image001.png` }, { imageSrc: `${B}/HSDIE1/image002.png` },
  { imageSrc: `${B}/HSDIE1/image003.png` }, { imageSrc: `${B}/HSDIE1/image004.png` },
];
const HSDIE2_CONFIG = [
  { imageSrc: `${B}/HSDIE2/image001.jpg` }, { imageSrc: `${B}/HSDIE2/image002.jpg` },
  { imageSrc: `${B}/HSDIE2/image003.jpg` }, { imageSrc: `${B}/HSDIE2/image004.png` },
];
const CSDIE1_CONFIG = [
  { imageSrc: `${B}/CSDIE1/image001.jpg` }, { imageSrc: `${B}/CSDIE1/image002.png` },
  { imageSrc: `${B}/CSDIE1/image003.jpg` }, { imageSrc: `${B}/CSDIE1/image004.jpg` },
];
const HSTDIE_CONFIG = [
  { imageSrc: `${B}/HSTDIE/image001.jpg` }, { imageSrc: `${B}/HSTDIE/image002.jpg` },
];
const HSTDIE2_CONFIG = [
  { imageSrc: `${B}/HSTDIE2/image001.jpg` }, { imageSrc: `${B}/HSTDIE2/image002.jpg` },
  { imageSrc: `${B}/HSTDIE2/image003.jpg` }, { imageSrc: `${B}/HSTDIE2/image004.jpg` },
];
const CSDIE2_CONFIG = [
  { imageSrc: `${B}/CSDIE2/image001.jpg` }, { imageSrc: `${B}/CSDIE2/image002.jpg` },
  { imageSrc: `${B}/CSDIE2/image003.jpg` }, { imageSrc: `${B}/CSDIE2/image004.png` },
];

const BUSINESS_ITEM_COUNTS = {
  hsdie1: [7, 7, 7, 6],
  hsdie2: [4, 6, 6, 6],
  csdie1: [7, 7, 7, 6],
  hstdie: [7, 7],
  hstdie2: [4, 7, 6, 6],
  csdie2: [4, 7, 6, 6],
};

export default async function TNQ21BusinessPage() {
  const t = await getTranslations("business");

  const getBlockTitle = (sectionKey, i) => t(`${sectionKey}.${i}.title`);
  const getBlockItems = (sectionKey, i, count) =>
    Array.from({ length: count }, (_, j) => t(`${sectionKey}.${i}.items.${j}`));

  return (
    <>
      <div className="theme-main dark-mode">
        <div className="page bg-dark-1" id="top">
          <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar">
            <Header1Multipage links={menuTNQ21} />
          </nav>
          <main id="main">
            <section className="scrollSpysection about-hero-banner">
              <ParallaxContainer
                className="page-section bg-dark-1 bg-dark-alpha-80 light-content parallax-5"
                style={{ backgroundImage: `url(${ABOUT_IMG}/top_banner/banner.png)` }}
              >
                <div className="container position-relative about-hero-banner-inner">
                  <div className="text-center">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">
                        <h1 className="hs-title-1 mb-0">
                          <span className="wow charsAnimIn" data-splitting="chars">
                            <AnimatedText text={t("bannerTitle")} />
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </section>

            <section id="hot-stamping-die" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section1Caption")} title={t("section1Title")} />
                {HSDIE1_CONFIG.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`${t("altHsdie1")} ${i + 1}`}
                    title={getBlockTitle("hsdie1", i)}
                  >
                    <ItemList items={getBlockItems("hsdie1", i, BUSINESS_ITEM_COUNTS.hsdie1[i])} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            <section className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("section2Caption")} title={t("section2Title")} />
                {HSDIE2_CONFIG.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`${t("altHsdie2")} ${i + 1}`}
                    title={getBlockTitle("hsdie2", i)}
                  >
                    <ItemList items={getBlockItems("hsdie2", i, BUSINESS_ITEM_COUNTS.hsdie2[i])} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            <section id="cold-stamping-die" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section3Caption")} title={t("section3Title")} />
                {CSDIE1_CONFIG.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`${t("altCsdie1")} ${i + 1}`}
                    title={getBlockTitle("csdie1", i)}
                  >
                    <ItemList items={getBlockItems("csdie1", i, BUSINESS_ITEM_COUNTS.csdie1[i])} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            <section className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section4Caption")} title={t("section4Title")} />
                {CSDIE2_CONFIG.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`${t("altCsdie2")} ${i + 1}`}
                    title={getBlockTitle("csdie2", i)}
                  >
                    <ItemList items={getBlockItems("csdie2", i, BUSINESS_ITEM_COUNTS.csdie2[i])} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            <section id="hot-stamping-trim-die" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("section5Caption")} title={t("section5Title")} />
                {HSTDIE_CONFIG.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`${t("altHstdie")} ${i + 1}`}
                    title={getBlockTitle("hstdie", i)}
                  >
                    <ItemList items={getBlockItems("hstdie", i, BUSINESS_ITEM_COUNTS.hstdie[i])} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            <section id="hot-stamping-trim-die-production" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section6Caption")} title={t("section6Title")} />
                {HSTDIE2_CONFIG.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`${t("altHstdie2")} ${i + 1}`}
                    title={getBlockTitle("hstdie2", i)}
                  >
                    <ItemList items={getBlockItems("hstdie2", i, BUSINESS_ITEM_COUNTS.hstdie2[i])} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

          </main>
          <Footer1 dark />
        </div>
      </div>
    </>
  );
}
