import React from "react";
import NavBar from "../commun/Navbar";
import HeroSection from "../../components/sections/HeroSection";
import FooterSection from "../../components/sections/FooterSection";
import AboutSection from "../../components/sections/AboutSection";
import AboutStatisticsSection from "../../components/sections/AboutStatistics";
import AboutBanner from "../../assets/banners/bannerAbout.png";
import FooterImage from "../../assets/images/ghaith-footer.png";
import heroMobile0 from "../../assets/banners/mobile/BanAboutMobile.png";
import PageContainer from "../../components/container/PageContainer";

const AboutUs = () => {
  return (
    <>
      <PageContainer title="جمعية غيث - عن غيث" description="نبذة عن جمعية غيث">
        <NavBar variant="homePage" />
        <HeroSection
          variant="otherVariant"
          img={AboutBanner}
          mobileImg={heroMobile0}
        />
        <AboutSection />

        <div className="ghaith--background-main">
          <AboutStatisticsSection />
          <div className="ghaith--about-spacer"></div>

          <FooterSection footerImg={FooterImage} />
        </div>
      </PageContainer>
    </>
  );
};

export default AboutUs;
