/************************Navbar items********************************/
// Define the type
export interface SubItem {
  name: string;
  link: string;
  openLogin?: string;
  showCondition?: boolean;
}
interface Section {
  id: string;
  label: string;
  link: string;
  subList: SubItem[];
}
export const sections: Section[] = [
  {
    id: "about",
    label: "sections.about.label",
    link: "",
    subList: [
      {
        name: "sections.about.subList.origin",
        link: "/origin-establishment",
      },
      {
        name: "sections.about.subList.ourStory",
        link: "/about-us",
      },

      {
        name: "sections.about.subList.certificatesAwards",
        link: "/our-certificates-awards",
      },
      {
        name: "sections.about.subList.permitsAssociation",
        link: "/permits-association",
      },

      {
        name: "sections.about.subList.directorsBoard",
        link: "/directors-board",
      },
      {
        name: "sections.about.subList.ceo",
        link: "/ceo",
      },
      {
        name: "sections.about.subList.higherManagment",
        link: "/higher-managment",
      },
      {
        name: "sections.about.subList.generalAssembly",
        link: "/general-assembly-members",
      },
      {
        name: "sections.about.subList.foundingMembers",
        link: "/founding-members",
      },
      {
        name: "sections.about.subList.orgazitionalStructure",
        link: "/organizational-structure",
      },
    ],
  },

  {
    id: "governance",
    label: "sections.governance.label",
    link: "",
    subList: [
      {
        name: "sections.governance.subList.committees",
        link: "/committees",
      },
      {
        name: "sections.governance.subList.bankAccounts",
        link: "/donation-methods",
      },
      {
        name: "sections.branches.label",
        link: "/our-branches",
      },
      {
        name: "sections.governance.subList.regulationsAndSystem",
        link: "/regulations",
      },
      //   {
      //  name: "sections.governance.subList.dsisclosureTransparency",
      //   link: "/",
      // },
      {
        name: "sections.governance.subList.goalsPrograms",
        link: "/goals_programs",
      },
      {
        name: "sections.governance.subList.food",
        link: "/feedback",
      },
      {
        name: "sections.governance.subList.officials",
        link: "/officials",
      },
      {
        name: "sections.governance.subList.financialStatement",
        link: "/financial-statement",
      },
      {
        name: "sections.governance.subList.operationalPlan",
        link: "/operational-plans",
      },
      {
        name: "sections.about.subList.developmentQuality",
        link: "/quality-development",
      },
      {
        name: "sections.governance.subList.endowments",
        link: "/awqaf",
      },
      {
        name: "sections.about.subList.performanceReports",
        link: "/performance-reports",
      },
    ],
  },

  {
    id: "beneficiaries",
    label: "sections.beneficiaries.label",
    link: "",
    subList: [
      {
        name: "sections.beneficiaries.subList.beneficiaryPortal",
        link: "/login",
        openLogin: "exterior_beneficiary",
      },
      {
        name: "sections.beneficiaries.subList.donorPortal",
        link: "/login",
        openLogin: "exterior_donor",
      },
      {
        name: "sections.beneficiaries.subList.usersPortal",
        link: "https://erp.ghaith.org.sa/",
      },
      {
        name: "sections.beneficiaries.subList.addBeneficiary",
        link: "/beneficiary/add",
        showCondition: true,
      },
      //  {
      //    name: "sections.beneficiaries.subList.zakatCalculator",
      //    link: "/zakat_calculator",
      //  },
      //  {
      //  name: "sections.beneficiaries.subList.addSponsor",
      //  link: "/add-sponsor",
      // },

      //  {
      //   name: "sections.beneficiaries.subList.programs",
      //   link: "/programs",
      //   },
    ],
  },
  {
    id: "projects",
    label: "sections.projects.label",
    link: "",
    subList: [
      {
        name: "sections.projects.subList.seasonalProjects",
        link: "/seasonal-projects",
      },
      {
        name: "sections.projects.subList.generalProjects",
        link: "/general-projects",
      },
    ],
  },
  {
    id: "partnerships",
    label: "sections.partnerships.label",
    link: "",
    subList: [
      {
        name: "sections.partnerships.subList.addPartnership",
        link: "/add-partnership",
      },
      {
        name: "sections.partnerships.subList.partnersList",
        link: "/partners",
      },
    ],
  },

  {
    id: "mediaCenter",
    label: "sections.mediaCenter.label",
    link: "",
    subList: [
      {
        name: "sections.mediaCenter.subList.news",
        link: "/news",
      },
      {
        name: "sections.mediaCenter.subList.cover",
        link: "/cover",
      },
      {
        name: "sections.mediaCenter.subList.podcast",
        link: "/podcasts",
      },
      {
        name: "sections.mediaCenter.subList.events",
        link: "/events",
      },
      {
        name: "sections.mediaCenter.subList.photoAlbum",
        link: "/our-photo",
      },
      {
        name: "sections.mediaCenter.subList.videos",
        link: "/our-video",
      },
      {
        name: "sections.mediaCenter.subList.mediaEyes",
        link: "/media-eyes",
      },
      {
        name: "sections.beneficiaries.subList.reports",
        link: "/media-reports",
      },
    ],
  },

  {
    id: "contact",
    label: "sections.contact.label",
    link: "",
    subList: [
      {
        name: "sections.contact.subList.suggestionsComplaints",
        link: "/suggestions-complaints",
      },
      {
        name: "sections.contact.subList.contactUs",
        link: "/contact-us",
      },
      { name: "sections.contact.subList.employment", link: "/jobs" },
      {
        name: "sections.beneficiaries.subList.volunteerNow",
        link: "https://nvg.gov.sa/",
      },
    ],
  },
];
