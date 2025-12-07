import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Globe,
  PenTool,
  Layout,
  CheckCircle,
  ArrowRight,
  Palette,
  Briefcase,
  HeartPulse,
  ChevronDown,
  Sparkles,
  Play,
  Leaf,
  ArrowUp,
  Search,
  Users,
  AlertCircle,
  MapPin,
  Flag,
  AlertTriangle
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

// --- CONSTANTS ---

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
     jp: "東京拠点のプロダクトデザイナー、アナスタシアです。データに基づくUXと、人に寄り添うインクルーシブなデザインでプロダクトをつくっています。",
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

const VEGWAM_DATA = {
 header: {
   tag: { en: "VEGAN LIFESTYLE PLATFORM", jp: "VEGAN LIFESTYLE PLATFORM", ua: "ПЛАТФОРМА ВЕГАНСЬКОГО СТИЛЮ" },
   title: { en: "VegWam", jp: "VegWam", ua: "VegWam" },
   catchphrase: { en: "Making plant-based life closer to you.", jp: "プラントベースは、もっと身近になる。", ua: "Робимо рослинний спосіб життя ближчим." },
   summary: {
     en: "An integrated lifestyle app for those living a vegan/plant-based life in Japan, connecting restaurants, products, information, and community.",
     jp: "日本でヴィーガン／プラントベースな生活を続けたい人と、その家族や友人のために、飲食店・商品・情報・コミュニティを一体化したライフスタイルアプリです。",
     ua: "Інтегрований лайфстайл-додаток для those living a vegan/plant-based life in Japan, connecting restaurants, products, information, and community."
   }
 },
 overview: {
   header: { en: "OUTLINE", jp: "OUTLINE", ua: "OUTLINE" },
   subHeader: { en: "Overview", jp: "作品概要", ua: "Огляд" },
   theme: {
     label: { en: "Theme", jp: "テーマ", ua: "Тема" },
     title: { en: "INTEGRATED PLATFORM", jp: "INTEGRATED PLATFORM / 統合プラットフォーム", ua: "ІНТЕГРОВАНА ПЛАТФОРМА" },
     content: {
       en: "A proposal for an integrated platform connecting mobile apps and web services to solve the 'fragmentation of information' and 'lack of community' in vegan living.",
       jp: "ヴィーガン生活における「情報の分散」と「コミュニティの欠如」を解決するための、モバイルアプリおよびWebサービスの統合プラットフォーム提案。",
       ua: "Пропозиція інтегрованої платформи для вирішення проблем «розкиданої інформації» та «відсутності спільноти»."
     }
   },
   concept: {
     label: { en: "Concept", jp: "コンセプト", ua: "Концепція" },
     catchphrase: {
       en: "Plant-based, closer to you anytime.",
       jp: "「プラントベースは気軽に、いつでもあなたのそばに」",
       ua: "Рослинний світ ближче до вас."
     },
     description: {
       en: "From finding restaurants to connecting with like-minded friends. We aimed to centralize all information necessary for vegan life (shops, recipes, knowledge) in one place, creating an experience where anyone can continue a plant-based life comfortably and happily.",
       jp: "飲食店探しから、同じ志を持つ仲間との交流まで。\nヴィーガン生活に必要なすべての情報（店舗・レシピ・知識）を一箇所に集約し、誰もが無理なく、楽しくプラントベースライフを継続できる体験を目指しました。",
       ua: "Від пошуку ресторанів до спілкування з однодумцями. Ми прагнули зібрати всю інформацію (магазини, рецепти, знання) в одному місці."
     }
   },
   keywords: {
     en: ["Vegan", "Community", "Search"],
     jp: ["ヴィーガン (Vegan)", "コミュニティ (Community)", "検索 (Search)"],
     ua: ["Веган", "Спільнота", "Пошук"]
   }
 },
 background: {
   header: { en: "BACKGROUND", jp: "BACKGROUND", ua: "ПЕРЕДУМОВИ" },
   title: { en: "Why VegWam Now?", jp: "なぜ今、VegWamなのか？", ua: "Чому VegWam зараз?" },
   card1: {
     title: { en: "Spread of Vegan Culture", jp: "ヴィーガン文化の広がり", ua: "Поширення веганської культури" },
     text: {
       en: "In recent years, the vegan/plant-based market has been expanding due to rising interest in health and environmental issues. However, in Japan, the quantity and quality of information vary, making it difficult to know \"where to buy what.\"",
       jp: "ここ数年で、健康志向や環境問題への関心の高まりから、ヴィーガン・プラントベース市場が拡大しています。一方で、日本ではまだ情報の量・質にばらつきがあり、「どこで何が買えるのか」が分かりにくい状況です。",
       ua: "Останніми роками ринок рослинної продукції розширився. Однак в Японії якість інформації різниться, що ускладнює пошук продуктів."
     }
   },
   card2: {
     title: { en: "Fragmentation of Information", jp: "情報の分散", ua: "Фрагментація інформації" },
     text: {
       en: "Information sources are scattered across SNS, blogs, and personal sites, making it hard to judge if info is up-to-date. There was a demand for a \"trustworthy hub\" that covers all aspects of life, including dining and daily goods.",
       jp: "SNSやブログ、個人のまとめサイトなど情報源がバラバラで、最新情報かどうかも判断しづらいのが現状です。外食・日用品・コスメなど生活全体をカバーできる「信頼できるハブ」が求められていました。",
       ua: "Джерела інформації розкидані, що ускладнює перевірку актуальності. Був потрібен「надійний хаб», що охоплює харчування та побут."
     }
   }
 },
 research_new: {
  title: { en: "User Research", jp: "ユーザーリサーチ", ua: "Дослідження Користувачів" },
  subTitle: { en: "Hearing from both Vegans and their 'Supporters'", jp: "ヴィーガン当事者と、その周りの「サポーター」両方の声を聞く", ua: "Почути як веганів, так і їхніх «саппортерів»" },
  outline: {
    title: { en: "Research Outline", jp: "調査概要", ua: "Огляд Дослідження" },
    items: [
      { 
        label: { en: "Desk Research", jp: "デスクリサーチ", ua: "Кабінетне Дослідження" }, 
        text: { en: "Investigated Japan's vegan market, existing apps/web services, and online communities.", jp: "日本のヴィーガン市場、既存アプリ・ウェブサービス、オンラインコミュニティを調査。", ua: "Досліджено ринок веганства в Японії, існуючі додатки та онлайн-спільноти." } 
      },
      { 
        label: { en: "Interviews", jp: "半構造化インタビュー", ua: "Напівструктуровані Інтерв'ю" }, 
        text: { en: "Conducted 30-45 min interviews with 5 people: 2 Vegans and 3 Supporters (Non-vegans supporting family/friends).", jp: "ヴィーガン当事者：2名、サポーター：3名（計5名）に各30〜45分のインタビューを実施。", ua: "Проведено 30-45 хв інтерв'ю з 5 людьми: 2 вегани та 3 саппортери." } 
      }
    ]
  },
  interviewees: {
    group1: {
      label: { en: "Vegans (2)", jp: "ヴィーガン当事者（2名）", ua: "Вегани (2)" },
      people: [
        {
          id: "A",
          info: { en: "Male, 30s. Office worker.", jp: "インタビュイーA（30代・男性）", ua: "Чол, 30+. Офісний працівник." },
          quote: { en: "Calling restaurants to check 'Is this really vegan?' every time is the biggest stress.", jp: "「お店に電話して『本当にヴィーガン対応か』を毎回確認するのが、一番ストレスです。」", ua: "Дзвонити в ресторани для перевірки — найбільший стрес." }
        },
        {
          id: "B",
          info: { en: "Female, 70s. Health-conscious.", jp: "インタビュイーB（70代・女性）", ua: "Жін, 70+. Піклується про здоров'я." },
          quote: { en: "I really didn't know what to eat in the beginning.", jp: "「何を食べればいいのか、最初の頃は本当に分かりませんでした。」", ua: "Спочатку я дійсно не знала, що їсти." }
        }
      ]
    },
    group2: {
      label: { en: "Supporters (3)", jp: "サポーター（3名）", ua: "Саппортери (3)" },
      people: [
        {
          id: "C",
          info: { en: "Mother, 50s. Cooking for vegan family.", jp: "インタビュイーC（50代・女性・母）", ua: "Мати, 50+. Готує для веганів." },
          quote: { en: "I want to enjoy meals together, but checking ingredients so I don't make a mistake is exhausting.", jp: "「一緒に楽しみたいけど、間違えないように調べるのがすごく大変です。」", ua: "Хочу їсти разом, але перевірка інгредієнтів виснажує." }
        },
        {
          id: "D/E",
          info: { en: "Friends, 30s. Eating out with vegans.", jp: "インタビュイーD・E（30代・友人）", ua: "Друзі, 30+. Їдять з веганами." },
          quote: { en: "I want to say 'Let's go here!', but worrying if they can eat there takes so much time.", jp: "「本当はもっと気軽に『ここ行こう！』って言いたいけど、お店選びにすごく時間がかかります。」", ua: "Хочу сказати «Ходімо сюди!», але хвилювання забирає час." }
        }
      ]
    }
  }
 },
 problems_new: {
  header: { en: "PROBLEM & INSIGHT", jp: "PROBLEM", ua: "ПРОБЛЕМА ТА ІНСАЙТ" },
  title: { en: "Not just the vegan, but the 'people around them' are also lost in information.", jp: "ヴィーガン本人だけでなく、「一緒に過ごす人」も情報の迷子になっている", ua: "Не тільки вегани, а й люди навколо них губляться в інформації." },
  cards: [
    {
      icon: <Search size={24} />,
      label: { en: "Scattered Information", jp: "情報の分散", ua: "Розкидана Інформація" },
      body: { 
        en: "Info is scattered across sites and SNS. Both vegans and supporters feel the burden of searching from scratch every time.", 
        jp: "ヴィーガン対応の店・商品・レシピが分散しており、毎回ゼロから検索が必要。本人だけでなくサポーターも負担を感じている。", 
        ua: "Інформація розкидана. І вегани, і саппортери відчувають тягар пошуку з нуля." 
      }
    },
    {
      icon: <Users size={24} />,
      label: { en: "Gap with Companions", jp: "同伴者とのギャップ", ua: "Розрив з Компаньйонами" },
      body: { 
        en: "Finding a place where 'everyone is happy' is hard. The inviter feels pressure, and the invited feels sorry.", 
        jp: "「みんなが満足できて、ヴィーガンも安心な店」が見つからない。誘う側のプレッシャーと、誘われる側の「申し訳なさ」が両立している。", 
        ua: "Важко знайти місце, де «всі щасливі». Запрошуючий відчуває тиск, а запрошений — провину." 
      }
    },
    {
      icon: <AlertCircle size={24} />,
      label: { en: "Beginner Anxiety", jp: "ビギナー期の不安", ua: "Тривога Новачків" },
      body: { 
        en: "Not knowing what to choose or if nutrition is enough leads to dropout. Small text and jargon are hurdles for seniors.", 
        jp: "何を食べるべきか分からず挫折しやすい。特にシニア層には専門用語や文字の小ささがハードル。", 
        ua: "Незнання, що обрати, призводить до відмови. Дрібний текст — бар'єр для літніх." 
      }
    },
    {
      icon: <MapPin size={24} />,
      label: { en: "Supporter Fatigue", jp: "周囲の人の検索疲れ", ua: "Втома Саппортерів" },
      body: { 
        en: "Supporters are tired of constantly checking ingredients for gifts and travel meals, fearing mistakes.", 
        jp: "レシピやお土産、旅行の食事などを調べるたびに成分確認が必要。「間違えるのが怖い」「時間がかかる」という声。", 
        ua: "Саппортери втомилися перевіряти інгредієнти, боячись помилок." 
      }
    }
  ],
  core_insight: {
    en: "Vegan services must design the entire experience to include not just the 'individual', but also the people supporting them.",
    jp: "ヴィーガン向けサービスは、「本人」だけでなく、周りで支える人も含めた体験全体をデザインする必要がある。",
    ua: "Веганські сервіси мають проектувати досвід не лише для「особи」, а й для людей, що її підтримують."
  }
 },
 persona_new: {
   header: "PERSONA",
   subHeader: { en: "Defining 2 Types: 'The Vegan' and 'The Supporter'", jp: "「ヴィーガン本人」と「サポーター」の2タイプを定義", ua: "Визначення 2 типів: «Веган» та «Саппортер»" },
   matrix: {
     yAxis: { top: "Long History", bottom: "Short History" },
     xAxis: { left: "Supporter", right: "Vegan" },
     note: { en: "Note: VegWam targets not just the individual, but also the 'supporter layer' (bottom right).", jp: "VegWamは「ヴィーガン本人」だけでなく\n「一緒に過ごす家族・友人」も主要ユーザーとして想定", ua: "Note: VegWam націлений також на «саппортерів»." }
   },
   typeA: {
     label: { en: "TYPE A: Vegan", jp: "TYPE A: ヴィーガン本人", ua: "TYPE A: Веган" },
     tag: { en: "Wants to continue naturally", jp: "日常の中で続けたい", ua: "Хоче продовжувати природно" },
     name: { en: "Ken Sato (32)", jp: "佐藤 健 (32)", ua: "Кен Сато (32)" },
     role: { en: "Office Worker / Tokyo", jp: "会社員 / 都内", ua: "Офісний працівник / Токіо" },
     desc: { en: "Vegan for 3 years. Busy with work on weekdays, enjoys cafe hopping on weekends. Wants to be 'natural', not 'high maintenance'.", jp: "ヴィーガン歴3年。パートナーの影響で開始。平日は仕事が忙しく外食中心だが、週末はカフェ巡りを楽しむ。「意識高い系」ではなく「自然体」でいたい。", ua: "Веган 3 роки. Зайнятий роботою, любить кафе на вихідних. Хоче бути「природним」." },
     pains: { en: ["Checking restaurants by phone is tedious", "Lack of trusted info"], jp: ["入店前の電話確認が面倒", "信頼できる日本語情報の不足"], ua: ["Дзвонити в ресторани нудно", "Брак надійної інфо"] },
     goals: { en: ["Eat out easily with friends", "Choose shops intuitively"], jp: ["友人と気軽に外食したい", "直感的に店を選びたい"], ua: ["Легко їсти з друзями", "Інтуїтивний вибір"] }
   },
   typeB: {
     label: { en: "TYPE B: Supporter", jp: "TYPE B: サポーター", ua: "TYPE B: Саппортер" },
     name: { en: "Yumi Yamamoto (55 / Homemaker)", jp: "山本 由美 (55歳 / 主婦)", ua: "Юмі Ямамото (55)" },
     role: { en: "Homemaker", jp: "主婦", ua: "Домогосподарка" },
     desc: { en: "Non-vegan, but daughter is vegan. Feels pressure not to make mistakes with family meals or gifts.", jp: "自身はノンヴィーガンだが、娘がヴィーガン。家族の食事や贈り物で「間違えたくない」というプレッシャーを感じている。", ua: "Не веган, але дочка веган. Відчуває тиск, щоб不 помилитися з їжею." },
     tags: [
       { en: "Ingredient check is hard", jp: "原材料確認が大変", ua: "Перевірка інгредієнтів — це складно" }, 
       { en: "Want to enjoy together", jp: "家族みんなで楽しみたい", ua: "Хочу насолоджуватися разом" }
     ]
   }
 },
 ui: {
   title: { en: "UI Highlights", jp: "UIデザインのポイント", ua: "Основні Елементи UI" },
   p1: {
     title: { en: "01. Home Screen for Peace of Mind", jp: "01. 安心して選べるホーム画面", ua: "01. Головний Екранで安心" },
     body: {
       en: "Designed to provide immediate relief by showing only information matching the user's diet. 'Certified' marks and reviews are visible at a glance.",
       jp: "アプリを開いた瞬間、自分の食生活に合った情報だけが表示される安心感を設計。「認証済み」マークや「ユーザーレビュー」をファーストビューに配置し、信頼性を可視化しました。",
       ua: "Розроблено так, щоб показувати лише інформацію, що відповідає дієті користувача. Знаки「Сертифіковано」およびレビューが一目でわかります。"
     }
   },
   p2: {
     title: { en: "02. Stress-free Search", jp: "02. ストレスフリーな検索体験", ua: "02. Пошук無 Стресу" },
     body: {
       en: "Implemented intuitive filters for 'Area' x 'Category' x 'Details' (e.g., Gluten-free). Smooth switching to map view allows finding safe spots nearby instantly.",
       jp: "「エリア」×「カテゴリ」×「詳細条件（グルテンフリー等）」を直感的に絞り込めるフィルター機能を実装。地図表示との切り替えもスムーズにし、現在地周辺の安心できるお店を即座に見つけられます。",
       ua: "Інтуїтивні фільтри «Район» x「Категорія」 x「Деталі». Плавне перемикання на карту дозволяє миттєво знайти безпечні місця поруч."
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
         overview: "Додатокで stress-relief app focusing on calming visuals and audio.",
         problem: "Meditation apps often look too clinical.",
         solution: "Used Glassmorphism and pastel gradients to create an immersive, calming mood.",
         process: ["Moodboard", "Visual Exploration"],
         results: "High-fidelity visual design that emphasizes emotional well-being."
       }
     }
   }
 }
];

