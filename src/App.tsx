import React, { useState, useEffect } from 'react';
import {
  X,
  Linkedin,
  Mail,
  Globe,
  PenTool,
  Layout,
  User,
  CheckCircle,
  ArrowRight,
  Palette,
  Briefcase,
  HeartPulse,
  ChevronDown,
  Sparkles,
  Play,
} from 'lucide-react';

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

// --- VEGWAM CONTENT DATA (DEEP DIVE) ---
const VEGWAM_DATA = {
 header: {
   tag: { en: "VEGAN LIFESTYLE PLATFORM", jp: "VEGAN LIFESTYLE PLATFORM", ua: "ПЛАТФОРМА ВЕГАНСЬКОГО СТИЛЮ" },
   title: { en: "VegWam", jp: "VegWam", ua: "VegWam" },
   catchphrase: { en: "Making plant-based life closer to you.", jp: "プラントベースは、もっと身近になる。", ua: "Робимо рослинний спосіб життя ближчим." },
   summary: {
     en: "An integrated lifestyle app for those living a vegan/plant-based life in Japan, connecting restaurants, products, information, and community.",
     jp: "日本でヴィーガン／プラントベースな生活を続けたい人と、その家族や友人のために、飲食店・商品・情報・コミュニティを一体化したライフスタイルアプリです。",
     ua: "Інтегрований лайфстайл-додаток для тих, хто веде веганський спосіб життя в Японії, що поєднує ресторани, продукти та спільноту."
   }
 },
 overview: {
   overline: { en: "OVERVIEW", jp: "OVERVIEW", ua: "ОГЛЯД" },
   title: { en: "Project Overview", jp: "作品概要", ua: "Огляд Проєкту" },
   subtext: {
     en: "An integrated platform responding to the unique needs for 'safety' and 'connection' that existing search services could not meet.",
     jp: "既存の検索サービスでは満たせなかった、ヴィーガンユーザー特有の『安心感』と『つながり』へのニーズに応える統合プラットフォームです。",
     ua: "Інтегрована платформа, що відповідає унікальним потребам у «безпеці» та «зв'язку», які не могли задовольнити існуючі сервіси."
   }
 },
 insights: [
   {
     label: "INSIGHT 01",
     title: { en: "Scattered Information", jp: "情報の分散", ua: "Розкидана Інформація" },
     body: { en: "Restaurant, recipe, and product info is scattered, making it time-consuming to gather daily necessities.", jp: "飲食店、レシピ、商品情報がバラバラで、生活に必要な情報を集めるのに時間がかかる。", ua: "Інформація про ресторани та продукти розкидана, що ускладнює пошук." }
   },
   {
     label: "INSIGHT 02",
     title: { en: "Beginner Anxiety", jp: "ビギナーの不安", ua: "Тривога Новачків" },
     body: { en: "Anxiety about ingredients ('Is this safe to eat?') and asking staff creates stress.", jp: "「これは食べて大丈夫？」という成分への不安や、店員への確認がストレスになる。", ua: "Тривога щодо інгредієнтів та необхідність розпитувати персонал створюють стрес." }
   },
   {
     label: "INSIGHT 03",
     title: { en: "Isolation", jp: "孤独感", ua: "Ізоляція" },
     body: { en: "Few people understand the lifestyle, lacking a community to share concerns.", jp: "周りに理解者が少なく、情報交換や悩みを共有できるコミュニティがない。", ua: "Мало людей розуміють цей спосіб життя, відсутність спільноти для підтримки." }
   }
 ],
 research: {
   title: { en: "User Research", jp: "ユーザーリサーチ", ua: "Дослідження Користувачів" },
   steps: [
     { en: "Desk Research", jp: "Desk Research", ua: "Кабінетне Дослідження" },
     { en: "Interview (5 Users)", jp: "Interview (5人)", ua: "Інтерв'ю (5 чол.)" },
     { en: "Persona & Journey", jp: "Persona & Journey", ua: "Персона та Шлях" },
     { en: "UI Design", jp: "UI Design", ua: "UI Дизайн" }
   ],
   personaName: { en: "Namiko (20s)", jp: "Namiko (20代・女性)", ua: "Наміко (20+)" },
   personaRole: { en: "Beginner Vegan / Office Worker", jp: "ヴィーガンビギナー / 会社員", ua: "Новачок у веганстві / Офісний працівник" },
   quote: {
     en: "Calling restaurants to check 'Is this really vegan?' every time is the biggest stress. I stopped eating out with friends to avoid being a burden.",
     jp: "お店に電話して『本当にヴィーガン対応か』を毎回確認するのが、一番ストレスです。友達との外食も、気を使わせてしまうので避けるようになりました。",
     ua: "Телефонувати в ресторани, щоб перевірити «чи це дійсно веганське» — найбільший стрес. Я перестала їсти з друзями, щоб не бути тягарем."
   }
 },
 ui: {
   title: { en: "UI Highlights", jp: "UIデザインのポイント", ua: "Основні Елементи UI" },
   p1: {
     title: { en: "01. Home Screen for Peace of Mind", jp: "01. 安心して選べるホーム画面", ua: "01. Головний Екран для Спокою" },
     body: {
       en: "Designed to provide immediate relief by showing only information matching the user's diet. 'Certified' marks and reviews are visible at a glance.",
       jp: "アプリを開いた瞬間、自分の食生活に合った情報だけが表示される安心感を設計。「認証済み」マークや「ユーザーレビュー」をファーストビューに配置し、信頼性を可視化しました。",
       ua: "Розроблено так, щоб показувати лише інформацію, що відповідає дієті користувача. Знаки «Сертифіковано» та відгуки видно одразу."
     }
   },
   p2: {
     title: { en: "02. Stress-free Search", jp: "02. ストレスフリーな検索体験", ua: "02. Пошук без Стресу" },
     body: {
       en: "Implemented intuitive filters for 'Area' x 'Category' x 'Details' (e.g., Gluten-free). Smooth switching to map view allows finding safe spots nearby instantly.",
       jp: "「エリア」×「カテゴリ」×「詳細条件（グルテンフリー等）」を直感的に絞り込めるフィルター機能を実装。地図表示との切り替えもスムーズにし、現在地周辺の安心できるお店を即座に見つけられます。",
       ua: "Інтуїтивні фільтри «Район» x «Категорія» x «Деталі». Плавне перемикання на карту дозволяє миттєво знайти безпечні місця поруч."
     }
   }
 },
 outcomes: {
   title: { en: "Outcomes & Reflection", jp: "成果と振り返り", ua: "Результати та Рефлексія" },
   done: { en: "What I Did", jp: "What I Did", ua: "Що Зроблено" },
   next: { en: "Next Steps", jp: "Next Steps", ua: "Наступні Кроки" },
   listDone: {
     en: ["Deep dive via user interviews", "Logo creation (Wigwam + Plants)", "Figma prototyping"],
     jp: ["ユーザーインタビューによる課題の深掘り", "「Wigwam（住居）+ Plants」のブランドロゴ作成", "Figmaによるプロトタイプ作成と検証"],
     ua: ["Глибинні інтерв'ю з користувачами", "Створення логотипу (Вігвам + Рослини)", "Прототипування у Figma"]
   },
   listNext: {
     en: ["Usability testing with real vegans", "English support for inbound tourists", "Accessibility (WCAG 2.1) audit"],
     jp: ["実際のヴィーガンユーザーによるユーザビリティテスト", "英語対応（インバウンド需要への対応）", "アクセシビリティ（WCAG 2.1）のチェックと改善"],
     ua: ["Юзабіліті-тестування з реальними веганами", "Підтримка англійської для туристів", "Аудит доступності (WCAG 2.1)"]
   }
 }
};

