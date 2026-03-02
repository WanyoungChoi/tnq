"use client";

const TNQ_ADDRESS = {
  label: "㈜ TNQ",
  address: "충청북도 충주시 충주산단1로 185",
  // 구글 지도에서 주소 검색 후 '공유 > 지도 퍼가기'로 얻은 iframe src로 교체하면 더 정확한 위치 표시 가능
  googleMapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("충청북도 충주시 충주산단1로 185") +
    "&output=embed",
  googleMapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("충청북도 충주시 충주산단1로 185"),
};

export default function Map({ address = TNQ_ADDRESS }) {
  const addr =
    typeof address === "string"
      ? {
          address,
          googleMapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
          googleMapsSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
          label: "주소",
        }
      : {
          ...address,
          googleMapsSearchUrl:
            address.googleMapsSearchUrl ||
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.address)}`,
        };

  return (
    <>
      <div className="position-relative w-100" style={{ paddingBottom: "56.25%", minHeight: 300 }}>
        <iframe
          src={addr.googleMapsEmbed}
          className="position-absolute top-0 start-0 w-100 h-100"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="오시는 길 지도"
        />
      </div>
      <div className="container py-4">
        <p className="text-gray mb-1">
          <strong>{addr.label || "주소"}</strong>
        </p>
        <p className="text-gray mb-0">{addr.address}</p>
        <a
          href={addr.googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-mod btn-small btn-round btn-hover-anim mt-3"
        >
          <span>구글 지도에서 보기</span>
        </a>
      </div>
    </>
  );
}
