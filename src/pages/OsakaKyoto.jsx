import { useState } from 'react'
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Hotel,
  Instagram,
  ExternalLink,
  Plane,
  Sunrise,
  Sun,
  CalendarDays,
  BarChart2,
  Ticket,
  Sparkles,
  ArrowDown,
  Link2,
  Clock,
  Play,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

const DAYS = [
  {
    day: 1,
    date: '2/24 (二)',
    area: '大阪',
    morning: ['關西機場', '松葉総本店（炸串）'],
    afternoon: ['HEP FIVE', '梅田空中庭園', '燒肉力丸'],
    hotel: '新阪急大阪附樓酒店',
  },
  {
    day: 2,
    date: '2/25 (三)',
    area: '大阪・環球影城',
    morning: ['環球影城（任天堂、哈利波特）'],
    afternoon: ['侏羅紀', '小小兵', '任天堂（庫巴挑戰、耀西冒險）', 'Shake Shack'],
    hotel: '新阪急大阪附樓酒店',
  },
  {
    day: 3,
    date: '2/26 (四)',
    area: '京都',
    morning: ['和服體驗 mocomoco', '伏見稻荷'],
    afternoon: ['二三年坂', '伊藤軒/SOU・SOU', '清水寺', 'LIGHT CYCLES KYOTO'],
    hotel: 'Irori Kyoto Station Higashi-Honganji',
  },
  {
    day: 4,
    date: '2/27 (五)',
    area: '大津・滑雪',
    morning: ['滑雪（志賀站）'],
    afternoon: ['滑雪（志賀站）', '宮川豚衛門（晚餐）'],
    hotel: 'Irori Kyoto Station Higashi-Honganji',
  },
  {
    day: 5,
    date: '2/28 (六)',
    area: '京都',
    morning: ['金閣寺', 'Sarasa Nishijin'],
    afternoon: ['嵐山（天龍寺、竹林小徑、常寂光寺）', '錦市場', '祇園花見小路、鴨川', 'Kyo ha Matcha'],
    hotel: 'Irori Kyoto Station Higashi-Honganji',
  },
  {
    day: 6,
    date: '3/1 (日)',
    area: '奈良 + 大阪',
    morning: ['奈良公園', '東大寺', '春日大社'],
    afternoon: ['通天閣', '心齋橋', '道頓堀', '玄品河豚 法善寺'],
    hotel: 'Tabist Sakuragawa River Side Hotel',
  },
  {
    day: 7,
    date: '3/2 (一)',
    area: '大阪',
    morning: ['難波八阪神社', '黑門市場'],
    afternoon: ['Namba City'],
    hotel: null,
  },
]

