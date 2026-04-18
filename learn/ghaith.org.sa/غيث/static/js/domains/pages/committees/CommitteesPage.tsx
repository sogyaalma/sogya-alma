import React, { useEffect } from "react";
import NavBar from "../../commun/Navbar";
import Loader from "../../../bibilio/loader/Loader";
import { AppDispatch, RootState } from "../../../apis/store";
import { useDispatch, useSelector } from "react-redux";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import { toGetCommittees } from "../../../apis/actions/committees.actions";
import CommitteesContent from "./CommitteesContent";
import PageContainer from "../../../components/container/PageContainer";

const CommitteesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { committes, loading } = useSelector(
    (state: RootState) => state.committees,
  );
  useEffect(() => {
    dispatch(toGetCommittees());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      <PageContainer
        title="جمعية غيث - لجان الجمعية"
        description="لجان الجمعية "
      >
        <NavBar variant="homePage" />
        <CommitteesContent committes={committes} />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default CommitteesPage;
