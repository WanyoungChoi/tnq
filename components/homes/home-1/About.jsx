"use client";
import Image from "next/image";

export default function About() {
  return (
    <div className="row wow fadeInUp" data-wow-delay="0.5s">
      <div className="col-lg-6 mb-md-60">
        <div className="position-relative">
          {/* Video */}
          <div className="position-relative overflow-hidden">
            <video
              src="/assets/videos/ceo_worker_vertical.mp4"
              className="image-fullwidth w-100"
              style={{ objectFit: "cover", aspectRatio: "16/9" }}
              autoPlay
              muted
              loop
              playsInline
              aria-label="CEO 및 현장"
            />
            {/* 가장자리 어두운 비네팅 */}
            <div
              className="position-absolute pointer-events-none"
              style={{
                inset: 0,
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.9) 100%)",
              }}
              aria-hidden
            />
          </div>
          {/* End Video */}
          {/* Decorative Waves */}
          <div
            className="decoration-1 d-none d-sm-block"
            data-rellax-y=""
            data-rellax-speed={1}
            data-rellax-percentage="0.1"
          >
            <Image
              width="159"
              height="74"
              src="/assets/images/decoration-1.svg"
              className="svg-shape"
              alt="resonance template image"
            />
          </div>
          {/* End Decorative Waves */}
        </div>
      </div>
      <div
        className="col-lg-6 col-xl-5 offset-xl-1 wow fadeInUp"
        data-wow-delay="0.7s"
        data-wow-duration="0.8s"
      >
        <h4 className="h5">우리의 비젼</h4>
        <div
          className="wow fadeInUp"
          data-wow-delay="0.8s"
          data-wow-duration="0.8s"
        >
          <p className="text-gray">
            우리는 축적된 금형 기술과 현장 중심의 노하우를 바탕으로
            고품질·고정밀 금형을 안정적으로 공급합니다. 빠른 대응력과 철저한
            품질관리로 고객의 생산성을 높이고, 지속 가능한 제조 파트너로 함께
            성장합니다.
          </p>
        </div>
        <h4 className="h5">우리의 미션</h4>
        <div
          className="wow fadeInUp"
          data-wow-delay="0.8s"
          data-wow-duration="0.8s"
        >
          <p className="text-gray">
            우리는 사람의 정성과 기술이 만나 최고의 금형이 만들어진다고
            믿습니다. 서로를 존중하는 현장에서 안전과 신뢰를 가장 소중한 가치로
            지켜갑니다. 고객의 고민을 함께 나누며 진심으로 소통하는 파트너가
            되겠습니다. 함께 일하는 모든 사람의 성장이 곧 우리의 성장임을
            약속합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
