import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";

import Loader from "../../bibilio/loader/Loader";
import { toGetCertificateAwards } from "../../apis/actions/photoVideos.actions";
import FooterSection from "../../components/sections/FooterSection";
import PreviewMedia from "../../bibilio/previewMedia/PreviewMedia";
import NavBar from "../commun/Navbar";
import FooterImage from "../../assets/images/ghaith-footer.png";
import PageContainer from "../../components/container/PageContainer";

const CertificateAward = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { certificates, awards, loading } = useSelector(
    (state: RootState) => state.photoVideo,
  );

  useEffect(() => {
    dispatch(toGetCertificateAwards());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      <PageContainer
        title="جمعية غيث - الشهادات و الجوائز"
        description="الشهادات و الجوائز"
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">الشهادات </span>
              <span className="ghaith--donation-primary">و الجوائز</span>
            </h1>
          </div>{" "}
        </div>{" "}
        <PreviewMedia
          mediaItems={certificates}
          loading={loading}
          itemPerPage={3}
          isVideo={false}
          title="الشهادات"
        />
        <div className="ghaith--certificate-awards">
          <PreviewMedia
            mediaItems={awards}
            loading={loading}
            itemPerPage={3}
            isVideo={false}
            title="الجوائز"
          />
        </div>{" "}
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default CertificateAward;
