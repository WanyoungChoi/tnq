/**
 * messages/ko.json 에서 한글이 포함된 문구만 추려
 * 의뢰업체에 넘길 CSV(키, 한글, 영문) 생성.
 * en.json에 이미 있는 영문은 en 열에 미리 채움.
 *
 * 사용: node scripts/export-ko-for-translation.js
 * 결과: messages/ko-for-translation.csv (엑셀에서 열어 의뢰 → 영문 받으면 en.json에 반영)
 */

const fs = require("fs");
const path = require("path");

const KO_PATH = path.join(__dirname, "../messages/ko.json");
const EN_PATH = path.join(__dirname, "../messages/en.json");
const OUT_CSV = path.join(__dirname, "../messages/ko-for-translation.csv");

const hasHangul = (s) => /[\uAC00-\uD7A3]/.test(String(s));

/** en.json을 ko와 동일한 키 구조의 key -> value 맵으로 만듦 */
function flattenToMap(obj, prefix = "") {
  const map = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(map, flattenToMap(value, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === "string") {
          map[`${fullKey}.${i}`] = item;
        } else if (typeof item === "object" && item !== null) {
          Object.entries(item).forEach(([k, v]) => {
            if (typeof v === "string") map[`${fullKey}.${i}.${k}`] = v;
          });
        }
      });
    } else if (typeof value === "string") {
      map[fullKey] = value;
    }
  }
  return map;
}

function flatten(koObj, enMap, prefix = "") {
  const rows = [];
  for (const [key, value] of Object.entries(koObj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      rows.push(...flatten(value, enMap, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === "string" && hasHangul(item)) {
          rows.push({ key: `${fullKey}.${i}`, ko: item, en: enMap[`${fullKey}.${i}`] ?? "" });
        } else if (typeof item === "object" && item !== null) {
          Object.entries(item).forEach(([k, v]) => {
            if (typeof v === "string" && hasHangul(v)) {
              rows.push({ key: `${fullKey}.${i}.${k}`, ko: v, en: enMap[`${fullKey}.${i}.${k}`] ?? "" });
            }
          });
        }
      });
    } else if (typeof value === "string" && hasHangul(value)) {
      rows.push({ key: fullKey, ko: value, en: enMap[fullKey] ?? "" });
    }
  }
  return rows;
}

function escapeCsv(s) {
  const str = String(s).replace(/"/g, '""');
  return str.includes(",") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
}

const ko = JSON.parse(fs.readFileSync(KO_PATH, "utf8"));
const en = fs.existsSync(EN_PATH) ? JSON.parse(fs.readFileSync(EN_PATH, "utf8")) : {};
const enMap = flattenToMap(en);
const rows = flatten(ko, enMap);
const header = "key,ko,en\n";
const body = rows.map((r) => [escapeCsv(r.key), escapeCsv(r.ko), escapeCsv(r.en)].join(",")).join("\n");

fs.writeFileSync(OUT_CSV, "\uFEFF" + header + body, "utf8"); // BOM for Excel
console.log(`Written ${rows.length} rows to ${path.relative(path.join(__dirname, ".."), OUT_CSV)}`);
console.log("→ 엑셀에서 열어 'en' 열에 영문 입력 후, 스크립트로 en.json 반영 가능");
