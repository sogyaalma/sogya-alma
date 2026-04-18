import fahdImage from "../assets/images/fahd-atibi.png";
import ceoImage from "../assets/images/ceo-saad.jpg";
import abdRahmanImage from "../assets/images/abd-rahman.png";
import saudImage from "../assets/images/saud.png";
import abdRahimImage from "../assets/images/abd-rahim.png";
export interface FoundingMember {
  id: number;
  name: string;
  image: string;
  hasPhoto: boolean;
  role?: string;
  phone?: string;
  email?: string;
  qualification?: string;
  roleDesign?: boolean;
}
export const foundingMembers = [
  {
    id: 1,
    name: "أ. عيد بن مطيع الله عالي العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 2,
    name: "أ. فهد بن سفير بن عنيزان العتيبي",
    image: fahdImage,
    hasPhoto: true,
  },
  {
    id: 3,
    name: "د. بندر بن جبير بن جابر العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 4,
    name: "أ. سعود محمد فوزان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 5,
    name: "أ. ناصر عقاب جبر العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 6,
    name: "أ. مختار بن معلا بن عالي العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 7,
    name: "أ. نمر بن شليويح بن عائض الروقي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 8,
    name: "أ. فيصل بن رشيد بن غوينم العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 9,
    name: "أ. موسى مطر عبدالله الحربي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 10,
    name: "أ. جمعان بن صالح بن سلطان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 11,
    name: "أ. مخلد بن راشد بن سلمي العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 12,
    name: "أ. خلف بن سفير بن عنيزان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 13,
    name: "أ. فيصل محمد سرور العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 14,
    name: "أ. سجدي محمد رشيد العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 15,
    name: "أ.  ممدوح بن سفير بن عنيزان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 16,
    name: "أ.  عبدالعزيز محمد فطحان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 17,
    name: "أ. فهد عويض قليل العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 18,
    name: "أ. طلال ثامر فاخر العتيبي",
    image: "",
    hasPhoto: false,
  },
];

export const directorsBoardMembers = [
  {
    id: 1,
    name: "أ. فهد بن سفير بن عنيزان العتيبي",
    image: fahdImage,
    hasPhoto: true,
    role: "رئيس مجلس الإدارة",
  },
  {
    id: 2,
    name: "أ. عيد مطيع الله العتيبي",
    image: "",
    hasPhoto: false,
    role: "نائب رئيس مجلس الإدارة",
  },
  {
    id: 3,
    name: "أ. جمعان بن صالح المباركي",
    image: "",
    hasPhoto: false,
    role: "المشرف المالي",
  },
  {
    id: 4,
    name: "أ. فهد بن زامل الحافي",
    image: "",
    hasPhoto: false,
    role: "عضو مجلس الإدارة",
  },
  {
    id: 5,
    name: "أ. مخلد بن راشد الحافي",
    image: "",
    hasPhoto: false,
    role: "عضو مجلس الإدارة",
  },
];
export const GeneralAssemblymember = [
  {
    id: 1,
    name: "أ. فهد بن سفير بن عنيزان العتيبي",
    image: fahdImage,
    hasPhoto: true,
  },
  {
    id: 2,
    name: "د. بندر بن جبير بن جابر العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 3,
    name: "أ. مختار بن معلا بن عالي العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 4,
    name: "أ. نمر بن شليويح بن عائض الروقي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 5,
    name: "أ. فيصل بن رشيد بن غوينم العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 6,
    name: "أ. جمعان بن صالح بن سلطان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 7,
    name: "أ. مخلد بن راشد بن سلمي العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 8,
    name: "أ. خلف بن سفير بن عنيزان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 9,
    name: "أ. فهد بن زامل بن عمور العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 10,
    name: "أ. علي بن عجلان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 11,
    name: "أ. إبراهيم بن مقبول العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 12,
    name: "أ.  ممدوح بن سفير بن عنيزان العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 13,
    name: "أ. مشعل بن وزير العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 14,
    name: "أ. رعد بن رجاء العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 15,
    name: "رجل الأعمال/ عبدالله بن سهيل العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 16,
    name: "أ. عمر بن حامد العصيمي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 17,
    name: "أ. عويلي بن مطلق الحربي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 18,
    name: "أ. عبدالرحمن بن سفير العتيبي",
    image: "",
    hasPhoto: false,
  },
  {
    id: 19,
    name: "أ. مطيع الله بن عالي العتيبي",
    image: "",
    hasPhoto: false,
  },
];

export const CeoInformations = [
  {
    id: 15,
    name: "أ. سعد بن مازن الروقي",
    image: ceoImage,
    hasPhoto: true,
    role: "المدير التنفيذي",
    phone: "0568160288",
    email: "Saad.alroqi@ghaith.org.sa",
  },
];
export const HigherManagmentInformations = [
  {
    id: 1,
    name: "أ. سعد بن مازن الروقي",
    image: ceoImage,
    hasPhoto: true,
    role: "المدير التنفيذي",
    phone: "0568160288",
    email: "Saad.alroqi@ghaith.org.sa",
    qualification: "المؤهل: ماجستير",
    roleDesign: true,
  },
  {
    id: 2,
    name: "أ. عبدالرحمن بن خالد النفيعي",
    image: abdRahmanImage,
    hasPhoto: true,
    role: "المدير المالي",
    phone: "0558696219",
    email: "Abdulrahman.alnefaie@ghaith.org.sa",
    qualification: "المؤهل: ماجستير",
    roleDesign: true,
  },
  {
    id: 3,
    name: "أ. سعود بن نايف المقاطي",
    image: saudImage,
    hasPhoto: true,
    role: "مدير إدارة الإعلام والاتصال المؤسسي",
    phone: "0567574439",
    email: " saud.alotaibi@ghaith.org.sa",
    qualification: "المؤهل: بكالوريوس",
    roleDesign: true,
  },
  {
    id: 4,
    name: "أ. عبدالرحيم بن دخيل الله العتيبي",
    image: abdRahimImage,
    hasPhoto: true,
    role: "مدير وحدة التطوع",
    phone: "0599115442",
    email: "abdalrahyem.alotibi@ghaith.org.sa",
    qualification: "المؤهل: بكالوريوس",
    roleDesign: true,
  },
];
