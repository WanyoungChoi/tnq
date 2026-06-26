import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
import { menuTNQ21 } from "@/data/menuTNQ21";
import { getTranslations } from "next-intl/server";

const ABOUT_IMG = "/assets/images/tnq21/about";
const ESG_IMG = "/assets/images/tnq21/esg";
const ATTACH_BASE = "/assets/attachfiles";

const POLICY_ITEMS = [
  {
    image: `${ESG_IMG}/esg1_1.JPG`,
    fileName: "환경정책_TNQ_2026 0601.docx",
    altKey: "policyImageAlt1",
  },
  {
    image: `${ESG_IMG}/esg1_2.JPG`,
    fileName: "폐기물관리규정_TNQ_2026 0601.docx",
    altKey: "policyImageAlt2",
  },
];

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("esgEnvironmentalTitle"), description: t("esgEnvironmentalDesc") };
}

export default async function TNQ21EsgEnvironmentalPage() {
  const t = await getTranslations("esgEnvironmental");

  return (
    <>
      <div className="theme-main dark-mode">
        <div className="page bg-dark-1" id="top">
          <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar">
            <Header1Multipage links={menuTNQ21} />
          </nav>
          <main id="main">
            <section className="page-section pt-0 pb-0" id="home">
              <ParallaxContainer
                className="page-section pb-100 pb-sm-60 bg-dark-1 bg-dark-alpha-70 light-content parallax-5"
                style={{ backgroundImage: `url(${ABOUT_IMG}/top_banner/banner.png)` }}
              >
                <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-gradient-dark" />
                <div className="container position-relative pt-50">
                  <div className="text-center">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">
                        <h1 className="hs-title-1 mb-20 mb-sm-10">
                          <span className="wow charsAnimIn" data-splitting="chars">
                            <AnimatedText text={t("heroTitle")} />
                          </span>
                        </h1>
                        <p
                          className="section-descr mb-0 wow fadeInUp"
                          data-wow-duration="1.2s"
                          data-wow-delay="0.2s"
                        >
                          {t("heroSubtitle")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </section>

            <section className="page-section bg-dark-2 light-content">
              <div className="container">
                <div className="row mb-60 mb-xs-30">
                  <div className="col-md-8 offset-md-2 text-center">
                    <h3
                      className="section-title mb-0 wow fadeInUp"
                      data-wow-duration="1.2s"
                      data-wow-delay="0.1s"
                    >
                      <AnimatedText text={t("sectionPolicyTitle")} />
                    </h3>
                  </div>
                </div>

                <ul className="esg-policy-grid row g-4 g-lg-5 list-unstyled mb-0 justify-content-center">
                  {POLICY_ITEMS.map((item, index) => (
                    <li key={index} className="col-md-6 col-lg-5">
                      <div className="esg-policy-card wow fadeInUp" data-wow-delay={`${0.2 + index * 0.1}s`}>
                        <div className="esg-policy-media">
                          <div className="work-img position-relative overflow-hidden">
                            <Image
                              src={item.image}
                              alt={t(item.altKey)}
                              width={640}
                              height={900}
                              className="w-100 h-auto object-fit-cover"
                            />
                          </div>
                          <a
                            href={`${ATTACH_BASE}/${encodeURIComponent(item.fileName)}`}
                            download
                            className="esg-policy-download btn btn-mod btn-border btn-hover-anim light-content"
                          >
                            <span>{t("download")}</span>
                            <i className="mi-download" aria-hidden />
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
          <Footer1 dark />
        </div>
      </div>
    </>
  );
}
