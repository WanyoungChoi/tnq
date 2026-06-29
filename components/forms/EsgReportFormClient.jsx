"use client";

import dynamic from "next/dynamic";

const EsgReportForm = dynamic(
  () => import("@/components/forms/EsgReportForm"),
  {
    ssr: false,
    loading: () => <div className="esg-report-form-skeleton" aria-hidden="true" />,
  },
);

export default function EsgReportFormClient() {
  return <EsgReportForm />;
}
