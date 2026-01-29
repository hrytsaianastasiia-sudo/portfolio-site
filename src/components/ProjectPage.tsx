import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Users, Target, Lightbulb, Search, PenTool, Layers, TestTube, Quote } from 'lucide-react';

type Language = 'en' | 'jp' | 'ua';

interface ProjectPageProps {
  lang: Language;
}

// Project data for detailed pages
const PROJECT_DETAILS = {
  vegwam: {
    hero: {
      tag: { en: "CASE STUDY", jp: "ケーススタディ", ua: "КЕЙС" },
      title: { en: "VegWam", jp: "VegWam", ua: "VegWam" },
      subtitle: { en: "Making plant-based life closer to you.", jp: "プラントベースは、もっと身近になる。", ua: "Робимо рослинний спосіб життя ближчим." },
      role: { en: "Product Designer", jp: "プロダクトデザイナー", ua: "Продуктовий Дизайнер" },
      duration: { en: "1 Month", jp: "1ヶ月", ua: "1 Місяць" },
      tools: ["Figma", "Illustrator"],
      heroImage: "/vegwam-hero.png"
    },
    overview: {
      label: { en: "PROJECT OVERVIEW", jp: "プロジェクト概要", ua: "ОГЛЯД ПРОЄКТУ" },
      title: { en: "Overview", jp: "概要", ua: "Огляд" },
      content: {
        en: "An integrated lifestyle app for those living a vegan/plant-based life in Japan, connecting restaurants, products, information, and community. The platform aims to solve the 'fragmentation of information' and 'lack of community' that vegans face daily.",
        jp: "日本でヴィーガン／プラントベースな生活を続けたい人のために、飲食店・商品・情報・コミュニティを一体化したライフスタイルアプリです。ヴィーガンが日々直面する「情報の分散」と「コミュニティの欠如」を解決することを目指しています。",
        ua: "Інтегрований лайфстайл-додаток для тих, хто веде веганський спосіб життя в Японії, що об'єднує ресторани, продукти, інформацію та спільноту."
      }
    },
    challenge: {
      label: { en: "THE CHALLENGE", jp: "課題", ua: "ВИКЛИК" },
      title: { en: "The Challenge", jp: "解決すべき課題", ua: "Виклик" },
      content: {
        en: "Finding vegan options in Japan is difficult. Information is scattered across SNS, blogs, and personal sites, making it hard to judge if info is up-to-date. Both vegans and their supporters (family, friends) struggle with finding trustworthy information.",
        jp: "日本ではヴィーガン対応の情報を見つけるのが難しい状況です。SNSやブログ、個人サイトに情報が分散しており、最新情報かどうかの判断も困難。ヴィーガン本人だけでなく、サポーター（家族・友人）も信頼できる情報を見つけるのに苦労しています。",
        ua: "Знайти веганські варіанти в Японії складно. Інформація розкидана по соцмережах, блогах та особистих сайтах."
      },
      points: {
        en: ["Scattered information across multiple platforms", "Difficulty verifying if restaurants truly offer vegan options", "Supporters struggle to find safe options for vegan family/friends", "No centralized community for vegans in Japan"],
        jp: ["複数のプラットフォームに分散した情報", "レストランが本当にヴィーガン対応か確認が困難", "サポーターがヴィーガンの家族・友人のための安全な選択肢を見つけられない", "日本のヴィーガンのための集中したコミュニティがない"],
        ua: ["Розкидана інформація по різних платформах", "Складність перевірки веганських опцій ресторанів", "Саппортери не можуть знайти безпечні варіанти", "Немає централізованої спільноти"]
      }
    },
    objective: {
      label: { en: "OBJECTIVE", jp: "目標", ua: "МЕТА" },
      title: { en: "Objective & Goals", jp: "目標とゴール", ua: "Цілі" },
      content: {
        en: "Create a unified platform that centralizes all vegan-related information and builds a supportive community, making plant-based living accessible and enjoyable for everyone.",
        jp: "すべてのヴィーガン関連情報を集約し、サポーティブなコミュニティを構築する統合プラットフォームを作成し、プラントベースライフを誰もがアクセスしやすく楽しめるものにする。",
        ua: "Створити єдину платформу, що централізує всю інформацію про веганство та будує підтримуючу спільноту."
      },
      goals: {
        en: ["Reduce search time for vegan-friendly places", "Build trust through verified information", "Connect vegans and supporters", "Provide educational resources for beginners"],
        jp: ["ヴィーガンフレンドリーな場所の検索時間を短縮", "認証された情報で信頼を構築", "ヴィーガンとサポーターをつなぐ", "初心者向けの教育リソースを提供"],
        ua: ["Скоротити час пошуку веган-френдлі місць", "Побудувати довіру через перевірену інформацію", "З'єднати веганів та саппортерів", "Надати освітні ресурси для новачків"]
      }
    },
    designProcess: {
      label: { en: "MY DESIGN PROCESS", jp: "デザインプロセス", ua: "МІЙ ДИЗАЙН-ПРОЦЕС" },
      title: { en: "Design Process", jp: "デザインプロセス", ua: "Дизайн-процес" },
      steps: [
        { name: { en: "Empathize", jp: "共感", ua: "Емпатія" }, icon: "heart" },
        { name: { en: "Define", jp: "定義", ua: "Визначення" }, icon: "target" },
        { name: { en: "Ideate", jp: "発想", ua: "Ідеація" }, icon: "lightbulb" },
        { name: { en: "Prototype", jp: "プロトタイプ", ua: "Прототип" }, icon: "layers" },
        { name: { en: "Test", jp: "テスト", ua: "Тест" }, icon: "test" }
      ]
    },
    research: {
      label: { en: "RESEARCH", jp: "リサーチ", ua: "ДОСЛІДЖЕННЯ" },
      title: { en: "User Research", jp: "ユーザーリサーチ", ua: "Дослідження Користувачів" },
      methods: {
        en: ["Desk Research on Japan's vegan market", "Semi-structured interviews with 5 participants", "Competitive analysis of existing apps"],
        jp: ["日本のヴィーガン市場のデスクリサーチ", "5名の参加者への半構造化インタビュー", "既存アプリの競合分析"],
        ua: ["Кабінетне дослідження ринку веганства в Японії", "Напівструктуровані інтерв'ю з 5 учасниками", "Конкурентний аналіз існуючих додатків"]
      },
      findings: {
        en: ["Vegans spend 30+ min searching for restaurants", "Supporters feel anxious about making mistakes", "Existing apps lack community features", "Senior users find small text difficult to read"],
        jp: ["ヴィーガンはレストラン検索に30分以上費やす", "サポーターは間違えることに不安を感じる", "既存アプリにはコミュニティ機能がない", "シニアユーザーは小さな文字が読みにくい"],
        ua: ["Вегани витрачають 30+ хв на пошук ресторанів", "Саппортери відчувають тривогу через можливі помилки", "Існуючим додаткам бракує функцій спільноти", "Літнім користувачам важко читати дрібний текст"]
      }
    },
    personas: {
      label: { en: "USER PERSONAS", jp: "ペルソナ", ua: "ПЕРСОНИ" },
      title: { en: "User Personas", jp: "ユーザーペルソナ", ua: "Персони Користувачів" },
      users: [
        {
          name: { en: "Ken Sato", jp: "佐藤 健", ua: "Кен Сато" },
          age: "32",
          role: { en: "Office Worker / Vegan", jp: "会社員 / ヴィーガン", ua: "Офісний працівник / Веган" },
          quote: { en: "I want to eat out casually with friends without the hassle.", jp: "友人と気軽に外食したい。", ua: "Хочу легко їсти з друзями без клопоту." },
          goals: { en: ["Find restaurants quickly", "Share spots with friends"], jp: ["レストランを素早く見つける", "友人とスポットを共有"], ua: ["Швидко знаходити ресторани", "Ділитися місцями з друзями"] },
          frustrations: { en: ["Calling to verify is tedious", "Info is scattered"], jp: ["電話で確認するのが面倒", "情報が分散している"], ua: ["Дзвінки для перевірки втомлюють", "Інформація розкидана"] }
        },
        {
          name: { en: "Yumi Yamamoto", jp: "山本 由美", ua: "Юмі Ямамото" },
          age: "55",
          role: { en: "Homemaker / Supporter", jp: "主婦 / サポーター", ua: "Домогосподарка / Саппортер" },
          quote: { en: "I want to cook for my vegan daughter without making mistakes.", jp: "ヴィーガンの娘のために間違えずに料理したい。", ua: "Хочу готувати для дочки-веганки без помилок." },
          goals: { en: ["Learn vegan cooking", "Find gift ideas"], jp: ["ヴィーガン料理を学ぶ", "ギフトアイデアを見つける"], ua: ["Навчитися веганській кухні", "Знайти ідеї подарунків"] },
          frustrations: { en: ["Checking ingredients is exhausting", "Fear of mistakes"], jp: ["原材料の確認が大変", "間違えるのが怖い"], ua: ["Перевірка інгредієнтів виснажує", "Страх помилок"] }
        }
      ]
    },
    pov: {
      label: { en: "POINT OF VIEW", jp: "視点", ua: "ТОЧКА ЗОРУ" },
      title: { en: "POV Statements", jp: "POVステートメント", ua: "POV Твердження" },
      statements: {
        en: [
          "Busy vegan professionals need a way to quickly find verified restaurants because they value their time and want to eat safely.",
          "Supporters of vegans need accessible resources to learn about vegan options because they want to show care without making mistakes."
        ],
        jp: [
          "忙しいヴィーガンの専門家は、時間を大切にし、安全に食事をしたいので、認証されたレストランを素早く見つける方法が必要です。",
          "ヴィーガンのサポーターは、間違えずに思いやりを示したいので、ヴィーガンの選択肢について学ぶためのアクセスしやすいリソースが必要です。"
        ],
        ua: [
          "Зайнятим веганам-професіоналам потрібен спосіб швидко знаходити перевірені ресторани, бо вони цінують свій час.",
          "Саппортерам веганів потрібні доступні ресурси для навчання, бо вони хочуть піклуватися без помилок."
        ]
      }
    },
    hmw: {
      label: { en: "HOW MIGHT WE", jp: "HMW", ua: "ЯК МИ МОЖЕМО" },
      title: { en: "How Might We", jp: "How Might We", ua: "Як Ми Можемо" },
      questions: {
        en: [
          "How might we reduce the time vegans spend searching for restaurants?",
          "How might we help supporters feel confident when choosing vegan options?",
          "How might we create a trusted community for vegans in Japan?"
        ],
        jp: [
          "ヴィーガンがレストラン検索に費やす時間をどのように短縮できるか？",
          "サポーターがヴィーガンの選択肢を選ぶときに自信を持てるようにするには？",
          "日本のヴィーガンのための信頼できるコミュニティをどのように作れるか？"
        ],
        ua: [
          "Як ми можемо скоротити час пошуку ресторанів для веганів?",
          "Як ми можемо допомогти саппортерам відчувати впевненість при виборі веганських опцій?",
          "Як ми можемо створити довірену спільноту для веганів в Японії?"
        ]
      }
    },
    projectGoals: {
      label: { en: "PROJECT GOALS", jp: "プロジェクトゴール", ua: "ЦІЛІ ПРОЄКТУ" },
      title: { en: "Project Goals", jp: "プロジェクトゴール", ua: "Цілі Проєкту" },
      business: {
        title: { en: "Business Goals", jp: "ビジネス目標", ua: "Бізнес-цілі" },
        items: { en: ["Become the go-to platform for vegans in Japan", "Build partnerships with vegan restaurants"], jp: ["日本のヴィーガンのためのプラットフォームになる", "ヴィーガンレストランとのパートナーシップを構築"], ua: ["Стати основною платформою для веганів в Японії", "Побудувати партнерства з веганськими ресторанами"] }
      },
      user: {
        title: { en: "User Goals", jp: "ユーザー目標", ua: "Цілі Користувачів" },
        items: { en: ["Find vegan options easily", "Connect with like-minded people"], jp: ["ヴィーガンの選択肢を簡単に見つける", "同じ志を持つ人々とつながる"], ua: ["Легко знаходити веганські варіанти", "З'єднуватися з однодумцями"] }
      },
      technical: {
        title: { en: "Technical Goals", jp: "技術目標", ua: "Технічні Цілі" },
        items: { en: ["Accessible UI for all ages", "Fast and reliable search"], jp: ["すべての年齢層にアクセスしやすいUI", "高速で信頼性の高い検索"], ua: ["Доступний UI для всіх віків", "Швидкий та надійний пошук"] }
      }
    },
    wireframes: {
      label: { en: "WIREFRAMES", jp: "ワイヤーフレーム", ua: "ВАЙРФРЕЙМИ" },
      title: { en: "Low-Mid Fidelity Wireframes", jp: "Lo-Fiワイヤーフレーム", ua: "Lo-Fi Вайрфрейми" },
      description: {
        en: "I started with low-fidelity wireframes to explore different layouts and navigation options, focusing on the onboarding flow and core search functionality.",
        jp: "オンボーディングフローとコア検索機能に焦点を当て、さまざまなレイアウトとナビゲーションオプションを探るために、低忠実度のワイヤーフレームから始めました。",
        ua: "Я почав з low-fidelity вайрфреймів, щоб дослідити різні макети та навігацію, зосередившись на онбордингу та основному пошуку."
      },
      images: ["/vegwam-wireframe-1.png", "/vegwam-wireframe-2.png"]
    },
    branding: {
      label: { en: "BRANDING", jp: "ブランディング", ua: "БРЕНДИНГ" },
      title: { en: "Brand Identity", jp: "ブランドアイデンティティ", ua: "Бренд-айдентика" },
      description: {
        en: "The VegWam brand combines 'Wigwam' (a symbol of community shelter) with plant imagery to represent a welcoming space for the vegan community.",
        jp: "VegWamブランドは「Wigwam」（コミュニティの避難所のシンボル）と植物のイメージを組み合わせ、ヴィーガンコミュニティのための歓迎的な空間を表現しています。",
        ua: "Бренд VegWam поєднує 'Wigwam' (символ спільноти) з рослинними образами, представляючи гостинний простір для веганської спільноти."
      },
      colors: [
        { hex: "#145850", name: "VegWam Green" },
        { hex: "#F1683C", name: "VegWam Orange" },
        { hex: "#E6EDDD", name: "Cream White" }
      ],
      typography: "Rounded Mplus"
    },
    highFidelity: {
      label: { en: "HIGH FIDELITY", jp: "ハイファイ", ua: "ВИСОКОТОЧНІ" },
      title: { en: "High Fidelity Designs", jp: "高忠実度デザイン", ua: "Високоточні Дизайни" },
      description: {
        en: "The final designs incorporate the brand colors and rounded, friendly typography to create a warm and approachable interface.",
        jp: "最終デザインは、ブランドカラーと丸みを帯びたフレンドリーなタイポグラフィを取り入れ、温かくアプローチしやすいインターフェースを作成しています。",
        ua: "Фінальні дизайни включають брендові кольори та округлену типографіку для створення теплого інтерфейсу."
      },
      images: ["/vegwam-hifi-1.png", "/vegwam-hifi-2.png", "/vegwam-hifi-3.png"]
    },
    testing: {
      label: { en: "USABILITY TESTING", jp: "ユーザビリティテスト", ua: "ТЕСТУВАННЯ" },
      title: { en: "Usability Testing", jp: "ユーザビリティテスト", ua: "Тестування Юзабіліті" },
      description: {
        en: "Conducted usability testing with 5 users to validate the design decisions and identify areas for improvement.",
        jp: "デザインの決定を検証し、改善点を特定するために、5人のユーザーでユーザビリティテストを実施しました。",
        ua: "Провели тестування юзабіліті з 5 користувачами для валідації дизайн-рішень."
      },
      metrics: {
        en: ["Task Completion Rate: 95%", "Average Time on Task: 2.5 min", "User Satisfaction: 4.5/5"],
        jp: ["タスク完了率: 95%", "平均タスク時間: 2.5分", "ユーザー満足度: 4.5/5"],
        ua: ["Коефіцієнт завершення завдань: 95%", "Середній час на завдання: 2.5 хв", "Задоволеність користувачів: 4.5/5"]
      }
    },
    results: {
      label: { en: "RESULTS", jp: "結果", ua: "РЕЗУЛЬТАТИ" },
      title: { en: "Results & Impact", jp: "結果とインパクト", ua: "Результати та Вплив" },
      metrics: [
        { value: "95%", label: { en: "Task Completion", jp: "タスク完了率", ua: "Завершення Завдань" } },
        { value: "4.5/5", label: { en: "User Satisfaction", jp: "ユーザー満足度", ua: "Задоволеність" } }
      ],
      feedback: {
        en: [
          "\"The app makes finding vegan restaurants so much easier!\"",
          "\"I love that I can trust the information is verified.\""
        ],
        jp: [
          "「このアプリでヴィーガンレストランを見つけるのがとても簡単になりました！」",
          "「情報が認証されていると信頼できるのが嬉しいです。」"
        ],
        ua: [
          "\"Додаток робить пошук веганських ресторанів набагато простішим!\"",
          "\"Мені подобається, що я можу довіряти перевіреній інформації.\""
        ]
      }
    },
    closing: {
      label: { en: "CLOSING", jp: "まとめ", ua: "ПІДСУМОК" },
      title: { en: "Reflection & Next Steps", jp: "振り返りと次のステップ", ua: "Рефлексія та Наступні Кроки" },
      learnings: {
        en: ["Importance of designing for both primary users and their supporters", "Value of verified information in building trust", "Need for accessible design for diverse user groups"],
        jp: ["主要ユーザーとそのサポーターの両方のためのデザインの重要性", "信頼構築における認証情報の価値", "多様なユーザーグループのためのアクセシブルデザインの必要性"],
        ua: ["Важливість дизайну для основних користувачів та їхніх саппортерів", "Цінність перевіреної інформації для побудови довіри", "Потреба в доступному дизайні для різних груп"]
      },
      nextSteps: {
        en: ["Conduct more usability testing with real vegans", "Add English support for inbound tourists", "Implement WCAG 2.1 accessibility standards"],
        jp: ["実際のヴィーガンとのユーザビリティテストをさらに実施", "インバウンド観光客向けの英語サポートを追加", "WCAG 2.1アクセシビリティ基準を実装"],
        ua: ["Провести більше тестування з реальними веганами", "Додати підтримку англійської для туристів", "Впровадити стандарти доступності WCAG 2.1"]
      }
    },
    figmaUrl: "https://www.figma.com/proto/EZdHxq5rKrYkzWlTOWp70g/VegWam?page-id=164%3A15&node-id=164-990&p=f&viewport=1564%2C770%2C0.19&t=rGunCvN7EX5X2loa-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=164%3A84"
  },
  navitime: {
    hero: {
      tag: { en: "CASE STUDY", jp: "ケーススタディ", ua: "КЕЙС" },
      title: { en: "Bicycle NAVITIME", jp: "自転車NAVITIME", ua: "Bicycle NAVITIME" },
      subtitle: { en: "Redesigning navigation for safety and clarity.", jp: "安全性と明瞭さを追求したナビゲーションの再設計。", ua: "Редизайн навігації для безпеки та чіткості." },
      role: { en: "UI/UX Designer", jp: "UI/UXデザイナー", ua: "UI/UX Дизайнер" },
      duration: { en: "2 Weeks", jp: "2週間", ua: "2 Тижні" },
      tools: ["Figma", "Illustrator"],
      heroImage: "/navitime-hero.png"
    },
    overview: {
      label: { en: "PROJECT OVERVIEW", jp: "プロジェクト概要", ua: "ОГЛЯД ПРОЄКТУ" },
      title: { en: "Overview", jp: "概要", ua: "Огляд" },
      content: {
        en: "A comprehensive redesign of Japan's popular cycling navigation app to improve safety and usability while riding. The focus was on creating a 'Safety UI' that cyclists can use at a glance without compromising their attention on the road.",
        jp: "走行中の安全性と使いやすさを向上させるための、日本の人気サイクリングナビアプリの包括的なリデザイン。道路への注意を損なうことなく、サイクリストが一目で使える「セーフティUI」の作成に焦点を当てました。",
        ua: "Комплексний редизайн популярного японського велонавігаційного додатку для покращення безпеки та зручності під час їзди."
      }
    },
    challenge: {
      label: { en: "THE CHALLENGE", jp: "課題", ua: "ВИКЛИК" },
      title: { en: "The Challenge", jp: "解決すべき課題", ua: "Виклик" },
      content: {
        en: "The existing app had low contrast, small touch targets, and cluttered information display that made it dangerous to use while cycling. Users reported difficulty reading the screen in bright sunlight and accidentally tapping wrong buttons.",
        jp: "既存のアプリはコントラストが低く、タッチターゲットが小さく、情報表示が煩雑で、サイクリング中の使用が危険でした。ユーザーは明るい日差しの中で画面が読みにくく、誤ってボタンをタップしてしまうと報告していました。",
        ua: "Існуючий додаток мав низький контраст, малі цілі для натискання та захаращене відображення інформації, що робило його небезпечним для використання під час їзди."
      },
      points: {
        en: ["Low contrast makes screen hard to read in sunlight", "Small touch targets lead to accidental taps", "Too much information displayed at once", "Critical navigation info not prioritized"],
        jp: ["低コントラストで日光下での画面が読みにくい", "小さなタッチターゲットで誤タップが発生", "一度に表示される情報が多すぎる", "重要なナビ情報が優先されていない"],
        ua: ["Низький контраст ускладнює читання на сонці", "Малі цілі для натискання призводять до випадкових натискань", "Занадто багато інформації одночасно", "Критична навігаційна інформація не пріоритезована"]
      }
    },
    objective: {
      label: { en: "OBJECTIVE", jp: "目標", ua: "МЕТА" },
      title: { en: "Objective & Goals", jp: "目標とゴール", ua: "Цілі" },
      content: {
        en: "Create a safer, more intuitive cycling navigation experience that prioritizes essential information and can be used safely while riding.",
        jp: "必要な情報を優先し、走行中も安全に使用できる、より安全で直感的なサイクリングナビゲーション体験を作成する。",
        ua: "Створити безпечніший, більш інтуїтивний досвід велонавігації, що пріоритезує важливу інформацію."
      },
      goals: {
        en: ["Improve readability by 40%", "Enlarge touch targets for safer interaction", "Simplify information hierarchy", "Add high-contrast mode for outdoor use"],
        jp: ["視認性を40%向上", "より安全なインタラクションのためにタッチターゲットを拡大", "情報階層を簡素化", "屋外使用のための高コントラストモードを追加"],
        ua: ["Покращити читабельність на 40%", "Збільшити цілі для натискання", "Спростити ієрархію інформації", "Додати висококонтрастний режим"]
      }
    },
    designProcess: {
      label: { en: "MY DESIGN PROCESS", jp: "デザインプロセス", ua: "МІЙ ДИЗАЙН-ПРОЦЕС" },
      title: { en: "Design Process", jp: "デザインプロセス", ua: "Дизайн-процес" },
      steps: [
        { name: { en: "Empathize", jp: "共感", ua: "Емпатія" }, icon: "heart" },
        { name: { en: "Define", jp: "定義", ua: "Визначення" }, icon: "target" },
        { name: { en: "Ideate", jp: "発想", ua: "Ідеація" }, icon: "lightbulb" },
        { name: { en: "Prototype", jp: "プロトタイプ", ua: "Прототип" }, icon: "layers" },
        { name: { en: "Test", jp: "テスト", ua: "Тест" }, icon: "test" }
      ]
    },
    research: {
      label: { en: "RESEARCH", jp: "リサーチ", ua: "ДОСЛІДЖЕННЯ" },
      title: { en: "Heuristic Analysis", jp: "ヒューリスティック分析", ua: "Евристичний Аналіз" },
      methods: {
        en: ["Heuristic evaluation of current app", "Competitive analysis of cycling apps", "User interviews with cyclists"],
        jp: ["現在のアプリのヒューリスティック評価", "サイクリングアプリの競合分析", "サイクリストへのユーザーインタビュー"],
        ua: ["Евристична оцінка поточного додатку", "Конкурентний аналіз велододатків", "Інтерв'ю з велосипедистами"]
      },
      findings: {
        en: ["Contrast ratio was only 2.5:1 (needs 4.5:1)", "Touch targets were 32px (needs 44px minimum)", "Users take eyes off road for 3+ seconds", "70% of users reported accidental taps"],
        jp: ["コントラスト比は2.5:1のみ（4.5:1が必要）", "タッチターゲットは32px（最低44pxが必要）", "ユーザーは3秒以上道路から目を離す", "70%のユーザーが誤タップを報告"],
        ua: ["Контрастність була лише 2.5:1 (потрібно 4.5:1)", "Цілі для натискання були 32px (потрібно мінімум 44px)", "Користувачі відводять очі від дороги на 3+ секунди", "70% користувачів повідомили про випадкові натискання"]
      }
    },
    personas: {
      label: { en: "USER PERSONAS", jp: "ペルソナ", ua: "ПЕРСОНИ" },
      title: { en: "User Personas", jp: "ユーザーペルソナ", ua: "Персони Користувачів" },
      users: [
        {
          name: { en: "Takeshi Yamada", jp: "山田 武", ua: "Такеші Ямада" },
          age: "28",
          role: { en: "Daily Commuter", jp: "毎日の通勤者", ua: "Щоденний Комутер" },
          quote: { en: "I need to see my route at a glance without stopping.", jp: "止まらずにルートを一目で見たい。", ua: "Мені потрібно бачити маршрут з першого погляду без зупинки." },
          goals: { en: ["Safe navigation while riding", "Quick route changes"], jp: ["走行中の安全なナビゲーション", "素早いルート変更"], ua: ["Безпечна навігація під час їзди", "Швидка зміна маршруту"] },
          frustrations: { en: ["Can't read screen in sunlight", "Buttons too small"], jp: ["日光下で画面が読めない", "ボタンが小さすぎる"], ua: ["Не можу читати екран на сонці", "Кнопки занадто малі"] }
        },
        {
          name: { en: "Mika Tanaka", jp: "田中 美香", ua: "Міка Танака" },
          age: "35",
          role: { en: "Weekend Cyclist", jp: "週末サイクリスト", ua: "Велосипедист Вихідного Дня" },
          quote: { en: "I want to explore new routes safely.", jp: "新しいルートを安全に探索したい。", ua: "Хочу безпечно досліджувати нові маршрути." },
          goals: { en: ["Discover scenic routes", "Track cycling stats"], jp: ["景色の良いルートを発見", "サイクリング統計を追跡"], ua: ["Відкривати мальовничі маршрути", "Відстежувати статистику"] },
          frustrations: { en: ["Too much info on screen", "Hard to find key info"], jp: ["画面上の情報が多すぎる", "重要な情報が見つけにくい"], ua: ["Занадто багато інформації на екрані", "Важко знайти ключову інформацію"] }
        }
      ]
    },
    pov: {
      label: { en: "POINT OF VIEW", jp: "視点", ua: "ТОЧКА ЗОРУ" },
      title: { en: "POV Statements", jp: "POVステートメント", ua: "POV Твердження" },
      statements: {
        en: [
          "Daily commuters need a glanceable navigation interface because taking eyes off the road is dangerous.",
          "Weekend cyclists need simplified information display because cognitive overload while riding leads to accidents."
        ],
        jp: [
          "毎日の通勤者は、道路から目を離すことが危険なため、一目で見れるナビゲーションインターフェースが必要です。",
          "週末のサイクリストは、走行中の認知過負荷が事故につながるため、簡素化された情報表示が必要です。"
        ],
        ua: [
          "Щоденним комутерам потрібен інтерфейс навігації, який можна побачити з першого погляду, бо відводити очі від дороги небезпечно.",
          "Велосипедистам вихідного дня потрібне спрощене відображення інформації, бо когнітивне перевантаження під час їзди призводить до аварій."
        ]
      }
    },
    hmw: {
      label: { en: "HOW MIGHT WE", jp: "HMW", ua: "ЯК МИ МОЖЕМО" },
      title: { en: "How Might We", jp: "How Might We", ua: "Як Ми Можемо" },
      questions: {
        en: [
          "How might we make navigation information visible at a glance?",
          "How might we reduce the time cyclists take their eyes off the road?",
          "How might we prevent accidental taps while riding?"
        ],
        jp: [
          "ナビゲーション情報を一目で見えるようにするには？",
          "サイクリストが道路から目を離す時間をどのように短縮できるか？",
          "走行中の誤タップをどのように防げるか？"
        ],
        ua: [
          "Як ми можемо зробити навігаційну інформацію видимою з першого погляду?",
          "Як ми можемо скоротити час, коли велосипедисти відводять очі від дороги?",
          "Як ми можемо запобігти випадковим натисканням під час їзди?"
        ]
      }
    },
    projectGoals: {
      label: { en: "PROJECT GOALS", jp: "プロジェクトゴール", ua: "ЦІЛІ ПРОЄКТУ" },
      title: { en: "Project Goals", jp: "プロジェクトゴール", ua: "Цілі Проєкту" },
      business: {
        title: { en: "Business Goals", jp: "ビジネス目標", ua: "Бізнес-цілі" },
        items: { en: ["Increase user retention", "Reduce negative reviews about safety"], jp: ["ユーザーリテンションの向上", "安全性に関する否定的なレビューの削減"], ua: ["Збільшити утримання користувачів", "Зменшити негативні відгуки про безпеку"] }
      },
      user: {
        title: { en: "User Goals", jp: "ユーザー目標", ua: "Цілі Користувачів" },
        items: { en: ["Navigate safely while riding", "Access info without stopping"], jp: ["走行中の安全なナビゲーション", "止まらずに情報にアクセス"], ua: ["Безпечно навігувати під час їзди", "Отримувати інформацію без зупинки"] }
      },
      technical: {
        title: { en: "Technical Goals", jp: "技術目標", ua: "Технічні Цілі" },
        items: { en: ["Meet WCAG 2.1 contrast standards", "44px minimum touch targets"], jp: ["WCAG 2.1コントラスト基準を満たす", "最低44pxのタッチターゲット"], ua: ["Відповідати стандартам контрасту WCAG 2.1", "Мінімум 44px цілі для натискання"] }
      }
    },
    wireframes: {
      label: { en: "WIREFRAMES", jp: "ワイヤーフレーム", ua: "ВАЙРФРЕЙМИ" },
      title: { en: "Wireframes", jp: "ワイヤーフレーム", ua: "Вайрфрейми" },
      description: {
        en: "Explored various layouts to prioritize the most critical navigation information and enlarge interactive elements.",
        jp: "最も重要なナビゲーション情報を優先し、インタラクティブ要素を拡大するために、さまざまなレイアウトを探りました。",
        ua: "Досліджували різні макети для пріоритезації найважливішої навігаційної інформації та збільшення інтерактивних елементів."
      },
      images: ["/navitime-wireframe-1.png", "/navitime-wireframe-2.png"]
    },
    branding: {
      label: { en: "VISUAL DESIGN", jp: "ビジュアルデザイン", ua: "ВІЗУАЛЬНИЙ ДИЗАЙН" },
      title: { en: "Visual Design System", jp: "ビジュアルデザインシステム", ua: "Візуальна Дизайн-система" },
      description: {
        en: "Created a high-contrast design system optimized for outdoor visibility with clear visual hierarchy.",
        jp: "明確な視覚的階層を持つ、屋外での視認性に最適化された高コントラストデザインシステムを作成しました。",
        ua: "Створили висококонтрастну дизайн-систему, оптимізовану для видимості на вулиці."
      },
      colors: [
        { hex: "#007AFF", name: "Navi Blue" },
        { hex: "#E0F7FA", name: "Ice Blue" },
        { hex: "#FFFFFF", name: "White" }
      ],
      typography: "Roboto / Noto Sans JP"
    },
    highFidelity: {
      label: { en: "HIGH FIDELITY", jp: "ハイファイ", ua: "ВИСОКОТОЧНІ" },
      title: { en: "High Fidelity Designs", jp: "高忠実度デザイン", ua: "Високоточні Дизайни" },
      description: {
        en: "The final Safety UI features enlarged touch targets, high-contrast colors, and simplified information display.",
        jp: "最終的なセーフティUIは、拡大されたタッチターゲット、高コントラストの色、簡素化された情報表示を特徴としています。",
        ua: "Фінальний Safety UI має збільшені цілі для натискання, високий контраст та спрощене відображення інформації."
      },
      images: ["/navitime-hifi-1.png", "/navitime-hifi-2.png", "/navitime-hifi-3.png"]
    },
    testing: {
      label: { en: "USABILITY TESTING", jp: "ユーザビリティテスト", ua: "ТЕСТУВАННЯ" },
      title: { en: "Usability Testing", jp: "ユーザビリティテスト", ua: "Тестування Юзабіліті" },
      description: {
        en: "Tested with cyclists in real outdoor conditions to validate the improved readability and touch target sizes.",
        jp: "改善された視認性とタッチターゲットサイズを検証するために、実際の屋外条件でサイクリストとテストしました。",
        ua: "Тестували з велосипедистами в реальних умовах на вулиці для валідації покращеної читабельності."
      },
      metrics: {
        en: ["Readability improved by 40%", "Accidental taps reduced by 80%", "Eyes-off-road time reduced to 1.5 seconds"],
        jp: ["視認性が40%向上", "誤タップが80%削減", "道路から目を離す時間が1.5秒に短縮"],
        ua: ["Читабельність покращена на 40%", "Випадкові натискання зменшені на 80%", "Час відведення очей від дороги скорочено до 1.5 секунди"]
      }
    },
    results: {
      label: { en: "RESULTS", jp: "結果", ua: "РЕЗУЛЬТАТИ" },
      title: { en: "Results & Impact", jp: "結果とインパクト", ua: "Результати та Вплив" },
      metrics: [
        { value: "40%", label: { en: "Readability Improvement", jp: "視認性向上", ua: "Покращення Читабельності" } },
        { value: "80%", label: { en: "Fewer Accidental Taps", jp: "誤タップ削減", ua: "Менше Випадкових Натискань" } }
      ],
      feedback: {
        en: [
          "\"I can finally read the screen without squinting!\"",
          "\"The bigger buttons make such a difference when riding.\""
        ],
        jp: [
          "「やっと目を細めずに画面が読めます！」",
          "「大きなボタンは走行中に大きな違いを生みます。」"
        ],
        ua: [
          "\"Нарешті я можу читати екран не примружуючись!\"",
          "\"Більші кнопки роблять велику різницю під час їзди.\""
        ]
      }
    },
    closing: {
      label: { en: "CLOSING", jp: "まとめ", ua: "ПІДСУМОК" },
      title: { en: "Reflection & Next Steps", jp: "振り返りと次のステップ", ua: "Рефлексія та Наступні Кроки" },
      learnings: {
        en: ["Safety should always be the primary concern in mobility apps", "Testing in real conditions is crucial", "High contrast benefits all users, not just those with visual impairments"],
        jp: ["モビリティアプリでは安全性が常に最優先事項であるべき", "実際の条件でのテストが重要", "高コントラストは視覚障害のある人だけでなく、すべてのユーザーに有益"],
        ua: ["Безпека завжди має бути головним пріоритетом у мобільних додатках", "Тестування в реальних умовах є критичним", "Високий контраст корисний для всіх користувачів"]
      },
      nextSteps: {
        en: ["Add voice navigation for hands-free use", "Implement night mode with reduced brightness", "Add haptic feedback for turn notifications"],
        jp: ["ハンズフリー使用のための音声ナビゲーションを追加", "明るさを抑えたナイトモードを実装", "ターン通知のための触覚フィードバックを追加"],
        ua: ["Додати голосову навігацію для використання без рук", "Впровадити нічний режим зі зниженою яскравістю", "Додати тактильний зворотний зв'язок для повідомлень про повороти"]
      }
    },
    figmaUrl: "https://www.figma.com/proto/hzx81CrdGeHadYO9whxsqw/%E8%87%AA%E8%BB%A2%E8%BB%8ANAVIGATION-FINAL?page-id=0%3A1&node-id=3-31&p=f&viewport=401%2C481%2C0.22&t=NsaxSieERH8gXG8d-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=3%3A31"
  }
};

