"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("main");

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
              aria-label={t("aboutVideoAria")}
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
        <h4 className="h5">{t("visionHeading")}</h4>
        <div
          className="wow fadeInUp"
          data-wow-delay="0.8s"
          data-wow-duration="0.8s"
        >
          <p className="text-gray">{t("visionText")}</p>
        </div>
        <h4 className="h5">{t("missionHeading")}</h4>
        <div
          className="wow fadeInUp"
          data-wow-delay="0.8s"
          data-wow-duration="0.8s"
        >
          <p className="text-gray">{t("missionText")}</p>
        </div>
      </div>
    </div>
  );
}
