# home 프로젝트 — 폴더 구조 및 라우팅

**다국어(i18n) 적용됨** — 모든 페이지는 `/[locale]/...` 경로를 사용합니다 (예: `/en/`, `/ko/main-multi-page-typed-text-dark`). 기본 언어는 `en`이며, 루트 `/` 접속 시 `/en`으로 리다이렉트됩니다.

## 1. 프로젝트 폴더 구조

```
home/
├── app/                    # Next.js App Router (페이지·라우팅)
│   ├── layout.js           # 루트 레이아웃 (전역 스타일, 헤더/푸터 로직)
│   ├── not-found.jsx       # 404 페이지
│   ├── [locale]/           # 다국어 세그먼트 (en, ko)
│   │   ├── layout.js       # NextIntlClientProvider 래퍼
│   │   ├── page.jsx        # 루트 페이지 (/en, /ko) — /main 으로 리다이렉트
│   │   │
│   │   ├── (TNQ21)/        # [라우트 그룹] TNQ21 전용 (URL에 TNQ21 미포함: /main, /about/...)
│   │   │   ├── main/       # 메인 (슬라이더 배경 다크) — /main
│   │   │   ├── about/      # 회사소개 — ceo-message, history, organization, patents, location
│   │   │   ├── business/   # 사업현황 — hot-stamping-die, cold-stamping-die, hot-stamping-trim-die
│   │   │   ├── equipment/  # 설비현황 — machining, trial-run, measurement-inspection
│   │   │   ├── customer-center/ # 고객센터 — notice, product-inquiry, contact-us
│   │   │   └── video/      # 홍보영상 — factory, hot-stamping
│   │   │
│   │   ├── (homes)/        # [라우트 그룹] 홈/랜딩 변형들 (URL에 미포함)
│   │   ├── (home-1)/       # 멀티페이지 스타일
│   │   │   ├── (typed-text)/main-multi-page-typed-text-dark/
│   │   │   ├── (slider-background)/main-multi-page-slider-background-dark/
│   │   │   ├── (image-parallax)/main-multi-page-image-parallax/
│   │   │   └── ...
│   │   ├── (home-5)/       # 엘레강트 스플릿
│   │   ├── (home-8)/       # 모던 원페이지
│   │   └── (home-9)/       # 슬릭 원/멀티페이지
│   │
│   ├── (about)/            # 소개 페이지들 (strong-, slick-, modern- 등)
│   ├── (services)/        # 서비스 페이지들
│   ├── (contact)/         # 연락처 페이지들
│   ├── (portfolio)/       # 포트폴리오 목록
│   ├── (portfolio-single)/ # 포트폴리오 상세 — [id] 동적
│   ├── (blogs)/           # 블로그 목록
│   ├── (blog-single)/      # 블로그 상세 — [id] 동적
│   ├── (elements)/        # UI 요소 데모 (버튼, 탭, 폼 등)
│   └── (otherPages)/      # 기타 (404, FAQ, 팀, 갤러리, 가격 등)
│
├── components/             # 재사용 UI 컴포넌트
│   ├── headers/            # 헤더 (Header1Multipage, HeaderPreview 등)
│   ├── footers/            # 푸터
│   ├── preview/            # 루트(/)용: Hero, Showcase, Multipage, Onepage 등
│   ├── homes/              # 홈 변형별 섹션 (home-1 ~ home-10)
│   │   ├── home-1/         # heros, About, Pricing, Promo 등
│   │   ├── home-6/, home-7/, ...
│   │   └── home-9/, home-10/
│   ├── common/             # 공통: Parallax, Map, Faq, TypeWriter, ModalVideo 등
│   ├── blog/               # 블로그: content, widgets, sliders, commentForm
│   ├── portfolio/          # 포트폴리오 슬라이더, relatedProjects
│   ├── accordions/, newsletterForms/, gallery/, others/
│   └── elements/           # 요소 데모용 (Slider3, Modals 등)
│
├── public/                 # 정적 파일 (URL 경로 그대로 노출)
│   ├── assets/
│   │   ├── css/            # styles.css, demo-*.css, bootstrap 등
│   │   ├── images/         # 로고, 데코, 데모별 이미지
│   │   └── webfonts/       # 아이콘 폰트 (icomoon, font-awesome 등)
│   ├── vercel.svg, next.svg
│   └── favicon 등
│
├── utlis/                  # 유틸 (오타 유지: utlis)
│   ├── parallax.js
│   ├── initWowjs.js
│   └── changeHeaderOnScroll.js
│
├── package.json
├── next.config.mjs
├── jsconfig.json           # path: "@/*" → home/
└── ROUTING.md              # 본 문서
```

