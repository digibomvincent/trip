import { useState } from 'react'
import IgFollowPopup from '../components/IgFollowPopup.jsx'
import AttractionCard from '../components/AttractionCard.jsx'
import { ATTRACTIONS } from '../data/attractions.js'
import {
  MapPin,
  Star,
  Instagram,
  ExternalLink,
  Plane,
  CalendarDays,
  ArrowDown,
  Clock,
  Hotel,
  Sunrise,
  Sun,
  ChevronDown,
  ChevronUp,
  Link2,
  BarChart2,
  Ticket,
  Sparkles,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

const DAYS = [
  {
    day: 1,
    date: '5/3 (日)',
    area: '神戶',
    morning: ['關西機場', '生田神社', '萌黃之館', '六甲牧場冰', '荷蘭館、奧地利館、丹麥館'],
    afternoon: ['神戶布引香草園', '拉麵', '有馬溫泉玩具博物館', '肉餅', '金之湯', '銀之湯', '三宮站燒肉吃到飽'],
    hotel: '天満橋アバンティ',
  },
  {
    day: 2,
    date: '5/4 (一)',
    area: '姬路・神戶',
    morning: ['吉野家', '姬路城', '鯛魚燒'],
    afternoon: ['須磨浦山上樂園', '南京町商店街逛街', '彩餐廳神戶牛', '神戶港摩天輪'],
    hotel: '天満橋アバンティ',
  },
  {
    day: 3,
    date: '5/5 (二)',
    area: '大阪',
    morning: ['海遊館', '聖瑪利亞號', '天保山摩天輪'],
    afternoon: ['燒肉', '宇宙塔觀景台', '生駒山樂園看夕陽', 'YAYOI彌生軒'],
    hotel: '天満橋アバンティ',
  },
  {
    day: 4,
    date: '5/6 (三)',
    area: '大阪',
    morning: ['大阪城（御座船、天守閣）', 'goodspoon 義大利麵披薩', 'TULLY\'S 奶茶'],
    afternoon: ['讀賣電視台看柯南', '花博記念公園(鮮花競放館、風車之丘、國際庭園)', '加壽屋牛肉飯烏龍麵', '大阪長居植物園 teamLab'],
    hotel: '天満橋アバンティ',
  },
  {
    day: 5,
    date: '5/7 (四)',
    area: '大阪',
    morning: ['勝尾寺', 'Q\'s mall 逛街'],
    afternoon: ['Harbs 水果千層蛋糕', '阿倍野展望台（芙莉蓮主題）', '心齋橋逛街'],
    hotel: '天満橋アバンティ',
    hotelNote: '隔日一早前往機場',
  },
]


const USEFUL_LINKS = [
  {
    category: '人數預測',
    Icon: BarChart2,
    description: '出發前確認景點人潮',
    links: [
      { name: '姬路城 人潮預測月曆', desc: '官方公開的入場人數預測', url: 'https://www.himejicastle.jp/cn_kan/common/pdf/calendar.pdf' },
    ],
  },
  {
    category: '景點票券',
    Icon: Ticket,
    description: '優惠套票，先買先省',
    links: [
      { name: '大阪周遊卡', desc: '地鐵無限搭＋多景點免費入場', url: 'https://www.klook.com/zh-TW/activity/82312-amazing-pass-osaka/' },
      { name: '神戶觀光 SMART PASSPORT', desc: '神戶景點＋交通一卡搞定', url: 'https://www.feel-kobe.jp/tw/smartpass/' },
    ],
  },
]

const TABS = [
  { id: 'itinerary', label: '行程', Icon: CalendarDays },
  { id: 'attractions', label: '景點評價', Icon: Star },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function TimeBlock({ label, Icon, items }) {
  if (!items || items.length === 0) return null
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <span>{label}</span>
      </div>
      <ul className="space-y-1 pl-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8d2df]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DayCard({ day, date, area, morning, afternoon, hotel, hotelNote }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#b8d2df] shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#5a8fa3] text-sm font-bold text-white">
          {day}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-800">Day {day}</span>
            <span className="text-xs text-slate-500">{date}</span>
          </div>
          <span className="inline-block mt-0.5 rounded-full bg-[#b8d2df]/50 px-2 py-0.5 text-xs font-medium text-[#5a8fa3]">
            {area}
          </span>
        </div>
      </div>
      <div className="border-t border-[#b8d2df]/40 px-4 pb-4 pt-3 space-y-3">
        <TimeBlock label="上午" Icon={Sunrise} items={morning} />
        <TimeBlock label="下午" Icon={Sun} items={afternoon} />
        {hotel ? (
          <div className="flex flex-col gap-0.5 pt-1">
            <div className="flex items-start gap-2">
              <Hotel className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
              <span className="text-xs text-slate-500">{hotel}</span>
            </div>
            {hotelNote && (
              <span className="pl-5 text-xs text-slate-400 italic">{hotelNote}</span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function LinkCard({ name, desc, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3.5 ring-1 ring-[#b8d2df] shadow-sm active:scale-[0.98] transition-transform"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-800">{name}</div>
        <div className="mt-0.5 text-xs text-slate-400">{desc}</div>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-[#5a8fa3]" />
    </a>
  )
}

function IgFooter() {
  return (
    <section className="mt-8 rounded-2xl bg-[#5a8fa3] px-6 py-6 text-white shadow-lg shadow-[#b8d2df]">
      <div className="flex items-center justify-center gap-4">
        <img
          src="/ig.jpg"
          alt="perper"
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-white/40"
        />
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-base font-bold">
            更多旅遊分享都在 IG
            <ArrowDown className="h-4 w-4" />
          </div>
          <p className="mt-0.5 text-xs text-[#b8d2df]">小資旅遊・有趣實用攻略</p>
          <a
            href="https://www.instagram.com/perper_17travel/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#5a8fa3] shadow transition-transform active:scale-95"
          >
            <Instagram className="h-4 w-4" />
            @perper_17travel
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

const AREA_FILTERS = [
  { label: '全部', value: 'all' },
  { label: '大阪', value: 'osaka' },
  { label: '神戶', value: 'kobe' },
]

const KOBE_AREAS = ['神戶', '有馬', '姬路']
const OSAKA_AREAS = ['大阪', '奈良']

function matchFilter(area, filter) {
  if (filter === 'all') return true
  if (filter === 'kobe') return KOBE_AREAS.includes(area)
  if (filter === 'osaka') return OSAKA_AREAS.includes(area)
  return true
}

export default function OsakaKobe() {
  const [activeTab, setActiveTab] = useState('itinerary')
  const [linksOpen, setLinksOpen] = useState(false)
  const [areaFilter, setAreaFilter] = useState('all')

  return (
    <div className="min-h-screen bg-[#faf7f4] text-slate-900">
      <IgFollowPopup />
      <div className="mx-auto w-full max-w-[480px] px-4 pb-16">

        {/* ── Cover ──────────────────────────────────────────────── */}
        <section className="relative py-10 text-center">
          <div className="absolute inset-0 -z-10 rounded-b-3xl bg-gradient-to-br from-[#b8d2df] to-[#5a8fa3] opacity-10" />
          <div className="mb-4 flex items-center justify-center gap-4">
            <img
              src="/ig.jpg"
              alt="perper"
              className="h-20 w-20 rounded-full object-cover ring-2 ring-[#b8d2df]"
            />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#b85c5c]">
              <img
                src="/logorb.png"
                alt="logo"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#b8d2df]/40 px-3 py-1 text-xs font-semibold text-[#5a8fa3] ring-1 ring-[#b8d2df]">
            <Plane className="h-3.5 w-3.5" />
            2026 春・日本關西
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-widest text-slate-900 [font-family:'Shippori_Mincho',serif] [text-shadow:0_1px_6px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.08)]">
            大阪神戶 5 日行程
          </h1>
          <p className="mt-2 text-base text-slate-600">
            美食、夜景、港都風情全制霸！
          </p>
          <div className="mt-3 flex justify-center gap-2 text-sm text-slate-400">
            <span>🏯 大阪</span>
            <span>·</span>
            <span>⚓ 神戶</span>
          </div>
        </section>

        {/* ── Tab Bar ────────────────────────────────────────────── */}
        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-[#b8d2df] bg-[#faf7f4]/80 px-4 pt-2 backdrop-blur">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex flex-1 items-center justify-center gap-1.5 rounded-t-xl py-2.5 text-sm font-semibold transition-colors',
                  activeTab === tab.id
                    ? 'bg-white text-[#5a8fa3] shadow-sm ring-1 ring-[#b8d2df]'
                    : 'text-slate-500 hover:text-slate-700',
                ].join(' ')}
              >
                <tab.Icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── 行程 Tab ─────────────────────────────────────────── */}
        {activeTab === 'itinerary' && (
          <>
            {/* Google Map CTA */}
            <section className="mb-8">
              <a
                href="https://maps.app.goo.gl/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#5a8fa3] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-[#b8d2df] active:scale-[0.98] transition-transform"
              >
                <MapPin className="h-6 w-6" />
                打開景點地圖 📍
              </a>
              <p className="mt-2 text-center text-xs text-slate-400">
                所有景點已標記在 Google Maps 上
              </p>
            </section>

            {/* 實用連結 toggle */}
            <section className="mb-8">
              <button
                type="button"
                onClick={() => setLinksOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-4 text-left ring-1 ring-[#b8d2df] shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-[#5a8fa3]" />
                  <div>
                    <h2 className="text-base font-bold text-slate-800">實用連結</h2>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {linksOpen ? '點擊收合' : '票券・人數預測'}
                    </p>
                  </div>
                </div>
                {linksOpen
                  ? <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                  : <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                }
              </button>
              {linksOpen && (
                <div className="mt-3 space-y-6">
                  {USEFUL_LINKS.map((section) => (
                    <div key={section.category}>
                      <div className="mb-3 flex items-center gap-2">
                        <section.Icon className="h-5 w-5 text-[#5a8fa3]" />
                        <div>
                          <h3 className="text-base font-bold text-slate-800">{section.category}</h3>
                          <p className="text-xs text-slate-400">{section.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {section.links.map((link) => (
                          <LinkCard key={link.name} {...link} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 5 天行程總覽（無 toggle） */}
            <section className="mb-10">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#5a8fa3]" />
                <h2 className="text-xl font-bold text-slate-800">5 天行程總覽</h2>
              </div>
              <div className="space-y-3">
                {DAYS.map((d) => (
                  <DayCard key={d.day} {...d} />
                ))}
              </div>
            </section>

            <IgFooter />
          </>
        )}

        {/* ── 景點評價 Tab ──────────────────────────────────────── */}
        {activeTab === 'attractions' && (
          <>
            <section className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <h2 className="text-xl font-bold text-slate-800">景點評價</h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">大阪・神戶實際遊玩心得</p>

              {/* 區域 Filter */}
              <div className="mb-4 flex gap-2">
                {AREA_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setAreaFilter(f.value)}
                    className={[
                      'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ring-1',
                      areaFilter === f.value
                        ? 'bg-[#5a8fa3] text-white ring-[#5a8fa3]'
                        : 'bg-white text-slate-500 ring-[#b8d2df] hover:text-slate-700',
                    ].join(' ')}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {ATTRACTIONS.filter((a) => matchFilter(a.area, areaFilter)).length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-[#b8d2df] px-4 py-10 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-sm text-slate-400">
                    <Sparkles className="h-4 w-4" />
                    <span>景點評價即將新增</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {ATTRACTIONS.filter((a) => matchFilter(a.area, areaFilter)).map((a) => (
                    <AttractionCard key={a.name} {...a} />
                  ))}
                </div>
              )}
            </section>

            <IgFooter />
          </>
        )}

        <footer className="mt-8 text-center text-xs text-slate-400">
          © perper_17travel · 版權所有
        </footer>
      </div>
    </div>
  )
}
