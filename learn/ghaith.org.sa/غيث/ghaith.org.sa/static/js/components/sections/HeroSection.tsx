import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import useIsMobile from "../../bibilio/mobileVersion/useIsMobile";
import skyimage from "../../assets/banners/hero-banner.png";
import donationImage from "../../assets/images/donate-now-Allpng.png";
import disributionImage from "../../assets/images/disribution.png";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import hero1 from "../../assets/banners/bannerInvest5.png";
import hero2 from "../../assets/banners/KorbaBanner.png";
import heroMobile1 from "../../assets/banners/mobile/BanInvestMobile.png";
import heroMobile2 from "../../assets/banners/mobile/BanKorbaMobile.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { getBanners } from "../../apis/actions/home.actions";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  variant: "homePage" | "otherVariant";
  img: any;
  mobileImg?: any;
}

interface Banner {
  id: number;
  sequence: number;
  url_button: string | false;
  url_video: string | false;
  background_image: string[];
  background_image_mobile_ids: string[]; // Added mobile banner field
}

const HeroSection = ({ ...props }: HeroSectionProps) => {
  const [offset, setOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const banners = useSelector((state: RootState) => state?.home?.banners);

  const handleOpenVideo = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const isMobile = useIsMobile();

  const getHeroImages = () => {
    // For mobile devices
    if (isMobile) {
      // Check if we have any mobile banners from API
      const hasMobileBanners =
        banners &&
        Array.isArray(banners) &&
        banners.some(
          (banner: Banner) =>
            banner.background_image_mobile_ids &&
            banner.background_image_mobile_ids.length > 0,
        );

      if (!hasMobileBanners) {
        const backupImages: any[] = [];
        if (props?.mobileImg) {
          backupImages.push(props.mobileImg);
        }
        backupImages.push(heroMobile1, heroMobile2);
        return backupImages;
      }

      const images: any[] = [];

      if (props?.mobileImg && !hasMobileBanners) {
        images.push(props.mobileImg);
      }

      if (banners && Array.isArray(banners) && banners.length > 0) {
        const sortedBanners = [...banners].sort(
          (a, b) => a.sequence - b.sequence,
        );
        sortedBanners.forEach((banner: Banner) => {
          if (
            banner.background_image_mobile_ids &&
            banner.background_image_mobile_ids.length > 0
          ) {
            images.push(banner.background_image_mobile_ids[0]);
          }
        });
      }

      return images;
    }

    const images: any[] = [];
    const hasBanners =
      banners &&
      Array.isArray(banners) &&
      banners.some(
        (banner: Banner) =>
          banner.background_image && banner.background_image.length > 0,
      );

    if (props?.img && !hasBanners) {
      images.push(props.img);
    }

    if (banners && Array.isArray(banners) && banners.length > 0) {
      const sortedBanners = [...banners].sort(
        (a, b) => a.sequence - b.sequence,
      );
      sortedBanners.forEach((banner: Banner) => {
        if (banner.background_image && banner.background_image.length > 0) {
          images.push(banner.background_image[0]);
        }
      });
    } else {
      images.push(hero1, hero2);
    }

    return images;
  };

  const heroImages = getHeroImages();
  const heroImagesAbout = [isMobile ? props?.mobileImg : props?.img];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const getCurrentBannerUrl = () => {
    if (!banners || !Array.isArray(banners) || banners.length === 0) {
      return null;
    }

    // Calculate offset for props images
    let propsImgOffset = 0;

    const actualBannerIndex = currentBannerIndex - propsImgOffset;

    if (actualBannerIndex >= 0 && actualBannerIndex < banners.length) {
      const sortedBanners = [...banners].sort(
        (a, b) => a.sequence - b.sequence,
      );
      return sortedBanners[actualBannerIndex]?.url_button || null;
    }

    return null;
  };

  const getCurrentBannerVideo = () => {
    if (!banners || !Array.isArray(banners) || banners.length === 0) {
      return null;
    }

    // Calculate offset for props images
    let propsImgOffset = 0;

    const actualBannerIndex = currentBannerIndex - propsImgOffset;

    if (actualBannerIndex >= 0 && actualBannerIndex < banners.length) {
      const sortedBanners = [...banners].sort(
        (a, b) => a.sequence - b.sequence,
      );
      return sortedBanners[actualBannerIndex]?.url_video || null;
    }

    return null;
  };

  const currentDonationButtonVideo = getCurrentBannerVideo();
  const currentDonationButtonUrl = getCurrentBannerUrl();

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleDonationClick = () => {
    if (currentDonationButtonUrl) {
      window.open(currentDonationButtonUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      {...props}
      className={`ghaith--hero-section-container ${props.className ?? ""}`}
    >
      {props.variant === "homePage" && (
        <>
          <div
            ref={scrollRef}
            className={`ghaith--scroll-now ${isVisible ? "is-visible" : ""}`}
            style={{ cursor: "pointer" }}
          >
            {currentDonationButtonUrl ? (
              <img
                onClick={handleDonationClick}
                className="ghaith--scroll-now__img"
                src={donationImage}
                alt="Donate Now"
              />
            ) : null}
          </div>
          {currentDonationButtonVideo ? (
            <div
              ref={scrollRef}
              className="ghaith--disribution-container"
              onClick={handleOpenVideo}
            >
              <img
                className="ghaith--disribution__img "
                src={disributionImage}
                alt=""
              />
            </div>
          ) : null}
        </>
      )}
      <div className="ghaith--sky-background">
        <img
          src={skyimage}
          alt="sky background"
          style={{ transform: `translateY(${offset}px)` }}
        />
      </div>

      <Carousel
        speed={1000}
        dots={false}
        arrows={isMobile ? false : props.variant === "homePage" ? true : false}
        autoplaySpeed={10000}
        autoplay
        effect="fade"
        className="ghaith--hero-section-carousel"
        beforeChange={(_, next) => setCurrentBannerIndex(next)}
      >
        {(props.variant === "homePage" ? heroImages : heroImagesAbout).map(
          (imageSrc, index) => (
            <div key={index}>
              <img
                className="ghaith--hero-section-image"
                src={imageSrc}
                alt="hero"
                style={{ marginTop: "1rem" }}
              />
            </div>
          ),
        )}
      </Carousel>

      {props.variant === "homePage" && (
        <>
          {/*
          <div className="ghaith--hero-social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="Twitter" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtube} alt="YouTube" />
            </a>
            <img src={line} alt="Separator Line" className="line-separator" />
            <img src={groupe} alt="Scroll Icon" className="scroll-icon" />
          </div>
          
          <div className="ghaith--hero-text-box">
            <p className="ghaith--hero-description">
              تنفيذ مشروع «إطعام حاج» بساحة كدى بمحيط الحرم المكي. بهدف توفير
              الماء البارد للحجاج ضيوف الرحمن في أجواء روحانية مميزة تلامس
              القلوب
            </p>
            <a href="#" className="ghaith--hero-link">
              المزيد من التفاصيل
            </a>
            <div className="ghaith--hero-stats">
              <div className="ghaith--hero-stat-item">
                <p className="ghaith--hero-stat-label">عدد مواقع التوزيع</p>
                <div className="ghaith--hero-number-row">
                  <img
                    src={location}
                    alt="location icon"
                    className="ghaith--hero-icon"
                  />
                  <p className="ghaith--hero-stat-number">12</p>
                </div>
              </div>
              <div className="ghaith--hero-stat-item">
                <p className="ghaith--hero-stat-label">
                  عدد المستفيدين المستهدف
                </p>
                <div className="ghaith--hero-number-row">
                  <img
                    src={teamBanner}
                    alt="team icon"
                    className="ghaith--hero-icon"
                  />
                  <p className="ghaith--hero-stat-number">1.23</p>
                </div>
              </div>
            </div>
          </div>
          */}
        </>
      )}
      <ModalComponent
        title="  "
        open={isModalOpen}
        onClose={handleCloseModal}
        closeOnOutsideClick={true}
        width={800}
        centered={true}
        destroyOnClose={true}
        modalStyle={{
          top: 20,
          minHeight: "60vh",
          height: "auto",
          direction: "rtl",
        }}
        className="gh--font-medium"
      >
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            direction: "rtl",
            marginTop: "1.5rem",
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src={getYouTubeEmbedUrl(currentDonationButtonVideo ?? "")}
            title={""}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </ModalComponent>
    </section>
  );
};

export default HeroSection;
