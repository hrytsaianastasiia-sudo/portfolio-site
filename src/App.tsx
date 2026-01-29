import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Mail,
  Globe,
  PenTool,
  ArrowRight,
  Briefcase,
  HeartPulse,
  ChevronDown,
  Leaf,
  ArrowUp
} from 'lucide-react';
import ProjectPage from './ProjectPage';

// --- Types & Interfaces ---

type Language = 'en' | 'jp' | 'ua';

interface DesignSystem {
 colors: { hex: string; name: string }[];
 typography: { name: string; usage: string }[];
}

interface CaseStudyContent {
 role: string;
 timeline: string;
 tools: string[];
 overview: string;
 problem: string;
 solution: string;
 process: string[];
 persona?: {
   name: string;
   description: string;
   frustrations: string[];
   goals: string[];
 };
 results: string;
 logoConcept?: string;
}

interface ProjectContent {
 title: string;
 category: string;
 description: string;
 tags: string[];
 caseStudy: CaseStudyContent;
}

interface Project {
 id: string;
 thumbnail: string;
 accentColor: string;
 figmaUrl?: string;
 content: {
   en: ProjectContent;
   jp: ProjectContent;
   ua: ProjectContent;
 };
 designSystem?: DesignSystem;
}

// --- CONSTANTS ---

const LABELS = {
 nav: {
   work: { en: "Work", jp: "Works", ua: "Роботи" },
   about: { en: "About", jp: "About", ua: "Про мене" },
   contact: { en: "Contact", jp: "Contact", ua: "Контакти" },
 },
 hero: {
   status: { en: "Open for opportunities", jp: "現在、就職活動中", ua: "Відкрита до пропозицій" },
   titleLine1: { en: "Design that cares.", jp: "Design that cares.", ua: "Дизайн, що піклується." },
   titleLine2: { en: "Products that heal.", jp: "Products that heal.", ua: "Продукти, що зцілюють." },
   subtitle: {
     en: "All your",
     jp: "あなたの",
     ua: "Всі ваші"
   },
   tags: {
     en: ["health apps", "wellness platforms", "age-tech solutions", "inclusive interfaces"],
     jp: ["ヘルスアプリ", "ウェルネスプラットフォーム", "エイジテック", "インクルーシブUI"],
     ua: ["health додатки", "wellness платформи", "age-tech рішення", "інклюзивні інтерфейси"]
   },
   endText: {
     en: "designed with empathy.",
     jp: "を共感でデザインします。",
     ua: "спроектовані з емпатією."
   },
   intro: {
     en: "Hi, I'm Anastasiia. A Tokyo-based Product Designer blending data-driven UX with organic, inclusive aesthetics.",
     jp: "東京拠点のプロダクトデザイナー、アナスタシアです。データに基づくUXと、人に寄り添うインクルーシブなデザインでプロダクトをつくっています。",
     ua: "Привіт, я Анастасія. Продуктовий дизайнер у Токіо, що поєднує UX на основі даних з органічною естетикою."
   },
   cta: { en: "See my work", jp: "作品を見る", ua: "Переглянути роботи" },
   specialty: { en: "Age-Tech & Health", jp: "エイジテック & ヘルスケア", ua: "Age-Tech та Здоров'я" }
 },
 sectionTitles: {
   work: { en: "Selected Works", jp: "Selected Works", ua: "Вибрані Роботи" },
   about: { en: "About Me", jp: "About Me", ua: "Про Мене" },
   contact: { en: "Let's Connect", jp: "Let's Connect", ua: "Зв'яжіться зі мною" },
 },
 experience: {
   title: { en: "Experience", jp: "Experience", ua: "Досвід" },
   role: { en: "3 Years in Health Tech", jp: "ヘルステックで3年の経験", ua: "3 роки в Health Tech" },
   desc: {
     en: "UI/UX for Age-Tech startups in Tokyo.",
     jp: "東京のエイジテック系スタートアップでのUI/UXデザイン。",
     ua: "UI/UXで Age-Tech スタートアップでのUI/UXデザイン。"
   }
 },
 modal: {
   context: { en: "Context", jp: "Context", ua: "Контекст" },
   problem: { en: "Problem", jp: "Problem", ua: "Проблема" },
   solution: { en: "Solution", jp: "Solution", ua: "Рішення" },
   process: { en: "Process", jp: "Process", ua: "Процес" },
   outcome: { en: "Outcome", jp: "Outcome", ua: "Результат" },
   brand: { en: "Brand Identity", jp: "ブランドアイデンティティ", ua: "Айдентика Бренду" },
   prototype: { en: "Interactive Prototype", jp: "プロトタイプ", ua: "Інтерактивний Прототип" },
 }
};