// --- COMPONENTS ---

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

const VegBackgroundCard = ({ title, text, theme }: { title: string, text: string, theme: 'orange' | 'green' }) => {
  const gradients = {
    orange: 'from-[#F1683C] to-[#ff9f7c]',
    green: 'from-[#145850] to-[#2a857a]'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className={`bg-gradient-to-r ${gradients[theme]} p-6 text-center flex items-center justify-center h-24`}>
        <h4 className="text-white font-bold text-lg">{title}</h4>
      </div>
      <div className="p-6 md:p-8 flex-1 flex items-center justify-center">
        <p className="text-[#555555] leading-relaxed text-sm text-left">
          {text}
        </p>
      </div>
    </div>
  );
};

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
   <div className="bg-white border border-[#dddddd] rounded-2xl p-8 shadow-sm">
     <div className="grid grid-cols-2 gap-y-8 gap-x-8">
       <div>
         <p className="font-bold text-[#111111] mb-2">{labels.type[lang]}</p>
         <p className="text-[#555555] text-sm">{labels.valType[lang]}</p>
       </div>
       <div>
         <p className="font-bold text-[#111111] mb-2">{labels.duration[lang]}</p>
         <p className="text-[#555555] text-sm">{labels.valDuration[lang]}</p>
       </div>
       <div>
         <p className="font-bold text-[#111111] mb-2">{labels.role[lang]}</p>
         <p className="text-[#555555] text-sm">{labels.valRole[lang]}</p>
       </div>
       <div>
         <p className="font-bold text-[#111111] mb-2">{labels.tools[lang]}</p>
         <p className="text-[#555555] text-sm">Figma, Illustrator</p>
       </div>
     </div>
   </div>
 );
};

