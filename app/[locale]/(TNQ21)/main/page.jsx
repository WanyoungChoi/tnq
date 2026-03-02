import Footer1 from "@/components/footers/Footer1";
import Header1Multipage from "@/components/headers/Header1Multipage";
import Home1 from "@/components/homes/home-1";
import Hero5 from "@/components/homes/home-1/heros/Hero5";
import { menuTNQ21 } from "@/data/menuTNQ21";

export const metadata = {
  title: "TNQ21 || 메인",
  description: "TNQ21 메인 페이지",
};

export default function TNQ21MainPage() {
  return (
    <>
      <div className="dark-mode">
        <div className="theme-main">
          <div className="page bg-dark-1" id="top">
            <nav className="main-nav dark dark-mode transparent stick-fixed wow-menubar ">
              <Header1Multipage links={menuTNQ21} />
            </nav>
            <main id="main">
              <div
                className="home-section relative bg-dark-1 light-content scrollSpysection"
                id="home"
              >
                <Hero5 dark />
              </div>
              <Home1 dark={true} />
            </main>
            <Footer1 dark />
          </div>
        </div>
      </div>
    </>
  );
}
