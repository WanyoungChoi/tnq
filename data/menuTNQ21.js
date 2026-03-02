/**
 * TNQ21 전용 메뉴 (1뎁스-2뎁스)
 * title, text는 번역 키 — 실제 문구는 messages/ko.json, en.json, ja.json 의 menu 네임스페이스에 정의
 */
export const menuTNQ21 = [
  {
    title: "about",
    subMenu: [
      {
        links: [
          { href: "/about#ceo-message", text: "ceoMessage" },
          { href: "/about#history", text: "history" },
          { href: "/about#organization", text: "organization" },
          { href: "/about#patents", text: "patents" },
          { href: "/about#location", text: "location" },
        ],
      },
    ],
  },
  {
    title: "business",
    subMenu: [
      {
        links: [
          { href: "/business#hot-stamping-die", text: "hotStampingDie" },
          { href: "/business#cold-stamping-die", text: "coldStampingDie" },
          { href: "/business#hot-stamping-trim-die", text: "hotStampingTrimDie" },
        ],
      },
    ],
  },
  {
    title: "equipment",
    subMenu: [
      {
        links: [
          { href: "/equipment#machining", text: "machining" },
          { href: "/equipment#trial-run", text: "trialRun" },
          { href: "/equipment#heat-treatment-coating", text: "heatTreatmentCoating" },
          { href: "/equipment#measurement-inspection", text: "measurementInspection" },
        ],
      },
    ],
  },
  {
    title: "customerCenter",
    subMenu: [
      {
        links: [
          { href: "/customer-center/notice", text: "notice" },
          { href: "/customer-center/product-inquiry", text: "productInquiry" },
        ],
      },
    ],
  },
  {
    title: "video",
    subMenu: [
      {
        links: [
          { href: "/video#factory", text: "factory" },
          { href: "/video#hot-stamping", text: "hotStamping" },
        ],
      },
    ],
  },
];