const ATTRACTIONS = [
  {
    name: '環球影城',
    type: '遊樂園',
    area: '大阪',
    score: 5,
    duration: '全天',
    review: '還好有買快通，省掉排隊時間，才能好好拍照買東西。哈利波特的禁忌之旅跟其他4D不一樣，我超暈。',
    price: 'NT$1799+NT$3370 (門票＋快速通關)',
    reels: [
      { url: 'https://www.instagram.com/reel/DW6eyHngUQN/?igsh=MWdzMGh6ZjZxcm1rbw==', label: '任天堂區怎麼進？' },
      { url: 'https://www.instagram.com/reel/DVvSqFfAXTp/?igsh=MzRlODBiNWFlZA==', label: '快通-膽小鬼玩法' },
    ],
  },
  {
    name: '伏見稻荷',
    type: '神社',
    area: '京都',
    score: 4.5,
    duration: '2–4 小時',
    review: '園區超大，要爬升一段才會到千本鳥居，前段街道有吉伊卡哇專賣店，紀念品店價格浮動記得比價',
    price: '免費',
    reels: [
      { url: 'https://www.instagram.com/reel/DVyTaERgVFq/?igsh=b3dkaTVjcHY1OTM1', label: '動漫CP聖地' },
    ],
  },
  {
    name: '清水寺',
    type: '寺廟',
    area: '京都',
    score: 5,
    duration: '1–2 小時',
    review: '木製古蹟非常壯觀，記得挑戰金剛杵，柯南打卡點可以看夕陽和京都塔！外面街道有經典的肌肉男槌麻吉',
    price: 'NT$100',
    reels: [
      { url: 'https://www.instagram.com/reel/DVyTaERgVFq/?igsh=b3dkaTVjcHY1OTM1', label: '動漫CP聖地' },
    ],
  },
  {
    name: '嵐山',
    type: '自然・景點',
    area: '京都',
    score: 3.5,
    duration: '3-5 小時',
    review: '去的時候沒有楓葉和小火車，小店別買比市區貴，竹林普通台灣很常見，常寂光寺前方有livecam可以看到自己！',
    price: '免費',
    reels: [
      { url: 'https://www.instagram.com/reel/DVqhtTmgTR_/?igsh=aW1hYno3NjJuc3ln', label: '嵐山隱藏景點' },
    ],
  },
  {
    name: '通天閣',
    type: '地標',
    area: '大阪',
    score: 4,
    duration: '2–3 小時',
    review: '滑梯不恐怖，可以叫大聲一點嚇別人，介紹通天閣和跑跑人的歷史滿有趣，DM有紙模型記得拿！',
    price: 'NT$500（室內外展望台＋滑梯）',
    reels: [
      { url: 'https://www.instagram.com/reel/DV6IRyHgY47/?igsh=MW13MnRnZzZxYmdvcQ==', label: '通天閣免費紀念品' },
    ],
  },
  {
    name: '道頓堀',
    type: '美食・逛街',
    area: '大阪',
    score: 4.5,
    duration: '下午到晚上',
    review: '唐吉訶德摩天輪不錯，船很普通，美式街區算特別，可以吃吃看冰狗',
    price: '免費',
    reels: [
      { url: 'https://www.instagram.com/reel/DVkYx1cAeNk/?igsh=OHZnbWlxbGc0Nmxt', label: '口袋名單｜玄品河豚' },
      { url: 'https://www.instagram.com/reel/DVbP67QARDB/?igsh=MzRlODBiNWFlZA==', label: '道頓堀摩天輪推嗎！？' },
      { url: 'https://www.instagram.com/reel/DWl7YgAAXR7/?igsh=MzRlODBiNWFlZA==', label: '20元的生魚壽司！' },
    ],
  },
  {
    name: 'LIGHT CYCLES KYOTO',
    type: '藝術裝置',
    area: '京都',
    score: 5,
    duration: '1.5–2 小時',
    review: '沉浸式光影體驗，現場超震撼，京都晚上值得排！',
    price: 'NT$549',
    reels: [
      { url: 'https://www.instagram.com/reel/DVd3F9egb2A/?igsh=NWY3cGN5NmVtbm9m', label: '京都植物園光影展' },
    ],
  },
  {
    name: '和服體驗',
    type: '體驗',
    area: '京都',
    score: 4.5,
    duration: '4–6 小時',
    review: '提前在MOCOMOCO預約，可以在不同分店租還（清水寺、嵐山都有），規劃好的話能拍好幾個景點！',
    price: 'NT$1348（含髮型＋配飾）',
    reels: [
      { url: 'https://www.instagram.com/reel/DWdjui1gSRh/?igsh=b3huYXM1ODVrcXRr', label: '和服體驗竟然是這樣！' },
    ],
  },
 
 
]

const USEFUL_LINKS = [
  {
    category: '人數預測',
    Icon: BarChart2,
    description: '出發前查好人潮，避開尖峰時段',
    links: [
      {
        name: '大阪環球影城',
        desc: '即時預測入園人數與等待時間',
        url: 'https://yosocal.com/usj/',
      },
      {
        name: '京都景點',
        desc: '各大景點擁擠程度預報',
        url: 'https://global.kyoto.travel/tw/comfort/',
      },
    ],
  },
  {
    category: '景點票券',
    Icon: Ticket,
    description: '提前購票省時又省錢',
    links: [
      {
        name: 'LIGHT CYCLES KYOTO',
        desc: 'Klook 購票・京都植物園光影藝術展',
        url: 'https://www.klook.com/zh-TW/activity/130195-kyotobotanicalgardens-light-cycles-kyoto/?_activity_id=130195&_currency=TWD&_language=zh-Hant-TW&aid=26991&feed_product_id=130195&google_ads_click_source=&google_funnel=nav&google_surface=maps&package_id=614232&source_channel=googlettd&utm_campaign=platform_share&utm_content=platform%3Ddesktop_pagespm%3DActivity_shareid%3Dc0c035b3-9051-4965-8378-a6021cd12dc6&utm_medium=link-copy&utm_source=link-copy&utm_term=&dd_referrer=',
      },
      {
        name: 'MOCOMOCO 和服體驗',
        desc: 'Klook 購票・京都伏見稻荷和服/浴衣＋妝髮',
        url: 'https://www.klook.com/zh-TW/activity/141873-kyoto-fushimi-inari-kimono-yukata-makeup-photography-by-mocomoco/?package_id=484914&utm_campaign=platform-share&utm_content=platform%3Dios_pagespm%3DActivity_textversion%3D1_shareid%3DB56BB673-5289-4B02-BA94-9CB38FD34FBB&utm_medium=link-copy&utm_source=link-copy',
      },
    ],
  },
]

