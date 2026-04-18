import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import PreviewMedia from "../../bibilio/previewMedia/PreviewMedia";
import Loader from "../../bibilio/loader/Loader";
import { toGetPermitsAssociation } from "../../apis/actions/photoVideos.actions";
import FooterSection from "../../components/sections/FooterSection";
import NavBar from "../commun/Navbar";
import FooterImage from "../../assets/images/ghaith-footer.png";
import PageContainer from "../../components/container/PageContainer";

const PermitsAssociation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { permits, loading } = useSelector(
    (state: RootState) => state.photoVideo,
  );

  useEffect(() => {
    dispatch(toGetPermitsAssociation());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      <PageContainer
        title="جمعية غيث - تصاريح الجمعية"
        description="تصاريح الجمعية "
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">تصاريح </span>
              <span className="ghaith--donation-primary">الجمعية</span>
            </h1>
          </div>{" "}
        </div>
        <PreviewMedia
          mediaItems={permits}
          loading={loading}
          itemPerPage={6}
          isVideo={false}
        />{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default PermitsAssociation;
