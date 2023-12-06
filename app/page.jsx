import Header from "../components/layout/headers/Header";
import HomeHero from "../components/homes/heros/HomeHero";
import WhyCourse from "../components/homes/WhyCourse";
import Join from "../components/homes/join/Join";
import FooterOne from "../components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";

export const metadata = {
  title: "Anything",
  description: "Team Anything Project",
};

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HomeHero />
        <WhyCourse />
        <Join />
        <FooterOne />
      </div>
    </>
  );
}
