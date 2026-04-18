import React, { useEffect, useRef, useState } from "react";
import Odometer from "react-odometerjs";
import counterIcon from "../../assets/icons/counter.svg";
import { Button, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { getStatistics } from "../../apis/actions/home.actions";
import leftArrow from "../../assets/icons/left-arrow.svg";
import { useNavigate } from "react-router-dom";

const NumbersSection: React.FC = () => {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  const statistics = useSelector((state: RootState) => state?.home.statistics);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const displayStats: any[] =
    statistics
      ?.slice()
      .sort((a: any, b: any) => (a.sequence || 0) - (b.sequence || 0))
      .slice(0, 4) || [];
  useEffect(() => {
    const block = blockRef.current;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated && displayStats.length > 0) {
          setAnimatedStats(displayStats.map((stat) => stat.number));
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });

    if (block) observer.observe(block);

    return () => {
      if (block) observer.unobserve(block);
    };
  }, [displayStats, hasAnimated]);

  const getOdometerFormat = (num: number) => {
    const numStr = num.toString();
    const [integerPart] = numStr.split(".");
    const numDigits = integerPart.length;

    const formatPatterns: { [key: number]: string } = {
      1: "(d)",
      2: "(dd)",
      3: "(ddd)",
      4: "(d,ddd)",
      5: "(dd,ddd)",
      6: "(ddd,ddd)",
      7: "(d,ddd,ddd)",
      8: "(dd,ddd,ddd)",
      9: "(ddd,ddd,ddd)",
      10: "(d,ddd,ddd,ddd)",
    };

    const format = formatPatterns[numDigits] || formatPatterns[10];

    return format;
  };

  return (
    <section className="ghaith--statistics" ref={blockRef}>
      <div className="ghaith--statistics-title-wrapper">
        <div className="ghaith--statistics-title-box">
          <img
            src={counterIcon}
            alt=""
            className="ghaith--statistics-title-icon"
          />
          <h3 className="ghaith--statistics-title">
            أرقام <span>غيث</span>
          </h3>
        </div>
      </div>
      <Row gutter={0} className="ghaith--statistics-container">
        <Col xxl={1} xl={1} lg={1} md={1} sm={0} xs={0}></Col>
        <Col xxl={22} xl={22} lg={22} md={22} sm={24} xs={24}>
          <Row gutter={[16, 32]} className="ghaith--statistic-content">
            {displayStats.map((stat, index) => (
              <Col
                key={stat.id}
                xxl={6}
                xl={6}
                lg={6}
                md={12}
                sm={24}
                xs={24}
                className="ghaith--statistics-column"
              >
                <span className="ghaith--stat-value">
                  <Odometer
                    value={animatedStats[index]}
                    format={getOdometerFormat(stat.number)}
                  />
                </span>{" "}
                <span className="ghaith--stat-unit">{stat.unit}</span>
                <span className="ghaith--stat-label">{stat.name}</span>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xxl={1} xl={1} lg={1} md={1} sm={0} xs={0}></Col>
      </Row>{" "}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        <Button
          title="المزيد من الأرقام"
          className="ghaith--moreNumbers-button ghaith--primary-button"
          onClick={() => {
            navigate("/numbers");
          }}
        >
          {" "}
          المزيد من الأرقام{" "}
          <img src={leftArrow} alt="arrow" className="ghaith--projects-arrow" />
        </Button>
      </div>
    </section>
  );
};

export default NumbersSection;
