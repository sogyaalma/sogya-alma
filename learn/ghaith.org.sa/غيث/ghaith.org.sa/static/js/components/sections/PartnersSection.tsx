import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import partnerIcon from "../../assets/icons/handshake.svg";
import { carousselSettings } from "../../apis/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { getSuccessPartners } from "../../apis/actions/home.actions";

const PartenerSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const partners = useSelector((state: RootState) => state?.home.partners);
  const sliderRef = useRef<Slider>(null);
  
  useEffect(() => {
    dispatch(getSuccessPartners());
  }, [dispatch]);

  const settings = {
    ...carousselSettings(5, true),
    dots: false,
    arrows: false,
  };

  return (
    <section className="ghaith--partener-container">
      <div className="ghaith--partners-title-wrapper">
        <div className="ghaith--partners-title-box">
          <h3 className="ghaith--partners-title">
            أبرز شركاء <span>غيث</span>
          </h3>
          <img
            src={partnerIcon}
            alt=""
            className="ghaith--partners-title-icon"
          />
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {partners.map((partner: any, index: number) => (
          <div style={{ textAlign: "center" }} key={index}>
            <figure className="ghaith--partner-img-container">
              <img src={partner?.image[0]} alt="partner" />
            </figure>
          </div>
        ))}
      </Slider>

      {/* Custom Navigation Arrows - Centered below carousel */}
      <div className="ghaith--carousel-navigation">
        <button
          className="ghaith--carousel-arrow ghaith--carousel-arrow-prev"
          onClick={() => sliderRef.current?.slickPrev()}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div className="ghaith--carousel-divider"></div>
        
        <button
          className="ghaith--carousel-arrow ghaith--carousel-arrow-next"
          onClick={() => sliderRef.current?.slickNext()}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default PartenerSection;