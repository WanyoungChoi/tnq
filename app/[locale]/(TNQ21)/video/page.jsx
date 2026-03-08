import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import { menuTNQ21 } from "@/data/menuTNQ21";

const ABOUT_IMG = "/assets/images/tnq21/about";

export const metadata = {
  title: "TNQ21 || 홍보영상",
  description: "TNQ21 홍보영상",
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
        <h3 className="section-title mb-0 wow fadeInUp" data-wow-duration="1.2s" data-wow-delay="0.1s">
          <AnimatedText text={title} />
        </h3>
      </div>
    </div>
  );
}

const FACTORY_VIDEOS = [
  { title: "TNQ 공장 전경_1", videoId: "DJ5cB7uOikY" },
  { title: "TNQ 공장 전경_2", videoId: "05QtrCiNbw4" },
];

const HOT_STAMPING_VIDEOS = [
  { title: "TNQ 핫스템핑 T/O CTR PLR", videoId: "QCwb6L3kbV0" },
  { title: "TNQ 핫스탬핑 T/O 동영상", videoId: "0m2s-ojKbO8" },
  { title: "TNQ 핫스탬핑 T/O 영상", videoId: "jZBPOHOxNuc" },
  { title: "TNQ 핫스템핑 T/O", videoId: "vsq46T8fCIM", isShorts: true },
];

export default function TNQ21VideoPage() {
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
                        <h1 className="hs-title-1 mb-20">
                          <span className="wow charsAnimIn" data-splitting="chars">
                            <AnimatedText text="영상으로 보는 우리의 기술과 현장" />
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </section>

            {/* 두번째 섹션: Factory Video */}
            <section id="factory" className="page-section bg-dark-2 light-content scrollSpysection">
              <div className="container relative">
                <SectionTitle caption="Factory Video" title="TNQ Factory Video" />
                <div className="row mb-n40">
                  {FACTORY_VIDEOS.map((item) => (
                    <div
                      key={item.videoId}
                      className={`col-12 mb-40 ${item.isShorts ? "tnq-video-shorts-wrap" : ""}`}
                    >
                      <h3 className="section-title-sm mb-20">{item.title}</h3>
                      <div className="video">
                        <iframe
                          loading="lazy"
                          width="100%"
                          height={item.isShorts ? 560 : 350}
                          src={`https://www.youtube.com/embed/${item.videoId}`}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 세번째 섹션: Hot Stamping Video */}
            <section id="hot-stamping" className="page-section bg-dark-1 light-content scrollSpysection">
              <div className="container relative">
                <SectionTitle caption="Hot Stamping Video" title="TNQ Hot Stamping Video" />
                <div className="row mb-n40">
                  {HOT_STAMPING_VIDEOS.map((item) => (
                    <div
                      key={item.videoId}
                      className={`col-12 mb-40 ${item.isShorts ? "tnq-video-shorts-wrap" : ""}`}
                    >
                      <h3 className="section-title-sm mb-20">{item.title}</h3>
                      <div className="video">
                        <iframe
                          loading="lazy"
                          width="100%"
                          height={item.isShorts ? 560 : 350}
                          src={`https://www.youtube.com/embed/${item.videoId}`}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
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
