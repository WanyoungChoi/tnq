import { redirect } from "next/navigation";

export const metadata = {
  title: "TNQ21 || 고객센터",
  description: "TNQ21 고객센터",
};

export default function CustomerCenterIndexPage() {
  redirect("/customer-center/notice");
}
