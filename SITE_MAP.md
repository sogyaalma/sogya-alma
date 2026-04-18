# خارطة مسارات منصة سقيا الماء
# Sogya Alma Platform — Site Map & Content Guide

> آخر تحديث: 2026-04-18

---

## 🗂️ هيكل الملفات والمسارات

```
src/app/
├── page.tsx                    → الصفحة الرئيسية (/)
├── globals.css                 → ملف التنسيق الرئيسي
├── layout.tsx                  → القالب الأساسي (الخطوط، الثيمات)
│
├── opportunities/
│   ├── page.tsx                → دليل المشاريع (/opportunities)
│   └── [id]/page.tsx           → تفاصيل المشروع (/opportunities/1)
│
├── donate/page.tsx             → التبرع السريع (/donate)
├── payment/page.tsx            → بوابة الدفع (/payment)
├── cart/page.tsx                → سلة التبرعات (/cart)
│
├── waqf/page.tsx               → الوقف الرقمي (/waqf)
├── zakat/page.tsx              → حاسبة الزكاة (/zakat)
├── periodicdonation/page.tsx   → التبرع الدوري (/periodicdonation)
│
├── tyassarat/page.tsx          → تيسرت - تفريج كرب (/tyassarat)
├── forijat/page.tsx            → فرجت - مساعدة محكومين (/forijat)
├── rescue/page.tsx             → إغاثة مائية (/rescue)
│
├── mosques/page.tsx            → سقيا المساجد (/mosques)
├── kids/page.tsx               → كفالة الأيتام (/kids)
├── orphans/page.tsx            → رعاية الأيتام (/orphans)
├── housing/page.tsx            → الإسكان الخيري (/housing)
├── subsidy/page.tsx            → الإعانات (/subsidy)
├── adahi/page.tsx              → مشروع الأضاحي (/adahi)
│
├── media/page.tsx              → المركز الإعلامي (/media)
├── news/
│   ├── page.tsx                → أرشيف الأخبار (/news)
│   └── [slug]/page.tsx         → مقال خبري (/news/welcome)
│
├── about/
│   ├── page.tsx                → عن الجمعية (/about)
│   ├── committee/page.tsx      → اللجان والإدارة (/about/committee)
│   ├── privacy/page.tsx        → سياسة الخصوصية (/about/privacy)
│   ├── terms/page.tsx          → شروط الاستخدام (/about/terms)
│   ├── policies/page.tsx       → اللوائح والسياسات (/about/policies)
│   ├── financials/page.tsx     → القوائم المالية (/about/financials)
│   └── opendata/page.tsx       → البيانات المفتوحة (/about/opendata)
│
├── auth/
│   ├── login/page.tsx          → تسجيل الدخول (/auth/login)
│   └── dashboard/page.tsx      → لوحة تحكم المتبرع (/auth/dashboard)
│
├── volunteer/page.tsx          → التطوع (/volunteer)
├── reports/page.tsx            → التقارير (/reports)
├── certificate/page.tsx        → شهادة التقدير (/certificate)
├── complaints/page.tsx         → الشكاوى (/complaints)
├── request-water/page.tsx      → طلب سقيا (/request-water)
├── gift/page.tsx               → إهداء تبرع (/gift)
├── smsdonation/page.tsx        → التبرع بالرسائل (/smsdonation)
├── donationcampaign/page.tsx   → حملات التبرع (/donationcampaign)
├── majordonors/page.tsx        → كبار المتبرعين (/majordonors)
└── partnerprofile/page.tsx     → ملف الشريك (/partnerprofile)
```

---

## 📊 إدارة بيانات المشاريع (بدون كود)

### الملف: `public/data/database.csv`

هذا الملف يتحكم في **جميع كروت المشاريع والأخبار** التي تظهر في الموقع.

### الأعمدة المطلوبة:

| العمود | الوصف | مثال |
|---|---|---|
| `ID` | رقم فريد للمشروع | `1`, `2`, `news-1` |
| `Title` | عنوان المشروع | `ساهم بكرتون` |
| `Description` | وصف مختصر | `المساهمة بكرتون ماء...` |
| `Category` | التصنيف (يحدد أين يظهر) | انظر الجدول أدناه |
| `TargetAmount` | المبلغ المستهدف | `32500` |
| `CollectedAmount` | المبلغ المجموع | `7072` |
| `ImagePath` | مسار الصورة (`-` إن لم تتوفر) | `-` |
| `TemplateType` | نوع القالب | `Project` أو `News` |
| `Content` | محتوى Markdown للتفاصيل | `"# العنوان\nالوصف..."` |

### تصنيفات المشاريع:

| Category | يظهر في صفحة |
|---|---|
| `تبرع بثلاجة` | `/opportunities` |
| `تبرع بكرتون ماء` | `/opportunities` |
| `سقيا المساجد` | `/opportunities`, `/mosques` |
| `سقيا المقابر` | `/opportunities` |
| `سقيا زمزم` | `/opportunities` |
| `تحلية المياه` | `/opportunities` |
| `مشروع الوقف` | `/opportunities`, `/waqf` |
| `سقيا المحافظات` | `/opportunities` |
| `تيسرت` | `/tyassarat` |
| `فرجت` | `/forijat` |
| `إغاثة` | `/rescue` |

### كيفية إضافة مشروع جديد:
1. افتح ملف `public/data/database.csv` بـ Excel أو أي محرر نصوص
2. أضف سطراً جديداً بنفس التنسيق
3. احفظ الملف
4. أعد تشغيل خادم التطوير (`npm run dev`)

---

## 🧩 المكونات المشتركة

| المكون | الملف | الوظيفة |
|---|---|---|
| Header | `src/components/Header.tsx` | شريط التنقل العلوي |
| Footer | `src/components/Footer.tsx` | التذييل |
| QuickDonate | `src/components/QuickDonate.tsx` | ودجت التبرع السريع |
| CardRenderer | `src/components/CardRenderer.tsx` | عرض كروت المشاريع/الأخبار |
| PageRating | `src/components/PageRating.tsx` | تقييم الصفحة |
| RecurringDonationModal | `src/components/RecurringDonationModal.tsx` | نافذة الاستقطاع الدوري |
| DonationSidebar | `src/components/DonationSidebar.tsx` | شريط التبرع الجانبي |

---

## 🔐 نظام المصادقة

- **المسار:** `src/app/api/auth/[...nextauth]/route.ts`
- **النوع:** NextAuth v4 مع JWT
- **البيانات التجريبية:** أي رقم جوال + كلمة مرور `123456`
- **المتغير البيئي:** يجب تعيين `NEXTAUTH_SECRET` في `.env.local`
