# GitHub 사용 방법

## ■ 깃허브에 커밋 후 올리기

**수정된 파일 전부 스테이징**
```bash
git add .
```

**커밋 생성**
```bash
git commit -m "final update"
```

**GitHub에 업로드**
```bash
git push origin main
```

---

## ■ 깃허브에서 내려받기

**처음 받을 때**
```bash
git clone https://github.com/WanyoungChoi/tnq.git
```

**이미 프로젝트가 있는 경우**
```bash
git pull origin main
```

---

## ■ "Large diffs are not rendered" 줄이기 (데모 페이지 제외)

템플릿 데모용 page.jsx가 많아서 GitHub에서 diff가 잘리면, 이미 추적 중인 데모 라우트를 Git에서만 제거할 수 있습니다. (파일은 로컬에 그대로 두고, 커밋 대상에서만 뺍니다.)

**프로젝트 루트(home)에서 실행 (PowerShell):**
```powershell
git rm -r --cached "app/[locale]/(homes)" 2>$null
git rm -r --cached "app/[locale]/(about)" 2>$null
git rm -r --cached "app/[locale]/(blogs)" 2>$null
git rm -r --cached "app/[locale]/(blog-single)" 2>$null
git rm -r --cached "app/[locale]/(services)" 2>$null
git rm -r --cached "app/[locale]/(elements)" 2>$null
git rm -r --cached "app/[locale]/(otherPages)" 2>$null
git rm -r --cached "app/[locale]/(portfolios)" 2>$null
git rm -r --cached "app/[locale]/(contact)" 2>$null
git rm -r --cached "app/[locale]/(main-pages)" 2>$null
git commit -m "chore: stop tracking template demo routes"
git push origin main
```

이후에는 실제 사용하는 **(TNQ21)** 페이지만 커밋되어 large diff가 크게 줄어듭니다.
