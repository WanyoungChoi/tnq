import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
import { menuTNQ21 } from "@/data/menuTNQ21";
import Map from "@/components/common/Map";
import { getLocale, getTranslations } from "next-intl/server";

const ABOUT_IMG = "/assets/images/tnq21/about";

const HISTORY_IMGS = [
  "hyundaimotor.jpg", "image003.png", "hyundaisteel.jpg", "image005.png",
  "gm.jpg", "image006.png", "image007.png", "image008.png",
  "image009.png", "image010.png", "image011.png", "image012.png",
];

const PATENT_IMGS = ["image001.jpg", "image002.jpg", "image003.png", "image004.png", "image005.png"];

const NUM_CEO_PARAGRAPHS = 9;
const NUM_HISTORY_ROWS = 8;

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("aboutTitle"), description: t("aboutDesc") };
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

export default async function TNQ21AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations("about");
  const orgChartImg = `${ABOUT_IMG}/organization/organ_map${locale === "en" ? "_en" : ""}.png`;

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

            <section id="ceo-message" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("sectionCeoCaption")} title={t("sectionCeoTitle")} />
                <div className="row">
                  <div className="col-sm-5 mb-xs-50">
                    <div className="position-relative overflow-hidden wow fadeInUp" data-wow-duration="1.2s">
                      <video
                        src="/assets/videos/ceo_office_vertical.mp4"
                        className="w-100 h-auto"
                        style={{ display: "block", objectFit: "cover" }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={t("altCeoVideo")}
                      />
                      <div
                        className="position-absolute top-0 start-0 end-0 bottom-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.9) 100%)",
                        }}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="col-sm-7 col-xl-6 offset-xl-1 mt-n10">
                    <div className="text-gray">
                      {Array.from({ length: NUM_CEO_PARAGRAPHS }, (_, i) => (
                        <p
                          key={i}
                          className={i === NUM_CEO_PARAGRAPHS - 1 ? "mb-0 text-end" : "mb-40"}
                        >
                          {t(`ceoParagraphs.${i}`)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="history" className="scrollSpysection page-section bg-dark-1 light-content about-history-section">
              <div className="about-history-bg" aria-hidden />
              <div className="container position-relative">
                <SectionTitle caption={t("sectionHistoryCaption")} title={t("sectionHistoryTitle")} />
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10 col-xl-8">
                    <div className="about-history-list">
                      {Array.from({ length: NUM_HISTORY_ROWS }, (_, i) => (
                        <div key={i} className="about-history-item">
                          <span className="about-history-year">{t(`historyRows.${i}.year`)}</span>
                          <span className="about-history-desc">{t(`historyRows.${i}.desc`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="organization" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("sectionOrgCaption")} title={t("sectionOrgTitle")} />
                <div className="overflow-hidden">
                  <div className="wow scaleOutIn" data-wow-duration="1.2s" data-wow-offset={0}>
                    <Image
                      src={orgChartImg}
                      alt={t("altOrgChart")}
                      width={1200}
                      height={676}
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section id="patents" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("sectionPatentsCaption")} title={t("sectionPatentsTitle")} />
                <ul className="about-patent-grid row g-4 list-unstyled mb-0">
                  {PATENT_IMGS.map((img, index) => (
                    <li key={index} className="about-patent-item col-6 col-lg-4 col-xl">
                      <div className="work-img position-relative overflow-hidden rounded">
                        <Image
                          src={`${ABOUT_IMG}/patent/${img}`}
                          alt={t(`patentLabels.${index}`)}
                          width={400}
                          height={300}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="about-patent-reveal position-absolute bottom-0 start-0 end-0 p-3 text-center bg-dark bg-opacity-75">
                          <span className="text-white">{t(`patentLabels.${index}`)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="customers" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption={t("sectionCustomersCaption")} title={t("sectionCustomersTitle")} />
                <ul className="works-grid work-grid-4 work-grid-gut-lg hover-white work-grid-hover-alt clearfix">
                  {HISTORY_IMGS.map((imgName, index) => (
                    <li key={index} className="work-item">
                      <a className="work-ext-link" href="#customers" aria-label={`${t("altMainCustomer")} ${index + 1}`}>
                        <div className="work-img">
                          <div className="work-img-bg" />
                          <Image
                            src={`${ABOUT_IMG}/history/${imgName}`}
                            alt={`${t("altMainCustomer")} ${index + 1}`}
                            width={280}
                            height={180}
                            className="w-100 h-100 object-fit-cover"
                          />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="location" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption={t("sectionLocationCaption")} title={t("sectionLocationTitle")} />
                <div className="google-map light-content pt-0">
                  <Map />
                </div>
              </div>
            </section>
          </main>
          <Footer1 dark />
        </div>
      </div>
    </>
  );
}
