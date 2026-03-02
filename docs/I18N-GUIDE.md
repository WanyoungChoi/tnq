# home 프로젝트 다국어(i18n) 구현 가이드

Next.js App Router 기준으로 **next-intl**을 사용한 다국어 구현 방법입니다.

---

## 1. 사용할 라이브러리

- **next-intl**: App Router와 호환되며, URL에 locale을 넣는 방식(`/en/...`, `/ko/...`)을 지원합니다.
- 대안: `react-i18next` + 직접 라우팅 처리 (설정이 더 많음)

---

## 2. 설치

```bash
cd f:\wwwRoot\TNQ\WWW\home
pnpm add next-intl
```

---

## 3. 폴더/파일 구조 예시

```
home/
├── app/
│   └── [locale]/              # locale이 URL에 포함됨 (en, ko 등)
│       ├── layout.js           # 루트 레이아웃 (locale 처리)
│       ├── page.jsx            # 메인 페이지
│       ├── (homes)/            # 기존 라우트 그룹들...
│       └── ...
├── messages/                   # 번역 JSON (새로 만듦)
│   ├── en.json
│   ├── ko.json
│   └── ja.json
├── i18n/
│   ├── request.js              # next-intl 서버 설정
│   └── routing.js              # locale 목록, defaultLocale 등
└── next.config.mjs             # next-intl 플러그인 추가
```

---

## 4. 설정 파일 작성

### 4.1 `i18n/routing.js`

```js
export const locales = ["en", "ko", "ja"];
export const defaultLocale = "en";

export const localeNames = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
};
```

### 4.2 `i18n/request.js`

```js
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale();
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### 4.3 `next.config.mjs` 수정

```js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

---

## 5. 번역 파일 예시

### `messages/en.json`

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "contact": "Contact"
  },
  "common": {
    "readMore": "Read More",
    "contactUs": "Contact Us"
  }
}
```

### `messages/ko.json`

```json
{
  "nav": {
    "home": "홈",
    "about": "회사소개",
    "services": "서비스",
    "portfolio": "포트폴리오",
    "blog": "블로그",
    "contact": "연락처"
  },
  "common": {
    "readMore": "더보기",
    "contactUs": "문의하기"
  }
}
```

---

## 6. app 폴더를 `[locale]` 아래로 이동

**기존:**

- `app/layout.js`
- `app/page.jsx`
- `app/(homes)/...` 등

**변경 후:**

- `app/[locale]/layout.js`  ← 기존 `app/layout.js` 내용을 옮기고 locale 처리 추가
- `app/[locale]/page.jsx`   ← 기존 `app/page.jsx` 이동
- `app/[locale]/(homes)/...` ← 기존 라우트 그룹들 통째로 이동

**중요:** 루트에 `app/layout.js`는 최소한으로 두고(또는 next-intl 문서대로 루트 레이아웃만 두고), **실제 페이지는 모두 `app/[locale]/` 아래**에 두어야 URL이 `/en/...`, `/ko/...` 형태가 됩니다.

### `app/[locale]/layout.js` 예시

```js
"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "next-intl";
import { useEffect } from "react";
// ... 기존 layout의 import들