const VegResearchSection = ({ lang }: { lang: Language }) => {
  const d = VEGWAM_DATA.research_new;

  return (
    <section>
      <VegSectionHeader overline={d.title[lang]} title={d.subTitle[lang]} />
      
      {/* 1. Outline */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12 shadow-sm">
        <h3 className="font-bold text-[#145850] border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider text-sm">
          {d.outline.title[lang]}
        </h3>
        <div className="space-y-4">
          {d.outline.items.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <span className="font-bold text-[#111111] min-w-[140px] shrink-0">{item.label[lang]}</span>
              <p className="text-[#555555] text-sm leading-relaxed">{item.text[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interviewees */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Vegans */}
        <div className="space-y-6">
          <h4 className="text-center font-bold text-[#145850] bg-[#e6eddd] py-2 rounded-full">
            {d.interviewees.group1.label[lang]}
          </h4>
          {d.interviewees.group1.people.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute -left-3 top-6 w-3 h-3 bg-white border-l border-b border-gray-100 transform rotate-45"></div>
              <p className="font-bold text-xs text-[#f1683c] uppercase mb-2">{p.info[lang]}</p>
              <p className="text-[#111111] font-medium leading-relaxed">"{p.quote[lang]}"</p>
            </div>
          ))}
        </div>

        {/* Supporters */}
        <div className="space-y-6">
          <h4 className="text-center font-bold text-[#F1683C] bg-[#ffece6] py-2 rounded-full">
            {d.interviewees.group2.label[lang]}
          </h4>
          {d.interviewees.group2.people.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute -left-3 top-6 w-3 h-3 bg-white border-l border-b border-gray-100 transform rotate-45"></div>
              <p className="font-bold text-xs text-[#145850] uppercase mb-2">{p.info[lang]}</p>
              <p className="text-[#111111] font-medium leading-relaxed">"{p.quote[lang]}"</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const VegProblemSection = ({ lang }: { lang: Language }) => {
  const d = VEGWAM_DATA.problems_new;

  return (
    <section className="bg-[#145850] text-white rounded-[2rem] p-8 md:p-12 my-12">
      <div className="text-center mb-12">
        <p className="text-[#F1683C] text-xs font-bold uppercase tracking-widest mb-3">{d.header[lang]}</p>
        <h2 className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-snug">{d.title[lang]}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {d.cards.map((card, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 text-[#F1683C]">
              {card.icon}
              <h3 className="font-bold text-lg">{card.label[lang]}</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {card.body[lang]}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white text-[#145850] p-6 md:p-8 rounded-2xl text-center">
        <p className="font-bold text-lg md:text-xl leading-relaxed">
          {d.core_insight[lang]}
        </p>
      </div>
    </section>
  );
};

const VegPersonaSection = ({ lang }: { lang: Language }) => {
  const d = VEGWAM_DATA.persona_new;

  return (
    <section className="my-20">
      <div className="text-center mb-12">
        <p className="text-[#F1683C] text-xs font-bold uppercase tracking-widest mb-2">{d.header}</p>
        <h2 className="text-3xl md:text-4xl font-black text-[#111111]">{d.subHeader[lang]}</h2>
      </div>
      
      {/* Changed to flex-col for 1 column layout */}
      <div className="flex flex-col gap-12 max-w-4xl mx-auto">
        
        {/* Matrix (Now on Top) - Fixed Height */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm w-full">
          <div className="flex items-center gap-2 mb-6 justify-center">
             <Layout size={20} className="text-[#111111]" />
             <h4 className="font-bold text-[#111111] text-lg">{lang === 'jp' ? 'セグメンテーション' : 'Segmentation'}</h4>
          </div>
          
          <div className="relative m-2 h-[400px] md:h-[500px]">
            {/* L-Shape Axis Lines */}
            <div className="absolute left-8 top-8 bottom-12 w-px bg-gray-200"></div>
            <div className="absolute left-8 right-8 bottom-12 h-px bg-gray-200"></div>

            {/* Axis Labels */}
            <span className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 text-xs text-gray-400 font-bold tracking-wide whitespace-nowrap origin-center">
                {lang === 'jp' ? 'ヴィーガン歴 (長)' : 'Vegan History (Long)'}
            </span>
            <div className="absolute bottom-4 left-8 right-8 flex justify-between text-xs text-gray-400 font-bold tracking-wide px-4">
                <span>{lang === 'jp' ? '当事者本人' : 'Vegan'}</span>
                <span>{lang === 'jp' ? 'サポーター' : 'Supporter'}</span>
            </div>

            {/* Clusters */}
            
            {/* Green Cluster (Top Left - Vegans) */}
            <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] border-2 border-dashed border-emerald-100 rounded-full flex items-center justify-center animate-pulse-slow"></div>
            
            {/* Type A: Ethics (Main Hover Target from Image) */}
            <div className="absolute top-[20%] left-[30%] z-20 group cursor-pointer">
               <div className="w-6 h-6 bg-[#4ADE80] rounded-full shadow-md border-2 border-white transition-transform group-hover:scale-110"></div>
               {/* Tooltip */}
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-800 text-white text-[10px] md:text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap">
                  {lang === 'jp' ? 'Aさん（倫理・環境重視）' : lang === 'ua' ? 'Пан А (Етика/Довкілля)' : 'Mr. A (Ethics/Environment)'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
               </div>
            </div>

            {/* Type B: Health */}
            <div className="absolute top-[35%] left-[20%] z-20 group cursor-pointer">
               <div className="w-6 h-6 bg-[#4ADE80] rounded-full shadow-md border-2 border-white opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-800 text-white text-[10px] md:text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap">
                  {lang === 'jp' ? 'Bさん（健康志向）' : lang === 'ua' ? 'Пані B (Здоров\'я)' : 'Ms. B (Health)'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
               </div>
            </div>

            {/* Orange Cluster (Bottom Right - Supporters) */}
            <div className="absolute bottom-[15%] right-[15%] w-[40%] h-[40%] border-2 border-dashed border-orange-100 rounded-full flex items-center justify-center"></div>
            
            {/* Supporter C: Mother */}
            <div className="absolute bottom-[30%] right-[30%] z-20 group cursor-pointer">
               <div className="w-6 h-6 bg-[#F1683C] rounded-full shadow-md border-2 border-white transition-transform group-hover:scale-110"></div>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-800 text-white text-[10px] md:text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap">
                  {lang === 'jp' ? 'Cさん（家族・母）' : lang === 'ua' ? 'Пані C (Мати)' : 'Ms. C (Mother)'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
               </div>
            </div>

            {/* Supporter D: Friend */}
            <div className="absolute bottom-[25%] right-[40%] z-20 group cursor-pointer">
               <div className="w-6 h-6 bg-[#F1683C] rounded-full shadow-md border-2 border-white opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100"></div>
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-800 text-white text-[10px] md:text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap">
                  {lang === 'jp' ? 'Dさん（友人）' : lang === 'ua' ? 'Д (Друг)' : 'Friend D'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-800"></div>
               </div>
            </div>

          </div>

          <div className="mt-6 text-center border-t border-gray-50 pt-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              {d.matrix.note[lang]}
            </p>
          </div>
        </div>

        {/* Persona Cards (Now Below) */}
        <div className="space-y-6">
          
          {/* Type A (Green) */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl flex flex-col md:flex-row relative">
            <div className="absolute top-4 right-6 text-xs font-bold text-gray-400 z-10">{d.typeA.tag[lang]}</div>
            
            {/* Image Side */}
            <div className="md:w-5/12 relative h-72 md:h-auto">
               <img 
                 src="/japaneseMale.jpeg" 
                 className="absolute inset-0 w-full h-full object-cover" 
                 alt="Persona A" 
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
                 <h3 className="text-2xl font-bold text-white leading-tight">{d.typeA.name[lang]}</h3>
                 <p className="text-white/80 text-xs font-medium">{d.typeA.role[lang]}</p>
               </div>
            </div>

            {/* Content Side */}
            <div className="md:w-7/12 p-8 flex flex-col">
              <div className="mb-4">
                <span className="bg-[#145850] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide inline-block mb-3">
                  {d.typeA.label[lang]}
                </span>
                <p className="text-sm text-[#111111] leading-relaxed font-medium">
                  {d.typeA.desc[lang]}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-auto">
                <div>
                  <p className="text-[#D64742] text-xs font-bold uppercase mb-3 flex items-center gap-1">
                    <AlertTriangle size={14} fill="currentColor" /> Pain Points
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 list-disc list-outside ml-3 marker:text-[#D64742]">
                    {d.typeA.pains[lang].map((p,i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-[#007AFF] text-xs font-bold uppercase mb-3 flex items-center gap-1">
                    <Flag size={14} fill="currentColor" /> Goals
                  </p>
                  <ul className="text-xs text-gray-600 space-y-2 list-disc list-outside ml-3 marker:text-[#007AFF]">
                    {d.typeA.goals[lang].map((g,i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Type B (Pink) */}
          <div className="bg-[#fff5f2] rounded-[2rem] p-6 border border-[#ffdccf] flex flex-col sm:flex-row items-center gap-6">
             <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
               <img 
                 src="/japaneseFemale50s.jpeg" 
                 className="w-full h-full object-cover" 
                 alt="Persona B" 
               />
             </div>
             <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-3 mb-2 justify-center sm:justify-start">
                   <span className="bg-[#D64742] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                     {d.typeB.label[lang]}
                   </span>
                   <span className="font-bold text-[#111111] text-lg">{d.typeB.name[lang]}</span>
                </div>
                <p className="text-sm text-[#555555] leading-relaxed mb-3">
                  {d.typeB.desc[lang]}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {d.typeB.tags.map((t, i) => (
                    <span key={i} className="bg-white text-[#D64742] px-3 py-1 rounded-full text-[10px] font-bold shadow-sm border border-[#ffdccf]">
                      {t[lang]}
                    </span>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

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
const VegWamCaseStudy = ({ lang, project }: { lang: Language, project: Project }) => {
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
           {/* VegMetaBlock positioned here */}
           <div className="pt-6">
             <VegMetaBlock lang={lang} />
           </div>
         </div>
         <div className="flex justify-center">
             <img src="/vegwam-app-screen.jpg" alt="VegWam App Mockup" className="w-64 md:w-80 shadow-2xl rounded-[3rem] border-8 border-white" />
         </div>
       </div>
     </section>

     <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-24">
      
       {/* 2. Overview (Revamped Layout with Old Header Style & Vertical Stack) */}
       <section>
         <VegSectionHeader
           overline={t.overview.header[lang]}
           title={t.overview.subHeader[lang]}
         />

         <div className="space-y-12">
           {/* Vertical Stack: Theme First, Then Concept */}
           <div className="flex flex-col gap-12">
             {/* 1. Theme */}
             <div>
               <div className="flex items-center gap-2 text-[#145850] mb-2">
                 <Leaf size={20} />
                 <h3 className="font-bold uppercase tracking-wider text-sm">{t.overview.theme.label[lang]}</h3>
               </div>
               <h4 className="text-lg font-bold text-[#111111] mb-4">{t.overview.theme.title[lang]}</h4>
               <p className="text-[#555555] leading-relaxed max-w-2xl">
                 {t.overview.theme.content[lang]}
               </p>
             </div>

             {/* 2. Concept */}
             <div>
               <div className="flex items-center gap-2 text-[#F1683C] mb-2">
                 <Sparkles size={20} />
                 <h3 className="font-bold uppercase tracking-wider text-sm">{t.overview.concept.label[lang]}</h3>
               </div>
               <h4 className="text-2xl md:text-3xl font-black text-[#145850] mb-4 leading-tight">
                 {t.overview.concept.catchphrase[lang]}
               </h4>
               <p className="text-[#555555] leading-relaxed max-w-2xl">
                 {t.overview.concept.description[lang]}
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* 3. Background Section (NEW) */}
       <section>
         <VegSectionHeader 
           overline={t.background.header[lang]} 
           title={t.background.title[lang]} 
         />
         <div className="grid md:grid-cols-2 gap-6">
           <VegBackgroundCard 
             title={t.background.card1.title[lang]} 
             text={t.background.card1.text[lang]} 
             theme="orange" 
           />
           <VegBackgroundCard 
             title={t.background.card2.title[lang]} 
             text={t.background.card2.text[lang]} 
             theme="green" 
           />
         </div>
       </section>

       {/* 4. NEW Research Section */}
       <VegResearchSection lang={lang} />

       {/* 5. NEW Problem & Insight Section */}
       <VegProblemSection lang={lang} />

       {/* 6. NEW Persona Section */}
       <VegPersonaSection lang={lang} />

       {/* 7. IA & Flow */}
       <section>
         <VegSectionHeader overline="IA & FLOW" title={lang === 'jp' ? "情報設計と体験フロー" : "IA & User Flow"} />
         {/* Replaced custom component with static image */}
         <VegImageFigure
           src="/IA MAP.jpg"
           caption={lang === 'jp' ? "迷わず目的にたどり着くための情報構造" : "Simplified Information Architecture"}
           annotations={["Home", "Search", "Community", "Profile"]}
         />
       </section>

       {/* 8. Prototype Section */}
       <section>
         <VegSectionHeader overline="PROTOTYPE" title={lang === 'jp' ? "プロトタイプ" : "Interactive Prototype"} />
         <div className="w-full h-[800px] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
           <iframe
             style={{ border: 'none' }}
             width="100%"
             height="100%"
             src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(project.figmaUrl || '')}`}
             allowFullScreen
           ></iframe>
         </div>
         <p className="text-sm text-[#555555] text-center mt-4">
           {lang === 'jp' ? "※画面を操作して、実際のフローを体験できます。" : "*Interact with the prototype above to explore the user flow."}
         </p>
       </section>

       {/* 9. UI Highlights */}
       <section>
         <VegSectionHeader overline="UI HIGHLIGHTS" title={t.ui.title[lang]} />
         
         <div className="space-y-16">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <img src="/Home Screen01.jpg" alt="Home Screen" className="rounded-xl shadow-lg border border-[#dddddd]" />
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
             <img src="/115 Filter Screen.jpg" alt="Search Screen" className="rounded-xl shadow-lg border border-[#dddddd] order-1 md:order-2" />
           </div>
         </div>
       </section>

       {/* 10. Outcomes */}
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
           <VegWamCaseStudy lang={lang} project={project} />
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
 const [showScrollTop, setShowScrollTop] = useState(false);

 useEffect(() => {
   const handleScroll = () => {
     setShowScrollTop(window.scrollY > 400);
   };
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const scrollToTop = () => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const scrollToSection = (id: string) => {
   document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
 };

 return (
   <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 selection:bg-[#145850] selection:text-white">
     
     {/* --- Floating Nav (Trend: Island UI) --- */}
     <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-gray-200/50 rounded-full px-6 py-3 flex items-center gap-6 md:gap-8 max-w-sm md:max-w-lg w-full justify-between">
       <button 
         onClick={scrollToTop} 
         className="w-8 h-8 bg-[#145850] text-white rounded-full flex items-center justify-center font-serif font-bold text-lg hover:scale-105 transition-transform"
         aria-label="Scroll to top"
       >
         A
       </button>
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

     {/* --- Scroll To Top Button --- */}
     <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-6 md:bottom-10 md:right-10 z-40 p-3 md:p-4 bg-[#145850] text-white rounded-full shadow-lg transition-all duration-300 hover:bg-[#0f4640] hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

     {/* --- Hero Section (Trend: Big Typography & Split Layout) --- */}
     <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6">
       <div className="max-w-6xl mx-auto">
         <div className="grid md:grid-cols-12 gap-12 items-center">
           
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
             <div className="relative w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center">
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
             <p className="opacity-90 mt-2 text-sm">{PROFILE.email}</p>
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