const PROFILE = {
 name: { en: "Anastasiia Hrytsai", jp: "グリサイ アナスタシア", ua: "Анастасія Грицай" },
 email: "hrytsai.anastasiia@gmail.com",
 linkedin: "https://linkedin.com",
 fullBio: {
   en: "I am a UI/UX Designer with a unique background in graphic design and multicultural communication. Over the last 3 years in Tokyo's startup scene, I've focused on 'Age-Tech'—creating digital bridges for the aging society.",
   jp: "グラフィックデザインと多文化コミュニケーションの背景を持つUI/UXデザイナーです。東京のスタートアップで3年間、「エイジテック（Age-Tech）」に焦点を当て、高齢化社会のためのデジタルの架け橋を作ることに尽力してきました。",
   ua: "Я UI/UX дизайнер з унікальним досвідом у графічному дизайні та міжкультурній комунікації. Останні 3 роки в стартап-сфері Токіо я фокусуюся на 'Age-Tech' — створенні цифрових мостів для старіючого суспільства."
 }
};

const SKILLS = [
 { name: "Figma", level: 90 },
 { name: "Adobe Suite", level: 85 },
 { name: "UI Design", level: 90 },
 { name: "UX Research", level: 75 },
];

const LANGUAGES = [
 { lang: "Japanese", level: "N2" },
 { lang: "English", level: "Business" },
 { lang: "Ukrainian", level: "Native" },
];

const INTERESTS = [
 { en: "Vegan Lifestyle", jp: "ヴィーガン", ua: "Веганство" },
 { en: "Yoga", jp: "ヨガ", ua: "Йога" },
 { en: "Sustainability", jp: "サステナビリティ", ua: "Сталий розвиток" },
 { en: "Tennis", jp: "テニス", ua: "Теніс" },
 { en: "Longevity", jp: "長寿研究", ua: "Довголіття" },
 { en: "Japanese Sign Language", jp: "日本手話", ua: "Японська мова жестів" }
];