export default function LocaleLayout({ children }) {
  const locale = useLocale();
  // 기존 RootLayout의 useEffect, 스타일 등 유지

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {/* 기존 레이아웃 내용, 헤더/푸터 등 */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

next-intl 공식 문서에서는 **서버 레이아웃**에서 `getLocale()` 등으로 메시지를 넘기는 패턴도 있으니, 정식 문서를 참고해 선택하면 됩니다.

---

## 7. 컴포넌트에서 번역 사용

### 서버 컴포넌트

```js
import { useTranslations } from "next-intl/server";

export default function Page() {
  const t = useTranslations("nav");
  return (
    <nav>
      <a href="/">{t("home")}</a>
      <a href="/about">{t("about")}</a>
    </nav>
  );
}
```

### 클라이언트 컴포넌트

```js
"use client";
import { useTranslations } from "next-intl";

export default function Nav() {
  const t = useTranslations("nav");
  return <span>{t("home")}</span>;
}
```

---

## 8. 링크에 locale 넣기

next-intl이 제공하는 `Link`를 쓰면 현재 locale이 자동으로 붙습니다.

```js
import { Link } from "next-intl/link";

<Link href="/about">About</Link>
// 현재 locale이 ko면 /ko/about 로 이동
```

일반 `next/link`를 쓰면 직접 경로에 locale을 포함해야 합니다.

```js
import Link from "next/link";
import { useLocale } from "next-intl";

const locale = useLocale();
<Link href={`/${locale}/about`}>About</Link>
```

---

## 9. 언어 선택기(LanguageSelect) 연동

`LanguageSelect`에서 언어를 바꿀 때 **해당 locale URL로 이동**하면 됩니다.

```js
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const locales = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "ja", name: "日本語" },
];

export default function LanguageSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale) => {
    // pathname이 이미 /en/... 형태라면 /en 을 /ko 로 바꿈
    const segments = pathname.split("/").filter(Boolean);
    if (locales.some((l) => l.code === segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push("/" + segments.join("/"));
  };

  return (
    <li className="languageSelect">
      {/* 현재 locale 표시 + 드롭다운으로 다른 언어 선택 시 switchLocale 호출 */}
    </li>
  );
}
```

pathname 형식은 next-intl 라우팅 설정에 따라 다를 수 있으므로, 실제 `[locale]` 세그먼트가 어떻게 나오는지 확인한 뒤 위 로직을 조정하면 됩니다.

---

## 10. 메뉴 데이터 다국어 처리

`data/menu.js`는 현재 객체로 메뉴명이 하드코딩되어 있으므로, 두 가지 방식이 있습니다.

### 방식 A: 메뉴도 JSON으로 이동 (권장)

- `messages/en.json`, `messages/ko.json` 등에 `menu` 키를 두고:
  - 1뎁스: `menu.home`, `menu.pages`, …
  - 2뎁스: `menu.homeMulti`, `menu.pagesAbout1` 등
- 헤더/네비에서는 `useTranslations("menu")`로 `t("home")` 등만 사용하고, **href는 기존처럼 고정 경로**를 씁니다.

### 방식 B: menu.js를 locale별로 분리

- `data/menu.en.js`, `data/menu.ko.js`처럼 locale별로 export하고, 레이아웃이나 헤더에서 `const menu = await import(\`@/data/menu.${locale}.js\`)` 형태로 불러와서 사용합니다.
- 이 경우 메뉴 텍스트만 바뀌고, URL 구조는 그대로 둘 수 있습니다.

---

## 11. 작업 순서 요약

1. **next-intl 설치** 및 `i18n/routing.js`, `i18n/request.js` 추가
2. **next.config.mjs**에 next-intl 플러그인 적용
3. **messages/en.json**, **messages/ko.json** 등 생성
4. **app** 아래 페이지를 **app/[locale]/** 아래로 이동하고, `app/[locale]/layout.js`에서 next-intl Provider 적용
5. 헤더/메뉴 등에서 **useTranslations**로 문구를 번역 키로 교체
6. **LanguageSelect**에서 locale 전환 시 해당 locale 경로로 **router.push** 하도록 수정
7. (선택) 메뉴 구조를 **messages** 또는 locale별 **menu.***.js**로 이전

---

## 12. 국가(언어)별 이미지 변경

locale(또는 국가)에 따라 다른 이미지를 보여주는 방법입니다. 보통 **locale = 언어/지역**으로 두고 이미지를 바꾸면 됩니다.

### 12.1 폴더 구조로 분리 (권장)

언어별로 이미지 파일을 나누어 두는 방식입니다.

```
public/
├── assets/
│   └── images/
│       ├── en/           # 영어용
│       │   ├── hero-bg.jpg
│       │   └── logo.svg
│       ├── ko/           # 한국어용
│       │   ├── hero-bg.jpg
│       │   └── logo.svg
│       └── ja/
│           ├── hero-bg.jpg
│           └── logo.svg
```

**컴포넌트에서 사용 (클라이언트):**

```jsx
"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

export default function HeroImage() {
  const locale = useLocale(); // "en" | "ko" | "ja"

  return (
    <Image
      src={`/assets/images/${locale}/hero-bg.jpg`}
      alt="Hero"
      width={1920}
      height={1080}
    />
  );
}
```

**서버 컴포넌트:**

```jsx
import Image from "next/image";
import { getLocale } from "next-intl/server";

export default async function HeroImage() {
  const locale = await getLocale();
  return (
    <Image
      src={`/assets/images/${locale}/hero-bg.jpg`}
      alt="Hero"
      width={1920}
      height={1080}
    />
  );
}
```

---

### 12.2 번역(메시지) 파일에 이미지 경로 넣기

이미지 경로도 다른 문구처럼 locale별 JSON에서 관리하는 방식입니다.

**messages/en.json:**

```json
{
  "images": {
    "heroBg": "/assets/images/en/hero-bg.jpg",
    "logo": "/assets/images/en/logo.svg"
  }
}
```

**messages/ko.json:**

```json
{
  "images": {
    "heroBg": "/assets/images/ko/hero-bg.jpg",
    "logo": "/assets/images/ko/logo.svg"
  }
}
```

**컴포넌트:**

```jsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroImage() {
  const t = useTranslations("images");
  return (
    <Image
      src={t("heroBg")}
      alt="Hero"
      width={1920}
      height={1080}
    />
  );
}
```

- 장점: 문구와 이미지를 한 곳(messages)에서 관리 가능  
- 단점: JSON에 경로 문자열을 일일이 맞춰야 함  

---

### 12.3 공통 이미지 + locale에 따라 일부만 교체

대부분은 공통 이미지를 쓰고, 로고·히어로 등 일부만 locale별로 바꿀 때 유용합니다.

```jsx
"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const LOCALE_IMAGES = {
  en: { logo: "/assets/images/en/logo.svg", hero: "/assets/images/en/hero.jpg" },
  ko: { logo: "/assets/images/ko/logo.svg", hero: "/assets/images/ko/hero.jpg" },
  ja: { logo: "/assets/images/ja/logo.svg", hero: "/assets/images/ja/hero.jpg" },
};

export default function LocaleImage({ type = "logo" }) {
  const locale = useLocale();
  const src = LOCALE_IMAGES[locale]?.[type] ?? LOCALE_IMAGES.en[type];

  return <Image src={src} alt="" width={200} height={60} />;
}
```

---

### 12.4 “국가”와 “언어”를 구분해야 할 때

- **언어만 구분** (한국어/영어/일본어): 위처럼 **locale** 하나로 이미지 경로만 `en/`, `ko/`, `ja/` 로 나누면 됩니다.
- **국가까지 구분** (같은 영어라도 미국/영국 이미지가 다름):  
  - locale을 `en-US`, `en-GB`, `ko-KR` 처럼 나누거나  
  - 별도 “국가 코드” state를 두고, 이미지 경로를 `/${country}/...` 또는 `/${locale}/...` 로 선택하면 됩니다.

정리하면, **국가에 따라 이미지를 바꾸고 싶다** → 지원할 국가(또는 언어)만큼 `public` 아래에 폴더를 나누고, 컴포넌트에서는 **useLocale()** 또는 **getLocale()** 로 현재 locale을 구한 뒤 `/${locale}/이미지파일` 형태로 `src`를 넣으면 됩니다.

---

## 13. 공식 문서

- [next-intl – Next.js App Router](https://next-intl-docs.vercel.app/docs/getting-started/app-router)
- [next-intl – Routing](https://next-intl-docs.vercel.app/docs/routing)

위 순서대로 적용하면 home 프로젝트를 다국어 버전으로 확장할 수 있습니다. 특정 단계(예: app 폴더 이동, 메뉴만 다국어)를 코드로 같이 하고 싶으면 원하는 부분을 알려주면 됩니다.
