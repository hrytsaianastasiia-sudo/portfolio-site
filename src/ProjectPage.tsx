import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  Quote,
  Play,
  ExternalLink
} from 'lucide-react';

// Types
type Language = 'en' | 'jp' | 'ua';

interface ProjectPageProps {
  lang: Language;
}

// Section Label Component - mymind style
const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-[#FF6B35] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
      {children}
    </p>
  );
};

// Section Title - mymind serif style
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-[#2D2D2D] mb-6">
    {children}
  </h2>
);

// Process Step Component
const ProcessStep = ({ number, title, isActive }: { number: number; title: string; isActive?: boolean }) => (
  <div className={`flex flex-col items-center gap-3 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
      isActive ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-500'
    }`}>
      {number}
    </div>
    <span className="text-sm font-medium text-center">{title}</span>
  </div>
);

// Card Component - mymind style
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-8 shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

// Quote Card Component
const QuoteCard = ({ quote, author }: { quote: string; author: string }) => (
  <Card className="relative">
    <Quote className="absolute top-6 left-6 w-8 h-8 text-[#FF6B35]/20" />
    <p className="text-lg text-[#2D2D2D] italic leading-relaxed pl-8 mb-4">
      "{quote}"
    </p>
    <p className="text-sm text-[#6B6B6B] pl-8">— {author}</p>
  </Card>
);