const PROJECTS: Project[] = [
 {
   id: "vegwam",
   thumbnail: "/vegwam-thumbnail.png", 
   accentColor: "bg-[#F1683C]",
   figmaUrl: "https://www.figma.com/proto/EZdHxq5rKrYkzWlTOWp70g/VegWam?page-id=164%3A15&node-id=164-990&p=f&viewport=1564%2C770%2C0.19&t=rGunCvN7EX5X2loa-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=164%3A84",
   designSystem: {
     colors: [
       { hex: "#145850", name: "VegWam Green" },
       { hex: "#F1683C", name: "VegWam Orange" },
       { hex: "#E6EDDD", name: "Cream White" },
     ],
     typography: [{ name: "Rounded Mplus", usage: "Headings" }]
   },
   content: {
     en: {
       title: "VegWam",
       category: "New Product",
       description: "Connecting the vegan community in Japan.",
       tags: ["Branding", "App Design", "Community"],
       caseStudy: {
         role: "Product Designer",
         timeline: "1 Month",
         tools: ["Figma", "Illustrator"],
         overview: "An all-in-one platform helping vegans find restaurants and connect in Japan.",
         problem: "Finding vegan options in Japan is difficult, and existing information is scattered.",
         solution: "Created a map-based discovery app with a built-in ingredient dictionary and community forum.",
         process: ["User Persona", "Logo Design", "UI Design"],
         results: "Established a friendly brand identity and a seamless 'Search to Eat' user journey."
       }
     },
     jp: {
       title: "VegWam",
       category: "新規サービス開発",
       description: "日本のヴィーガンコミュニティをつなぐプラットフォーム。",
       tags: ["Branding", "App Design", "Community"],
       caseStudy: {
         role: "プロダクトデザイナー",
         timeline: "1ヶ月",
         tools: ["Figma", "Illustrator"],
         overview: "日本でのヴィーガン生活をサポートする、レストラン検索・コミュニティ統合アプリ。",
         problem: "日本ではヴィーガン対応のお店が見つけにくく、情報が分散していました。",
         solution: "地図ベースの検索機能、成分辞書、コミュニティフォーラムを備えたアプリを設計。",
         process: ["ペルソナ策定", "ロゴデザイン", "UIデザイン"],
         results: "親しみやすいブランドアイデンティティと、スムーズな検索体験を構築しました。"
       }
     },
     ua: {
       title: "VegWam",
       category: "Новий Продукт",
       description: "Об'єднання веганської спільноти в Японії.",
       tags: ["Branding", "App Design", "Community"],
       caseStudy: {
         role: "Продуктовий Дизайнер",
         timeline: "1 Місяць",
         tools: ["Figma", "Illustrator"],
         overview: "Універсальна платформа, що допомагає веганам знаходити ресторани в Японії.",
         problem: "Знайти веганські опції в Японії складно, інформація розкидана.",
         solution: "Створено додаток для пошуку на карті з вбудованим словником інгредієнтів.",
         process: ["Персона", "Логотип", "UI Дизайн"],
         results: "Створено дружній бренд та безшовний шлях користувача."
       }
     }
   }
 },
 {
   id: "navitime",
   thumbnail: "/navitime-thumbnail.png",
   accentColor: "bg-[#007AFF]",
   figmaUrl: "https://www.figma.com/proto/hzx81CrdGeHadYO9whxsqw/%E8%87%AA%E8%BB%A2%E8%BB%8ANAVIGATION-FINAL?page-id=0%3A1&node-id=3-31&p=f&viewport=401%2C481%2C0.22&t=NsaxSieERH8gXG8d-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=3%3A31",
   designSystem: {
     colors: [
       { hex: "#007AFF", name: "Navi Blue" },
       { hex: "#E0F7FA", name: "Ice Blue" },
       { hex: "#FFFFFF", name: "White" }     
     ],
     typography: [{ name: "Roboto", usage: "Numeric Data" }, { name: "Noto Sans JP", usage: "UI Text" }]
   },
   content: {
     en: {
       title: "Bicycle NAVITIME",
       category: "App Redesign",
       description: "Redesigning navigation for safety and clarity.",
       tags: ["UX Research", "Redesign", "Mobile"],
       caseStudy: {
         role: "UI/UX Designer",
         timeline: "2 Weeks",
         tools: ["Figma", "Illustrator"],
         overview: "A comprehensive redesign of a popular cycling navigation app to improve safety and usability.",
         problem: "Low contrast and small touch targets made the app dangerous to use while riding.",
         solution: "Implemented a high-contrast 'Safety UI' with enlarged interactive zones and prioritized data display.",
         process: ["Heuristic Analysis", "Wireframing", "Prototyping"],
         results: "Improved readability by 40% and simplified the core navigation flow."
       }
     },
     jp: {
       title: "自転車NAVITIME",
       category: "アプリリデザイン",
       description: "安全性と明瞭さを追求したナビゲーションの再設計。",
       tags: ["UX Research", "Redesign", "Mobile"],
       caseStudy: {
         role: "UI/UXデザイナー",
         timeline: "2週間",
         tools: ["Figma", "Illustrator"],
         overview: "サイクリング中の視認性と安全性を向上させるための、人気ナビアプリの全面リデザイン。",
         problem: "既存アプリはコントラストが低く、ボタンが小さいため、走行中の操作が危険でした。",
         solution: "高コントラストな「セーフティUI」を採用し、タップ領域を拡大。重要な情報を瞬時に認識できるようにしました。",
         process: ["ヒューリスティック分析", "ワイヤーフレーム", "プロトタイプ"],
         results: "視認性を40%向上させ、主要なナビゲーションフローを簡素化しました。"
       }
     },
     ua: {
       title: "Bicycle NAVITIME",
       category: "Редизайн Застосунку",
       description: "Редизайн навігації для безпеки та чіткості.",
       tags: ["UX Research", "Redesign", "Mobile"],
       caseStudy: {
         role: "UI/UX Дизайнер",
         timeline: "2 Тижні",
         tools: ["Figma", "Illustrator"],
         overview: "Комплексний редизайн популярного велонавігатора для підвищення безпеки.",
         problem: "Низький контраст і малі кнопки робили додаток небезпечним під час їзди.",
         solution: "Впроваджено висококонтрастний 'Safety UI' зі збільшеними зонами натискання.",
         process: ["Евристичний аналіз", "Вайрфрейми", "Прототипування"],
         results: "Покращено читабельність на 40% та спрощено основний сценарій навігації."
       }
     }
   }
 },
 /*
 {
   id: "relaxon",
   thumbnail: "/relaxon-thumbnail.png",
   accentColor: "bg-[#8b5cf6]",
   content: {
     en: {
       title: "RelaxON",
       category: "Visual UI",
       description: "Glassmorphism-based wellness application.",
       tags: ["Visual Design", "Wellness", "Trend"],
       caseStudy: {
         role: "UI Designer",
         timeline: "3 Weeks",
         tools: ["Adobe XD"],
         overview: "A stress-relief app focusing on calming visuals and audio.",
         problem: "Meditation apps often look too clinical.",
         solution: "Used Glassmorphism and pastel gradients to create an immersive, calming mood.",
         process: ["Moodboard", "Visual Exploration"],
         results: "High-fidelity visual design that emphasizes emotional well-being."
       }
     },
     jp: {
       title: "RelaxON",
       category: "ビジュアルUI",
       description: "グラスモーフィズムを取り入れたウェルネスアプリ。",
       tags: ["ビジュアルデザイン", "ウェルネス", "トレンド"],
       caseStudy: {
         role: "UIデザイナー",
         timeline: "3週間",
         tools: ["Adobe XD"],
         overview: "視覚と聴覚で癒やしを提供するストレス解消アプリ。",
         problem: "既存の瞑想アプリは無機質なデザインが多い。",
         solution: "グラスモーフィズムとパステルカラーを使用し、没入感のある癒やしの空間を演出。",
         process: ["ムードボード", "ビジュアル探索"],
         results: "情緒的なウェルビーイングを強調した高精細なビジュアルデザイン。"
       }
     },
     ua: {
       title: "RelaxON",
       category: "Візуальний UI",
       description: "Велнес-додаток на основі гласморфізму.",
       tags: ["Візуальний Дизайн", "Велнес", "Тренд"],
       caseStudy: {
         role: "UI Дизайнер",
         timeline: "3 Тижні",
         tools: ["Adobe XD"],
         overview: "Додатокで stress-relief app focusing on calming visuals and audio.",
         problem: "Meditation apps often look too clinical.",
         solution: "Used Glassmorphism and pastel gradients to create an immersive, calming mood.",
         process: ["Moodboard", "Visual Exploration"],
         results: "High-fidelity visual design that emphasizes emotional well-being."
       }
     }
   }
 }
 */
];