// --- DATA & CONTENT (FIXED LABELS) ---

const LABELS = {
 nav: {
   work: { en: "Work", jp: "Works", ua: "Роботи" },
   about: { en: "About", jp: "About", ua: "Про мене" },
   contact: { en: "Contact", jp: "Contact", ua: "Контакти" },
 },
 hero: {
   status: { en: "Open for opportunities", jp: "現在、就職活動中", ua: "Відкрита до пропозицій" },
   titlePrefix: { en: "Design for", jp: "Design for", ua: "Дизайн для" },
   titleSuffix: { en: "Well-being.", jp: "Well-being.", ua: "Благополуччя." },
   intro: {
     en: "Hi, I'm Anastasiia. A Tokyo-based Product Designer blending data-driven UX with organic, inclusive aesthetics.",
     jp: "こんにちは、アナスタシアです。東京を拠点に、データに基づくUXとオーガニックで包括的なデザインを融合させるプロダクトデザイナーです。",
     ua: "Привіт, я Анастасія. Продуктовий дизайнер у Токіо, що поєднує UX на основі даних з органічною естетикою."
   },
   cta: { en: "View Projects", jp: "プロジェクトを見る", ua: "Переглянути Проєкти" },
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
     ua: "UI/UX для Age-Tech стартапів у Токіо."
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
   thumbnail: "/vegwam-thumbnail.png", // RESTORED: Local file path
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
       tags: ["ブランディング", "アプリデザイン", "コミュニティ"],
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
       tags: ["Брендинг", "Дизайн Застосунку", "Спільнота"],
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
   thumbnail: "https://placehold.co/1200x800/1e3a8a/ffffff?text=NAVITIME+Redesign",
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
       tags: ["UXリサーチ", "リデザイン", "モバイル"],
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
       tags: ["UX Дослідження", "Редизайн", "Мобільний"],
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
 {
   id: "relaxon",
   thumbnail: "https://placehold.co/1200x800/7c3aed/ffffff?text=RelaxON",
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
         overview: "Додаток для зняття стресу з акцентом на заспокійливі візуали.",
         problem: "Додатки для медитації часто виглядають надто клінічно.",
         solution: "Використано гласморфізм для створення заспокійливої атмосфери.",
         process: ["Мудборд", "Візуальні пошуки"],
         results: "High-fidelity дизайн, що підкреслює емоційний комфорт."
       }
     }
   }
 }
];


