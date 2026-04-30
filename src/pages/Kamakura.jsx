import { useState } from 'react'
import {
  MapPin,
  Star,
  Instagram,
  ExternalLink,
  Plane,
  CalendarDays,
  ArrowDown,
  Link2,
  Clock,
  Play,
  Train,
  Footprints,
  Shuffle,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

const ITINERARY = [
  {
    time: '09:00',
    place: '秋葉原出發',
    transport: { method: 'JR', Icon: Train, mins: 71 },
  },
  {
    time: '10:11–12:30',
    place: '小町通・鶴岡八幡宮',
    tags: ['美食', '神社'],
    transport: { method: '江之電', Icon: Train, mins: 20 },
  },
  {
    time: '13:00–14:00',
    place: '鎌倉高校前',
    tags: ['灌籃高手'],
    transport: { method: '步行', Icon: Footprints, mins: 10 },
  },
  {
    time: '14:10–15:30',
    place: 'bills 七里ヶ浜',
    tags: ['美食', '海景'],
    transport: { method: '江之電', Icon: Train, mins: 36 },
  },
  {
    time: '16:00–18:30',
    place: '江之島・展望台',
    tags: ['夕陽', '孤獨搖滾'],
    transport: { method: '步行', Icon: Footprints, mins: 30 },
  },
  {
    time: '19:00',
    place: '湘南懸吊電車',
    tags: [],
    transport: null,
  },
]

const ATTRACTIONS = [
  {
    name: '鎌倉高校前平交道',
    type: '聖地巡禮',
    area: '鎌倉',
    score: 5,
    duration: '30–60 分鐘',
    review: '灌籃高手的經典場景。平交道前的海景超美，但人很多有警衛管制！建議上午來。',
    price: '免費',
    reels: [],
  },
  {
    name: '小町通',
    type: '美食・逛街',
    area: '鎌倉',
    score: 4,
    duration: '1–2 小時',
    review: '從鎌倉站延伸到八幡宮的商店街，小吃都做得漂亮但不一定好吃，吻仔魚捲別吃。',
    price: '免費',
    reels: [],
  },
  {
    name: '鶴岡八幡宮',
    type: '神社',
    area: '鎌倉',
    score: 4,
    duration: '45–60 分鐘',
    review: '鎌倉重要的神社之一，沿著參道走很有氣勢。爬上61段石階後，本宮視野遼闊，可以俯瞰鎌倉市景。',
    price: '免費',
    reels: [],
  },
  {
    name: 'bills 七里ヶ浜',
    type: '美食',
    area: '鎌倉',
    score: 3.5,
    duration: '1–1.5 小時',
    review: '鎌倉人氣餐廳，坐在落地窗旁看海很好拍照。不過餐點吃起來普通，錯開午餐時間還是排很久。',
    price: 'NT$400–600',
    reels: [],
  },
 {
    name: '江之島',
    type: '美景',
    area: '江之島',
    score: 5,
    duration: '2–3 小時',
    review: '跨海大橋的風景很美，是韓劇『愛情怎麼翻譯』的拍攝景點，島上是動畫『孤獨搖滾』的場景，登島後可以徒步上山，也可以花錢搭手扶梯。章魚餅很好吃！',
    price: '免費',
    reels: [],
  },
  {
    name: '江之島展望台',
    type: '美景',
    area: '江之島',
    score: 5,
    duration: '1 小時',
    review: '夕陽落在富士山方向，景色非常震撼。波光粼粼的海面搭配觀景台，還能360度欣賞整個相模灣的景色。',
    price: 'NT$100（展望台）',
    reels: [],
  },
 
]

const TABS = [
  { id: 'itinerary', label: '行程', Icon: CalendarDays },
  { id: 'attractions', label: '景點評價', Icon: Star },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function StarIcon({ fill }) {
  if (fill === 'full') return <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
  if (fill === 'empty') return <Star className="h-3.5 w-3.5 fill-none text-slate-200" />
  return (
    <span className="relative inline-flex h-3.5 w-3.5">
      <Star className="h-3.5 w-3.5 fill-none text-slate-200" />
      <span className="absolute inset-0 w-[50%] overflow-hidden">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      </span>
    </span>
  )
}

function ScoreDots({ score }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = score >= n ? 'full' : score >= n - 0.5 ? 'half' : 'empty'
        return <StarIcon key={n} fill={fill} />
      })}
      <span className="ml-1 text-xs text-slate-400">{score != null ? `${score}/5` : '?/5'}</span>
    </div>
  )
}

