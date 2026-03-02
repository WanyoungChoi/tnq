import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
import { menuTNQ21 } from "@/data/menuTNQ21";
import Map from "@/components/common/Map";

const ABOUT_IMG = "/assets/images/tnq21/about";

export const metadata = {
  title: "TNQ21 || 회사소개",
  description: "TNQ21 회사소개",
};

/** Our Story / Better way to create... 스타일 제목 (main-one-page-slider-background-dark) */
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

const HISTORY_ROWS = [
  { year: "2012", desc: "TNP 금형사업부로 프레스금형사업 개시" },
  { year: "2013", desc: "핫스탬핑부품 냉간트림금형 개발 및 양산화 성공" },
  {
    year: "2013",
    desc: "핫스탬핑부품 냉간트림금형 특허출원 (국내, 미국, 중국, 독일)",
  },
  { year: "2015", desc: "산업혁신3.0 우수기업 표창 장려상 수상" },
  { year: "2022", desc: "TNP – TNQ 법인분할" },
  { year: "2023", desc: "현대/기아자동차 1차협력사 등록 및 거래개시" },
  { year: "2024", desc: "매출 100억 돌파" },
  { year: "2025", desc: "김정호 대표이사 취임" },
];

const HISTORY_IMGS = Array.from(
  { length: 13 },
  (_, i) => `image${String(i + 3).padStart(3, "0")}.png`,
);

const PATENT_ITEMS = [
  { img: "image001.jpg", label: "한국" },
  { img: "image002.jpg", label: "한국" },
  { img: "image003.png", label: "미국" },
  { img: "image004.png", label: "독일" },
  { img: "image005.png", label: "중국" },
];

const CEO_PARAGRAPHS = [
  "안녕하십니까. TNQ 대표이사 김정호입니다.",
  "TNQ는 2012년 TNP 금형사업부로 출발하여, 2022년 TNQ로 인적분할을 통해 새로운 이름으로 독립한 자동차 차체 열간 및 냉간 금형 제작 전문기업입니다. 그동안 축적해 온 경험과 기술력을 바탕으로, 고객사와 함께 성장하며 오늘의 TNQ로 발전해 왔습니다.",
  "창사 이래 TNQ는 지속적인 투자와 기술력 확보를 통해 차별화된 경쟁력을 갖추고자 노력해 왔으며, 정직한 품질과 책임 있는 자세로 고객의 신뢰에 보답하고 있습니다. 빠르게 변화하는 산업 환경 속에서도 TNQ가 꾸준히 성장할 수 있었던 것은 고객 여러분의 아낌없는 성원과 믿음 덕분이라고 생각합니다.",
  "현재 자동차 산업은 전기차와 자율주행 등 새로운 패러다임 속에서 큰 변화를 맞이하고 있습니다. TNQ는 이러한 변화에 발맞추어 차체 경량화를 위한 열간금형 개발과 고장력 강판 대응 금형 제작 기술을 확보하며 미래 모빌리티 시대를 준비하고 있습니다.",
  "앞으로도 TNQ는 단순한 금형 제조사를 넘어 고객의 가치를 함께 만들어가는 신뢰할 수 있는 기술 파트너로서, 최고의 품질과 납기 경쟁력을 통해 고객 만족을 실현해 나가겠습니다.",
  "TNQ는 끊임없는 기술 개발과 혁신을 바탕으로 자동차 차체 금형 분야에서 신뢰받는 기업으로 성장해 나갈 것이며, 항상 고객과 함께 미래를 만들어가는 기업이 되겠습니다.",
  "감사합니다.",
  "㈜ TNQ 대표이사  김정호",
];