// --- VEGWAM COMPONENT HELPERS ---

const VegTag = ({ children }: { children: React.ReactNode }) => (
 <span className="inline-block px-3 py-1 bg-white border border-[#f1683c] text-[#f1683c] text-[12px] font-bold uppercase rounded-full tracking-wider">
   {children}
 </span>
);

const VegSectionHeader = ({ overline, title, subtext }: { overline: string, title: string, subtext?: string }) => (
 <div className="mb-8">
   <p className="text-[#f1683c] text-xs font-bold uppercase tracking-widest mb-2">{overline}</p>
   <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-3">{title}</h2>
   <div className="h-1 w-16 bg-[#145850] mb-4"></div>
   {subtext && <p className="text-[#555555] text-sm md:text-base max-w-2xl">{subtext}</p>}
 </div>
);

const VegMetaBlock = ({ lang }: { lang: Language }) => {
 const labels = {
   type: { en: "Type", jp: "種別", ua: "Тип" },
   valType: { en: "Academic Project", jp: "学内課題", ua: "Академічний Проєкт" },
   duration: { en: "Duration", jp: "期間", ua: "Тривалість" },
   valDuration: { en: "1 Month", jp: "1ヶ月", ua: "1 Місяць" },
   role: { en: "Role", jp: "担当", ua: "Роль" },
   valRole: { en: "UX Research / UI Design", jp: "UXリサーチ / UIデザイン", ua: "UX Дослідження / UI Дизайн" },
   tools: { en: "Tools", jp: "ツール", ua: "Інструменти" }
 };

 return (
   <div className="bg-white border border-[#dddddd] rounded-2xl p-6 md:p-8 grid grid-cols-2 gap-y-6 gap-x-4">
     <div>
       <p className="font-bold text-[#111111] mb-1">{labels.type[lang]}</p>
       <p className="text-[#555555] text-sm">{labels.valType[lang]}</p>
     </div>
     <div>
       <p className="font-bold text-[#111111] mb-1">{labels.duration[lang]}</p>
       <p className="text-[#555555] text-sm">{labels.valDuration[lang]}</p>
     </div>
     <div>
       <p className="font-bold text-[#111111] mb-1">{labels.role[lang]}</p>
       <p className="text-[#555555] text-sm">{labels.valRole[lang]}</p>
     </div>
     <div>
       <p className="font-bold text-[#111111] mb-1">{labels.tools[lang]}</p>
       <p className="text-[#555555] text-sm">Figma, Illustrator</p>
     </div>
   </div>
 );
};

const VegInsightCard = ({ title, body, label }: { title: string, body: string, label?: string }) => (
 <div className="bg-white border-l-4 border-[#145850] p-6 shadow-sm rounded-r-xl h-full flex flex-col">
   {label && <p className="text-[#f1683c] text-xs font-bold uppercase mb-2">{label}</p>}
   <h3 className="text-lg font-bold text-[#111111] mb-3">{title}</h3>
   <p className="text-[#555555] text-sm leading-relaxed flex-1">{body}</p>
 </div>
);

const VegPersonaCard = ({ lang }: { lang: Language }) => (
 <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#dddddd]">
   <div className="flex items-center gap-4 mb-6 border-b border-[#dddddd] pb-6">
     <div className="w-16 h-16 bg-[#e6eddd] rounded-full flex items-center justify-center text-[#145850]">
       <User size={32} />
     </div>
     <div>
       <h3 className="text-xl font-bold text-[#145850]">{VEGWAM_DATA.research.personaName[lang]}</h3>
       <p className="text-[#555555] text-sm">{VEGWAM_DATA.research.personaRole[lang]}</p>
     </div>
   </div>
   <div className="grid md:grid-cols-2 gap-8">
     <div>
       <p className="text-[#f1683c] font-bold uppercase text-xs mb-3">Goals / Needs</p>
       <ul className="space-y-2 text-[#111111] text-sm">
         <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#145850] shrink-0" /> Find safe cafes easily</li>
         <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#145850] shrink-0" /> Learn about nutrition</li>
       </ul>
     </div>
     <div>
       <p className="text-[#f1683c] font-bold uppercase text-xs mb-3">Pain Points</p>
       <ul className="space-y-2 text-[#111111] text-sm">
         <li className="flex items-start gap-2"><X size={16} className="text-red-500 shrink-0" /> Fear of hidden fish broth</li>
         <li className="flex items-start gap-2"><X size={16} className="text-red-500 shrink-0" /> Asking staff feels awkward</li>
       </ul>
     </div>
   </div>
 </div>
);