const ProjectPage: React.FC<ProjectPageProps> = ({ lang }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = PROJECT_DETAILS[projectId as keyof typeof PROJECT_DETAILS];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl italic text-[#2D2D2D] mb-4">Project not found</h1>
          <Link to="/" className="text-[#FF6B35] hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const projectIds = Object.keys(PROJECT_DETAILS);
  const currentIndex = projectIds.indexOf(projectId || '');
  const nextProjectId = projectIds[(currentIndex + 1) % projectIds.length];
  const prevProjectId = projectIds[(currentIndex - 1 + projectIds.length) % projectIds.length];

  // Tag colors for mymind aesthetic
  const tagColors = [
    'border-pink-300 text-pink-600 bg-pink-50',
    'border-amber-300 text-amber-600 bg-amber-50',
    'border-emerald-300 text-emerald-600 bg-emerald-50',
    'border-sky-300 text-sky-600 bg-sky-50',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Fixed Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">{lang === 'jp' ? '戻る' : lang === 'ua' ? 'Назад' : 'Back'}</span>
      </button>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFF5F0] to-[#FFE8DC]"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#FFE8DC] rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#FF6B35] text-[#FF6B35] text-sm font-semibold mb-6">
                {project.hero.tag[lang]}
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl italic text-[#2D2D2D] mb-6">
                {project.hero.title[lang]}
              </h1>
              <p className="text-xl md:text-2xl text-[#6B6B6B] mb-8 leading-relaxed">
                {project.hero.subtitle[lang]}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-[#6B6B6B]">
                <div>
                  <p className="font-semibold text-[#2D2D2D] mb-1">{lang === 'jp' ? '役割' : lang === 'ua' ? 'Роль' : 'Role'}</p>
                  <p>{project.hero.role[lang]}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2D2D2D] mb-1">{lang === 'jp' ? '期間' : lang === 'ua' ? 'Тривалість' : 'Duration'}</p>
                  <p>{project.hero.duration[lang]}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2D2D2D] mb-1">{lang === 'jp' ? 'ツール' : lang === 'ua' ? 'Інструменти' : 'Tools'}</p>
                  <p>{project.hero.tools.join(', ')}</p>
                </div>
              </div>

              {/* Prototype Button */}
              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 bg-[#FF6B35] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e55a2a] transition-colors shadow-lg shadow-[#FF6B35]/20"
                >
                  <span>{lang === 'jp' ? 'プロトタイプを見る' : lang === 'ua' ? 'Переглянути Прототип' : 'View Prototype'}</span>
                  <ExternalLink size={18} />
                </a>
              )}
            </div>

            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#FFF5F0] to-[#FFE8DC] rounded-2xl flex items-center justify-center">
                  <img
                    src={project.hero.heroImage}
                    alt={project.hero.title[lang]}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
            {project.overview.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4 mb-8">
            {project.overview.title[lang]}
          </h2>
          <p className="text-lg text-[#6B6B6B] leading-relaxed">
            {project.overview.content[lang]}
          </p>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-6">
            {project.challenge.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mb-8">
            {project.challenge.title[lang]}
          </h2>
          <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8">
            {project.challenge.content[lang]}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {project.challenge.points[lang].map((point, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-pink-600 text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-[#2D2D2D]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-sm font-semibold mb-6">
            {project.objective.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mb-8">
            {project.objective.title[lang]}
          </h2>
          <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8">
            {project.objective.content[lang]}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.objective.goals[lang].map((goal, index) => (
              <span key={index} className={`px-4 py-2 rounded-full border text-sm font-medium ${tagColors[index % tagColors.length]}`}>
                {goal}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
              {project.designProcess.label[lang]}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4">
              {project.designProcess.title[lang]}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {project.designProcess.steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-[#FF6B35] flex items-center justify-center mb-3 shadow-lg">
                    {step.icon === 'heart' && <Users size={24} className="text-[#FF6B35]" />}
                    {step.icon === 'target' && <Target size={24} className="text-[#FF6B35]" />}
                    {step.icon === 'lightbulb' && <Lightbulb size={24} className="text-[#FF6B35]" />}
                    {step.icon === 'layers' && <Layers size={24} className="text-[#FF6B35]" />}
                    {step.icon === 'test' && <TestTube size={24} className="text-[#FF6B35]" />}
                  </div>
                  <p className="text-sm font-semibold text-[#2D2D2D]">{step.name[lang]}</p>
                </div>
                {index < project.designProcess.steps.length - 1 && (
                  <div className="hidden md:flex items-center">
                    <ArrowRight size={20} className="text-[#FF6B35]/50" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 text-sm font-semibold mb-6">
            {project.research.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mb-8">
            {project.research.title[lang]}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Methods */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl">
              <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
                <Search size={20} className="text-[#FF6B35]" />
                {lang === 'jp' ? '調査方法' : lang === 'ua' ? 'Методи' : 'Methods'}
              </h3>
              <ul className="space-y-3">
                {project.research.methods[lang].map((method, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#6B6B6B]">
                    <CheckCircle size={16} className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Findings */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl">
              <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
                <Lightbulb size={20} className="text-[#FF6B35]" />
                {lang === 'jp' ? '発見' : lang === 'ua' ? 'Знахідки' : 'Key Findings'}
              </h3>
              <ul className="space-y-3">
                {project.research.findings[lang].map((finding, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#6B6B6B]">
                    <CheckCircle size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
              {project.personas.label[lang]}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D]">
              {project.personas.title[lang]}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {project.personas.users.map((user, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFE8DC] flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{user.name[lang].charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#2D2D2D]">{user.name[lang]}</h3>
                    <p className="text-[#6B6B6B]">{user.age} · {user.role[lang]}</p>
                  </div>
                </div>

                <div className="bg-[#FFF5F0] p-4 rounded-xl mb-6 relative">
                  <Quote size={20} className="absolute -top-2 -left-2 text-[#FF6B35]/30" />
                  <p className="italic text-[#2D2D2D]">"{user.quote[lang]}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-600 mb-2">{lang === 'jp' ? '目標' : lang === 'ua' ? 'Цілі' : 'Goals'}</h4>
                    <ul className="space-y-1">
                      {user.goals[lang].map((goal, i) => (
                        <li key={i} className="text-sm text-[#6B6B6B]">• {goal}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-pink-600 mb-2">{lang === 'jp' ? '課題' : lang === 'ua' ? 'Проблеми' : 'Frustrations'}</h4>
                    <ul className="space-y-1">
                      {user.frustrations[lang].map((frustration, i) => (
                        <li key={i} className="text-sm text-[#6B6B6B]">• {frustration}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POV Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-6">
            {project.pov.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mb-8">
            {project.pov.title[lang]}
          </h2>
          <div className="space-y-6">
            {project.pov.statements[lang].map((statement, index) => (
              <div key={index} className="bg-gradient-to-r from-[#FAF8F5] to-[#FFF5F0] p-6 rounded-2xl border-l-4 border-[#FF6B35]">
                <p className="text-lg text-[#2D2D2D] leading-relaxed">{statement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HMW Section */}
      <section className="py-20 px-6 bg-[#2D2D2D]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35] text-white text-sm font-semibold mb-6">
            {project.hmw.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-white mb-12">
            {project.hmw.title[lang]}
          </h2>
          <div className="space-y-6">
            {project.hmw.questions[lang].map((question, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <p className="text-xl text-white leading-relaxed">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Goals Section */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
              {project.projectGoals.label[lang]}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4">
              {project.projectGoals.title[lang]}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Business Goals */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-emerald-700 mb-4">{project.projectGoals.business.title[lang]}</h3>
              <ul className="space-y-2">
                {project.projectGoals.business.items[lang].map((item, index) => (
                  <li key={index} className="text-sm text-emerald-800">• {item}</li>
                ))}
              </ul>
            </div>

            {/* User Goals */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-amber-700 mb-4">{project.projectGoals.user.title[lang]}</h3>
              <ul className="space-y-2">
                {project.projectGoals.user.items[lang].map((item, index) => (
                  <li key={index} className="text-sm text-amber-800">• {item}</li>
                ))}
              </ul>
            </div>

            {/* Technical Goals */}
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-sky-700 mb-4">{project.projectGoals.technical.title[lang]}</h3>
              <ul className="space-y-2">
                {project.projectGoals.technical.items[lang].map((item, index) => (
                  <li key={index} className="text-sm text-sky-800">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wireframes Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
            {project.wireframes.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4 mb-6">
            {project.wireframes.title[lang]}
          </h2>
          <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8">
            {project.wireframes.description[lang]}
          </p>
          <div className="bg-[#FAF8F5] p-8 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-6">
              {project.wireframes.images.map((image, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Wireframe ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-gray-400">Wireframe Preview</span>';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
            {project.branding.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4 mb-6">
            {project.branding.title[lang]}
          </h2>
          <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8">
            {project.branding.description[lang]}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Colors */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
                <PenTool size={20} className="text-[#FF6B35]" />
                {lang === 'jp' ? 'カラーパレット' : lang === 'ua' ? 'Палітра Кольорів' : 'Color Palette'}
              </h3>
              <div className="flex gap-4">
                {project.branding.colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-16 h-16 rounded-xl shadow-md mb-2"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <p className="text-xs text-[#6B6B6B]">{color.name}</p>
                    <p className="text-xs font-mono text-[#2D2D2D]">{color.hex}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
                <PenTool size={20} className="text-[#FF6B35]" />
                {lang === 'jp' ? 'タイポグラフィ' : lang === 'ua' ? 'Типографіка' : 'Typography'}
              </h3>
              <p className="text-2xl font-semibold text-[#2D2D2D]">{project.branding.typography}</p>
            </div>
          </div>
        </div>
      </section>

      {/* High Fidelity Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
              {project.highFidelity.label[lang]}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4 mb-6">
              {project.highFidelity.title[lang]}
            </h2>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              {project.highFidelity.description[lang]}
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#FAF8F5] to-[#FFF5F0] p-8 rounded-3xl">
            <div className="grid md:grid-cols-3 gap-6">
              {project.highFidelity.images.map((image, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="aspect-[9/16] bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={image}
                      alt={`High Fidelity ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-gray-400">Screen Preview</span>';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prototype Button */}
          {project.figmaUrl && (
            <div className="text-center mt-8">
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2D2D2D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1a1a1a] transition-colors shadow-lg"
              >
                <span>{lang === 'jp' ? 'インタラクティブプロトタイプ' : lang === 'ua' ? 'Інтерактивний Прототип' : 'Interactive Prototype'}</span>
                <ExternalLink size={18} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Usability Testing Section */}
      <section className="py-20 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-sm font-semibold mb-6">
            {project.testing.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mb-6">
            {project.testing.title[lang]}
          </h2>
          <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8">
            {project.testing.description[lang]}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {project.testing.metrics[lang].map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl text-center shadow-sm">
                <CheckCircle size={24} className="text-emerald-500 mx-auto mb-3" />
                <p className="text-[#2D2D2D]">{metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FF6B35] text-sm font-semibold uppercase tracking-widest">
              {project.results.label[lang]}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2D2D2D] mt-4">
              {project.results.title[lang]}
            </h2>
          </div>

          {/* Metrics */}
          <div className="flex justify-center gap-12 mb-12">
            {project.results.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFE8DC] flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-white">{metric.value}</span>
                </div>
                <p className="text-[#6B6B6B]">{metric.label[lang]}</p>
              </div>
            ))}
          </div>

          {/* User Feedback */}
          <div className="grid md:grid-cols-2 gap-6">
            {project.results.feedback[lang].map((feedback, index) => (
              <div key={index} className="bg-[#FAF8F5] p-6 rounded-2xl relative">
                <Quote size={32} className="absolute -top-2 -left-2 text-[#FF6B35]/20" />
                <p className="italic text-lg text-[#2D2D2D] pl-4">{feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6B35] text-white text-sm font-semibold mb-6">
            {project.closing.label[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic text-white mb-12">
            {project.closing.title[lang]}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Learnings */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-semibold text-[#FF6B35] mb-4">
                {lang === 'jp' ? '学び' : lang === 'ua' ? 'Навчання' : 'Key Learnings'}
              </h3>
              <ul className="space-y-3">
                {project.closing.learnings[lang].map((learning, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <CheckCircle size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-semibold text-[#FF6B35] mb-4">
                {lang === 'jp' ? '次のステップ' : lang === 'ua' ? 'Наступні Кроки' : 'Next Steps'}
              </h3>
              <ul className="space-y-3">
                {project.closing.nextSteps[lang].map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80">
                    <ArrowRight size={16} className="text-[#FF6B35] mt-1 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to other projects */}
      <section className="py-12 px-6 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            to={`/project/${prevProjectId}`}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FF6B35] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{lang === 'jp' ? '前のプロジェクト' : lang === 'ua' ? 'Попередній' : 'Previous'}</span>
          </Link>
          <Link
            to="/"
            className="text-[#FF6B35] font-semibold hover:underline"
          >
            {lang === 'jp' ? 'すべてのプロジェクト' : lang === 'ua' ? 'Всі Проєкти' : 'All Projects'}
          </Link>
          <Link
            to={`/project/${nextProjectId}`}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FF6B35] transition-colors"
          >
            <span>{lang === 'jp' ? '次のプロジェクト' : lang === 'ua' ? 'Наступний' : 'Next'}</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#2D2D2D] text-center">
        <p className="text-white/60 text-sm">
          © 2024 Anastasiia Hrytsai. {lang === 'jp' ? 'All rights reserved.' : lang === 'ua' ? 'Усі права захищені.' : 'All rights reserved.'}
        </p>
      </footer>
    </div>
  );
};

export default ProjectPage;