---

## 2. Next.js App Router 라우팅 규칙

| 규칙 | 폴더/파일 | URL 영향 |
|------|-----------|----------|
| **`page.js` / `page.jsx`** | 해당 세그먼트의 실제 페이지 | 해당 경로가 URL이 됨 |
| **`layout.js`** | 레이아웃 (자식 공통 래퍼) | URL에 반영 안 됨 |
| **`(괄호)`** | **라우트 그룹** | URL에 **포함되지 않음** (구조/분류용) |
| **`[id]`** | **동적 세그먼트** | URL에 `:id` 값으로 표시 (예: `/strong-blog-single-dark/123`) |

- **실제 URL** = `app/` 아래에서 **괄호 폴더를 제외한** 경로를 이어 붙인 것.
- 예: `app/(homes)/(home-1)/(typed-text)/main-multi-page-typed-text-dark/page.jsx`  
  → URL: **`/main-multi-page-typed-text-dark`**

---

## 3. 주요 URL ↔ 파일 매핑

### 루트
| URL | 파일 |
|-----|------|
| `/` | `app/page.jsx` (프리뷰/데모 목록) |

### 홈 변형 (실제 사용할 메인 페이지 후보)
| URL | 파일 |
|-----|------|
| `/main-multi-page-typed-text-dark` | `app/(homes)/(home-1)/(typed-text)/main-multi-page-typed-text-dark/page.jsx` |
| `/main-multi-page-slider-background-dark` | `app/(homes)/(home-1)/(slider-background)/main-multi-page-slider-background-dark/page.jsx` |
| `/main-multi-page-image-parallax` | `app/(homes)/(home-1)/(image-parallax)/main-multi-page-image-parallax/page.jsx` |
| `/modern-one-page-typed-text` | `app/(homes)/(home-8)/(typed-text)/modern-one-page-typed-text/page.jsx` |
| `/slick-one-page` | `app/(homes)/(home-9)/(main-demo)/slick-one-page/page.jsx` |
| `/slick-multi-page` | `app/(homes)/(home-9)/(main-demo)/slick-multi-page/page.jsx` |
| `/elegant-one-page-split` | `app/(homes)/(home-5)/(split)/elegant-one-page-split/page.jsx` |

### About / Services / Contact
- `(about)/` → 예: `/strong-about`, `/modern-about`, `/corporate-about` 등
- `(services)/` → 예: `/strong-services`, `/slick-services`, `/modern-services` 등
- `(contact)/` → 예: `/strong-contact`, `/modern-contact` 등  
(각 폴더 내 `페이지이름/page.jsx`가 곧 URL 경로 `페이지이름`이 됨)

### 블로그
- 목록: `(blogs)/` → 예: `/strong-blog`, `/modern-blog`, `/main-blog-classic-sidebar-right` 등
- 상세: `(blog-single)/.../[id]/page.jsx` → 예: `/strong-blog-single-dark/1` (동적 `[id]`)

### 포트폴리오
- 목록: `(portfolio)/` → 예: `/strong-portfolio`, `/main-portfolio-masonry-3col` 등
- 상세: `(portfolio-single)/.../[id]/page.jsx` → 예: `/strong-portfolio-single/1` (동적 `[id]`)

### 기타
- `(elements)/` → UI 데모 (버튼, 탭, 폼, 라이트박스 등)
- `(otherPages)/` → `/main-pages-404`, `/main-pages-faq-1`, `/main-pages-team` 등

---

## 4. path 별칭 (`jsconfig.json`)

- **`@/*`** → `home/*` (프로젝트 루트 기준)
- 예: `import X from "@/components/headers/Header1Multipage"` → `home/components/headers/Header1Multipage.jsx`

---

## 5. 기업 홈페이지로 쓸 때 참고

- **메인 페이지**로 쓸 경로 하나를 정한 뒤 (예: `/main-multi-page-typed-text-dark` 또는 새로 만든 `/` 페이지)  
  `app/page.jsx`를 해당 페이지 컴포넌트로 바꾸거나, `layout.js`와 함께 리다이렉트를 두면 됨.
- **괄호 폴더** `(homes)`, `(home-1)` 등은 URL에 안 나오므로, 원하면 폴더만 정리해 두고 URL은 그대로 유지 가능.
- 새 페이지를 추가할 때: `app/원하는URL/page.jsx` 또는 `app/(그룹명)/원하는URL/page.jsx` 형태로 추가하면 됨.
