import React from "react";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import PageContainer from "../../../components/container/PageContainer";

const OriginPage: React.FC = () => {
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - النشأة و التأسيس"
        description="النشأة و التأسيس"
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--gift-sub-title">
            <h1>
              <span className="ghaith--donation-highlight">النشأة </span>
              <span className="ghaith--donation-primary">و التأسيس</span>
            </h1>
          </div>

          {/* Content Section */}
          <div className="container" style={{ padding: "3rem 1rem" }}>
            {/* النشأة */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                النشأة
              </h2>
              <p
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                تأسست جمعية غيث كجمعية غير ربحية عام 1437هـ، متخذةً من تقديم
                الخدمات الاجتماعية والإغاثية رسالةً أساسية لها. واتسع نطاق عملها
                الجغرافي ليشمل منطقة مكة المكرمة كاملة، حيث تسعى جاهدة لتلبية
                احتياجات مستفيديها وخدمة ضيوف الرحمن بالحرم المكي وذلك بأعلى
                معايير الجودة والكفاءة.
              </p>
            </section>

            {/* عن غيث */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                عن غيث
              </h2>
              <p
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                نحن جمعية غيث الخيرية بمدركة (ترخيص رقم 693 من المركز الوطني غير
                الربحي كجمعية أهلية غير ربحية)، مهمّتنا تقديم المساعدات النقدية
                والعينية، والخدمات الصحية والتدريبية، وتأهيل المستفيدين من أهالي
                منطقة مكة المكرمة والقرى التي تمتدّ لها خدمات الجمعية، كذلك
                تقديم الخدمات لضيوف الرحمن بكل جودة وكفاءة من سقيا وضيافة وإطعام
                وتنفيذ مشاريع أخرى لخدمة ضيوف الرحمن.
              </p>
            </section>

            {/* أهدافنا */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                أهدافنا
              </h2>
              <ul
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  listStyle: "disc",
                  paddingRight: "2rem",
                }}
              >
                <li style={{ marginBottom: "0.8rem" }}>
                  مساعدة الأسر الفقيرة والمحتاجة ماديًا وعينيًا.
                </li>
                <li style={{ marginBottom: "0.8rem" }}>
                  مساعدة الأسر الفقيرة في بناء المساكن.
                </li>
                <li style={{ marginBottom: "0.8rem" }}>
                  مساعدة الأسر الفقيرة في تأمين العلاج والدواء.
                </li>
                <li style={{ marginBottom: "0.8rem" }}>
                  تقديم الأنشطة والبرامج التدريبية لتأهيل الأسر المحتاجة لسوق
                  العمل.
                </li>
                <li style={{ marginBottom: "0.8rem" }}>خدمة ضيوف الرحمن.</li>
              </ul>
            </section>

            {/* رؤيتنا */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                رؤيتنا
              </h2>
              <p
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                أن تكون الجمعية رائدة في تقديم الخدمات للمحتاجين بالقرى التي
                تمتدّ لها خدمات الجمعية، والعمل لتقديم خدمات شاملة وملهمة لضيوف
                الرحمن بمكة المكرمة، تُجسد روح الضيافة الإسلامية وتُعزز تجاربهم
                الروحانية، وتساهم في تيسير أداء مناسكهم بأعلى معايير الجودة
                والكفاءة.
              </p>
            </section>

            {/* رسالتنا */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                رسالتنا
              </h2>
              <p
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                أن نكون العون للمستفيدين والسند لزوار بيت الله الحرام، عبر تقديم
                خدمات متميزة وشاملة لـكافة مستفيدي الجمعية وضيوف الرحمن، ترتكز
                على القيم الإسلامية وتلبي احتياجاتهم الروحية والصحية
                والاجتماعية، ونسعى لتحقيق ذلك عبر كفاءات مؤهلة ومشاريع مبتكرة
                تضمن الاستدامة، تيسيراً للمناسك وإسهاماً في تحسين جودة حياة
                المستفيدين بروح الضيافة والإحسان
              </p>
            </section>

            {/* قيمنا */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                قيمنا
              </h2>
              <ul
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  listStyle: "disc",
                  paddingRight: "2rem",
                }}
              >
                <li style={{ marginBottom: "0.8rem" }}>الإخلاص.</li>
                <li style={{ marginBottom: "0.8rem" }}>التكافل.</li>
                <li style={{ marginBottom: "0.8rem" }}>الابتكار.</li>
                <li style={{ marginBottom: "0.8rem" }}>الصدق.</li>
                <li style={{ marginBottom: "0.8rem" }}>الإحسان.</li>
                <li style={{ marginBottom: "0.8rem" }}>الرحمة.</li>
                <li style={{ marginBottom: "0.8rem" }}>الأمانة.</li>
                <li style={{ marginBottom: "0.8rem" }}>الشمولية.</li>
                <li style={{ marginBottom: "0.8rem" }}>التعاون.</li>
                <li style={{ marginBottom: "0.8rem" }}>التقدير.</li>
              </ul>
            </section>

            {/* عدد المستفيدين سنويًا */}
            <section style={{ marginBottom: "3rem" }}>
              <h2
                className="gh--font-light"
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#2c5f2d",
                }}
              >
                عدد المستفيدين سنويًا
              </h2>
              <p
                className="gh--font-light"
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                بفضل ثقتكم، تجاوز عدد مستفيدينا 12 مليون مستفيد سنويًا خلال
                الفترة ما بين 2023م و2025م.
              </p>
            </section>
          </div>
        </div>
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default OriginPage;