// Persona Card Component
const PersonaCard = ({
  name,
  role,
  description,
  goals,
  frustrations,
  image
}: {
  name: string;
  role: string;
  description: string;
  goals: string[];
  frustrations: string[];
  image?: string;
}) => (
  <Card className="overflow-hidden">
    <div className="flex items-start gap-6 mb-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE8DC] to-[#FFF5F0] flex items-center justify-center flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
        ) : (
          <Users className="w-8 h-8 text-[#FF6B35]" />
        )}
      </div>
      <div>
        <h4 className="font-bold text-xl text-[#2D2D2D] mb-1">{name}</h4>
        <p className="text-[#6B6B6B] text-sm">{role}</p>
      </div>
    </div>
    <p className="text-[#6B6B6B] mb-6 leading-relaxed">{description}</p>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-xs font-semibold text-[#5DB13E] uppercase tracking-wider mb-3">Goals</p>
        <ul className="space-y-2">
          {goals.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#2D2D2D]">
              <CheckCircle className="w-4 h-4 text-[#5DB13E] mt-0.5 flex-shrink-0" />
              {goal}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-3">Frustrations</p>
        <ul className="space-y-2">
          {frustrations.map((frustration, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#2D2D2D]">
              <span className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              </span>
              {frustration}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);

// Project Data - This would normally come from a shared data file
const getProjectData = (projectId: string, lang: Language) => {
  const projects: Record<string, any> = {
    vegwam: {
      hero: {
        label: { en: 'CASE STUDY', jp: 'ケーススタディ', ua: 'КЕЙС' },
        title: { en: 'VegWam', jp: 'VegWam', ua: 'VegWam' },
        subtitle: { en: 'Making plant-based life closer to you.', jp: 'プラントベースは、もっと身近になる。', ua: 'Робимо рослинний спосіб життя ближчим.' },
        tags: ['Branding', 'App Design', 'Community'],
        role: { en: 'Product Designer', jp: 'プロダクトデザイナー', ua: 'Продуктовий дизайнер' },
        timeline: { en: '1 Month', jp: '1ヶ月', ua: '1 місяць' },
        tools: ['Figma', 'Illustrator'],
        heroImage: '/vegwam-hero.png',
        figmaUrl: 'https://www.figma.com/proto/EZdHxq5rKrYkzWlTOWp70g/VegWam?page-id=164%3A15&node-id=164-990'
      },
      overview: {
        label: { en: 'PROJECT OVERVIEW', jp: 'プロジェクト概要', ua: 'ОГЛЯД ПРОЄКТУ' },
        title: { en: 'Connecting the vegan community in Japan', jp: '日本のヴィーガンコミュニティをつなぐ', ua: "Об'єднання веганської спільноти в Японії" },
        description: {
          en: 'An integrated lifestyle app for those living a vegan/plant-based life in Japan, connecting restaurants, products, information, and community.',
          jp: '日本でヴィーガン／プラントベースな生活を続けたい人と、その家族や友人のために、飲食店・商品・情報・コミュニティを一体化したライフスタイルアプリです。',
          ua: 'Інтегрований лайфстайл-додаток для тих, хто веде веганський спосіб життя в Японії.'
        }
      },
      challenge: {
        label: { en: 'THE CHALLENGE', jp: '課題', ua: 'ВИКЛИК' },
        title: { en: 'Information is scattered, communities are isolated', jp: '情報は分散し、コミュニティは孤立している', ua: 'Інформація розкидана, спільноти ізольовані' },
        description: {
          en: 'Finding vegan options in Japan is difficult. Information is scattered across SNS, blogs, and personal sites. There was no trusted hub covering dining, products, and community in one place.',
          jp: '日本でヴィーガン対応のお店を見つけるのは困難です。SNSやブログ、個人サイトに情報が分散しています。外食・商品・コミュニティを一箇所でカバーする信頼できるハブがありませんでした。',
          ua: 'Знайти веганські опції в Японії складно. Інформація розкидана по SNS, блогах та особистих сайтах.'
        },
        points: [
          { en: 'Scattered information across multiple platforms', jp: '複数のプラットフォームに分散した情報', ua: 'Розкидана інформація по різних платформах' },
          { en: 'No trusted source for restaurant verification', jp: 'レストラン検証のための信頼できる情報源がない', ua: 'Немає надійного джерела для перевірки ресторанів' },
          { en: 'Isolated vegan community in Japan', jp: '日本で孤立したヴィーガンコミュニティ', ua: 'Ізольована веганська спільнота в Японії' },
          { en: 'Supporters (family/friends) struggle to help', jp: 'サポーター（家族/友人）が助けるのに苦労する', ua: 'Підтримувачі (сім\'я/друзі) мають труднощі з допомогою' }
        ]
      },
      objective: {
        label: { en: 'OBJECTIVE', jp: '目的', ua: "ОБ'ЄКТИВ" },
        title: { en: 'Create a trusted hub for vegan living', jp: 'ヴィーガン生活のための信頼できるハブを作る', ua: 'Створити надійний хаб для веганського життя' },
        goals: [
          { en: 'Centralize vegan-friendly restaurant and product information', jp: 'ヴィーガン対応のレストランと商品情報を集約', ua: 'Централізувати інформацію про веган-дружні ресторани' },
          { en: 'Build a supportive community for vegans and their supporters', jp: 'ヴィーガンとそのサポーターのためのコミュニティを構築', ua: 'Побудувати спільноту підтримки для веганів' },
          { en: 'Provide verified, trustworthy information', jp: '検証済みの信頼できる情報を提供', ua: 'Надати перевірену, надійну інформацію' }
        ]
      },
      process: {
        label: { en: 'MY DESIGN PROCESS', jp: 'デザインプロセス', ua: 'МІЙ ДИЗАЙН-ПРОЦЕС' },
        steps: [
          { en: 'Empathize', jp: '共感', ua: 'Емпатія' },
          { en: 'Define', jp: '定義', ua: 'Визначення' },
          { en: 'Ideate', jp: '発想', ua: 'Ідеація' },
          { en: 'Prototype', jp: 'プロトタイプ', ua: 'Прототип' },
          { en: 'Test', jp: 'テスト', ua: 'Тест' }
        ]
      },
      research: {
        label: { en: 'RESEARCH', jp: 'リサーチ', ua: 'ДОСЛІДЖЕННЯ' },
        title: { en: 'Understanding both vegans and their supporters', jp: 'ヴィーガンとそのサポーター両方を理解する', ua: 'Розуміння як веганів, так і їхніх підтримувачів' },
        methods: [
          { name: { en: 'Desk Research', jp: 'デスクリサーチ', ua: 'Кабінетне дослідження' }, description: { en: 'Investigated Japan\'s vegan market, existing apps, and online communities.', jp: '日本のヴィーガン市場、既存アプリ、オンラインコミュニティを調査。', ua: 'Досліджено веганський ринок Японії, існуючі додатки та онлайн-спільноти.' } },
          { name: { en: 'User Interviews', jp: 'ユーザーインタビュー', ua: 'Інтерв\'ю з користувачами' }, description: { en: '5 interviews (2 vegans, 3 supporters) - 30-45 min each.', jp: '5人のインタビュー（ヴィーガン2名、サポーター3名）- 各30〜45分。', ua: '5 інтерв\'ю (2 вегани, 3 підтримувачі) - по 30-45 хв.' } }
        ],
        keyFindings: [
          { en: 'Phone verification before eating out is stressful', jp: '外食前の電話確認がストレス', ua: 'Телефонна перевірка перед виходом є стресовою' },
          { en: 'Supporters feel pressure not to make mistakes', jp: 'サポーターは間違えないようにプレッシャーを感じる', ua: 'Підтримувачі відчувають тиск не помилитися' },
          { en: 'Beginners don\'t know what to eat', jp: '初心者は何を食べればいいか分からない', ua: 'Новачки не знають, що їсти' }
        ]
      },
      interviews: {
        label: { en: 'USER INTERVIEWS', jp: 'ユーザーインタビュー', ua: "ІНТЕРВ'Ю З КОРИСТУВАЧАМИ" },
        quotes: [
          { quote: { en: 'Calling restaurants to check "Is this really vegan?" every time is the biggest stress.', jp: '「お店に電話して『本当にヴィーガン対応か』を毎回確認するのが、一番ストレスです。」', ua: 'Дзвонити в ресторани для перевірки — найбільший стрес.' }, author: { en: 'Interviewee A, Male 30s', jp: 'インタビュイーA（30代・男性）', ua: 'Респондент А, чоловік 30+' } },
          { quote: { en: 'I want to enjoy meals together, but checking ingredients so I don\'t make a mistake is exhausting.', jp: '「一緒に楽しみたいけど、間違えないように調べるのがすごく大変です。」', ua: 'Хочу їсти разом, але перевірка інгредієнтів виснажує.' }, author: { en: 'Interviewee C, Mother 50s', jp: 'インタビュイーC（50代・女性・母）', ua: 'Респондент С, мати 50+' } }
        ]
      },
      personas: {
        label: { en: 'USER PERSONAS', jp: 'ペルソナ', ua: 'ПЕРСОНИ КОРИСТУВАЧІВ' },
        title: { en: 'Two types: The Vegan and The Supporter', jp: '2タイプ：ヴィーガン本人とサポーター', ua: 'Два типи: Веган та Підтримувач' },
        items: [
          {
            name: { en: 'Ken Sato', jp: '佐藤 健', ua: 'Кен Сато' },
            role: { en: 'Office Worker, 32, Tokyo', jp: '会社員・32歳・都内', ua: 'Офісний працівник, 32, Токіо' },
            description: { en: 'Vegan for 3 years. Wants to be "natural" not "high maintenance". Enjoys cafe hopping on weekends.', jp: 'ヴィーガン歴3年。「意識高い系」ではなく「自然体」でいたい。週末はカフェ巡りを楽しむ。', ua: 'Веган 3 роки. Хоче бути "природним", а не "вибагливим". Любить кафе на вихідних.' },
            goals: [
              { en: 'Eat out easily with friends', jp: '友人と気軽に外食したい', ua: 'Легко їсти з друзями' },
              { en: 'Choose shops intuitively', jp: '直感的に店を選びたい', ua: 'Інтуїтивно обирати місця' }
            ],
            frustrations: [
              { en: 'Phone verification is tedious', jp: '入店前の電話確認が面倒', ua: 'Телефонна перевірка нудна' },
              { en: 'Lack of trusted info in Japanese', jp: '信頼できる日本語情報の不足', ua: 'Брак надійної інформації' }
            ]
          },
          {
            name: { en: 'Yumi Yamamoto', jp: '山本 由美', ua: 'Юмі Ямамото' },
            role: { en: 'Homemaker, 55', jp: '主婦・55歳', ua: 'Домогосподарка, 55' },
            description: { en: 'Non-vegan, but daughter is vegan. Feels pressure not to make mistakes with family meals or gifts.', jp: '自身はノンヴィーガンだが、娘がヴィーガン。家族の食事や贈り物で「間違えたくない」というプレッシャーを感じている。', ua: 'Не веган, але дочка веган. Відчуває тиск не помилитися з їжею.' },
            goals: [
              { en: 'Cook meals everyone can enjoy', jp: 'みんなが楽しめる食事を作りたい', ua: 'Готувати їжу, яку всі можуть їсти' },
              { en: 'Find safe gift options', jp: '安全なギフトを見つけたい', ua: 'Знайти безпечні варіанти подарунків' }
            ],
            frustrations: [
              { en: 'Ingredient checking is hard', jp: '原材料確認が大変', ua: 'Перевірка інгредієнтів складна' },
              { en: 'Fear of making mistakes', jp: '間違えるのが怖い', ua: 'Страх помилитися' }
            ]
          }
        ]
      },
      pov: {
        label: { en: 'POINT OF VIEW', jp: 'POV', ua: 'ТОЧКА ЗОРУ' },
        statements: [
          { en: 'Ken needs a way to quickly find verified vegan restaurants because calling to confirm every time causes stress and makes spontaneous outings difficult.', jp: '健は検証済みのヴィーガンレストランを素早く見つける方法が必要です。毎回電話で確認するのはストレスになり、自発的な外出が難しくなるからです。', ua: 'Кен потребує швидко знаходити перевірені веганські ресторани, бо дзвінки для підтвердження викликають стрес.' },
          { en: 'Yumi needs a reliable way to check product ingredients because she wants to support her daughter\'s lifestyle without fear of mistakes.', jp: '由美は製品の原材料を確認する信頼できる方法が必要です。娘のライフスタイルを間違いを恐れずにサポートしたいからです。', ua: 'Юмі потребує надійний спосіб перевірки інгредієнтів, щоб підтримувати дочку без страху помилок.' }
        ]
      },
      hmw: {
        label: { en: 'HOW MIGHT WE', jp: 'HMW', ua: 'ЯК МИ МОЖЕМО' },
        questions: [
          { en: 'How might we reduce the stress of verifying vegan options?', jp: 'ヴィーガンオプションの検証ストレスをどのように減らせるか？', ua: 'Як ми можемо зменшити стрес від перевірки веганських опцій?' },
          { en: 'How might we help supporters feel confident when choosing for vegans?', jp: 'サポーターがヴィーガンのために選ぶ際に自信を持てるようにするには？', ua: 'Як ми можемо допомогти підтримувачам відчувати впевненість?' },
          { en: 'How might we create a community where vegans and non-vegans connect?', jp: 'ヴィーガンとノンヴィーガンがつながるコミュニティをどのように作れるか？', ua: 'Як ми можемо створити спільноту, де вегани та не-вегани з\'єднуються?' }
        ]
      },
      goals: {
        label: { en: 'PROJECT GOALS', jp: 'プロジェクト目標', ua: 'ЦІЛІ ПРОЄКТУ' },
        business: [
          { en: 'Become the go-to platform for vegan living in Japan', jp: '日本でのヴィーガン生活のための定番プラットフォームになる', ua: 'Стати головною платформою для веганського життя в Японії' },
          { en: 'Build trust through verified information', jp: '検証済み情報で信頼を構築', ua: 'Побудувати довіру через перевірену інформацію' }
        ],
        user: [
          { en: 'Reduce stress when finding vegan options', jp: 'ヴィーガンオプションを見つける際のストレスを軽減', ua: 'Зменшити стрес при пошуку веганських опцій' },
          { en: 'Help supporters feel confident', jp: 'サポーターが自信を持てるようにする', ua: 'Допомогти підтримувачам відчувати впевненість' }
        ],
        technical: [
          { en: 'Intuitive search and filtering', jp: '直感的な検索とフィルタリング', ua: 'Інтуїтивний пошук та фільтрація' },
          { en: 'Community features for connection', jp: 'つながりのためのコミュニティ機能', ua: 'Функції спільноти для зв\'язку' }
        ]
      },
      wireframes: {
        label: { en: 'WIREFRAMES', jp: 'ワイヤーフレーム', ua: 'ВАЙРФРЕЙМИ' },
        title: { en: 'From low to high fidelity', jp: 'ローファイからハイファイへ', ua: 'Від низької до високої точності' },
        images: ['/vegwam-wireframe-1.png', '/vegwam-wireframe-2.png', '/vegwam-wireframe-3.png']
      },
      branding: {
        label: { en: 'BRANDING', jp: 'ブランディング', ua: 'БРЕНДИНГ' },
        title: { en: 'Warm, welcoming, and natural', jp: '温かく、歓迎的で、自然', ua: 'Теплий, привітний та природний' },
        description: { en: 'The brand identity combines the concept of a "Wigwam" (a welcoming gathering place) with plant elements, creating a warm and inclusive visual language.', jp: 'ブランドアイデンティティは「ウィグワム」（歓迎する集いの場）のコンセプトと植物要素を組み合わせ、温かく包括的なビジュアル言語を作り出しています。', ua: 'Бренд-ідентичність поєднує концепцію "Вігваму" (привітного місця зустрічі) з рослинними елементами.' },
        colors: [
          { name: 'VegWam Green', hex: '#145850' },
          { name: 'VegWam Orange', hex: '#F1683C' },
          { name: 'Cream White', hex: '#E6EDDD' }
        ]
      },
      hifi: {
        label: { en: 'HIGH FIDELITY DESIGNS', jp: 'ハイファイデザイン', ua: 'ВИСОКОТОЧНІ ДИЗАЙНИ' },
        title: { en: 'Final UI screens', jp: '最終UIスクリーン', ua: 'Фінальні UI екрани' },
        images: ['/vegwam-hifi-1.png', '/vegwam-hifi-2.png', '/vegwam-hifi-3.png', '/vegwam-hifi-4.png']
      },
      results: {
        label: { en: 'RESULTS', jp: '結果', ua: 'РЕЗУЛЬТАТИ' },
        title: { en: 'Outcomes and learnings', jp: '成果と学び', ua: 'Результати та навчання' },
        metrics: [
          { value: '100%', label: { en: 'Task Completion', jp: 'タスク完了率', ua: 'Завершення завдань' } },
          { value: '4.5/5', label: { en: 'User Satisfaction', jp: 'ユーザー満足度', ua: 'Задоволеність користувачів' } }
        ],
        learnings: [
          { en: 'Designing for supporters (not just primary users) creates a more inclusive experience', jp: 'サポーター向けのデザイン（主要ユーザーだけでなく）がより包括的な体験を生み出す', ua: 'Дизайн для підтримувачів (не лише основних користувачів) створює більш інклюзивний досвід' },
          { en: 'Trust signals (verified badges, reviews) are crucial for adoption', jp: '信頼シグナル（検証バッジ、レビュー）は採用に不可欠', ua: 'Сигнали довіри (перевірені значки, відгуки) є вирішальними для прийняття' }
        ]
      },
      closing: {
        label: { en: 'CLOSING', jp: 'まとめ', ua: 'ПІДСУМОК' },
        title: { en: 'Future impact', jp: '将来の影響', ua: 'Майбутній вплив' },
        description: { en: 'VegWam has the potential to become a trusted hub for the growing vegan community in Japan, bridging the gap between vegans and their supporters.', jp: 'VegWamは、日本で成長するヴィーガンコミュニティのための信頼できるハブとなり、ヴィーガンとそのサポーターの間のギャップを埋める可能性を秘めています。', ua: 'VegWam має потенціал стати надійним хабом для зростаючої веганської спільноти в Японії.' },
        nextSteps: [
          { en: 'Usability testing with real vegans', jp: '実際のヴィーガンによるユーザビリティテスト', ua: 'Юзабіліті-тестування з реальними веганами' },
          { en: 'English support for inbound tourists', jp: '訪日観光客向けの英語対応', ua: 'Підтримка англійської для туристів' },
          { en: 'Accessibility (WCAG 2.1) audit', jp: 'アクセシビリティ（WCAG 2.1）監査', ua: 'Аудит доступності (WCAG 2.1)' }
        ]
      }
    },
    navitime: {
      hero: {
        label: { en: 'CASE STUDY', jp: 'ケーススタディ', ua: 'КЕЙС' },
        title: { en: 'Bicycle NAVITIME', jp: '自転車NAVITIME', ua: 'Bicycle NAVITIME' },
        subtitle: { en: 'Redesigning navigation for safety and clarity.', jp: '安全性と明瞭さを追求したナビゲーションの再設計。', ua: 'Редизайн навігації для безпеки та чіткості.' },
        tags: ['UX Research', 'Redesign', 'Mobile'],
        role: { en: 'UI/UX Designer', jp: 'UI/UXデザイナー', ua: 'UI/UX дизайнер' },
        timeline: { en: '2 Weeks', jp: '2週間', ua: '2 тижні' },
        tools: ['Figma', 'Illustrator'],
        heroImage: '/navitime-hero.png',
        figmaUrl: 'https://www.figma.com/proto/hzx81CrdGeHadYO9whxsqw/'
      },
      overview: {
        label: { en: 'PROJECT OVERVIEW', jp: 'プロジェクト概要', ua: 'ОГЛЯД ПРОЄКТУ' },
        title: { en: 'Making cycling navigation safer', jp: '自転車ナビゲーションをより安全に', ua: 'Зробити велонавігацію безпечнішою' },
        description: {
          en: 'A comprehensive redesign of a popular cycling navigation app to improve safety and usability while riding.',
          jp: 'サイクリング中の視認性と安全性を向上させるための、人気ナビアプリの全面リデザイン。',
          ua: 'Комплексний редизайн популярного велонавігаційного додатку для підвищення безпеки та зручності.'
        }
      },
      challenge: {
        label: { en: 'THE CHALLENGE', jp: '課題', ua: 'ВИКЛИК' },
        title: { en: 'Dangerous to use while riding', jp: '走行中の使用が危険', ua: 'Небезпечно використовувати під час їзди' },
        description: {
          en: 'The existing app had low contrast and small touch targets, making it dangerous to use while cycling. Users struggled to read directions quickly and safely.',
          jp: '既存アプリはコントラストが低く、ボタンが小さいため、走行中の操作が危険でした。ユーザーは指示を素早く安全に読むのに苦労していました。',
          ua: 'Існуючий додаток мав низький контраст і малі зони натискання, що робило його небезпечним для використання під час їзди.'
        },
        points: [
          { en: 'Low contrast made text hard to read in sunlight', jp: '低コントラストで日光下でのテキストが読みにくい', ua: 'Низький контраст ускладнював читання тексту на сонці' },
          { en: 'Small touch targets caused misclicks while riding', jp: '小さなタッチターゲットで走行中に誤タップ', ua: 'Малі зони натискання спричиняли помилкові кліки' },
          { en: 'Information overload on the main screen', jp: 'メイン画面の情報過多', ua: 'Перевантаження інформацією на головному екрані' },
          { en: 'No quick-glance mode for essential info', jp: '必要情報の一目モードがない', ua: 'Немає режиму швидкого погляду для важливої інформації' }
        ]
      },
      objective: {
        label: { en: 'OBJECTIVE', jp: '目的', ua: "ОБ'ЄКТИВ" },
        title: { en: 'Create a safer cycling experience', jp: 'より安全なサイクリング体験を作る', ua: 'Створити безпечніший досвід їзди на велосипеді' },
        goals: [
          { en: 'Improve readability in all lighting conditions', jp: 'すべての照明条件で読みやすさを向上', ua: 'Покращити читабельність в усіх умовах освітлення' },
          { en: 'Enlarge touch targets for safer interaction', jp: 'より安全な操作のためにタッチターゲットを拡大', ua: 'Збільшити зони натискання для безпечнішої взаємодії' },
          { en: 'Prioritize essential information display', jp: '必要な情報表示を優先', ua: 'Пріоритизувати відображення важливої інформації' }
        ]
      },
      process: {
        label: { en: 'MY DESIGN PROCESS', jp: 'デザインプロセス', ua: 'МІЙ ДИЗАЙН-ПРОЦЕС' },
        steps: [
          { en: 'Analyze', jp: '分析', ua: 'Аналіз' },
          { en: 'Define', jp: '定義', ua: 'Визначення' },
          { en: 'Ideate', jp: '発想', ua: 'Ідеація' },
          { en: 'Prototype', jp: 'プロトタイプ', ua: 'Прототип' },
          { en: 'Test', jp: 'テスト', ua: 'Тест' }
        ]
      },
      research: {
        label: { en: 'RESEARCH', jp: 'リサーチ', ua: 'ДОСЛІДЖЕННЯ' },
        title: { en: 'Heuristic evaluation and competitive analysis', jp: 'ヒューリスティック評価と競合分析', ua: 'Евристична оцінка та конкурентний аналіз' },
        methods: [
          { name: { en: 'Heuristic Analysis', jp: 'ヒューリスティック分析', ua: 'Евристичний аналіз' }, description: { en: 'Evaluated the existing app against Nielsen\'s 10 usability heuristics.', jp: 'Nielsenの10のユーザビリティヒューリスティックに基づいて既存アプリを評価。', ua: 'Оцінено існуючий додаток за 10 евристиками юзабіліті Нільсена.' } },
          { name: { en: 'Competitive Analysis', jp: '競合分析', ua: 'Конкурентний аналіз' }, description: { en: 'Analyzed Google Maps, Apple Maps, and Komoot for best practices.', jp: 'Google Maps、Apple Maps、Komootのベストプラクティスを分析。', ua: 'Проаналізовано Google Maps, Apple Maps та Komoot на предмет кращих практик.' } }
        ],
        keyFindings: [
          { en: 'Current contrast ratio fails WCAG standards', jp: '現在のコントラスト比はWCAG基準に不合格', ua: 'Поточний коефіцієнт контрасту не відповідає стандартам WCAG' },
          { en: 'Touch targets are 30% smaller than recommended', jp: 'タッチターゲットは推奨より30%小さい', ua: 'Зони натискання на 30% менші за рекомендовані' },
          { en: 'Users want a "minimal mode" while riding', jp: 'ユーザーは走行中に「ミニマルモード」を望む', ua: 'Користувачі хочуть "мінімальний режим" під час їзди' }
        ]
      },
      personas: {
        label: { en: 'USER PERSONAS', jp: 'ペルソナ', ua: 'ПЕРСОНИ КОРИСТУВАЧІВ' },
        title: { en: 'Cyclists with different needs', jp: '異なるニーズを持つサイクリスト', ua: 'Велосипедисти з різними потребами' },
        items: [
          {
            name: { en: 'Takeshi', jp: '健', ua: 'Такеші' },
            role: { en: 'Daily Commuter, 28', jp: '通勤者・28歳', ua: 'Щоденний комутер, 28' },
            description: { en: 'Uses the app daily for his 8km commute. Needs quick, glanceable directions.', jp: '8kmの通勤に毎日アプリを使用。素早く一目で分かる指示が必要。', ua: 'Використовує додаток щодня для 8 км поїздки на роботу. Потребує швидких, зручних вказівок.' },
            goals: [
              { en: 'Get directions at a glance', jp: '一目で指示を把握', ua: 'Отримати вказівки з першого погляду' },
              { en: 'Avoid accidents while checking phone', jp: '電話確認中の事故を避ける', ua: 'Уникати аварій при перевірці телефону' }
            ],
            frustrations: [
              { en: 'Can\'t read small text while moving', jp: '移動中に小さな文字が読めない', ua: 'Не може читати дрібний текст під час руху' },
              { en: 'Buttons are too small to tap safely', jp: 'ボタンが小さすぎて安全にタップできない', ua: 'Кнопки занадто малі для безпечного натискання' }
            ]
          }
        ]
      },
      branding: {
        label: { en: 'DESIGN SYSTEM', jp: 'デザインシステム', ua: 'ДИЗАЙН-СИСТЕМА' },
        title: { en: 'High contrast safety UI', jp: '高コントラストセーフティUI', ua: 'Висококонтрастний безпечний UI' },
        description: { en: 'Implemented a high-contrast color system optimized for outdoor visibility and quick recognition.', jp: '屋外での視認性と素早い認識に最適化された高コントラストカラーシステムを実装。', ua: 'Впроваджено висококонтрастну колірну систему, оптимізовану для видимості на вулиці.' },
        colors: [
          { name: 'Navi Blue', hex: '#007AFF' },
          { name: 'Ice Blue', hex: '#E0F7FA' },
          { name: 'White', hex: '#FFFFFF' }
        ]
      },
      hifi: {
        label: { en: 'HIGH FIDELITY DESIGNS', jp: 'ハイファイデザイン', ua: 'ВИСОКОТОЧНІ ДИЗАЙНИ' },
        title: { en: 'Redesigned for safety', jp: '安全性のために再設計', ua: 'Перероблено для безпеки' },
        images: ['/navitime-hifi-1.png', '/navitime-hifi-2.png', '/navitime-hifi-3.png', '/navitime-hifi-4.png']
      },
      results: {
        label: { en: 'RESULTS', jp: '結果', ua: 'РЕЗУЛЬТАТИ' },
        title: { en: 'Measurable improvements', jp: '測定可能な改善', ua: 'Вимірювані покращення' },
        metrics: [
          { value: '40%', label: { en: 'Improved Readability', jp: '視認性向上', ua: 'Покращена читабельність' } },
          { value: '2x', label: { en: 'Larger Touch Targets', jp: 'タッチターゲット拡大', ua: 'Більші зони натискання' } }
        ],
        learnings: [
          { en: 'Context of use (while moving) must drive all design decisions', jp: '使用状況（移動中）がすべてのデザイン決定を導く必要がある', ua: 'Контекст використання (під час руху) повинен керувати всіма дизайнерськими рішеннями' },
          { en: 'Accessibility improvements benefit all users, not just those with disabilities', jp: 'アクセシビリティの改善は障害者だけでなくすべてのユーザーに利益をもたらす', ua: 'Покращення доступності приносять користь всім користувачам' }
        ]
      },
      closing: {
        label: { en: 'CLOSING', jp: 'まとめ', ua: 'ПІДСУМОК' },
        title: { en: 'Safer navigation for everyone', jp: 'すべての人により安全なナビゲーション', ua: 'Безпечніша навігація для всіх' },
        description: { en: 'The redesigned app prioritizes safety without sacrificing functionality, making cycling navigation accessible to all riders.', jp: '再設計されたアプリは、機能性を犠牲にすることなく安全性を優先し、すべてのライダーにサイクリングナビゲーションをアクセス可能にします。', ua: 'Перероблений додаток пріоритизує безпеку без втрати функціональності.' },
        nextSteps: [
          { en: 'A/B testing with real cyclists', jp: '実際のサイクリストとのA/Bテスト', ua: 'A/B тестування з реальними велосипедистами' },
          { en: 'Voice navigation integration', jp: '音声ナビゲーション統合', ua: 'Інтеграція голосової навігації' },
          { en: 'Apple Watch companion app', jp: 'Apple Watchコンパニオンアプリ', ua: 'Додаток-компаньйон для Apple Watch' }
        ]
      }
    }
  };

  return projects[projectId] || null;
};

// Navigation data for project switching
const projectList = [
  { id: 'vegwam', title: 'VegWam' },
  { id: 'navitime', title: 'Bicycle NAVITIME' }
];

export default function ProjectPage({ lang }: ProjectPageProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectData(projectId || '', lang);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl italic text-[#2D2D2D] mb-4">Project not found</h1>
          <Link to="/" className="text-[#FF6B35] hover:underline">Return to home</Link>
        </div>
      </div>
    );
  }

  // Find next/prev projects
  const currentIndex = projectList.findIndex(p => p.id === projectId);
  const prevProject = currentIndex > 0 ? projectList[currentIndex - 1] : null;
  const nextProject = currentIndex < projectList.length - 1 ? projectList[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2D2D]">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-xl border border-gray-100 shadow-lg shadow-gray-200/30 rounded-full px-4 md:px-8 py-3 flex items-center gap-4 md:gap-8 w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] overflow-x-auto overflow-y-hidden">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          <span className="w-7 h-7 rounded-full bg-[#FF6B35] flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </span>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors whitespace-nowrap"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">{lang === 'jp' ? 'ホームに戻る' : lang === 'ua' ? 'На головну' : 'Back to Home'}</span>
        </Link>

        <div className="absolute left-3 right-3 bottom-0 h-0.5 bg-white/70 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-amber-400 to-[#5DB13E] transition-[width] duration-300 ease-out shadow-[0_0_10px_rgba(255,107,53,0.35)]"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFF5F0] to-[#FFE8DC]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <SectionLabel>{project.hero.label[lang]}</SectionLabel>
              <h1 className="font-serif font-normal text-5xl md:text-6xl lg:text-7xl text-[#2D2D2D] leading-[1.02] tracking-[-0.02em] mb-6">
                {project.hero.title[lang]}
              </h1>
              <p className="text-xl md:text-2xl text-[#6B6B6B] mb-8 leading-relaxed">
                {project.hero.subtitle[lang]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.hero.tags.map((tag: string, index: number) => {
                  const tagColors = [
                    'border-2 border-pink-200 text-pink-400 bg-white/90',
                    'border-2 border-amber-200 text-amber-400 bg-white/90',
                    'border-2 border-[#5DB13E]/40 text-[#5DB13E] bg-white/90',
                  ];
                  return (
                    <span
                      key={tag}
                      className={`inline-block px-4 py-1.5 rounded-full border text-sm font-medium lowercase ${tagColors[index % tagColors.length]}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">Role</p>
                  <p className="font-medium">{project.hero.role[lang]}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">Timeline</p>
                  <p className="font-medium">{project.hero.timeline[lang]}</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">Tools</p>
                  <p className="font-medium">{project.hero.tools.join(', ')}</p>
                </div>
              </div>

              {/* Prototype Button */}
              {project.hero.figmaUrl && (
                <a
                  href={project.hero.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e55a2a] transition-colors shadow-lg shadow-[#FF6B35]/20"
                >
                  <Play size={18} />
                  {lang === 'jp' ? 'プロトタイプを見る' : lang === 'ua' ? 'Переглянути прототип' : 'View Prototype'}
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-gray-100">
                <img
                  src={project.hero.heroImage}
                  alt={project.hero.title[lang]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>{project.overview.label[lang]}</SectionLabel>
          <SectionTitle>{project.overview.title[lang]}</SectionTitle>
          <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed">
            {project.overview.description[lang]}
          </p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel color="purple">{project.challenge.label[lang]}</SectionLabel>
              <SectionTitle>{project.challenge.title[lang]}</SectionTitle>
              <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8">
                {project.challenge.description[lang]}
              </p>
            </div>
            <Card>
              <ul className="space-y-4">
                {project.challenge.points.map((point: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    </span>
                    <span className="text-[#2D2D2D]">{point[lang]}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Objective/Goal */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel color="green">{project.objective.label[lang]}</SectionLabel>
          <SectionTitle>{project.objective.title[lang]}</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {project.objective.goals.map((goal: any, index: number) => (
              <Card key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#5DB13E]/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-[#5DB13E]" />
                </div>
                <p className="text-[#2D2D2D] font-medium">{goal[lang]}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#FAF8F5] to-[#FFF5F0]">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>{project.process.label[lang]}</SectionLabel>
          <div className="flex items-center justify-center gap-4 md:gap-8 mt-12 overflow-x-auto pb-4">
            {project.process.steps.map((step: any, index: number) => (
              <React.Fragment key={index}>
                <ProcessStep
                  number={index + 1}
                  title={step[lang]}
                  isActive={true}
                />
                {index < project.process.steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>{project.research.label[lang]}</SectionLabel>
            <SectionTitle>{project.research.title[lang]}</SectionTitle>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {project.research.methods.map((method: any, index: number) => (
              <Card key={index}>
                <h4 className="font-bold text-lg text-[#2D2D2D] mb-3">{method.name[lang]}</h4>
                <p className="text-[#6B6B6B]">{method.description[lang]}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-[#FAF8F5]">
            <h4 className="font-bold text-lg text-[#2D2D2D] mb-6 text-center">
              {lang === 'jp' ? '主な発見' : lang === 'ua' ? 'Ключові знахідки' : 'Key Findings'}
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {project.research.keyFindings.map((finding: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <span className="text-[#2D2D2D]">{finding[lang]}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* User Interviews (if exists) */}
      {project.interviews && (
        <section className="py-24 px-6 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <SectionLabel>{project.interviews.label[lang]}</SectionLabel>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {project.interviews.quotes.map((item: any, index: number) => (
                <QuoteCard
                  key={index}
                  quote={item.quote[lang]}
                  author={item.author[lang]}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* User Personas */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>{project.personas.label[lang]}</SectionLabel>
            <SectionTitle>{project.personas.title[lang]}</SectionTitle>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {project.personas.items.map((persona: any, index: number) => (
              <PersonaCard
                key={index}
                name={persona.name[lang]}
                role={persona.role[lang]}
                description={persona.description[lang]}
                goals={persona.goals.map((g: any) => g[lang])}
                frustrations={persona.frustrations.map((f: any) => f[lang])}
              />
            ))}
          </div>
        </div>
      </section>

      {/* POV & HMW (if exists) */}
      {project.pov && project.hmw && (
        <section className="py-24 px-6 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* POV */}
            <div>
              <div className="text-center mb-8">
                <SectionLabel color="blue">{project.pov.label[lang]}</SectionLabel>
              </div>
              <div className="space-y-4">
                {project.pov.statements.map((statement: any, index: number) => (
                  <Card key={index}>
                    <p className="text-lg text-[#2D2D2D] leading-relaxed italic">
                      "{statement[lang]}"
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* HMW */}
            <div>
              <div className="text-center mb-8">
                <SectionLabel color="orange">{project.hmw.label[lang]}</SectionLabel>
              </div>
              <div className="space-y-4">
                {project.hmw.questions.map((question: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-[#FF6B35]">
                    <p className="text-lg text-[#2D2D2D] font-medium">
                      {question[lang]}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Goals (if exists) */}
      {project.goals && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SectionLabel>{project.goals.label[lang]}</SectionLabel>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-[#5DB13E]/10 border-[#5DB13E]/20">
                <h4 className="font-bold text-[#5DB13E] mb-4 uppercase text-sm tracking-wider">
                  {lang === 'jp' ? 'ビジネス目標' : lang === 'ua' ? 'Бізнес-цілі' : 'Business Goals'}
                </h4>
                <ul className="space-y-3">
                  {project.goals.business.map((goal: any, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-[#2D2D2D]">
                      <CheckCircle className="w-4 h-4 text-[#5DB13E] mt-1 flex-shrink-0" />
                      {goal[lang]}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="bg-sky-50 border-sky-100">
                <h4 className="font-bold text-sky-700 mb-4 uppercase text-sm tracking-wider">
                  {lang === 'jp' ? 'ユーザー目標' : lang === 'ua' ? 'Цілі користувачів' : 'User Goals'}
                </h4>
                <ul className="space-y-3">
                  {project.goals.user.map((goal: any, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-[#2D2D2D]">
                      <CheckCircle className="w-4 h-4 text-sky-500 mt-1 flex-shrink-0" />
                      {goal[lang]}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="bg-purple-50 border-purple-100">
                <h4 className="font-bold text-purple-700 mb-4 uppercase text-sm tracking-wider">
                  {lang === 'jp' ? '技術目標' : lang === 'ua' ? 'Технічні цілі' : 'Technical Goals'}
                </h4>
                <ul className="space-y-3">
                  {project.goals.technical.map((goal: any, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-[#2D2D2D]">
                      <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                      {goal[lang]}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Branding / Design System */}
      <section className="py-24 px-6 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>{project.branding.label[lang]}</SectionLabel>
            <SectionTitle>{project.branding.title[lang]}</SectionTitle>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto mt-4">
              {project.branding.description[lang]}
            </p>
          </div>

          {/* Color Palette */}
          <div className="flex flex-wrap justify-center gap-8">
            {project.branding.colors.map((color: any, index: number) => (
              <div key={index} className="text-center">
                <div
                  className="w-24 h-24 rounded-2xl shadow-lg mb-3"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <p className="font-medium text-[#2D2D2D]">{color.name}</p>
                <p className="text-sm text-[#6B6B6B]">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Fidelity Designs */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>{project.hifi.label[lang]}</SectionLabel>
            <SectionTitle>{project.hifi.title[lang]}</SectionTitle>
          </div>

          {/* Mockup Gallery */}
          <div className="grid md:grid-cols-2 gap-8">
            {project.hifi.images.map((image: string, index: number) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg"
              >
                <img
                  src={image}
                  alt={`${project.hero.title[lang]} mockup ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-gray-400">
                        <span>Mockup ${index + 1}</span>
                      </div>
                    `;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#FF6B35] to-[#e55a2a] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              {project.results.label[lang]}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic">
              {project.results.title[lang]}
            </h2>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            {project.results.metrics.map((metric: any, index: number) => (
              <div key={index} className="text-center">
                <p className="text-5xl md:text-6xl font-bold mb-2">{metric.value}</p>
                <p className="text-white/80">{metric.label[lang]}</p>
              </div>
            ))}
          </div>

          {/* Learnings */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <h4 className="font-bold text-lg mb-6 text-center">
              {lang === 'jp' ? '学び' : lang === 'ua' ? 'Навчання' : 'Key Learnings'}
            </h4>
            <ul className="space-y-4">
              {project.results.learnings.map((learning: any, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{learning[lang]}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Closing / Future Impact */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>{project.closing.label[lang]}</SectionLabel>
          <SectionTitle>{project.closing.title[lang]}</SectionTitle>
          <p className="text-lg text-[#6B6B6B] leading-relaxed mb-12">
            {project.closing.description[lang]}
          </p>

          <Card className="text-left">
            <h4 className="font-bold text-lg text-[#2D2D2D] mb-6">
              {lang === 'jp' ? '次のステップ' : lang === 'ua' ? 'Наступні кроки' : 'Next Steps'}
            </h4>
            <ul className="space-y-3">
              {project.closing.nextSteps.map((step: any, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF6B35] font-bold text-sm">{index + 1}</span>
                  </span>
                  <span className="text-[#2D2D2D]">{step[lang]}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Navigation to other projects */}
      <section className="py-16 px-6 bg-[#FAF8F5] border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
            {prevProject ? (
              <Link
                to={`/project/${prevProject.id}`}
                className="flex items-center gap-3 text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors justify-self-center sm:justify-self-start"
              >
                <ArrowLeft size={20} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#FF6B35]">
                    {lang === 'jp' ? '前のプロジェクト' : lang === 'ua' ? 'Попередній' : 'Previous'}
                  </p>
                  <p className="font-serif italic text-lg">{prevProject.title}</p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block"></div>
            )}

            {nextProject ? (
              <Link
                to={`/project/${nextProject.id}`}
                className="flex items-center gap-3 text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors text-right justify-self-center sm:justify-self-end"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#FF6B35]">
                    {lang === 'jp' ? '次のプロジェクト' : lang === 'ua' ? 'Наступний' : 'Next'}
                  </p>
                  <p className="font-serif italic text-lg">{nextProject.title}</p>
                </div>
                <ArrowRight size={20} />
              </Link>
            ) : (
              <div className="hidden sm:block"></div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-[#2D2D2D] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl italic mb-6">
            {lang === 'jp' ? 'お仕事のご依頼はこちら' : lang === 'ua' ? 'Зв\'яжіться зі мною' : 'Let\'s work together'}
          </h2>
          <a
            href="mailto:hrytsai.anastasiia@gmail.com"
            className="inline-flex items-center gap-2 text-[#FF6B35] hover:underline text-lg"
          >
            hrytsai.anastasiia@gmail.com
            <ExternalLink size={16} />
          </a>
          <p className="text-white/50 text-sm mt-8">
            © 2026 Anastasiia Hrytsai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
