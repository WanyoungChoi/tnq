import AnimatedText from "@/components/common/AnimatedText";
import Image from "next/image";
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
          <ul
            className="nav nav-tabs services-tabs section-descr services-tabs--larger wow fadeInUp"
            data-wow-delay="0.55s"
            role="tablist"
          >
            <li role="presentation">
              <a
                href="#services-item-1"
                className="active"
                aria-controls="services-item-1"
                role="tab"
                aria-selected="true"
                data-bs-toggle="tab"
              >
                브랜드 전략 <span className="number">01</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#services-item-1"
                aria-controls="services-item-1"
                role="tab"
                aria-selected="true"
                data-bs-toggle="tab"
              >
                스마트 공정 시스템 도입 <span className="number">01</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#services-item-2"
                aria-controls="services-item-2"
                role="tab"
                aria-selected="false"
                data-bs-toggle="tab"
              >
                자동화·디지털 전환 확대<span className="number">02</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#services-item-3"
                aria-controls="services-item-3"
                role="tab"
                aria-selected="false"
                data-bs-toggle="tab"
              >
                친환경 생산 프로세스<span className="number">03</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#services-item-4"
                aria-controls="services-item-4"
                role="tab"
                aria-selected="false"
                data-bs-toggle="tab"
              >
                글로벌 시장 확대 전략 <span className="number">04</span>
              </a>
            </li>
            <li role="presentation">
              <a
                href="#services-item-6"
                aria-controls="services-item-6"
                role="tab"
                aria-selected="false"
                data-bs-toggle="tab"
              >
                물류 자동화 시스템 도입 <span className="number">06</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          className="col-lg-6 d-flex wow fadeInLeft"
          data-wow-delay="0.55s"
          data-wow-offset={275}
        >
          <div className="tab-content services-content">
            {/* Tab Content */}
            <div
              className="tab-pane services-content-item show fade active"
              id="services-item-1"
              role="tabpanel"
            >
              <Image
                width={945}
                height={1016}
                className="services-image"
                src="/assets/images/tnq21/main/future-1.png"
                alt="Image Description"
              />
            </div>
            {/* End Tab Content */}
            {/* Tab Content */}
            <div
              className="tab-pane services-content-item fade"
              id="services-item-2"
              role="tabpanel"
            >
              <div className="services-text">
                <div className="services-text-container">
                  <h4 className="services-title">Art Direction</h4>
                  <p className="text-gray mb-0">
                    The core identity reflects consistent associations with the
                    brand whereas the extended identity involves the intricate
                    details of the brand that help generate a constant motif.
                  </p>
                </div>
              </div>
              <Image
                width={945}
                height={1016}
                className="services-image"
                src="/assets/images/services/service-2.jpg"
                alt="Image Description"
              />
            </div>
            {/* End Tab Content */}
            {/* Tab Content */}
            <div
              className="tab-pane services-content-item fade"
              id="services-item-3"
              role="tabpanel"
            >
              <div className="services-text">
                <div className="services-text-container">
                  <h4 className="services-title">Creative Design</h4>
                  <p className="text-gray mb-0">
                    The core identity reflects consistent associations with the
                    brand whereas the extended identity involves the intricate
                    details of the brand that help generate a constant motif.
                  </p>
                </div>
              </div>
              <Image
                width={945}
                height={1016}
                className="services-image"
                src="/assets/images/services/service-3.jpg"
                alt="Image Description"
              />
            </div>
            {/* End Tab Content */}
            {/* Tab Content */}
            <div
              className="tab-pane services-content-item fade"
              id="services-item-4"
              role="tabpanel"
            >
              <div className="services-text">
                <div className="services-text-container">
                  <h4 className="services-title">Development</h4>
                  <p className="text-gray mb-0">
                    The core identity reflects consistent associations with the
                    brand whereas the extended identity involves the intricate
                    details of the brand that help generate a constant motif.
                  </p>
                </div>
              </div>
              <Image
                width={945}
                height={1016}
                className="services-image"
                src="/assets/images/services/service-4.jpg"
                alt="Image Description"
              />
            </div>
            {/* End Tab Content */}
            {/* Tab Content */}
            <div
              className="tab-pane services-content-item fade"
              id="services-item-5"
              role="tabpanel"
            >
              <div className="services-text">
                <div className="services-text-container">
                  <h4 className="services-title">Photography</h4>
                  <p className="text-gray mb-0">
                    The core identity reflects consistent associations with the
                    brand whereas the extended identity involves the intricate
                    details of the brand that help generate a constant motif.
                  </p>
                </div>
              </div>
              <Image
                width={945}
                height={1016}
                className="services-image"
                src="/assets/images/services/service-5.jpg"
                alt="Image Description"
              />
            </div>
            {/* End Tab Content */}
            {/* Tab Content */}
            <div
              className="tab-pane services-content-item fade"
              id="services-item-6"
              role="tabpanel"
            >
              <div className="services-text">
                <div className="services-text-container">
                  <h4 className="services-title">Marketing</h4>
                  <p className="text-gray mb-0">
                    The core identity reflects consistent associations with the
                    brand whereas the extended identity involves the intricate
                    details of the brand that help generate a constant motif.
                  </p>
                </div>
              </div>
              <Image
                width={945}
                height={1016}
                className="services-image"
                src="/assets/images/services/service-6.jpg"
                alt="Image Description"
              />
            </div>
            {/* End Tab Content */}
          </div>
        </div>
      </div>
    </div>
  );
}
