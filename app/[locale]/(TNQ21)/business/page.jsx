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

export const metadata = {
  title: "TNQ21 || 사업현황",
  description: "TNQ21 사업현황",
};

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

// ——— Section 2: HOT STAMPING DIE - 기술업무 (HSDIE1) — image001↔1번, image002↔2번, ...
const HSDIE1_BLOCKS = [
  {
    imageSrc: `${B}/HSDIE1/image001.png`,
    title: "1.성형 해석",
    items: [
      "주변형률 점검(강성)",
      "부변형률 점검(굴곡)",
      "선밀림, 쇼크라인 점검",
      "주름 상태 점검",
      "굴곡 상태 점검",
      "스프링백 점검",
      "소재 감소율 점검",
    ],
  },
  {
    imageSrc: `${B}/HSDIE1/image002.png`,
    title: "2.공법결정",
    items: [
      "성형력 결정 ( 생산PRESS )",
      "PAD'G력 결정",
      "블랭크 홀더 압력 결정",
      "비드 설정구간 및 타입결정",
      "프로파일 및 다이페이스 설정",
      "가형상 및 소재 사이즈 결정",
      "소재 수율 및 블랭크 사이즈 결정",
    ],
  },
  {
    imageSrc: `${B}/HSDIE1/image003.png`,
    title: "3.다이 디자인",
    items: [
      "생산설비에 맞는 다이 설계",
      "공법에 맞는 다이 설계",
      "원가절감을 위한 다이 설계",
      "트러스트 발생 억제 설계",
      "구조적 취약구간 없는 설계",
      "안전을 고려한 설계",
      "고객이 원하는 설계",
    ],
  },
  {
    imageSrc: `${B}/HSDIE1/image004.png`,
    title: "4.유동해석",
    items: [
      "냉각채널 유속 분석",
      "상,하형,PAD, B/H 유동 분석",
      "합류 및 분기 부분의 와류 분석",
      "냉각수 필요 압력 분석",
      "냉각수로 구간별 사이즈 결정",
      "냉각수로 위치 및 수량 결정",
    ],
  },
];

// ——— Section 3: HOT STAMPING DIE - 생산업무 (HSDIE2) — image001↔1번, ...
const HSDIE2_BLOCKS = [
  {
    imageSrc: `${B}/HSDIE2/image001.jpg`,
    title: "1. 패턴,주물 제작",
    items: ["패턴 제작", "페턴 검사", "주물 제작", "주물 검사"],
  },
  {
    imageSrc: `${B}/HSDIE2/image002.jpg`,
    title: "2. 스틸, 주물 가공",
    items: [
      "주물,스틸,베이스플레이트 면삭",
      "형상스틸 수로 건드릴 가공",
      "형상 단품 형상가공 ( 황,중삭 )",
      "열처리 및 연마 가공",
      "주물+스틸 조립",
      "형상면 정삭가공",
    ],
  },
  {
    imageSrc: `${B}/HSDIE2/image003.jpg`,
    title: "3. 금형 부품 조립",
    items: [
      "배관 부품 조립",
      "압력용 부품 조립",
      "게이지 조립",
      "가이드 부품 조립",
      "기타 액세서리 조립",
      "안전관련 부품 조립",
    ],
  },
  {
    imageSrc: `${B}/HSDIE2/image004.png`,
    title: "4. T/O 및 품질 육성",
    items: [
      "하사점 확인 T/O",
      "형합 확인 및 육성",
      "재료t 확인용 납 체크",
      "성형성 확인용 T/O",
      "레이져 절단 후 품질 확인",
      "품질결과에 따른 수정방안 수립",
    ],
  },
];

// ——— Section 4: COLD STAMPING DIE - 기술업무 (CSDIE1) — image001↔1번, ...
const CSDIE1_BLOCKS = [
  {
    imageSrc: `${B}/CSDIE1/image001.png`,
    title: "1.성형 해석",
    items: [
      "주변형률 점검(강성)",
      "부변형률 점검(굴곡)",
      "선밀림, 쇼크라인 점검",
      "주름 상태 점검",
      "굴곡 상태 점검",
      "스프링백 점검",
      "소재 감소율 점검",
    ],
  },
  {
    imageSrc: `${B}/CSDIE1/image002.png`,
    title: "2.공법결정",
    items: [
      "성형력 결정 ( 생산PRESS )",
      "PAD'G력 결정",
      "블랭크 홀더 압력 결정",
      "비드 설정구간 및 타입결정",
      "프로파일 및 다이페이스 설정",
      "가형상 및 소재 사이즈 결정",
      "소재 수율 및 블랭크 사이즈 결정",
    ],
  },
  {
    imageSrc: `${B}/CSDIE1/image003.jpg`,
    title: "3.레이아웃 설정",
    items: [
      "공정분배 레이아웃 설정",
      "전단 공정 분배 및 스크랩 취출 결정",
      "각 공정별 생산압력 설정",
      "고객사의 요구를 반영한 공법결정",
      "생산성을 위한 자동화구조 설정",
      "안전을 고려한 설계",
      "고객이 원하는 설계",
    ],
  },
  {
    imageSrc: `${B}/CSDIE1/image004.png`,
    title: "4.공정 설계",
    items: [
      "레이아웃에서 결정된 각 공정설계",
      "생산설비 스팩에 맞춘 구조설계",
      "생산볼륨에 따른 내구성 고려설계",
      "생산설비에 맞춘 자동화 설계",
      "구조적 취약부 없는 구조 설계",
      "스크랩 배출관련 세부 검토적용",
    ],
  },
];