const TABS = [
  { id: 'itinerary', label: '行程', Icon: CalendarDays },
  { id: 'links', label: '實用連結', Icon: Link2 },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function DayCard({ day, date, area, morning, afternoon, hotel }) {
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
          <div className="flex items-start gap-2 pt-1">
            <Hotel className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
            <span className="text-xs text-slate-500">{hotel}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 italic">回程日，無住宿</span>
          </div>
        )}
      </div>
    </div>
  )
}

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

function StarIcon({ fill }) {
  if (fill === 'full')
    return <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
  if (fill === 'half')
    return (
      <span className="relative inline-flex h-3.5 w-3.5">
        <Star className="h-3.5 w-3.5 fill-none text-slate-200" />
        <span className="absolute inset-0 w-[50%] overflow-hidden">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        </span>
      </span>
    )
  return <Star className="h-3.5 w-3.5 fill-none text-slate-200" />
}

function ScoreDots({ score }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill =
          score >= n ? 'full' : score >= n - 0.5 ? 'half' : 'empty'
        return <StarIcon key={n} fill={fill} />
      })}
      <span className="ml-1 text-xs text-slate-400">{score != null ? `${score}/5` : '?/5'}</span>
    </div>
  )
}

function AttractionCard({ name, type, area, score, duration, review, price, reels }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-[#b8d2df] shadow-sm">
      {/* 頂部：名稱 + 類型標籤 */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{name}</h3>
          <ScoreDots score={score} />
        </div>
        <span className="shrink-0 rounded-full bg-[#b8d2df]/30 px-2.5 py-1 text-xs font-medium text-[#5a8fa3] ring-1 ring-[#b8d2df]">
          {type}
        </span>
      </div>

      {/* 區域 + 停留時間 */}
      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
        {area && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {area}
          </span>
        )}
        {duration && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            建議 {duration}
          </span>
        )}
      </div>

      {/* 短評 */}
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{review}</p>

      {/* 價格 */}
      <p className="mt-3 text-xs text-slate-400">{price}</p>

      {/* Reels 連結列 */}
      {reels && reels.length > 0 && (
        <div className="mt-2 flex flex-col gap-1.5">
          {reels.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 self-start rounded-full bg-[#b8d2df]/30 px-3 py-1 text-xs font-medium text-[#5a8fa3] ring-1 ring-[#b8d2df] active:scale-95 transition-transform"
            >
              <Play className="h-3 w-3 fill-[#5a8fa3]" />
              {r.label || '知道更多'}
            </a>
          ))}
        </div>
      )}
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

