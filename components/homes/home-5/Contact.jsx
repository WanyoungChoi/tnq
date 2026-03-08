"use client";
import { contactItems } from "@/data/contact";
import React from "react";

export default function Contact({ showContactItems = true }) {
  return (
    <div className="container">
      {showContactItems && (
        <div className="row mt-n10 mb-60 mb-xs-40">
          <div className="col-md-10 offset-md-1">
            <div className="row">
              {/* Phone */}
              {contactItems.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`col-md-6 col-lg-4 mb-md-30 `}>
                  <div className="contact-item wow fadeScaleIn">
                    <div className="ci-icon">
                      <i className={item.iconClass} />
                    </div>
                    <h4 className="ci-title">{item.title}</h4>
                    <div className="ci-text large">{item.text}</div>
                    <div className="ci-link">
                      <a
                        href={item.link.url}
                        target={item.link.target}
                        rel={item.link.rel}
                      >
                        {item.link.text}
                      </a>
                    </div>{" "}
                  </div>
                </div>{" "}
              </React.Fragment>
              ))}

              {/* End Email */}
            </div>
          </div>
        </div>
      )}
      {/* Contact Form */}
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="form contact-form wow fadeInUp wch-unset"
            data-wow-delay=".5s"
            id="contact_form"
          >
            <div className="row">
              <div className="col-md-6">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-lg round form-control"
                    placeholder="본명이 아닌 가명으로 입력해 주세요"
                    pattern=".{3,100}"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-md-6">
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-lg round form-control"
                    placeholder="이메일을 입력하세요"
                    pattern=".{5,100}"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">문의내용</label>
              <textarea
                name="message"
                id="message"
                className="input-lg round form-control"
                style={{ height: 130 }}
                placeholder="문의 내용을 입력하세요"
                defaultValue={""}
              />
            </div>
            <div className="row">
              <div className="col-sm-6">
                {/* Inform Tip */}
                <div className="form-tip pt-20 pt-sm-0">
                  <i className="icon-info size-16" />
                  개인정보를 수집하지 않습니다. 문의 내용에 개인정보를 입력하지 마십시오.
                </div>
              </div>
              <div className="col-sm-6">
                {/* Send Button */}
                <div className="text-end pt-10">
                  <button
                    type="submit"
                    id="submit_btn"
                    aria-controls="result"
                    className="submit_btn link-hover-anim link-circle-1 align-middle"
                    data-link-animate="y"
                  >
                    <span className="link-strong link-strong-unhovered">
                      문의 발송하기
                      <i
                        className="mi-arrow-right size-18 align-middle"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span
                      className="link-strong link-strong-hovered"
                      aria-hidden="true"
                    >
                      문의 발송하기
                      <i
                        className="mi-arrow-right size-18 align-middle"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div
              id="result"
              role="region"
              aria-live="polite"
              aria-atomic="true"
            />
          </form>
        </div>
      </div>
      {/* End Contact Form */}
    </div>
  );
}
