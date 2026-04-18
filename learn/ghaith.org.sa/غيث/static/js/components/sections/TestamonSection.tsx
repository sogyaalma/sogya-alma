import React, { useEffect, useRef, useState, useMemo } from "react";

import handsImage from "../../assets/images/hands.png";
import mosqueeImage from "../../assets/images/Mosque.png";
import quoteIcon from "../../assets/icons/signature.svg";
import TextParagraphSlider from "../textSlider/TextSlider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { getQuotes } from "../../apis/actions/home.actions";

const TestamonSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const quotes = useSelector((state: RootState) => state?.home.quotes);
  const sortedQuotes = useMemo(() => {
    if (!quotes) return [];
    const sorted = [...quotes].sort(
      (a, b) => (a.sequence || 0) - (b.sequence || 0)
    );
    return sorted;
  }, [quotes]);
  useEffect(() => {
    dispatch(getQuotes());
  }, [dispatch]);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const sectionTop = el.offsetTop;
      const sectionH = el.offsetHeight;
      const scrollY = window.scrollY;

      // scroll relative to section start
      let rel = scrollY - sectionTop;

      // only when inside the section
      if (rel < 0) rel = 0;

      // stop a little before the end (e.g. 80% of section height)
      const maxRel = sectionH * 0.4;
      if (rel > maxRel) rel = maxRel;

      setOffset(rel * 0.3); // parallax speed
    };

    onScroll(); // run once at mount
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ghaith--testamon">
      {/* Images layer */}
      <div className="ghaith--testamon-layer">
        <img
          src={mosqueeImage}
          alt=""
          className="ghaith--testamon-mosque"
          style={{ transform: `translateY(${offset}px)` }}
        />
        <img src={handsImage} alt="" className="ghaith--testamon-hands" />
      </div>

      {/* Title + icon */}
      <div className="ghaith--testamon-title-wrapper">
        <div className="ghaith--testamon-title-box">
          <img src={quoteIcon} alt="" className="ghaith--testamon-title-icon" />
          <h3 className="ghaith--testamon-title">
            قالوا عن <span>غيث</span>
          </h3>
        </div>
      </div>

      <TextParagraphSlider paragraphs={sortedQuotes} />
    </section>
  );
};

export default TestamonSection;
