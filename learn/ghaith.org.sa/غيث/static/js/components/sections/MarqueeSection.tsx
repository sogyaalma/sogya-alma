import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeSection() {
  const line1 = [
    "سقيا غيث",
    "إفطار صائمي الحرم",
    "كفالة أسرة فقيرة",
    "تفريج كربة",
    "كفالة يتيم",
    "استثمار في البلد الحرام",
    "كفالة أسرة فقيرة",
    "كفالة يتيم",
  ];
  const line2 = [
    "كن غيثًا في غيث",
    "كفالة أرمـلة",
    "التدريب و التأهيل",
    "مساعدات طبية",
    "سداد فواتير",
    "فسحة مدرسية",
    "التدريب و التأهيل",
    "كفالة أرمـلة",
  ];
  const line3 = [
    "تفريج كربة",
    "كفالة أرامل",
    "سلة غذائية",
    "أثاث للمنزل",
    "كسوة الشتاء",
    "كفالة أرامل",
    "أثاث للمنزل",
    "كسوة الشتاء",
  ];

  const highlightIdx1 = Math.floor(Math.random() * line1.length);
  const highlightIdx2 = Math.floor(Math.random() * line2.length);
  const highlightIdx3 = Math.floor(Math.random() * line3.length);

  return (
    <div className="ghaith--marquee-wrapper">
      {/* Line 1 */}
      <Marquee direction="right" gradient={false} speed={40}>
        {line1.map((text, idx) => (
          <span
            key={idx}
            className={`ghaith--marquee-text ${
              idx === highlightIdx1
                ? "ghaith--marquee-highlight-line1"
                : "ghaith--marquee-muted"
            }`}
          >
            {text}
          </span>
        ))}
      </Marquee>

      {/* Line 2 */}
      <Marquee direction="left" gradient={false} speed={50}>
        {line2.map((text, idx) => (
          <span
            key={idx}
            className={`ghaith--marquee-text ${
              idx === highlightIdx2
                ? "ghaith--marquee-highlight-line2"
                : "ghaith--marquee-muted"
            }`}
          >
            {text}
          </span>
        ))}
      </Marquee>

      {/* Line 3 */}
      <Marquee direction="right" gradient={false} speed={35}>
        {line3.map((text, idx) => (
          <span
            key={idx}
            className={`ghaith--marquee-text ${
              idx === highlightIdx3
                ? "ghaith--marquee-highlight-line1"
                : "ghaith--marquee-muted"
            }`}
          >
            {text}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
