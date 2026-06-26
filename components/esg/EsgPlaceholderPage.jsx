import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import { menuTNQ21 } from "@/data/menuTNQ21";
import { getTranslations } from "next-intl/server";

const ABOUT_IMG = "/assets/images/tnq21/about";

export default async function EsgPlaceholderPage({ menuKey }) {
  const tMenu = await getTranslations("menu");

  return (
    <>
      <div className="theme-main dark-mode">
        <div className="page bg-dark-1" id="top">
          <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar">
            <Header1Multipage links={menuTNQ21} />
          </nav>
          <main id="main">
            <section className="page-section pt-0 pb-0">
              <ParallaxContainer
                className="page-section bg-dark-1 bg-dark-alpha-80 light-content parallax-5"
                style={{ backgroundImage: `url(${ABOUT_IMG}/top_banner/banner.png)` }}
              >
                <div className="container position-relative pt-30 pt-sm-50 pb-100">
                  <div className="text-center">
                    <h1 className="hs-title-1 mb-0">
                      <span className="wow charsAnimIn" data-splitting="chars">
                        <AnimatedText text={tMenu(menuKey)} />
                      </span>
                    </h1>
                  </div>
                </div>
              </ParallaxContainer>
            </section>
          </main>
          <Footer1 dark />
        </div>
      </div>
    </>
  );
}
