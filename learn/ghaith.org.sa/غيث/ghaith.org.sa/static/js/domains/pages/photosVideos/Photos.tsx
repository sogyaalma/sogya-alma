import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../apis/store";
import NavBar from "../../commun/Navbar";
import FooterSection from "../../../components/sections/FooterSection";
import FooterImage from "../../../assets/images/ghaith-footer.png";
import Loader from "../../../bibilio/loader/Loader";
import { toGetPhotoAlbum } from "../../../apis/actions/photoVideos.actions";
import PreviewMedia from "../../../bibilio/previewMedia/PreviewMedia";
import PageContainer from "../../../components/container/PageContainer";

const PhotoAlbum: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { photos, loading } = useSelector(
    (state: RootState) => state.photoVideo,
  );

  useEffect(() => {
    dispatch(toGetPhotoAlbum());
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <>
      {" "}
      <PageContainer
        title="جمعية غيث - مكتبة الصور"
        description="مكتبة الصور"
      >
        <NavBar variant="homePage" />
        <div className="ghaith--projects-page" style={{ marginTop: "9rem" }}>
          <div className="ghaith--newsSection-title">
            <h1>
              <span className="ghaith--donation-highlight">مكتبة </span>
              <span className="ghaith--donation-primary">الصور</span>
            </h1>
          </div>{" "}
        </div>{" "}
        <PreviewMedia
          mediaItems={photos}
          loading={loading}
          itemPerPage={6}
          isVideo={false}
        />
        <FooterSection footerImg={FooterImage} />
      </PageContainer>
    </>
  );
};

export default PhotoAlbum;
