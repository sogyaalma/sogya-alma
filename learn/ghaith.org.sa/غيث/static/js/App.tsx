import React, { useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../src/styles/App.scss";
import Home from "./domains/pages/Home";
import AboutUs from "./domains/pages/AboutUs";
import DonorProfile from "./domains/profile/donor/DonorProfile";
import "@emran-alhaddad/saudi-riyal-font/index.css";
import BeneficiaryProfile from "./domains/profile/beneficiary/BeneficiaryProfile";
import TopLoader from "./bibilio/loader/TopLoader";
import ProtectedRoute from "./apis/utils/ProtectedRoutes";
import LayoutDetailsProgram from "./domains/pages/programsLayout";
import MoyasarResult from "./components/moyassar/MoyassarResult";
import ConditionalRenderComponents from "./components/ConditionalRenderComponents";
import Rating from "./components/moyassar/Rating";
import PartnersList from "./domains/pages/partners/PartnersList";
import AddPartnership from "./domains/pages/partners/addPartnership";
import NewsSection from "./domains/pages/news/NewsList";
import NewsDetails from "./domains/pages/news/NewsDetails";
import ProjectDetails from "./domains/pages/projects/ProjectDetails";
import ProjectsPage from "./domains/pages/projects/Projects";
import PhotoAlbum from "./domains/pages/photosVideos/Photos";
import VideoAlbum from "./domains/pages/photosVideos/Videos";
import AddActiveBeneficiary from "./domains/pages/add_beneficiary/AddActiveBeneficiary";
import ReportsPage from "./domains/pages/ReportsPage";
import CertificateAward from "./domains/pages/CertifactesAwards";
import PermitsAssociation from "./domains/pages/PermitsAssociation";
import SuggestionsComplaints from "./domains/pages/contact-us/SuggestionsComplains";
import ContactUs from "./domains/pages/contact-us/ContactUs";
import OrganizationalStructure from "./domains/pages/orgazitional-structure/OrganizitionalStructurePage";
import DonationMethods from "./domains/pages/DonationMethods";
import JobsOpportunities from "./domains/pages/jobs/JobsOpportunities";
import MoreNumbers from "./domains/pages/MoreNumbersPage";
import CoverPageWrapper from "./domains/pages/cover/CoverPageWrapper";
import GiftWrapper from "./domains/pages/gift/GiftWrapper";
import CommitteesPage from "./domains/pages/committees/CommitteesPage";
import InvestmentPage from "./domains/pages/investments/InvestmentsPage";
import OurBranches from "./domains/pages/branches/ourBranches";
import FoundingMembers from "./domains/pages/founders/foundingMembersPage";
import DirectorsBoard from "./domains/pages/directors_board/DirectorsBoardPage";
import GeneralAssemblyPage from "./domains/pages/general_assembly/GeneralAssemblyPage";
import CeoPage from "./domains/pages/ceo/ceoPage";
import HigherManagment from "./domains/pages/higher-managment/higherManagmentPage";
import PodcastPage from "./domains/pages/podcast/PodcastPage";
import UmrahPage from "./domains/pages/umrah/UmrahPage";
import OriginPage from "./domains/pages/origin/OriginEstablishmentPage";
import ZakatPage from "./domains/pages/zakatPage";
import MealsWrapper from "./domains/pages/ramadan_meals/MealsWrapper";
import PrintBankTransferModal from "./components/bank-transfer/PrintBankTransferReceipt";
import TikTokPixel from "tiktok-pixel";

// Create a ProfileRouter component that checks the role
const ProfileRouter = () => {
  const [cookies] = useCookies(["role"]);
  const role = cookies.role;
  if (role === "donor") {
    return <DonorProfile />;
  } else if (role === "beneficiary") {
    return <BeneficiaryProfile />;
  } else {
    return <Navigate to="/" replace />;
  }
};

function App() {
  TikTokPixel.init("D5B51SBC77U4D2G7VKU0", {
    debug: process.env.NODE_ENV !== "production",
  });
  const location = useLocation();
  const firedUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const path = location.pathname;

    if (!firedUrlsRef.current.has(path)) {
      (window as any).snaptr("track", "PAGE_VIEW");
      firedUrlsRef.current.add(path);
    }
  }, [location.pathname]);

  return (
    <div className="ghaith--app-container">
      <TopLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfileRouter />} />
        </Route>
        <Route
          path="/program/:access_token"
          element={<LayoutDetailsProgram />}
        />{" "}
        <Route path="/korba/:access_token" element={<LayoutDetailsProgram />} />
        <Route path="/donation" element={<MoyasarResult />} />
        <Route path="/partners" element={<PartnersList />} />
        <Route path="/add-partnership" element={<AddPartnership />} />
        <Route path="/news" element={<NewsSection type="news" />} />
        <Route path="/events" element={<NewsSection type="events" />} />
        <Route path="/media-eyes" element={<NewsSection type="media_eyes" />} />
        <Route
          path="/news/:access_token"
          element={<NewsDetails type="news" />}
        />{" "}
        <Route
          path="/event/:access_token"
          element={<NewsDetails type="event" />}
        />
        <Route
          path="/media-eyes/:access_token"
          element={<NewsDetails type="media_eyes" />}
        />
        <Route path="/project/:access_token" element={<ProjectDetails />} />
        <Route path="/general-projects" element={<ProjectsPage type="general" />} />
        <Route path="/seasonal-projects" element={<ProjectsPage type="seasonal" />} />
        <Route path="/our-photo" element={<PhotoAlbum />} />
        <Route path="/our-video" element={<VideoAlbum />} />
        <Route path="/beneficiary/add" element={<AddActiveBeneficiary />} />
        <Route
          path="/regulations"
          element={<ReportsPage type="regulations" />}
        />{" "}
        <Route
          path="/financial-statement"
          element={<ReportsPage type="financial_statement" />}
        />{" "}
        <Route
          path="/operational-plans"
          element={<ReportsPage type="operational_plans" />}
        />{" "}
        <Route
          path="/quality-development"
          element={<ReportsPage type="quality_development" />}
        />{" "}
        <Route
          path="/performance-reports"
          element={<ReportsPage type="performance_reports" />}
        />{" "}
        <Route
          path="/goals_programs"
          element={<ReportsPage type="goals_programs" />}
        />{" "}
        <Route path="/feedback" element={<ReportsPage type="feedback" />} />{" "}
        <Route path="/officials" element={<ReportsPage type="officials" />} />{" "}
        <Route
          path="/media-reports"
          element={<ReportsPage type="mediaReports" />}
        />{" "}
        <Route path="/our-certificates-awards" element={<CertificateAward />} />{" "}
        <Route path="/permits-association" element={<PermitsAssociation />} />{" "}
        <Route path="/donation-methods" element={<DonationMethods />} />
        <Route
          path="/suggestions-complaints"
          element={<SuggestionsComplaints />}
        />{" "}
        <Route
          path="/organizational-structure"
          element={<OrganizationalStructure />}
        />
        <Route path="/contact-us" element={<ContactUs />} />{" "}
        <Route path="/jobs" element={<JobsOpportunities />} />
        <Route path="/zakat_calculator" element={<ZakatPage />} />
        <Route path="/cover" element={<CoverPageWrapper />} />
        <Route path="/numbers" element={<MoreNumbers />} />
        <Route path="/gift" element={<GiftWrapper />} />
        <Route path="/ramadan_meals" element={<MealsWrapper />} />
        <Route path="/committees" element={<CommitteesPage />} />
        <Route path="/awqaf" element={<InvestmentPage />} />
        <Route path="/our-branches" element={<OurBranches />} />
        <Route path="/founding-members" element={<FoundingMembers />} />
        <Route path="/directors-board" element={<DirectorsBoard />} />{" "}
        <Route
          path="/general-assembly-members"
          element={<GeneralAssemblyPage />}
        />{" "}
        <Route path="/ceo" element={<CeoPage />} />
        <Route path="/higher-managment" element={<HigherManagment />} />
        <Route path="/podcasts" element={<PodcastPage />} />
        <Route path="/umrah" element={<UmrahPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/origin-establishment" element={<OriginPage />} />
      </Routes>
      <ConditionalRenderComponents />
      <Rating isOpe={true} setIsOpen={(v) => console.log(v)} res_id={-1} />{" "}
      <PrintBankTransferModal />
    </div>
  );
}

export default App;
