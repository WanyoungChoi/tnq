"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedText from "@/components/common/AnimatedText";
import { useTranslations } from "next-intl";
import { init_wow } from "@/utlis/initWowjs";

const VIDEO_SRC = "/assets/videos/main.mp4";

export default function Hero5({ dark }) {
  const t = useTranslations("hero");
  const [showContent, setShowContent] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    setShowContent(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  // 비디오 종료 후 콘텐츠가 보이면 WOW.js 재실행 → .wow 요소들(AnimatedText 등) 애니메이션 적용
  useEffect(() => {
    if (!showContent) return;
    const id = setTimeout(() => {
      init_wow();
    }, 400);
    return () => clearTimeout(id);
  }, [showContent]);

  return (
    <div className="position-relative hero5-wrap" style={{ minHeight: "100vh" }}>
      <div className="fullwidth-gallery-wrapper position-relative" style={{ minHeight: "100vh" }}>
        <video
          ref={videoRef}
          className="w-100"
          style={{
            objectFit: "cover",
            minHeight: "100vh",
            width: "100%",
            display: "block",
            backgroundColor: "#111",
          }}
          src={VIDEO_SRC}
          autoPlay
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnded}
        />
        {/* 바깥→안쪽 검정 그라데이션 오버레이 */}
        <div className="hero5-gradient-overlay" aria-hidden />
      </div>
      {/* 소리 켜기/끄기 버튼: 비디오 재생 중에만 표시 */}
      {!showContent && (
        <button
          type="button"
          onClick={toggleMute}
          className="btn btn-mod btn-round btn-border light-content hero5-sound-btn"
          aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
        >
          <i
            className={`${isMuted ? "mi-volume-off" : "mi-volume-up"} hero5-sound-icon`}
            aria-hidden
          />
        </button>
      )}
      {/* 콘텐츠: 비디오 종료 후 마운트 + 페이드인 → WOW/AnimatedText가 새로 인식됨 */}
      {showContent && (
        <div
          className="fullwidth-galley-content position-absolute top-0 start-0 w-100 min-height-100vh d-flex align-items-center justify-content-center"
          style={{
            opacity: 0,
            animation: "heroContentFadeIn 0.8s ease 0.1s forwards",
            pointerEvents: "auto",
          }}
        >
          <div className="container pt-100 pb-100 pt-sm-120 pb-sm-120">
            <div className="home-content">
              <div className="row">
                <div className="col-md-10 offset-md-1 mb-20 mb-sm-0">
                  <h2
                    className="hs-title-11 mb-30 mb-xs-10 wow fadeInUp"
                    data-wow-delay="0.2s"
                    data-wow-duration="1.2s"
                  >
                    {t("title")}
                  </h2>
                  <h1 className="hs-title-10 mb-50 mb-sm-30">
                    <span className="wow charsAnimIn" data-splitting="chars">
                      <AnimatedText text={t("subtitle1")} />
                    </span>
                    <br />
                    <span className="wow charsAnimIn" data-splitting="chars">
                      {(() => {
                        const sub2 = t("subtitle2");
                        const idx = sub2.indexOf("TNQ");
                        if (idx === -1) return <AnimatedText text={sub2} />;
                        return (
                          <>
                            <AnimatedText text={sub2.slice(0, idx)} />
                            <span className="tnq-red-after-3s">
                              <AnimatedText text="TNQ" />
                            </span>
                            <AnimatedText text={sub2.slice(idx + 3)} />
                          </>
                        );
                      })()}
                    </span>
                  </h1>
                  <div
                    className="local-scroll wch-unset wow fadeInUp"
                    data-wow-delay="0.6s"
                    data-wow-duration="1.2s"
                    style={{
                      visibility: "visible",
                      animationDuration: "1.2s",
                      animationDelay: "0.6s",
                      animationName: "fadeInUp",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="local-scroll scroll-down-wrap-4 wow fadeInUp"
              data-wow-offset={0}
            >
              <div className="full-wrapper text-end">
                <a href="#about" className="scroll-down-4">
                  <i className="mi-arrow-down size-24" />
                </a>
              </div>
            </div>
            <div className="hs-status wow fadeInUp" data-wow-offset={0}>
              {t("statusLine1")}
              <br />
              {t("statusLine2")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
