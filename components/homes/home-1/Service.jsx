import React from "react";

export default function Service() {
  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-lg-6 mb-md-60 mb-sm-30">
          <div className="row">
            <div className="col-lg-10">
              <p
                className="section-descr mb-50 mb-sm-30 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                변화하는 산업 환경 속에서 우리는 멈추지 않습니다.
              </p>
            </div>
          </div>
          <div
            className="section-descr wow fadeInUp services-strategy-list"
            data-wow-delay="0.55s"
          >
            <ul className="list-unstyled mb-0 text-gray">
              <li>- 데이터베이스 확립으로 기술력 축적</li>
              <li>- 표준화 및 문서화로 실무 적극 활용</li>
              <li>- 무인가동 및 자동화로 스마트공정 도입</li>
              <li>- 기술교육을 통한 업계 경쟁력 강화</li>
              <li>- 지속적인 R&D투자로 신규사업 유치</li>
              <li>- 글로벌 시장 대응을 위한 전략 수립</li>
            </ul>
          </div>
        </div>
        <div
          className="col-lg-6 d-flex wow fadeInLeft"
          data-wow-delay="0.55s"
          data-wow-offset={275}
        >
          <div className="services-content position-relative overflow-hidden rounded">
            <video
              src="/assets/videos/brand_strat.mp4"
              className="services-image w-100"
              style={{ objectFit: "cover", display: "block" }}
              autoPlay
              muted
              loop
              playsInline
              aria-label="CEO 오피스"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
