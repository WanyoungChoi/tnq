import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
import { menuTNQ21 } from "@/data/menuTNQ21";

const ABOUT_IMG = "/assets/images/tnq21/about";
const E = "/assets/images/tnq21/equipment";

import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("equipmentTitle"), description: t("equipmentDesc") };
}

function SectionTitle({ caption, title }) {
  return (
    <div className="row mb-60 mb-xs-30">
      <div className="col-md-6">
        {caption != null && caption !== "" && (
          <h2 className="section-caption mb-xs-10 wow fadeInUp" data-wow-duration="1.2s">
            {caption}
          </h2>
        )}
        <h3 className="section-title mb-0 wow fadeInUp" data-wow-duration="1.2s" data-wow-delay="0.1s">
          <AnimatedText text={title} />
        </h3>
      </div>
    </div>
  );
}

function EquipmentContentBlock({ imageSrc, imageAlt, title, children }) {
  return (
    <div className="row mb-80 mb-md-60 mb-sm-40 mb-xs-30 business-content-block wow fadeInUp" data-wow-delay="0.5s">
      <div className="col-12 col-lg-6 mb-md-60 business-block-img-col">
        <div className="position-relative overflow-hidden">
          <Image width={960} height={539} className="image-fullwidth w-100" src={imageSrc} alt={imageAlt} />
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

function ItemList({ items }) {
  return (
    <ul className="list-unstyled mb-0 ps-3 business-block-list">
      {items.map((item, i) => (
        <li key={i}>- {item}</li>
      ))}
    </ul>
  );
}

const GAGONG1_CONFIG = [
  { imageSrc: `${E}/gagong1/image001.png` }, { imageSrc: `${E}/gagong1/image002.png` },
];
const GAGONG2_CONFIG = [
  { imageSrc: `${E}/gagong2/image001.png` }, { imageSrc: `${E}/gagong2/image002.png` },
  { imageSrc: `${E}/gagong2/image003.png` }, { imageSrc: `${E}/gagong2/image004.JPG` },
];
const GAGONG3_CONFIG = [
  { imageSrc: `${E}/gagong3/image001.png` }, { imageSrc: `${E}/gagong3/image002.png` },
  { imageSrc: `${E}/gagong3/image003.png` }, { imageSrc: `${E}/gagong3/image004.png` },
  { imageSrc: `${E}/gagong3/image005.jpg` }, { imageSrc: `${E}/gagong3/image006.jpg` },
];
const SIUNJUN1_CONFIG = [
  { imageSrc: `${E}/siunjun1/image001.png` }, { imageSrc: `${E}/siunjun1/image002.png` },
  { imageSrc: `${E}/siunjun1/image003.png` }, { imageSrc: `${E}/siunjun1/image004.png` },
  { imageSrc: `${E}/siunjun1/image005.png` },
];
const SIUNJUN2_CONFIG = [
  { imageSrc: `${E}/siunjun2/image001.JPG` }, { imageSrc: `${E}/siunjun2/image002.JPG` },
];
const SIUNJUN3_CONFIG = [
  { imageSrc: `${E}/siunjun3/image001.jpg` }, { imageSrc: `${E}/siunjun3/image002.jpg` },
];
const YULCHURI_CONFIG = [
  { imageSrc: `${E}/yulchuri/image001.jpg` }, { imageSrc: `${E}/yulchuri/image002.jpg` },
  { imageSrc: `${E}/yulchuri/image003.jpg` }, { imageSrc: `${E}/yulchuri/image004.jpg` },
];
const CHUKJUNG_CONFIG = [
  { imageSrc: `${E}/chukjung/image001.jpg` }, { imageSrc: `${E}/chukjung/image002.jpg` },
  { imageSrc: `${E}/chukjung/image003.jpg` }, { imageSrc: `${E}/chukjung/image004.jpg` },
  { imageSrc: `${E}/chukjung/image005.jpg` },
];

const EQUIPMENT_ITEM_COUNTS = {
  gagong1: [4, 4],
  gagong2: [3, 3, 4, 3],
  gagong3: [0, 0, 3, 0, 0, 4],
  siunjun1: [6, 6, 0, 0, 0],
  siunjun2: [6, 5],
  siunjun3: [6, 6],
  yulchuri: [0, 0, 0, 0],
  chukjung: [0, 0, 0, 0, 0],
};

export default async function TNQ21EquipmentPage() {
  const t = await getTranslations("equipment");

  const getBlockTitle = (sectionKey, i) => t(`${sectionKey}.${i}.title`);
  const getBlockItems = (sectionKey, i, count) =>
    count > 0 ? Array.from({ length: count }, (_, j) => t(`${sectionKey}.${i}.items.${j}`)) : [];

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

            <section id="machining" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section1Caption")} title={t("section1Title")} />
                {GAGONG1_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("gagong1", i)}
                    title={getBlockTitle("gagong1", i)}
                  >
                    <ItemList items={getBlockItems("gagong1", i, EQUIPMENT_ITEM_COUNTS.gagong1[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("section2Caption")} title={t("section2Title")} />
                {GAGONG2_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("gagong2", i)}
                    title={getBlockTitle("gagong2", i)}
                  >
                    <ItemList items={getBlockItems("gagong2", i, EQUIPMENT_ITEM_COUNTS.gagong2[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section3Caption")} title={t("section3Title")} />
                {GAGONG3_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("gagong3", i)}
                    title={getBlockTitle("gagong3", i)}
                  >
                    <ItemList items={getBlockItems("gagong3", i, EQUIPMENT_ITEM_COUNTS.gagong3[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section id="trial-run" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("section4Caption")} title={t("section4Title")} />
                {SIUNJUN1_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("siunjun1", i)}
                    title={getBlockTitle("siunjun1", i)}
                  >
                    <ItemList items={getBlockItems("siunjun1", i, EQUIPMENT_ITEM_COUNTS.siunjun1[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section5Caption")} title={t("section5Title")} />
                {SIUNJUN2_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("siunjun2", i)}
                    title={getBlockTitle("siunjun2", i)}
                  >
                    <ItemList items={getBlockItems("siunjun2", i, EQUIPMENT_ITEM_COUNTS.siunjun2[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("section6Caption")} title={t("section6Title")} />
                {SIUNJUN3_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("siunjun3", i)}
                    title={getBlockTitle("siunjun3", i)}
                  >
                    <ItemList items={getBlockItems("siunjun3", i, EQUIPMENT_ITEM_COUNTS.siunjun3[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section id="heat-treatment-coating" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("section7Caption")} title={t("section7Title")} />
                {YULCHURI_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("yulchuri", i)}
                    title={getBlockTitle("yulchuri", i)}
                  >
                    <ItemList items={getBlockItems("yulchuri", i, EQUIPMENT_ITEM_COUNTS.yulchuri[i])} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            <section id="measurement-inspection" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("section8Caption")} title={t("section8Title")} />
                {CHUKJUNG_CONFIG.map((block, i) => (
                  <EquipmentContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={getBlockTitle("chukjung", i)}
                    title={getBlockTitle("chukjung", i)}
                  >
                    <ItemList items={getBlockItems("chukjung", i, EQUIPMENT_ITEM_COUNTS.chukjung[i])} />
                  </EquipmentContentBlock>
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