function UsefulLinksTab() {
  return (
    <div className="space-y-6 pb-4">
      {USEFUL_LINKS.map((section) => (
        <div key={section.category}>
          <div className="mb-3 flex items-center gap-2">
            <section.Icon className="h-5 w-5 text-[#5a8fa3]" />
            <div>
              <h3 className="text-base font-bold text-slate-800">{section.category}</h3>
              <p className="text-xs text-slate-400">{section.description}</p>
            </div>
          </div>
          {section.comingSoon ? (
            <div className="rounded-2xl border-2 border-dashed border-[#b8d2df] px-4 py-6 text-center">
              <div className="flex items-center justify-center gap-1.5 text-sm text-slate-400">
                <Sparkles className="h-4 w-4" />
                <span>即將新增</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {section.links.map((link) => (
                <LinkCard key={link.name} {...link} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function OsakaKyoto() {
  const [activeTab, setActiveTab] = useState('links')
  const [itineraryOpen, setItineraryOpen] = useState(false)
  const [areaFilter, setAreaFilter] = useState('全部')

  return (
    <div className="min-h-screen bg-[#faf7f4] text-slate-900">
      <div className="mx-auto w-full max-w-[480px] px-4 pb-16">

        {/* ── Cover ──────────────────────────────────────────────── */}
        <section className="relative py-10 text-center">
          <div className="absolute inset-0 -z-10 rounded-b-3xl bg-gradient-to-br from-[#b8d2df] to-[#5a8fa3] opacity-10" />
          <img
            src="/logorb.png"
            alt="logo"
            className="mx-auto mb-4 h-20 w-auto object-contain"
          />
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#b8d2df]/40 px-3 py-1 text-xs font-semibold text-[#5a8fa3] ring-1 ring-[#b8d2df]">
            <Plane className="h-3.5 w-3.5" />
            2026 冬・日本關西
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            京阪奈良 7 日行程
          </h1>
          <p className="mt-2 text-base text-slate-600">
            環球、神社、滑雪、逛街全都玩！
          </p>
          <div className="mt-3 flex justify-center gap-2 text-sm text-slate-400">
            <span>🏯 大阪</span>
            <span>·</span>
            <span>⛩️ 京都</span>
            <span>·</span>
            <span>🦌 奈良</span>
            <span>·</span>
            <span>⛷️ 滑雪</span>
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

        {/* ── Tab Content ────────────────────────────────────────── */}
        {activeTab === 'itinerary' && (
          <>
            {/* Google Map CTA */}
            <section className="mb-8">
              <a
                href="https://maps.app.goo.gl/EzTJ7J4XRtayhBwq7"
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

            {/* Itinerary accordion */}
            <section className="mb-10">
              <button
                type="button"
                onClick={() => setItineraryOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-4 text-left ring-1 ring-[#b8d2df] shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#5a8fa3]" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">7 天行程總覽</h2>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {itineraryOpen ? '點擊收合' : '點擊展開完整行程'}
                    </p>
                  </div>
                </div>
                {itineraryOpen ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                )}
              </button>
              {itineraryOpen && (
                <div className="mt-3 space-y-3">
                  {DAYS.map((d) => (
                    <DayCard key={d.day} {...d} />
                  ))}
                </div>
              )}
            </section>

            {/* Attraction ratings */}
            <section className="mb-10">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <h2 className="text-xl font-bold text-slate-800">景點評價</h2>
                </div>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="rounded-full border border-[#b8d2df] bg-white px-3 py-1.5 text-xs font-medium text-[#5a8fa3] focus:outline-none"
                >
                  <option value="全部">全部</option>
                  <option value="大阪">大阪</option>
                  <option value="京都">京都</option>
                </select>
              </div>
              <p className="mb-4 text-sm text-slate-500">精選熱門景點真實評價！</p>
              <div className="space-y-3">
                {ATTRACTIONS
                  .filter((a) => areaFilter === '全部' || a.area === areaFilter)
                  .map((a) => (
                    <AttractionCard key={a.name} {...a} />
                  ))}
              </div>
            </section>

            {/* IG footer */}
            <section className="rounded-2xl bg-[#5a8fa3] px-6 py-8 text-center text-white shadow-lg shadow-[#b8d2df]">
              <div className="flex items-center justify-center gap-2 text-lg font-bold">
                更多旅遊攻略都在 IG
                <ArrowDown className="h-5 w-5" />
              </div>
              <p className="mt-1 text-sm text-[#b8d2df]">小資旅遊・有趣實用攻略</p>
              <a
                href="https://www.instagram.com/perper_17travel/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#5a8fa3] shadow transition-transform active:scale-95"
              >
                <Instagram className="h-4 w-4" />
                @perper_17travel
              </a>
            </section>
          </>
        )}

        {activeTab === 'links' && <UsefulLinksTab />}

        <footer className="mt-8 text-center text-xs text-slate-400">
          © perper_17travel · 版權所有
        </footer>
      </div>
    </div>
  )
}
