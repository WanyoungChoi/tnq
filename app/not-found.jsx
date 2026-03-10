import Link from "next/link";

export const metadata = {
  title: "Page Not Found | TNQ",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="theme-main">
      <div className="page min-height-100vh d-flex align-items-center justify-content-center bg-dark-1 light-content">
        <div className="container text-center py-5">
          <h1 className="display-1 mb-3">404</h1>
          <p className="section-descr mb-4">The page you were looking for could not be found.</p>
          <Link href="/" className="btn btn-mod btn-w btn-round btn-medium">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