// ——— Section 5: HOT STAMPING TRIM'G DIE - 기술업무 (HSTDIE) — image001↔1번, image002↔2번
const HSTDIE_BLOCKS = [
  {
    imageSrc: `${B}/HSTDIE/image001.jpg`,
    title: "1.공법결정",
    items: [
      "정트림 가트림 구간 결정",
      "전단구간 공정분배",
      "릴리프 구간 설정",
      "전단 인서트 구간 설정",
      "전단압력 계산 및 양산프레스 스팩적용",
      "자동화 위치 및 방법 결정",
      "스크랩 취출 고려 공정 분배",
    ],
  },
  {
    imageSrc: `${B}/HSTDIE/image002.jpg`,
    title: "2.공정 설계",
    items: [
      "양산설비 규격에 맞는 구조설계",
      "구조적 안정성 고려 설계",
      "스틸분할 및 릴리프 구간 설정",
      "전단 인서트 구간 설정 및 구조설정",
      "자동화 관련 구조 설계",
      "고객 요구사항 반영 구조설계",
      "생산볼륨 고려 재질 및 보강 설정",
    ],
  },
];

// ——— Section 6: COLD STAMPING DIE - 생산업무 (CSDIE2) — image001↔1번, ...
const CSDIE2_BLOCKS = [
  {
    imageSrc: `${B}/CSDIE2/image001.jpg`,
    title: "1. 패턴,주물 제작",
    items: ["패턴 제작", "페턴 검사", "주물 제작", "주물 검사"],
  },
  {
    imageSrc: `${B}/CSDIE2/image002.jpg`,
    title: "2. 스틸, 주물 가공",
    items: [
      "주물,스틸,PAD,B/H 면삭",
      "형상스틸 면삭 가공",
      "형상 단품 형상가공 ( 황,중삭 )",
      "스틸,주강,주물 조립",
      "형상면 정삭 가공",
      "인부, FL스틸 정삭가공",
      "열처리 및 코팅 ( 최종 품질확인 후 )",
    ],
  },
  {
    imageSrc: `${B}/CSDIE2/image003.jpg`,
    title: "3. 금형 부품 조립",
    items: [
      "가이드 부품 조립",
      "압력용 부품 조립",
      "게이지 조립",
      "인부,피어스,캠 부품 조립",
      "기타 액세서리 조립",
      "안전관련 부품 조립",
    ],
  },
  {
    imageSrc: `${B}/CSDIE2/image004.png`,
    title: "4. T/O 및 품질 육성",
    items: [
      "하사점 확인 T/O",
      "형합 확인 및 육성",
      "재료t 확인용 납 체크",
      "성형성 확인용 T/O",
      "전공정T/O 후 품질 확인",
      "품질결과에 따른 수정방안 수립",
    ],
  },
];

export default function TNQ21BusinessPage() {
  return (
    <>
      <div className="theme-main dark-mode">
        <div className="page bg-dark-1" id="top">
          <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar">
            <Header1Multipage links={menuTNQ21} />
          </nav>
          <main id="main">
            {/* 1. top 배너 (about과 동일) */}
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

            {/* 2. HOT STAMPING DIE - 기술업무 (메뉴 앵커: hot-stamping-die) */}
            <section
              id="hot-stamping-die"
              className="scrollSpysection page-section bg-dark-2 light-content"
            >
              <div className="container">
                <SectionTitle
                  caption="HS DIE"
                  title="HOT STAMPING DIE - 기술업무"
                />
                {HSDIE1_BLOCKS.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`HOT STAMPING DIE 기술업무 ${i + 1}`}
                    title={block.title}
                  >
                    <ItemList items={block.items} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            {/* 3. HOT STAMPING DIE - 생산업무 */}
            <section className="scrollSpysection page-section bg-dark-1 light-content">
              <div className="container">
                <SectionTitle
                  caption="HS DIE"
                  title="HOT STAMPING DIE - 생산업무"
                />
                {HSDIE2_BLOCKS.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`HOT STAMPING DIE 생산업무 ${i + 1}`}
                    title={block.title}
                  >
                    <ItemList items={block.items} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            {/* 4. COLD STAMPING DIE - 기술업무 (메뉴 앵커: cold-stamping-die) */}
            <section
              id="cold-stamping-die"
              className="scrollSpysection page-section bg-dark-2 light-content"
            >
              <div className="container">
                <SectionTitle
                  caption="CS DIE"
                  title="COLD STAMPING DIE - 기술업무"
                />
                {CSDIE1_BLOCKS.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`COLD STAMPING DIE 기술업무 ${i + 1}`}
                    title={block.title}
                  >
                    <ItemList items={block.items} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            {/* 5. HOT STAMPING TRIM'G DIE - 기술업무 (메뉴 앵커: hot-stamping-trim-die) */}
            <section
              id="hot-stamping-trim-die"
              className="scrollSpysection page-section bg-dark-1 light-content"
            >
              <div className="container">
                <SectionTitle
                  caption="HS TRIM'G DIE"
                  title="HOT STAMPING TRIM'G DIE - 기술업무"
                />
                {HSTDIE_BLOCKS.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`HOT STAMPING TRIM'G DIE 기술업무 ${i + 1}`}
                    title={block.title}
                  >
                    <ItemList items={block.items} />
                  </BusinessContentBlock>
                ))}
              </div>
            </section>

            {/* 6. COLD STAMPING DIE - 생산업무 */}
            <section className="scrollSpysection page-section bg-dark-2 light-content">
              <div className="container">
                <SectionTitle
                  caption="CS DIE"
                  title="COLD STAMPING DIE - 생산업무"
                />
                {CSDIE2_BLOCKS.map((block, i) => (
                  <BusinessContentBlock
                    key={i}
                    imageSrc={block.imageSrc}
                    imageAlt={`COLD STAMPING DIE 생산업무 ${i + 1}`}
                    title={block.title}
                  >
                    <ItemList items={block.items} />
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