const VegQuoteBlock = ({ text, author }: { text: string, author: string }) => (
 <div className="bg-[#f7f8f5] p-6 border-l-4 border-[#145850] rounded-r-lg my-6">
   <p className="text-lg italic font-medium text-[#111111] mb-3 leading-relaxed">
     "{text}"
   </p>
   <p className="text-[#555555] text-xs font-bold uppercase tracking-wider">— {author}</p>
 </div>
);

const VegProcessStrip = ({ steps }: { steps: string[] }) => (
 <div className="flex flex-wrap gap-2 md:gap-0 items-center justify-between bg-white p-4 rounded-xl border border-[#dddddd] mb-8 text-xs md:text-sm">
   {steps.map((step, i) => (
     <React.Fragment key={i}>
       <div className={`flex items-center gap-2 font-bold ${i < 3 ? 'text-[#145850]' : 'text-[#111111]'}`}>
         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${i < 3 ? 'bg-[#145850] text-white' : 'border border-[#dddddd] text-[#555555]'}`}>
           {i + 1}
         </div>
         <span>{step}</span>
       </div>
       {i < steps.length - 1 && <div className="w-4 md:w-8 h-px bg-[#dddddd] mx-2"></div>}
     </React.Fragment>
   ))}
 </div>
);

const VegImageFigure = ({ src, caption, annotations }: { src: string, caption: string, annotations?: string[] }) => (
 <figure className="my-8">
   <div className="bg-white p-2 md:p-4 rounded-2xl border border-[#dddddd] shadow-sm">
     <img src={src} alt={caption} className="w-full h-auto rounded-lg" />
   </div>
   <figcaption className="mt-4 text-center">
     <p className="font-bold text-[#111111]">{caption}</p>
     {annotations && (
       <ul className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-[#555555]">
         {annotations.map((note, i) => (
           <li key={i} className="flex items-center gap-1">
             <span className="w-4 h-4 rounded-full bg-[#145850] text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
             {note}
           </li>
         ))}
       </ul>
     )}
   </figcaption>
 </figure>
);

// --- VEGWAM CASE STUDY COMPONENT (MULTILINGUAL) ---
const VegWamCaseStudy = ({ lang }: { lang: Language }) => {
 const t = VEGWAM_DATA;
 
 return (
   <div className="bg-[#f9f9f9] text-[#111111] font-sans">
     
     {/* 1. Hero */}
     <section className="bg-[#e6eddd] pt-12 pb-16 px-6 md:px-12 rounded-t-[2rem]">
       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
         <div className="space-y-6">
           <div className="flex gap-2">
             <VegTag>{t.header.tag[lang]}</VegTag>
           </div>
           <div>
             <h1 className="text-4xl md:text-5xl font-black text-[#145850] mb-2 leading-tight">{t.header.title[lang]}</h1>
             <p className="text-xl font-bold text-[#111111]">{t.header.catchphrase[lang]}</p>
           </div>
           <p className="text-[#555555] leading-relaxed">
             {t.header.summary[lang]}
           </p>
           <div className="pt-4">
             <VegMetaBlock lang={lang} />
           </div>
         </div>
         <div className="flex justify-center">
             <img src="/vegwam-app-screen.jpg" alt="VegWam App Mockup" className="w-64 md:w-80 shadow-2xl rounded-[3rem] border-8 border-white" />
         </div>
       </div>
     </section>

     <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-24">
      
       {/* 2. Overview */}
       <section>
         <VegSectionHeader
           overline={t.overview.overline[lang]}
           title={t.overview.title[lang]}
           subtext={t.overview.subtext[lang]}
         />
         <div className="grid md:grid-cols-3 gap-6">
           {t.insights.map((insight, i) => (
             <VegInsightCard key={i} title={insight.title[lang]} body={insight.body[lang]} label={insight.label} />
           ))}
         </div>
       </section>

       {/* 3. User Research */}
       <section>
         <VegSectionHeader overline="USER RESEARCH" title={t.research.title[lang]} />
         <VegProcessStrip steps={t.research.steps.map(s => s[lang])} />
         
         <div className="grid gap-8">
           <VegPersonaCard lang={lang} />
           <VegQuoteBlock text={t.research.quote[lang]} author={t.research.personaName[lang]} />
         </div>
       </section>

       {/* 4. IA & Flow */}
       <section>
         <VegSectionHeader overline="IA & FLOW" title={lang === 'jp' ? "情報設計と体験フロー" : "IA & User Flow"} />
         <VegImageFigure
           src="https://placehold.co/1200x600/e6eddd/145850?text=Information+Architecture+Map"
           caption={lang === 'jp' ? "迷わず目的にたどり着くための情報構造" : "Simplified Information Architecture"}
           annotations={["Home", "Search", "Community", "Profile"]}
         />
       </section>

       {/* NEW: Prototype Section */}
       <section>
         <VegSectionHeader overline="PROTOTYPE" title={lang === 'jp' ? "プロトタイプ" : "Interactive Prototype"} />
         <div className="w-full h-[600px] md:h-[800px] bg-gray-100 rounded-2xl overflow-hidden border border-[#dddddd] shadow-inner">
           <iframe
             style={{ border: 'none' }}
             width="100%"
             height="100%"
             src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent("https://www.figma.com/proto/EZdHxq5rKrYkzWlTOWp70g/VegWam?page-id=164%3A15&node-id=164-990&p=f&viewport=1564%2C770%2C0.19&t=rGunCvN7EX5X2loa-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=164%3A84")}`}
             allowFullScreen
           ></iframe>
         </div>
         <p className="text-sm text-[#555555] text-center mt-4">
           {lang === 'jp' ? "※画面を操作して、実際のフローを体験できます。" : "*Interact with the prototype above to explore the user flow."}
         </p>
       </section>

       {/* 5. UI Highlights */}
       <section>
         <VegSectionHeader overline="UI HIGHLIGHTS" title={t.ui.title[lang]} />
         
         <div className="space-y-16">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <img src="https://placehold.co/600x1200/ffffff/145850?text=Home+Screen" className="rounded-xl shadow-lg border border-[#dddddd]" />
             <div>
               <h3 className="text-xl font-bold text-[#145850] mb-4">{t.ui.p1.title[lang]}</h3>
               <p className="text-[#555555] leading-relaxed mb-6">
                 {t.ui.p1.body[lang]}
               </p>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
               <h3 className="text-xl font-bold text-[#145850] mb-4">{t.ui.p2.title[lang]}</h3>
               <p className="text-[#555555] leading-relaxed mb-6">
                 {t.ui.p2.body[lang]}
               </p>
             </div>
             <img src="https://placehold.co/600x1200/ffffff/145850?text=Search+Screen" className="rounded-xl shadow-lg border border-[#dddddd] order-1 md:order-2" />
           </div>
         </div>
       </section>

       {/* 6. Outcomes */}
       <section className="bg-white p-8 rounded-2xl border border-[#dddddd]">
         <VegSectionHeader overline="OUTCOMES" title={t.outcomes.title[lang]} />
         <div className="grid md:grid-cols-2 gap-8">
           <div>
             <h4 className="font-bold text-[#111111] mb-2 flex items-center gap-2">
               <CheckCircle size={18} className="text-[#145850]" /> {t.outcomes.done[lang]}
             </h4>
             <ul className="list-disc list-inside text-[#555555] text-sm space-y-2 ml-1">
               {t.outcomes.listDone[lang].map((item, i) => <li key={i}>{item}</li>)}
             </ul>
           </div>
           <div>
             <h4 className="font-bold text-[#111111] mb-2 flex items-center gap-2">
               <ArrowRight size={18} className="text-[#f1683c]" /> {t.outcomes.next[lang]}
             </h4>
             <ul className="list-disc list-inside text-[#555555] text-sm space-y-2 ml-1">
               {t.outcomes.listNext[lang].map((item, i) => <li key={i}>{item}</li>)}
             </ul>
           </div>
         </div>
       </section>

     </div>
   </div>
 );
};

// --- Components ---

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
 const currentLang = languages.find(l => l.code === current);

 return (
   <div className="relative">
     <button
       onClick={() => setIsOpen(!isOpen)}
       className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-sm font-bold text-gray-700 border border-gray-200 shadow-sm"
     >
       <span>{currentLang?.flag}</span>
       <span className="hidden sm:inline">{currentLang?.code.toUpperCase()}</span>
       <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
     </button>
     {isOpen && (
       <div
         className={`absolute right-0 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100] transition-all duration-200 origin-top ${
           direction === 'up' ? 'bottom-full mb-3 origin-bottom' : 'top-full mt-2 origin-top'
         }`}
       >
         {languages.map((lang) => (
           <button
             key={lang.code}
             onClick={() => { onChange(lang.code); setIsOpen(false); }}
             className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-50 transition-colors ${current === lang.code ? 'bg-gray-50 font-bold' : ''}`}
           >
             <span>{lang.flag}</span>
             <span className="font-medium text-gray-700">{lang.code.toUpperCase()}</span>
           </button>
         ))}
       </div>
     )}
   </div>
 );
};

const Modal = ({ isOpen, onClose, project, lang }: { isOpen: boolean; onClose: () => void; project: Project | null; lang: Language }) => {
 useEffect(() => {
   if (isOpen) { document.body.style.overflow = 'hidden'; }
   else { document.body.style.overflow = 'unset'; }
   return () => { document.body.style.overflow = 'unset'; };
 }, [isOpen]);

 if (!isOpen || !project) return null;
 const content = project.content[lang];

 return (
   <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-gray-900/60 backdrop-blur-sm p-0 md:p-6 transition-all duration-200">
     <div className="bg-white w-full h-[90vh] md:h-[90vh] md:rounded-[2rem] rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden relative">
      
       <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-white/50 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all shadow-sm">
         <X size={20} className="text-gray-800" />
       </button>

       <div className="flex-1 overflow-y-auto">
        
         {project.id === 'vegwam' ? (
           <VegWamCaseStudy lang={lang} />
         ) : (
           <>
             {/* Header */}
             <div className={`${project.accentColor} relative h-64 md:h-80 flex items-end p-6 md:p-12`}>
               <div className="relative z-10 w-full">
                 <span className="inline-block px-3 py-1 mb-4 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider border border-white/20 uppercase">
                   {content.category}
                 </span>
                 <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
                   {content.title}
                 </h2>
               </div>
               {/* Texture Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
             </div>

             {/* Body */}
             <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-16">
              
               {/* Meta Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-gray-100">
                 <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Timeline</p>
                   <p className="font-medium text-gray-900">{content.caseStudy.timeline}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Role</p>
                   <p className="font-medium text-gray-900">{content.caseStudy.role}</p>
                 </div>
                 <div className="col-span-2">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tools</p>
                   <div className="flex flex-wrap gap-2">
                     {content.caseStudy.tools.map(tool => (
                       <span key={tool} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{tool}</span>
                     ))}
                   </div>
                 </div>
               </div>

               {/* Overview */}
               <section className="space-y-6">
                 <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                   <Sparkles className="text-[#10B981]" size={24} /> Overview
                 </h3>
                 <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                   {content.caseStudy.overview}
                 </p>
               </section>

               {/* Figma Prototype Section (Conditional) */}
               {project.figmaUrl && (
                 <section className="space-y-6">
                   <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                     <Play className="text-[#F1683C]" size={24} fill="currentColor" /> {LABELS.modal.prototype[lang]}
                   </h3>
                   <div className="w-full h-[800px] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                     <iframe
                       style={{ border: 'none' }}
                       width="100%"
                       height="100%"
                       src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(project.figmaUrl)}`}
                       allowFullScreen
                     ></iframe>
                   </div>
                   <p className="text-sm text-gray-500 text-center">
                     *Interact with the prototype above to explore the user flow.
                   </p>
                 </section>
               )}

               {/* Problem & Solution Cards */}
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-red-50/50 p-8 rounded-3xl border border-red-100">
                   <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-red-500 rounded-full"></span> Problem
                   </h4>
                   <p className="text-gray-700 leading-relaxed">{content.caseStudy.problem}</p>
                 </div>
                 <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
                   <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Solution
                   </h4>
                   <p className="text-gray-700 leading-relaxed">{content.caseStudy.solution}</p>
                 </div>
               </div>

               {/* Design System (If available) */}
               {project.designSystem && (
                 <section className="bg-gray-50 p-8 rounded-3xl">
                   <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                     <Palette className="text-gray-400" size={20} /> Design System
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase mb-3">Colors</p>
                       <div className="flex gap-4">
                         {project.designSystem.colors.map((c, i) => (
                           <div key={i} className="group relative">
                             <div className="w-12 h-12 rounded-full shadow-sm ring-2 ring-white" style={{ backgroundColor: c.hex }}></div>
                             <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{c.name}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                     <div>
                       <p className="text-xs font-bold text-gray-400 uppercase mb-3">Typography</p>
                       <div className="space-y-2">
                         {project.designSystem.typography.map((font, i) => (
                           <div key={i} className="flex items-baseline justify-between text-sm border-b border-gray-200 pb-1">
                             <span className="font-bold text-gray-800">{font.name}</span>
                             <span className="text-gray-500 text-xs">{font.usage}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </section>
               )}

               {/* Results */}
               <section className={`p-8 md:p-12 rounded-3xl text-center text-white ${project.accentColor}`}>
                 <h3 className="text-2xl font-bold mb-4">Outcome</h3>
                 <p className="text-lg text-white/90 leading-relaxed">
                   {content.caseStudy.results}
                 </p>
               </section>

             </div>
           </>
         )}
       </div>
     </div>
   </div>
 );
};

export default function App() {
 const [lang, setLang] = useState<Language>('jp');
 const [activeProject, setActiveProject] = useState<Project | null>(null);

 const scrollToSection = (id: string) => {
   document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
 };

 return (
   <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 selection:bg-[#145850] selection:text-white">
     
     {/* --- Floating Nav (Trend: Island UI) --- */}
     <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-gray-200/50 rounded-full px-6 py-3 flex items-center gap-6 md:gap-8 max-w-sm md:max-w-lg w-full justify-between">
       <div className="w-8 h-8 bg-[#145850] text-white rounded-full flex items-center justify-center font-serif font-bold text-lg">A</div>
       <div className="flex gap-4 md:gap-8">
         {Object.entries(LABELS.nav).map(([key, label]) => (
           <button
             key={key}
             onClick={() => scrollToSection(key)}
             className="text-sm font-medium text-gray-600 hover:text-[#145850] transition-colors"
           >
             {label[lang]}
           </button>
         ))}
       </div>
       <div className="hidden md:block w-px h-4 bg-gray-200"></div>
       {/* Desktop Language Switcher (Drops Down) */}
       <div className="hidden md:block">
          <LanguageSwitcher current={lang} onChange={setLang} direction="down" />
       </div>
     </nav>

     {/* Mobile Language Switcher (Fixed Bottom Right - DROPS UP) */}
     <div className="md:hidden fixed bottom-6 right-6 z-50">
       <LanguageSwitcher current={lang} onChange={setLang} direction="up" />
     </div>

     {/* --- Hero Section (Trend: Big Typography & Split Layout) --- */}
     <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6">
       <div className="max-w-6xl mx-auto">
         <div className="grid md:grid-cols-12 gap-12 items-start">
           
           <div className="md:col-span-8 space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-[#145850] rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               {LABELS.hero.status[lang]}
             </div>
             
             <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.95] tracking-tight">
               {LABELS.hero.titlePrefix[lang]}<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#145850] to-[#047857]">
                 {LABELS.hero.titleSuffix[lang]}
               </span>
             </h1>
             
             <p className="text-xl md:text-2xl text-gray-500 max-w-xl leading-relaxed font-light">
               {LABELS.hero.intro[lang]}
             </p>

             <div className="pt-4">
               <button
                 onClick={() => scrollToSection('work')}
                 className="group bg-[#145850] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#0f4640] transition-all shadow-xl shadow-[#145850]/20 flex items-center gap-3"
               >
                 {LABELS.hero.cta[lang]}
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
           </div>

           {/* Profile Image (Replaced with User's Unsplash Placeholder) */}
           <div className="md:col-span-4 flex justify-center md:justify-end relative">
             <div className="relative w-64 h-64 md:w-80 md:h-80">
               <div className="absolute inset-0 bg-[#F1683C] rounded-full opacity-20 blur-3xl animate-pulse"></div>
               <div className="relative w-full h-full rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-gray-100">
                  <img
                     src="/profile.jpg"
                     alt="Anastasiia Profile"
                     className="w-full h-full object-cover"
                  />
               </div>
               {/* Badge */}
               <div className="absolute -bottom-2 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full text-[#145850]"><HeartPulse size={24} /></div>
                  <div className="text-left">
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Focus</p>
                     <p className="font-bold text-gray-900 text-sm">{LABELS.hero.specialty[lang]}</p>
                  </div>
               </div>
             </div>
           </div>

         </div>
       </div>
     </section>

     {/* --- Projects Section (Trend: Large Cards with Hover Reveal) --- */}
     <section id="work" className="py-24 px-6 bg-white rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)]">
       <div className="max-w-6xl mx-auto">
         <div className="mb-16">
           <h2 className="text-3xl font-black text-gray-900 mb-2">{LABELS.sectionTitles.work[lang]}</h2>
           <div className="h-1 w-20 bg-[#F1683C]"></div>
         </div>

         <div className="grid gap-12 md:gap-16">
           {PROJECTS.map((project) => (
             <div
               key={project.id}
               onClick={() => setActiveProject(project)}
               className="group cursor-pointer"
             >
               <div className={`relative overflow-hidden rounded-[2rem] aspect-[16/9] md:aspect-[2/1] ${project.accentColor} mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500`}>
                 <img
                   src={project.thumbnail}
                   alt={project.content[lang].title}
                   className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                 />
                 {/* Hover Overlay Content */}
                 <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                   <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                       {project.content[lang].tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                           {tag}
                         </span>
                       ))}
                     </div>
                     <h3 className="text-3xl md:text-5xl font-black text-white mb-2">{project.content[lang].title}</h3>
                     <p className="text-white/80 text-lg line-clamp-1 group-hover:line-clamp-none transition-all">{project.content[lang].description}</p>
                   </div>
                 </div>
                 {/* Action Button */}
                 <div className="absolute top-6 right-6 bg-white/90 backdrop-blur rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                   <ArrowRight size={24} className="text-[#145850]" />
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* --- Bento Grid About Section (Trend: Bento Grids) --- */}
     <section id="about" className="py-24 px-6 bg-[#FAFAFA]">
       <div className="max-w-6xl mx-auto">
         <div className="mb-12">
           <h2 className="text-3xl font-black text-gray-900 mb-2">{LABELS.sectionTitles.about[lang]}</h2>
           <div className="h-1 w-20 bg-[#145850]"></div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
           
           {/* 1. Bio (Large) */}
           <div className="md:col-span-8 bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">{PROFILE.name[lang]}</h3>
             <p className="text-gray-600 text-lg leading-relaxed">
               {PROFILE.fullBio[lang]}
             </p>
           </div>

           {/* 2. Experience (Tall) */}
           <div className="md:col-span-4 bg-[#145850] p-8 md:p-10 rounded-[2rem] shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
             <Briefcase size={32} className="text-emerald-300 mb-4" />
             <div>
               <h4 className="text-3xl font-bold mb-2">3+ Years</h4>
               <p className="text-emerald-100">{LABELS.experience.desc[lang]}</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           </div>

           {/* 3. Skills */}
           <div className="md:col-span-5 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
             <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
               <PenTool size={16} /> Skills
             </h4>
             <div className="space-y-4">
               {SKILLS.map(skill => (
                 <div key={skill.name}>
                   <div className="flex justify-between text-sm font-bold text-gray-800 mb-1">
                     <span>{skill.name}</span>
                     <span className="text-gray-400">{skill.level}%</span>
                   </div>
                   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-[#F1683C] rounded-full" style={{ width: `${skill.level}%` }}></div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* 4. Languages */}
           <div className="md:col-span-3 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
             <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
               <Globe size={16} /> Languages
             </h4>
             <ul className="space-y-3">
               {LANGUAGES.map(l => (
                 <li key={l.lang} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                   <span className="font-bold text-gray-700">{l.lang}</span>
                   <span className="text-xs bg-white px-2 py-1 rounded shadow-sm text-gray-500 font-medium">{l.level}</span>
                 </li>
               ))}
             </ul>
           </div>

           {/* 5. Contact (Action) */}
           <div className="md:col-span-4 bg-[#F1683C] p-8 rounded-[2rem] shadow-lg text-white flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer" onClick={() => scrollToSection('contact')}>
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
             <Mail size={40} className="mb-4" />
             <h4 className="text-2xl font-bold">{LABELS.sectionTitles.contact[lang]}</h4>
             <p className="opacity-90 mt-2 text-sm">contact@example.com</p>
           </div>

           {/* 6. Interests (New Section) */}
           <div className="md:col-span-12 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
             <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
               <Layout size={16} /> Interests
             </h4>
             <div className="flex flex-wrap gap-2">
               {INTERESTS.map((interest, i) => (
                 <span key={i} className="px-4 py-2 bg-gray-50 rounded-full text-sm font-bold text-gray-700 border border-gray-100 hover:bg-[#E6EDDD] hover:text-[#145850] transition-colors cursor-default">
                   {interest[lang]}
                 </span>
               ))}
             </div>
           </div>

         </div>
       </div>
     </section>

     {/* --- Footer --- */}
     <footer id="contact" className="py-20 px-6 border-t border-gray-200 bg-white">
       <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="text-center md:text-left">
           <h2 className="text-lg font-bold text-gray-900 mb-1">© 2025 Hrytsai Anastasiia | Get In Touch</h2>
           <p className="text-gray-500 text-sm">
             <a href="mailto:hrytsai.anastasiia@gmail.com" className="hover:text-[#145850] transition-colors">hrytsai.anastasiia@gmail.com</a>
           </p>
         </div>
         <div className="flex gap-4">
           {/* LinkedIn icon removed */}
           <a href={`mailto:${PROFILE.email}`} className="bg-gray-100 hover:bg-emerald-50 hover:text-emerald-600 p-4 rounded-full transition-colors">
             <Mail size={20} />
           </a>
         </div>
       </div>
     </footer>

     <Modal
       isOpen={!!activeProject}
       onClose={() => setActiveProject(null)}
       project={activeProject}
       lang={lang}
     />

   </div>
 );
}