import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import Loader from "../../../bibilio/loader/Loader";
import { toGetVideoAlbum } from "../../../apis/actions/photoVideos.actions";
import PreviewMedia from "../../../bibilio/previewMedia/PreviewMedia";
import PageContainer from "../../../components/container/PageContainer";

const VideoAlbum: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videos, loading } = useSelector(
    (state: RootState) => state.photoVideo,
  );

  useEffect(() => {
    dispatch(toGetVideoAlbum());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer title="جمعية غيث - مكتبة الفيديو" description="مكتبة الفيديو">
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">مكتبة </span>
              <span className="ghaith--donation-primary">الفيديو</span>
            </h1>
          </div>{" "}
        </div>{" "}
        <PreviewMedia
          mediaItems={videos}
          loading={loading}
          itemPerPage={6}
          isVideo={true}
        />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default VideoAlbum;