// --- COMPONENTS ---


// --- VEGWAM CASE STUDY COMPONENT (MULTILINGUAL) ---

// Language Switcher Component
const LanguageSwitcher = ({
  current,
  onChange,
  direction = 'down'
}: {
  current: Language,
  onChange: (lang: Language) => void,
  direction?: 'up' | 'down'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'jp', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ua', label: 'Українська', flag: '🇺🇦' }
  ];
  const currentLang = languages.find(l => l.code === current) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 transition-all text-sm font-medium text-[#2D2D2D] shadow-sm whitespace-nowrap"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.label}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className={`absolute ${direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[140px]`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  current === lang.code
                    ? 'bg-[#FF6B35]/10 text-[#FF6B35] font-medium'
                    : 'text-[#2D2D2D] hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Home page component
function HomePage({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
 const [showScrollTop, setShowScrollTop] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [scrollProgress, setScrollProgress] = useState(0);

 useEffect(() => {
   const handleScroll = () => {
     setShowScrollTop(window.scrollY > 400);
     const doc = document.documentElement;
     const maxScroll = doc.scrollHeight - doc.clientHeight;
     const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
     setScrollProgress(Math.min(100, Math.max(0, progress)));
   };
   window.addEventListener('scroll', handleScroll);
   handleScroll();
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const scrollToTop = () => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const scrollToSection = (id: string) => {
   document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
 };

 // mymind-style tag colors
 const tagColors = [
   'border-2 border-pink-200 text-pink-400 bg-white/90',
   'border-2 border-amber-200 text-amber-400 bg-white/90',
   'border-2 border-[#5DB13E]/40 text-[#5DB13E] bg-white/90',
   'border-2 border-sky-200 text-sky-400 bg-white/90',
 ];

 return (
   <div className="min-h-screen bg-[#FAF8F5] text-[#2D2D2D]">

     {/* --- mymind-style Floating Nav --- */}
     <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg shadow-gray-200/30 rounded-full px-4 md:px-8 py-3 flex items-center gap-4 md:gap-8 w-[calc(100%-2rem)] sm:w-auto max-w-[calc(100%-2rem)] overflow-hidden">
       {/* Logo */}
       <button
         onClick={scrollToTop}
         className="flex items-center gap-2 hover:opacity-70 transition-opacity whitespace-nowrap"
         aria-label="Scroll to top"
       >
         <span className="w-7 h-7 rounded-full bg-[#FF6B35] flex items-center justify-center">
           <span className="text-white text-xs font-bold">A</span>
         </span>
       </button>

       {/* Nav Links with colored dots */}
       <div className="hidden md:flex items-center gap-3 md:gap-6 flex-nowrap">
         {Object.entries(LABELS.nav).map(([key, label], index) => {
           const dotColors = ['bg-pink-400', 'bg-amber-400', 'bg-[#5DB13E]'];
           return (
             <button
               key={key}
               onClick={() => scrollToSection(key)}
               className="flex items-center gap-1.5 text-sm font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors whitespace-nowrap"
             >
               <span className={`w-1.5 h-1.5 rounded-full ${dotColors[index]}`}></span>
               <span className="hidden sm:inline">{label[lang]}</span>
             </button>
           );
         })}
       </div>

       {/* Desktop Language Switcher */}
       <div className="hidden md:flex items-center gap-3">
         <span className="w-px h-4 bg-gray-200"></span>
         <LanguageSwitcher current={lang} onChange={setLang} direction="down" />
       </div>

       {/* CTA Button */}
       <button
         onClick={() => scrollToSection('contact')}
         className="hidden md:block bg-[#FF6B35] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e55a2a] transition-colors shadow-md shadow-[#FF6B35]/20 whitespace-nowrap"
       >
         {lang === 'jp' ? 'お問い合わせ' : lang === 'ua' ? 'Контакт' : 'Get in touch'}
       </button>

       {/* Mobile Menu Button */}
       <button
         onClick={() => setIsMobileMenuOpen((open) => !open)}
         className="ml-auto md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#2D2D2D] border border-gray-200 shadow-sm"
         aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
         aria-expanded={isMobileMenuOpen}
       >
         <span className="flex flex-col items-center justify-center gap-1.5">
           <span className="w-5 h-0.5 rounded-full bg-pink-400"></span>
           <span className="w-5 h-0.5 rounded-full bg-amber-400"></span>
           <span className="w-5 h-0.5 rounded-full bg-[#5DB13E]"></span>
         </span>
       </button>

       <div className="absolute left-3 right-3 bottom-0 h-0.5 bg-white/70 pointer-events-none">
         <div
           className="h-full bg-gradient-to-r from-pink-400 via-amber-400 to-[#5DB13E] transition-[width] duration-300 ease-out shadow-[0_0_10px_rgba(255,107,53,0.35)]"
           style={{ width: `${scrollProgress}%` }}
         ></div>
       </div>
     </nav>

     {/* Mobile Menu Panel */}
     {isMobileMenuOpen && (
       <>
         <div className="fixed inset-0 z-30" onClick={() => setIsMobileMenuOpen(false)}></div>
         <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm bg-white/95 backdrop-blur-xl border border-gray-100 shadow-xl rounded-3xl p-4 md:hidden">
           <div className="grid gap-2">
             {Object.entries(LABELS.nav).map(([key, label], index) => {
               const dotColors = ['bg-pink-400', 'bg-amber-400', 'bg-[#5DB13E]'];
               return (
                 <button
                   key={key}
                   onClick={() => {
                     scrollToSection(key);
                     setIsMobileMenuOpen(false);
                   }}
                   className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-[#2D2D2D] hover:bg-[#FAF8F5] transition-colors"
                 >
                   <span className={`w-2 h-2 rounded-full ${dotColors[index]}`}></span>
                   <span>{label[lang]}</span>
                 </button>
               );
             })}
           </div>
           <div className="mt-4 flex items-center justify-between gap-3">
             <LanguageSwitcher current={lang} onChange={setLang} direction="down" />
             <button
               onClick={() => {
                 scrollToSection('contact');
                 setIsMobileMenuOpen(false);
               }}
               className="bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e55a2a] transition-colors shadow-md shadow-[#FF6B35]/20 whitespace-nowrap"
             >
               {lang === 'jp' ? 'お問い合わせ' : lang === 'ua' ? 'Контакт' : 'Get in touch'}
             </button>
           </div>
         </div>
       </>
     )}

     {/* Mobile Language Switcher */}
     <div className="md:hidden fixed bottom-6 right-6 z-50">
       <LanguageSwitcher current={lang} onChange={setLang} direction="up" />
     </div>

     {/* --- Scroll To Top Button --- */}
     <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-6 md:bottom-10 md:right-10 z-40 p-3 md:p-4 bg-[#FF6B35] text-white rounded-full shadow-lg transition-all duration-300 hover:bg-[#e55a2a] hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

     {/* --- mymind-style Hero Section --- */}
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
       {/* Soft gradient background */}
       <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFF5F0] to-[#FFE8DC] animate-gradient"></div>

       {/* Floating decorative blobs */}
       <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl animate-blob"></div>
       <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#FFE8DC] rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>

       <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
         {/* Large Serif Typography */}
         <h1 className="font-serif font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#2D2D2D] leading-[1.02] tracking-[-0.02em] mb-12">
           <span className="italic text-[#6B6B6B]">{LABELS.hero.titleLine1[lang]}</span>
           <br />
           <span className="italic">{LABELS.hero.titleLine2[lang]}</span>
         </h1>

         {/* Tagline with animated color tags like mymind */}
         <div className="flex flex-wrap items-center justify-center gap-2 text-lg md:text-xl text-[#6B6B6B] mb-12">
           <span>{LABELS.hero.subtitle[lang]}</span>
           {LABELS.hero.tags[lang].map((tag, index) => (
             <span
               key={tag}
               className={`inline-block px-4 py-1.5 rounded-full border text-sm font-medium transition-all hover:scale-105 cursor-default lowercase ${tagColors[index % tagColors.length]}`}
             >
               {tag}
             </span>
           ))}
           <span>{LABELS.hero.endText[lang]}</span>
         </div>

         {/* Subtle intro text */}
         <p className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-12 leading-relaxed">
           {LABELS.hero.intro[lang]}
         </p>

         {/* CTA Button */}
         <button
           onClick={() => scrollToSection('work')}
           className="group bg-[#FF6B35] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e55a2a] transition-all shadow-lg shadow-[#FF6B35]/20 inline-flex items-center gap-3"
         >
           {LABELS.hero.cta[lang]}
           <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
         </button>

         {/* Scroll indicator */}
         <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 animate-bounce">
           <ChevronDown size={28} className="text-[#6B6B6B]/50" />
         </div>
       </div>

       {/* Floating profile card removed */}
     </section>

     {/* --- mymind-style Projects Section --- */}
     <section id="work" className="py-24 px-6 bg-white scroll-mt-32">
       <div className="max-w-6xl mx-auto">
         {/* Section Header - mymind style */}
         <div className="text-center mb-20">
           <p className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest mb-4">Selected Work</p>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-[#2D2D2D]">
             {lang === 'jp' ? 'プロジェクトで語る。' : lang === 'ua' ? 'Проєкти говорять самі за себе.' : 'Projects that speak for themselves.'}
           </h2>
         </div>

         <div className="space-y-20">
           {PROJECTS.map((project, index) => (
             <Link
               key={project.id}
               to={`/project/${project.id}`}
               className="group cursor-pointer block"
             >
               <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}>
                 {/* Image */}
                 <div className="w-full md:w-3/5">
                   <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gradient-to-br from-[#FFF5F0] to-[#FFE8DC] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                     <img
                       src={project.thumbnail}
                       alt={project.content[lang].title}
                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                     {/* Hover overlay */}
                     <div className="absolute inset-0 bg-[#2D2D2D]/0 group-hover:bg-[#2D2D2D]/10 transition-colors duration-300"></div>
                     {/* Action indicator */}
                     <div className="absolute bottom-6 right-6 bg-white rounded-full p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                       <ArrowRight size={24} className="text-[#FF6B35]" />
                     </div>
                   </div>
                 </div>

                 {/* Content */}
                 <div className="w-full md:w-2/5 space-y-4">
                   <p className="text-[#FF6B35] text-sm font-semibold uppercase tracking-wider">{project.content[lang].category}</p>
                   <h3 className="font-serif text-3xl md:text-4xl italic text-[#2D2D2D] group-hover:text-[#FF6B35] transition-colors">
                     {project.content[lang].title}
                   </h3>
                   <p className="text-[#6B6B6B] text-lg leading-relaxed">
                     {project.content[lang].description}
                   </p>
                   {/* Tags */}
                   <div className="flex flex-wrap gap-2 pt-4">
                     {project.content[lang].tags.map((tag, tagIndex) => (
                       <span
                         key={tag}
                         className={`px-3 py-1.5 rounded-full border text-sm font-medium lowercase ${tagColors[tagIndex % tagColors.length]}`}
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                 </div>
               </div>
             </Link>
           ))}
         </div>
       </div>
     </section>

     {/* --- mymind-style About Section --- */}
     <section id="about" className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF5F0] to-[#FFE8DC] scroll-mt-32">
       <div className="max-w-6xl mx-auto">
         {/* Section Header */}
         <div className="text-center mb-20">
           <p className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest mb-4">About Me</p>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-[#2D2D2D]">
             {lang === 'jp' ? 'デザインは、共感から始まる。' : lang === 'ua' ? 'Дизайн починається з емпатії.' : 'Design starts with empathy.'}
           </h2>
         </div>

         {/* Main content - clean cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

           {/* Bio Card */}
           <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
             <div className="flex items-start gap-6 mb-6">
               <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-[#FFE8DC]">
                 <img src="/profile.jpg" alt="Anastasiia" className="w-full h-full object-cover" />
               </div>
               <div>
                 <h3 className="font-serif text-2xl italic text-[#2D2D2D] mb-1">{PROFILE.name[lang]}</h3>
                 <p className="text-[#FF6B35] text-sm font-medium">Product Designer in Tokyo</p>
               </div>
             </div>
             <p className="text-[#6B6B6B] text-lg leading-relaxed">
               {PROFILE.fullBio[lang]}
             </p>
           </div>

           {/* Experience Card */}
           <div className="bg-[#FF6B35] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
             <div className="relative z-10">
               <Briefcase size={32} className="text-white/80 mb-6" />
               <h4 className="font-serif text-5xl italic mb-3">3+ Years</h4>
               <p className="text-white/90 text-lg">{LABELS.experience.desc[lang]}</p>
               <div className="mt-8 flex flex-wrap gap-2">
                 <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Health Tech</span>
                 <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Age-Tech</span>
                 <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Tokyo</span>
               </div>
             </div>
           </div>
         </div>

         {/* Skills & Languages Row */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

           {/* Skills */}
           <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
             <h4 className="text-[#6B6B6B] text-sm font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
               <PenTool size={16} className="text-[#FF6B35]" /> Skills
             </h4>
             <div className="grid grid-cols-2 gap-6">
               {SKILLS.map(skill => (
                 <div key={skill.name}>
                   <div className="flex justify-between text-sm font-medium text-[#2D2D2D] mb-2">
                     <span>{skill.name}</span>
                     <span className="text-[#6B6B6B]">{skill.level}%</span>
                   </div>
                   <div className="h-2 bg-[#FAF8F5] rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] rounded-full transition-all duration-500" style={{ width: `${skill.level}%` }}></div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Languages */}
           <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
             <h4 className="text-[#6B6B6B] text-sm font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
               <Globe size={16} className="text-[#FF6B35]" /> Languages
             </h4>
             <ul className="space-y-3">
               {LANGUAGES.map(l => (
                 <li key={l.lang} className="flex justify-between items-center p-3 bg-[#FAF8F5] rounded-xl">
                   <span className="font-medium text-[#2D2D2D]">{l.lang}</span>
                   <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm text-[#6B6B6B] font-medium border border-gray-100">{l.level}</span>
                 </li>
               ))}
             </ul>
           </div>
         </div>

         {/* Interests */}
         <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h4 className="text-[#6B6B6B] text-sm font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
             <Leaf size={16} className="text-[#FF6B35]" /> Interests
           </h4>
           <div className="flex flex-wrap gap-3">
             {INTERESTS.map((interest, i) => (
               <span
                 key={i}
                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 cursor-default lowercase ${tagColors[i % tagColors.length]}`}
               >
                 {interest[lang]}
               </span>
             ))}
           </div>
         </div>
       </div>
     </section>

     {/* --- mymind-style Contact & Footer --- */}
     <footer id="contact" className="py-24 px-6 bg-[#2D2D2D] text-white scroll-mt-32">
       <div className="max-w-4xl mx-auto text-center">
         {/* Section Header */}
         <p className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest mb-4">Let's Connect</p>
         <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic text-white mb-8">
           {lang === 'jp' ? '一緒に何かを作りましょう。' : lang === 'ua' ? 'Створімо щось разом.' : 'Let\'s create something together.'}
         </h2>
         <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
           {lang === 'jp' ? 'プロジェクトのご相談、お仕事のご依頼など、お気軽にご連絡ください。' : lang === 'ua' ? 'Зацікавлені в співпраці? Зв\'яжіться зі мною.' : 'Interested in working together? I\'d love to hear from you.'}
         </p>

         {/* Email Button */}
         <a
           href={`mailto:${PROFILE.email}`}
           className="inline-flex items-center gap-3 bg-[#FF6B35] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e55a2a] transition-all shadow-lg shadow-[#FF6B35]/30 mb-16"
         >
           <Mail size={20} />
           {PROFILE.email}
         </a>

         {/* Divider */}
         <div className="w-16 h-px bg-white/20 mx-auto mb-12"></div>

         {/* Footer Bottom */}
         <div className="flex flex-col md:flex-row items-center justify-center gap-6">
           <p className="text-white/50 text-sm">
             © 2026 Anastasiia Hrytsai. Designed with care in Tokyo.
           </p>
         </div>
       </div>
     </footer>

   </div>
 );
}

// Main App with routing
export default function App() {
  const [lang, setLang] = useState<Language>('jp');

  return (
    <Routes>
      <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
      <Route path="/project/:projectId" element={<ProjectPage lang={lang} />} />
    </Routes>
  );
}