function TransportBadge({ method, Icon, mins }) {
  return (
    <div className="flex items-center gap-1.5 py-1 pl-[2.625rem] text-xs text-slate-400">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{method}</span>
      <span className="text-slate-300">·</span>
      <Clock className="h-3 w-3" />
      <span>{mins} 分</span>
    </div>
  )
}

function ItineraryRow({ time, place, tags, transport, isLast }) {
  return (
    <div className="flex gap-3">
      {/* 時間軸 */}
      <div className="flex flex-col items-center">
        <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#5a8fa3] ring-2 ring-[#b8d2df] mt-1" />
        {!isLast && <div className="w-px flex-1 bg-[#b8d2df]/60 mt-1" />}
      </div>

      {/* 內容 */}
      <div className={isLast ? 'pb-0' : 'pb-1'}>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xs font-semibold text-[#5a8fa3] tabular-nums">{time}</span>
          <span className="text-sm font-semibold text-slate-800">{place}</span>
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#b8d2df]/30 px-2 py-0.5 text-[11px] font-medium text-[#5a8fa3] ring-1 ring-[#b8d2df]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {transport && (
          <TransportBadge {...transport} />
        )}
      </div>
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

function IgFooter() {
  return (
    <section className="mt-8 rounded-2xl bg-[#5a8fa3] px-6 py-8 text-center text-white shadow-lg shadow-[#b8d2df]">
      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        更多旅遊分享都在 IG
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
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Kamakura() {
  const [activeTab, setActiveTab] = useState('itinerary')
  const [mapOpen, setMapOpen] = useState(false)

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
            東京近郊・一日遊
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            浪漫鎌倉一日遊
          </h1>
          <p className="mt-2 text-base text-slate-600">
            灌籃高手、孤獨搖滾、夕陽海景！
          </p>
          <div className="mt-3 flex justify-center gap-2 text-sm text-slate-400">
            <span>🏄 鎌倉</span>
            <span>·</span>
            <span>🌅 江之島</span>
            <span>·</span>
            <span>🎬 聖地巡禮</span>
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
                href="https://maps.app.goo.gl/g9UC8pnpgy9th27ZA"
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

            {/* Timeline */}
            <section className="mb-8 rounded-2xl bg-white p-5 ring-1 ring-[#b8d2df] shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#5a8fa3]" />
                <h2 className="text-lg font-bold text-slate-800">當日行程</h2>
              </div>
              <div className="space-y-0">
                {ITINERARY.map((item, i) => (
                  <ItineraryRow
                    key={i}
                    {...item}
                    isLast={i === ITINERARY.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* Map image */}
            <section className="mb-8">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="w-full overflow-hidden rounded-2xl ring-2 ring-[#b8d2df] shadow-sm active:scale-[0.99] transition-transform"
              >
                <img
                  src="/map.png"
                  alt="鎌倉路線地圖"
                  className="w-full object-cover"
                />
              </button>
            </section>

            {/* Map lightbox */}
            {mapOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                onClick={() => setMapOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur active:scale-95 transition-transform"
                >
                  <X className="h-5 w-5" />
                </button>
                <img
                  src="/map.png"
                  alt="鎌倉路線地圖"
                  className="max-h-screen max-w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

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
              <p className="mb-4 text-sm text-slate-500">鎌倉・江之島實際遊玩心得</p>
              <div className="space-y-3">
                {ATTRACTIONS.map((a) => (
                  <AttractionCard key={a.name} {...a} />
                ))}
              </div>
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
