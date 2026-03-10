import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import ProductInquiryForm from "@/components/forms/ProductInquiryForm";
import { menuTNQ21 } from "@/data/menuTNQ21";
import { getTranslations } from "next-intl/server";

const ABOUT_IMG = "/assets/images/tnq21/about";

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return { title: t("productInquiryTitle"), description: t("productInquiryDesc") };
}

export default async function CustomerCenterProductInquiryPage() {
  const t = await getTranslations("customerCenter");

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
                className="page-section pb-100 pb-sm-60 bg-dark-1 bg-dark-alpha-80 light-content parallax-5"
                style={{ backgroundImage: `url(${ABOUT_IMG}/top_banner/banner.png)` }}
              >
                <>
                  <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-gradient-dark"></div>
                  <div className="container position-relative pt-50">
                    <div className="text-center">
                      <div className="row">
                        <div className="col-md-8 offset-md-2">
                          <h2
                            className="section-caption-border mb-30 mb-xs-20 wow fadeInUp"
                            data-wow-duration="1.2s"
                          >
                            {t("productInquiryCaption")}
                          </h2>
                          <h1 className="hs-title-1 mb-0">
                            <span className="wow charsAnimIn" data-splitting="chars">
                              <AnimatedText text={t("productInquirySubtitle")} />
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </ParallaxContainer>
            </section>
            <section className="page-section bg-dark-1 light-content pt-0" id="contact">
              <div className="container">
                <div className="row">
                  <div className="col-md-10 offset-md-1">
                    <ProductInquiryForm />
                  </div>
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
