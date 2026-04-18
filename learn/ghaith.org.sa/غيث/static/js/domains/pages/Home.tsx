import React, { useState } from "react";
import NavBar from "../commun/Navbar";
import HeroSection from "../../components/sections/HeroSection";
import DonationSection from "../../components/sections/DonationSection";
import MarqueeSection from "../../components/sections/MarqueeSection";
import ProjectSection from "../../components/sections/ProjectSection";
import TestamonSection from "../../components/sections/TestamonSection";
import StatisticsSection from "../../components/sections/StatisticsSections";
import PartenerSection from "../../components/sections/PartnersSection";
import FooterSection from "../../components/sections/FooterSection";
import heroImage from "../../assets/banners/banner1.png";
import FooterImage from "../../assets/images/ghaith-footer.png";
import MoyassarResultModal from "../../components/moyassar/MoyassarResultModal";
import { useSearchParams } from "react-router-dom";
import heroMobile0 from "../../assets/banners/mobile/FoodMobile.jpg";
import PageContainer from "../../components/container/PageContainer";

//import "./App.css";

const Home = () => {
  ////// params data ///////////
  const [searchParams] = useSearchParams();
  const openModal = searchParams.get("openModal");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(
    openModal === "true",
  );
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث" description="جمعية غيث">
        <NavBar variant="homePage" />
        {/*<div className="App" dir="rtl" lang="ar">
        <header className="App-header"></header>
      </div>*/}
        <HeroSection
          variant="homePage"
          img={heroImage}
          mobileImg={heroMobile0}
        />
        <DonationSection type="homepage" />
        <MarqueeSection />
        <ProjectSection />
        <div className="ghaith--background-main">
          <TestamonSection />
          <StatisticsSection />
          <PartenerSection />
          <FooterSection footerImg={FooterImage} />
        </div>
        <MoyassarResultModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        {/*  <div className="">
        <img src={skyimage} alt="sky background" />
      </div>*/}
      </PageContainer>
    </>
  );
};

export default Home;
