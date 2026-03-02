import AnimatedText from "@/components/common/AnimatedText";
import About from "@/components/homes/home-1/About";
import Benefits from "@/components/homes/home-1/Benefits";
import Contact from "@/components/homes/home-1/Contact";
import Service from "@/components/homes/home-1/Service";
import Team from "@/components/homes/home-1/Team";
import Image from "next/image";

function SectionHeader({
  caption,
  title,
  decoration = "/assets/images/decoration-2.svg",
}) {
  const showDecoration = decoration != null && String(decoration).trim() !== "";
  return (
    <div className="container position-relative">
      <div className="row mb-60 mb-xs-30">
        <div className="col-md-6">
          <h2 className="section-caption mb-xs-10">{caption}</h2>
          <h3 className="section-title mb-0">
            <AnimatedText text={title} />
          </h3>
        </div>
        {showDecoration && (
          <div className="col-md-5 offset-md-1 relative text-start text-md-end pt-40 pt-sm-20 local-scroll">
            <div
              className="decoration-2 d-none d-md-block"
              data-rellax-y=""
              data-rellax-speed="0.7"
              data-rellax-percentage="-0.2"
            >
              <Image width={103} height={223} src={decoration} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home1({ onePage = false, dark = false }) {
  return (
    <>
      <section
        className={`page-section scrollSpysection ${
          dark ? "bg-dark-2 light-content" : ""
        }`}
        id="about"
      >
        <div className="container position-relative">
          <SectionHeader
            caption="Vision & Mission"
            title="우리의 비전과 미션"
            decoration="/assets/images/decoration-2.svg"
          />
          <About />
        </div>
      </section>

      <section
        className={`page-section scrollSpysection ${
          dark ? "bg-dark-1 light-content" : "bg-gray-light-1 "
        }`}
        id="team"
      >
        <SectionHeader
          caption="Our Factory & Technology"
          title="기술이 살아 숨 쉬는 공간"
          decoration=""
        />
        <Team />
      </section>

      <section
        className={`page-section scrollSpysection ${
          dark ? "bg-dark-2 light-content" : ""
        }`}
        id="services"
      >
        <SectionHeader
          caption="Future Strategy"
          title="미래를 향한 도전"
          decoration=""
        />
        <Service />
      </section>

      <section
        className={`page-section ${dark ? "bg-dark-1 light-content" : ""}`}
      >
        <SectionHeader caption="Benefits" title="Why choose us" decoration="" />
        <Benefits />
      </section>
    </>
  );
}
