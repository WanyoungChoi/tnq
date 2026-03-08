"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { teamMembers } from "@/data/team";
import Image from "next/image";

export default function Team() {
  return (
    <div className="container position-relative">
      <div className="row">
        {/* Quote */}
        <div className="col-md-6 mb-sm-60 mb-xs-40 d-flex align-items-center">
          <blockquote className="testimonial team-factory-quote mb-0 wow fadeInUp">
            <div className="blockquote-icon" aria-hidden="true">
              ”
            </div>
            <p className="section-descr">
              최첨단 가공 설비와
              <br />
              체계적인 품질관리 시스템. <br />
              작은 오차도 허용하지 않는 정밀 공정.
              <br />
              우리의 공장은
              <br />
              단순한 생산 공간이 아니라
              <br />
              신뢰가 만들어지는 현장입니다.
            </p>
            <footer className="section-descr">
              <div className="section-line mb-10" />
              <div>
                충주산단 1로 185 용탄동 공장 <br />
                <br />
                <br />
              </div>
            </footer>
          </blockquote>
        </div>
        {/* End Quote */}
        {/* Team Carousel */}
        <div className="col-md-6 relative">
          <div>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
              }}
              modules={[Navigation]}
              navigation={{
                prevEl: ".snbp1",
                nextEl: ".snbn1",
              }}
              watchSlidesProgress
              resizeObserver
              className="team-carousel owl-carousel owl-theme overflow-hidden position-static"
              style={{
                opacity: 1,
                display: "block",
              }}
            >
              {/* Team item */}
              {teamMembers.map((member, index) => (
                <SwiperSlide className="owl-item" key={index}>
                  <div className="team-carousel-item">
                    <div className="team-item">
                      <div
                        className="team-item-image team-factory-image-3-2"
                        style={{ aspectRatio: "3/2" }}
                      >
                        <Image
                          src={member.image}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-fit-cover wow scaleOutIn"
                          alt="Image Description"
                        />
                      </div>
                      <div className="team-item-descr">
                        <div className="team-item-name">{member.name}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="owl-controls clickable">
                <div className="owl-pagination">
                  <div className="owl-page">
                    <span className=""></span>
                  </div>
                  <div className="owl-page active">
                    <span className=""></span>
                  </div>
                </div>
                <div className="owl-buttons">
                  <div
                    className="owl-prev snbp1 owl-prev-testimonial-1"
                    role="button"
                    tabIndex="0"
                  >
                    <span className="visually-hidden">Previous Slide</span>
                    <i className="mi-arrow-left" aria-hidden="true"></i>
                  </div>
                  <div className="owl-next snbn1" role="button" tabIndex="0">
                    <span className="visually-hidden">Next Slide</span>
                    <i className="mi-arrow-right" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              {/* End Team item */}
            </Swiper>
          </div>
        </div>
        {/* End Team Carousel */}
      </div>
    </div>
  );
}
