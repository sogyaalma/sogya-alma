import React, { useEffect } from "react";
import NavBar from "../../commun/Navbar";
import Loader from "../../../bibilio/loader/Loader";
import { AppDispatch, RootState } from "../../../apis/store";
import { useDispatch, useSelector } from "react-redux";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { toGetInvestments } from "../../../apis/actions/EndowmentInvestment.actions";
import InvestmentContent from "./InvestmentContent";
import PageContainer from "../../../components/container/PageContainer";

const InvestmentPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { investments, loading } = useSelector(
    (state: RootState) => state.investments,
  );
  useEffect(() => {
    dispatch(toGetInvestments());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - أوقاف الجمعية"
        description="أوقاف الجمعية "
      >
        <NavBar variant="homePage" />
        <InvestmentContent investments={investments} />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default InvestmentPage;
