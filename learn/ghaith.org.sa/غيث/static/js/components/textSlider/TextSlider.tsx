// TextParagraphSlider.tsx
import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import downArrow from "../../assets/icons/green-down-arrow.svg";
import upArrow from "../../assets/icons/green-down-arrow.svg";
import signatureIcon from "../../assets/icons/signature.png";
type Props = {
  paragraphs: any;
};

const TextParagraphSlider: React.FC<Props> = ({ paragraphs }) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  return (
    <div className="ghaith--para-slider">
      {/* Left controls */}
      <div className="ghaith--para-slider__controls">
        <button
          aria-label="السابق"
          className="ghaith--para-slider__arrow ghaith--para-slider__arrow--up"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <img src={upArrow} alt="" />
        </button>

        <button
          aria-label="التالي"
          className="ghaith--para-slider__arrow ghaith--para-slider__arrow--down"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <img src={downArrow} alt="" />
        </button>
      </div>

      <div className="ghaith--para-slider__separator" />

      <div className="ghaith--para-slider__content" dir="rtl">
        <Slider ref={sliderRef} {...settings}>
          {paragraphs.map((item: any, i: any) => (
            <div key={i} className="ghaith--para-slide">
              <p
                className="ghaith--para-slide__text"
                dangerouslySetInnerHTML={{ __html: item.quote || "" }}
              />
              <p className="ghaith--para-slide__author">
                <img
                  src={signatureIcon}
                  alt=""
                  className="ghaith--para-slide__author-icon"
                />
                {item.author}
              </p>{" "}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TextParagraphSlider;
