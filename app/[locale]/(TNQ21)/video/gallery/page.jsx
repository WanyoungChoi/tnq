import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import VideoGalleryGrid from "@/components/gallery/VideoGalleryGrid";
import { menuTNQ21 } from "@/data/menuTNQ21";

const ABOUT_IMG = "/assets/images/tnq21/about";

export const metadata = {
  title: "TNQ21 || 갤러리",
  description: "TNQ21 갤러리",
};

function SectionTitle({ caption, title }) {
  return (
    <div className="row mb-60 mb-xs-30">
      <div className="col-md-6">
        {caption != null && caption !== "" && (
          <h2 className="section-caption mb-xs-10 wow fadeInUp" data-wow-duration="1.2s">
            {caption}
          </h2>
        )}
      </div>
    </div>
  );
}

export default function TNQ21VideoGalleryPage() {
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
                className="page-section bg-dark-1 bg-dark-alpha-80 light-content parallax-5"
                style={{
                  backgroundImage: `url(${ABOUT_IMG}/top_banner/banner.png)`,
                }}
              >
                <div className="container position-relative pt-30 pt-sm-50">
                  <div className="text-center">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">
                        <h1 className="hs-title-1 mb-0">
                          <span className="wow charsAnimIn" data-splitting="chars">
                            <AnimatedText text="Gallery" />
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </section>

            <section
              id="gallery"
              className="scrollSpysection page-section bg-dark-2 light-content"
            >
              <div className="container">
                <SectionTitle caption="Gallery" title="갤러리" />
              </div>
              <VideoGalleryGrid />
            </section>
          </main>
          <Footer1 dark />
        </div>
      </div>
    </>
  );
}