export default function TNQ21AboutPage() {
  return (
    <>
      <div className="theme-main dark-mode">
        <div className="page bg-dark-1" id="top">
          <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar">
            <Header1Multipage links={menuTNQ21} />
          </nav>
          <main id="main">
            {/* 1. 첫번째 섹션: 히어로 배너 */}
            <section className="scrollSpysection about-hero-banner">
              <ParallaxContainer
                className="page-section bg-dark-1 bg-dark-alpha-80 light-content parallax-5"
                style={{
                  backgroundImage: `url(${ABOUT_IMG}/top_banner/banner.png)`,
                }}
              >
                <div className="container position-relative about-hero-banner-inner">
                  <div className="text-center">
                    <div className="row">
                      <div className="col-md-8 offset-md-2">
                        <h1 className="hs-title-1 mb-0">
                          <span
                            className="wow charsAnimIn"
                            data-splitting="chars"
                          >
                            <AnimatedText text="Precision molds, crafted with care. Powered by people. Driven by trust." />
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </section>

            {/* 2. CEO 인사말 */}
            <section
              id="ceo-message"
              className="scrollSpysection page-section bg-dark-2 light-content"
            >
              <div className="container">
                <SectionTitle caption="CEO GREETING" title="CEO 인사말" />
                <div className="row">
                  <div className="col-sm-5 mb-xs-50">
                    <div
                      className="position-relative overflow-hidden wow fadeInUp"
                      data-wow-duration="1.2s"
                    >
                      <Image
                        src={`${ABOUT_IMG}/ceo_greetings/ceogreeting2.png`}
                        alt="CEO 인사말"
                        width={500}
                        height={692}
                        className="w-100 h-auto"
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
                      {CEO_PARAGRAPHS.map((p, i) => (
                        <p
                          key={i}
                          className={
                            i === CEO_PARAGRAPHS.length - 1
                              ? "mb-0 text-end"
                              : "mb-40"
                          }
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 회사 연혁 */}
            <section
              id="history"
              className="scrollSpysection page-section bg-dark-1 light-content"
            >
              <div className="container">
                <SectionTitle caption="History" title="회사 연혁" />
                <div className="row justify-content-center">
                  <div className="col-12 overflow-x-auto">
                    <table className="table table-dark table-responsive about-history-table mb-50">
                      <thead>
                        <tr>
                          <th>년도</th>
                          <th>주요 연혁</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HISTORY_ROWS.map((row, i) => (
                          <tr key={i}>
                            <td data-label="년도">{row.year}</td>
                            <td data-label="주요 연혁">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="about-history-strip position-relative overflow-hidden">
                  <div className="about-history-strip-inner d-flex">
                    {HISTORY_IMGS.map((name, i) => (
                      <div
                        key={i}
                        className="about-history-strip-item flex-shrink-0"
                      >
                        <Image
                          src={`${ABOUT_IMG}/history/${name}`}
                          alt={`연혁 ${i + 1}`}
                          width={280}
                          height={180}
                          className="object-fit-cover"
                        />
                      </div>
                    ))}
                    {HISTORY_IMGS.map((name, i) => (
                      <div
                        key={`dup-${i}`}
                        className="about-history-strip-item flex-shrink-0"
                      >
                        <Image
                          src={`${ABOUT_IMG}/history/${name}`}
                          alt=""
                          width={280}
                          height={180}
                          className="object-fit-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. 조직 현황 */}
            <section
              id="organization"
              className="scrollSpysection page-section bg-dark-2 light-content"
            >
              <div className="container">
                <SectionTitle caption="Organization" title="조직 현황" />
                <div className="overflow-hidden">
                  <div
                    className="wow scaleOutIn"
                    data-wow-duration="1.2s"
                    data-wow-offset={0}
                  >
                    <Image
                      src={`${ABOUT_IMG}/organization/조직도.jpg`}
                      alt="조직도"
                      width={1200}
                      height={676}
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 5. 특허 현황 */}
            <section
              id="patents"
              className="scrollSpysection page-section bg-dark-1 light-content"
            >
              <div className="container">
                <SectionTitle caption="Patents" title="특허 현황" />
                <ul className="about-patent-grid row g-4 list-unstyled mb-0">
                  {PATENT_ITEMS.map((item, index) => (
                    <li
                      key={index}
                      className="about-patent-item col-6 col-lg-4 col-xl"
                    >
                      <div className="work-img position-relative overflow-hidden rounded">
                        <Image
                          src={`${ABOUT_IMG}/patent/${item.img}`}
                          alt={item.label}
                          width={400}
                          height={300}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="about-patent-reveal position-absolute bottom-0 start-0 end-0 p-3 text-center bg-dark bg-opacity-75">
                          <span className="text-white">{item.label}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 6. 오시는 길 */}
            <section
              id="location"
              className="scrollSpysection page-section bg-dark-2 light-content"
            >
              <div className="container">
                <SectionTitle caption="Location" title="오시는 길" />
              </div>
              <div className="pt-0">
                <div className="google-map light-content">
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
