import Footer1 from "@/components/footers/Footer1";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Header1Multipage from "@/components/headers/Header1Multipage";
import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
import { menuTNQ21 } from "@/data/menuTNQ21";

const ABOUT_IMG = "/assets/images/tnq21/about";
const E = "/assets/images/tnq21/equipment";

export const metadata = {
  title: "TNQ21 || 설비현황",
  description: "TNQ21 설비현황",
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

// Section 2: 가공 설비 - 대형 설비 (5축 가공기) — gagong1, 2 images
const GAGONG1_BLOCKS = [
  {
    imageSrc: `${E}/gagong1/image001.png`,
    title: "1. SNK RB-5VM/CS",
    items: ["TABLE : 2500 X 5000", "최대 가공크기 : 2900 X 5000 X 2000h", "8000RPM,", "1도, 90도 분할 센터스윙"],
  },
  {
    imageSrc: `${E}/gagong1/image002.png`,
    title: "2. OKUMA MCR-B2",
    items: ["TABLE : 2000 X 4000", "최대 가공크기 : 2500 X 4000 X 1200h", "6000RPM,", "5도, 90도 분할 센터스윙"],
  },
];

// Section 3: 가공 설비 - 대형 설비 (범용) — gagong2, 4 images
const GAGONG2_BLOCKS = [
  { imageSrc: `${E}/gagong2/image001.png`, title: "1.SNK RB-4N", items: ["TABLE SIZE : 2500 X 5000", "MAX 가공사이즈 : 2900 X 5000", "RPM 4000"] },
  { imageSrc: `${E}/gagong2/image002.png`, title: "2.OKUMA MCV", items: ["TABLE SIZE : 2000 X 4000", "MAX 가공사이즈 : 2400 X 4000", "RPM 2000"] },
  { imageSrc: `${E}/gagong2/image003.png`, title: "3.MITUBISHI", items: ["TABLE SIZE : 1500 X 4000", "MAX 가공사이즈 : 2000 X 4000", "RPM 4000", "90도 유니버셜"] },
  { imageSrc: `${E}/gagong2/image004.JPG`, title: "4.DOOSAN MB-860", items: ["TABLE SIZE : 800 X 2000", "MAX 가공사이즈 : 800 X 2000", "RPM 8000"] },
];

// Section 4: 가공 설비 - 소형 설비 (범용) — gagong3, 6 images
const GAGONG3_BLOCKS = [
  { imageSrc: `${E}/gagong3/image001.png`, title: "1.양두 밀링", items: [] },
  { imageSrc: `${E}/gagong3/image002.png`, title: "2.범용밀링", items: [] },
  { imageSrc: `${E}/gagong3/image003.png`, title: "3.레디얼머신", items: ["SIZE : 2000", "1600", "1200"] },
  { imageSrc: `${E}/gagong3/image004.png`, title: "4.범용선반", items: [] },
  { imageSrc: `${E}/gagong3/image005.jpg`, title: "5.범용연마기", items: [] },
  { imageSrc: `${E}/gagong3/image006.jpg`, title: "6.소형MCT", items: ["SIZE : 400 X 800", "3축", "400 X 800", "4축"] },
];

// Section 5: 시운전 설비 - HOT STAMP'G T/O — siunjun1, 5 images
const SIUNJUN1_BLOCKS = [
  {
    imageSrc: `${E}/siunjun1/image001.png`,
    title: "1.800톤 유압 프레스",
    items: ["메이커 : 극동프레스", "핫스템핑 전용 고속 하강 프레스", "MAX 성형압 800 톤", "TABLE SIZE : 2800 X 3500", "MAX HEIGHT : 2200", "로봇 자동화 장치"],
  },
  {
    imageSrc: `${E}/siunjun1/image002.png`,
    title: "2.T/O용 가열로, 냉각기",
    items: ["메이커 : 신성열연", "MAX 1200도 전기식 가열로", "가열로 SIZE : 2300 X 3000", "자동투입식 로봇 및 대차", "소재위치결정용 테이블", "냉각수 공급용 칠러( MAX 3bar )"],
  },
  { imageSrc: `${E}/siunjun1/image003.png`, title: "3.HOT STAMP'G T/O", items: [] },
  { imageSrc: `${E}/siunjun1/image004.png`, title: "4.HOT STAMP'G T/O", items: [] },
  { imageSrc: `${E}/siunjun1/image005.png`, title: "5.HOT STAMP'G T/O", items: [] },
];

// Section 6: 시운전 설비 - 메카 프레스 — siunjun2, 2 images
const SIUNJUN2_BLOCKS = [
  {
    imageSrc: `${E}/siunjun2/image001.JPG`,
    title: "1. 1200 Ton메카 프레스",
    items: ["MAKER : ROBUS 1200 Ton", "TABLE SIZE : 2500 X 4000", "RAM STROKE : 700", "DIE HEIGHT : 700~1400", "DIE CUSHION : 0~400", "FORCE METER"],
  },
  {
    imageSrc: `${E}/siunjun2/image002.JPG`,
    title: "2. 1200Ton 메카 프레스",
    items: ["MAKER : KOBE 1200 Ton", "TABLE SIZE : 2000 X 3000", "RAM STROKE : 700", "DIE HEIGHT : 700~1200", "DIE CUSHION : 0~300"],
  },
];

// Section 7: 시운전 설비 - 유압 프레스 — siunjun3, 2 images
const SIUNJUN3_BLOCKS = [
  {
    imageSrc: `${E}/siunjun3/image001.jpg`,
    title: "1. 1000 Ton유압 프레스",
    items: ["MAKER : JUNGWOO 1000 Ton", "TABLE SIZE : 2500 X 4500", "RAM STROKE : 1200", "DIE HEIGHT : 700~2000", "DIE CUSHION : 0~400", "금형 조립 및 형합 작업용"],
  },
  {
    imageSrc: `${E}/siunjun3/image002.jpg`,
    title: "2. 800 Ton유압 프레스",
    items: ["MAKER : 극동 800 Ton", "TABLE SIZE : 2800 X 3500", "RAM STROKE : 1200", "DIE HEIGHT : 700~2000", "DIE CUSHION : 없음", "핫스테밍 T/O 및 형합 및 조립용"],
  },
];

// Section 8: 열처리,코팅 설비 - 열처리 설비 — yulchuri, 4 images
const YULCHURI_BLOCKS = [
  { imageSrc: `${E}/yulchuri/image001.jpg`, title: "1.진공열처리", items: [] },
  { imageSrc: `${E}/yulchuri/image002.jpg`, title: "2.진공로-5기", items: [] },
  { imageSrc: `${E}/yulchuri/image003.jpg`, title: "3.템퍼링로", items: [] },
  { imageSrc: `${E}/yulchuri/image004.jpg`, title: "4.이온질화로-2기", items: [] },
];

// Section 9: 측정 및 검사설비 - 측정 설비 — chukjung, 5 images
const CHUKJUNG_BLOCKS = [
  { imageSrc: `${E}/chukjung/image001.jpg`, title: "1.CMM 측정기", items: [] },
  { imageSrc: `${E}/chukjung/image002.jpg`, title: "2.3차원 측정기", items: [] },
  { imageSrc: `${E}/chukjung/image003.jpg`, title: "3.3D 스캐너", items: [] },
  { imageSrc: `${E}/chukjung/image004.jpg`, title: "4.경도측정기", items: [] },
  { imageSrc: `${E}/chukjung/image005.jpg`, title: "5.검사실", items: [] },
];

export default function TNQ21EquipmentPage() {
  return (
    <>
      <div className="theme-main dark-mode">
        <div className="page bg-dark-1" id="top">
          <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar">
            <Header1Multipage links={menuTNQ21} />
          </nav>
          <main id="main">
            {/* 1. top 배너 */}
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
                            <AnimatedText text="Precision molds, crafted with care. Powered by people. Driven by trust." />
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </section>

            {/* 2. 가공 설비 - 대형 설비 (5축 가공기) — id=machining */}
            <section id="machining" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption="Machining Equipment" title="가공 설비 - 대형 설비 (5축 가공기)" />
                {GAGONG1_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 3. 가공 설비 - 대형 설비 (범용) */}
            <section className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption="Machining Equipment" title="가공 설비 - 대형 설비 (범용)" />
                {GAGONG2_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 4. 가공 설비 - 소형 설비 (범용) */}
            <section className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption="Machining Equipment" title="가공 설비 - 소형 설비 (범용)" />
                {GAGONG3_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 5. 시운전 설비 - HOT STAMP'G T/O — id=trial-run */}
            <section id="trial-run" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption="Testing Equipment" title="시운전 설비 - HOT STAMP'G T/O" />
                {SIUNJUN1_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 6. 시운전 설비 - 메카 프레스 */}
            <section className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption="Testing Equipment" title="시운전 설비 - 메카 프레스" />
                {SIUNJUN2_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 7. 시운전 설비 - 유압 프레스 */}
            <section className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption="Testing Equipment" title="시운전 설비 - 유압 프레스" />
                {SIUNJUN3_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 8. 열처리,코팅 설비 - 열처리 설비 — id=heat-treatment-coating */}
            <section id="heat-treatment-coating" className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle caption="Heat Treatment & Coating Equipmen" title="열처리,코팅 설비 - 열처리 설비" />
                {YULCHURI_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
                  </EquipmentContentBlock>
                ))}
              </div>
            </section>

            {/* 9. 측정 및 검사설비 - 측정 설비 — id=measurement-inspection */}
            <section id="measurement-inspection" className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle caption="Measurement & Inspection Equipment" title="측정 및 검사설비 - 측정 설비" />
                {CHUKJUNG_BLOCKS.map((block, i) => (
                  <EquipmentContentBlock key={i} imageSrc={block.imageSrc} imageAlt={block.title} title={block.title}>
                    <ItemList items={block.items} />
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
