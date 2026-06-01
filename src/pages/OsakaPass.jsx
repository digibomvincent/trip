import { useState } from 'react'
import IgFollowPopup from '../components/IgFollowPopup.jsx'
import AttractionCard from '../components/AttractionCard.jsx'
import { ATTRACTIONS } from '../data/attractions.js'
import {
  Ticket,
  Star,
  Calculator,
  Instagram,
  ArrowDown,
  CheckSquare,
  Square,
  ExternalLink,
  Plane,
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

const PASS_OPTIONS = [
  { days: 1, price: 3445, label: '1 日券' },
  { days: 2, price: 4920, label: '2 日券' },
]

const SPOTS = [
  { name: '梅田藍天大廈 空中庭園展望台(15:00前入場)', price: 2000 },
  { name: '梅田藍天大廈 絹谷幸二 天空美術館', price: 1300 },
  { name: 'HEP FIVE 摩天輪', price: 1000 },
  { name: '大阪生活今昔館', price: 600 },
  { name: '國立國際美術館', price: 430 },
  { name: '大阪企業家博物館', price: 500 },
  { name: '道頓堀水上觀光船', price: 2000 },
  { name: 'WONDER CRUISE', price: 2000 },
  { name: '上方浮世繪館', price: 700 },
  { name: '通天閣 展望台', price: 1500 },
  { name: 'TOWER SLIDER（通天閣）', price: 1100 },
  { name: '通天閣 Dive＆Walk', price: 3000 },
  { name: '天王寺動物園', price: 500 },
  { name: '慶澤園', price: 300 },
  { name: 'Shinsekai ZAZA', price: 1000 },
  { name: '四天王寺', price: 800 },
  { name: '大阪市立美術館', price: 500 },
  { name: '大阪城天守閣', price: 1200 },
  { name: '大阪城西之丸庭園', price: 300 },
  { name: '大阪城櫓 YAGURA 特別公開', price: 900 },
  { name: 'KAIYODO FIGURE MUSEUM MIRAIZA OSAKA-JO', price: 1000 },
  { name: '大阪城御座船', price: 1800 },
  { name: '大阪水上巴士 Aqua-Liner', price: 2000 },
  { name: 'YORIMICHI Sunset Cruise', price: 1600 },
  { name: '大川櫻花遊覽船', price: 1500 },
  { name: '大阪歷史博物館', price: 600 },
  { name: '大阪和平館', price: 250 },
  { name: '天保山大摩天輪', price: 1000 },
  { name: '聖瑪麗亞號 白天遊覽', price: 1800 },
  { name: '聖瑪麗亞號 黃昏遊覽', price: 2300 },
  { name: '船長線（Captain Line）', price: 1700 },
  { name: 'LEGOLAND® Discovery Center Osaka', price: 3300 },
  { name: 'GLION MUSEUM', price: 1300 },
  { name: '咲洲宇宙塔展望台', price: 1200 },
  { name: '鮮花競放館', price: 500 },
  { name: '大阪市立自然史博物館', price: 300 },
  { name: '大阪市立長居植物園', price: 300 },
  { name: '堺利晶之杜', price: 300 },
  { name: '堺市博物館', price: 200 },
  { name: '萬博紀念公園(需大阪伊丹機場版)', price: 450 },
  { name: '日本第一大摩天輪 OSAKA WHEEL(需大阪伊丹機場版)', price: 1000 },
]

const TABS = [
  { id: 'calculator', label: '方案試算', Icon: Calculator },
  { id: 'reviews', label: '景點評價', Icon: Star },
]

const PERPER_PICKS = [
  '聖瑪麗亞號 白天遊覽',
  '天保山大摩天輪',
  '咲洲宇宙塔展望台',
  '大阪城天守閣',
  '大阪城御座船',
  '鮮花競放館',
]

const PERPER_CHECKED = Object.fromEntries(PERPER_PICKS.map((n) => [n, true]))

// ─── Sub-components ─────────────────────────────────────────────────────────

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

export default function OsakaPass() {
  const [activeTab, setActiveTab] = useState('calculator')
  const [mode, setMode] = useState('perper') // 'perper' | 'custom'
  const [selectedDays, setSelectedDays] = useState(2)
  const [checked, setChecked] = useState(PERPER_CHECKED)

  const isPerper = mode === 'perper'
  const passPrice = PASS_OPTIONS.find((p) => p.days === selectedDays)?.price ?? 4000
  const transportFee = selectedDays === 1 ? 1000 : 2000
  const checkedSpots = SPOTS.filter((s) => checked[s.name])
  const totalOriginal = checkedSpots.reduce((sum, s) => sum + s.price, 0)
  const savings = totalOriginal + transportFee - passPrice

  const toggle = (name) => {
    if (isPerper) return
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const switchMode = (m) => {
    setMode(m)
    if (m === 'perper') {
      setSelectedDays(2)
      setChecked(PERPER_CHECKED)
    } else {
      setSelectedDays(1)
      setChecked({})
    }
  }

  const passAttractions = ATTRACTIONS.filter((a) => a.osakaPass)

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
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c9a227]">
              <img src="/logorb.png" alt="logo" className="h-16 w-16 object-contain" />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#b8d2df]/40 px-3 py-1 text-xs font-semibold text-[#5a8fa3] ring-1 ring-[#b8d2df]">
            <Ticket className="h-3.5 w-3.5" />
            大阪・優惠票券
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-widest text-slate-900 [font-family:'Shippori_Mincho',serif] [text-shadow:0_1px_6px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.08)]">
            大阪周遊卡攻略
          </h1>
          <p className="mt-2 text-base text-slate-600">勾選景點、秒算省多少！</p>
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

        {/* ── 方案試算 Tab ─────────────────────────────────────── */}
        {activeTab === 'calculator' && (
          <>
            {/* 模式切換 */}
            <div className="mb-5 flex gap-2">
              <button
                type="button"
                onClick={() => switchMode('perper')}
                className={[
                  'flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ring-1',
                  isPerper
                    ? 'bg-[#5a8fa3] text-white ring-[#5a8fa3]'
                    : 'bg-white text-slate-500 ring-[#b8d2df]',
                ].join(' ')}
              >
                ✦ perper 玩法
              </button>
              <button
                type="button"
                onClick={() => switchMode('custom')}
                className={[
                  'flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ring-1',
                  !isPerper
                    ? 'bg-[#5a8fa3] text-white ring-[#5a8fa3]'
                    : 'bg-white text-slate-500 ring-[#b8d2df]',
                ].join(' ')}
              >
                自己試算
              </button>
            </div>

            {/* 方案介紹 */}
            <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-[#b8d2df] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="h-5 w-5 text-[#5a8fa3]" />
                <h2 className="text-base font-bold text-slate-800">大阪周遊卡方案</h2>
              </div>
              <div className="flex gap-3">
                {PASS_OPTIONS.map((opt) => (
                  <button
                    key={opt.days}
                    type="button"
                    onClick={() => !isPerper && setSelectedDays(opt.days)}
                    disabled={isPerper && opt.days !== 2}
                    className={[
                      'flex-1 rounded-xl py-3 text-center ring-1',
                      isPerper ? 'cursor-default' : 'transition-colors',
                      selectedDays === opt.days
                        ? 'bg-[#5a8fa3] text-white ring-[#5a8fa3]'
                        : 'bg-white text-slate-400 ring-[#b8d2df] opacity-40',
                    ].join(' ')}
                  >
                    <div className="text-sm font-bold">{opt.label}</div>
                    <div className={`text-xs mt-0.5 ${selectedDays === opt.days ? 'text-white/80' : 'text-slate-400'}`}>
                      ¥{opt.price.toLocaleString()}｜約 NT${(opt.price / 5).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
              <a
                href="https://www.klook.com/zh-TW/activity/82312-amazing-pass-osaka/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#b8d2df]/20 px-4 py-2.5 text-sm font-semibold text-[#5a8fa3] ring-1 ring-[#b8d2df] active:scale-[0.98] transition-transform"
              >
                <ExternalLink className="h-4 w-4" />
                Klook 購票
              </a>
            </section>

            {/* 試算結果 sticky bar */}
            <div className="sticky top-[52px] z-10 -mx-4 mb-4 bg-[#faf7f4]/95 px-4 py-3 backdrop-blur border-b border-[#b8d2df]/50">
              <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-[#b8d2df] shadow-sm">
                {checkedSpots.length === 0 ? (
                  <p className="text-center text-sm text-slate-400">勾選景點開始試算 👇</p>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-slate-500">
                      已勾 <span className="font-bold text-slate-700">{checkedSpots.length}</span> 項・
                      原價 <span className="font-bold text-slate-700">¥{totalOriginal.toLocaleString()}</span>
                      ＋ 交通費 <span className="font-bold text-slate-700">¥{transportFee.toLocaleString()}</span>
                    </div>
                    <div className={`text-sm font-bold ${savings >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {savings >= 0
                        ? `省 ¥${savings.toLocaleString()}（NT$${Math.round(savings / 5).toLocaleString()}）🎉`
                        : `尚差 ¥${Math.abs(savings).toLocaleString()}`}
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-2 px-1 text-xs text-slate-400">
                ※ 此價格僅計算景點票價&交通費，尚有合作餐廳折扣，真的很划算！
              </p>
            </div>

            {/* 景點清單 */}
            <section className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                {isPerper ? (
                  <p className="text-xs text-slate-400">perper 實際玩的景點，僅供參考 🔒</p>
                ) : (
                  <p className="text-xs text-slate-400">勾選你想去的景點（僅列出成人價）</p>
                )}
                {!isPerper && checkedSpots.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setChecked({})}
                    className="text-xs text-rose-400 underline underline-offset-2"
                  >
                    清除全部
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {(isPerper ? SPOTS.filter((s) => PERPER_PICKS.includes(s.name)) : SPOTS).map((spot) => {
                  const isChecked = !!checked[spot.name]
                  return (
                    <button
                      key={spot.name}
                      type="button"
                      onClick={() => toggle(spot.name)}
                      className={[
                        'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ring-1',
                        isPerper ? 'cursor-default' : 'transition-colors active:scale-[0.99]',
                        isChecked
                          ? 'bg-[#5a8fa3]/10 ring-[#5a8fa3]'
                          : 'bg-white ring-[#b8d2df]',
                      ].join(' ')}
                    >
                      {isChecked
                        ? <CheckSquare className="h-5 w-5 shrink-0 text-[#5a8fa3]" />
                        : <Square className="h-5 w-5 shrink-0 text-slate-300" />
                      }
                      <span className={`flex-1 text-sm ${isChecked ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                        {spot.name}
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-sm font-semibold text-slate-700">¥{spot.price.toLocaleString()}</span>
                        <span className="block text-xs text-slate-400">NT${Math.round(spot.price / 5).toLocaleString()}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>

            <IgFooter />
          </>
        )}

        {/* ── 景點評價 Tab ──────────────────────────────────────── */}
        {activeTab === 'reviews' && (
          <>
            <section className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <h2 className="text-xl font-bold text-slate-800">景點評價</h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">大阪周遊卡實際遊玩心得</p>

              {/* 官方連結 */}
              <div className="mb-5 flex flex-col gap-2">
                <a
                  href="https://osaka-amazing-pass.com/cht/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-[#b8d2df] shadow-sm active:scale-[0.98] transition-transform"
                >
                  <span className="text-sm font-semibold text-slate-800">官方網站</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#5a8fa3]" />
                </a>
                <a
                  href="https://www.google.com/maps/d/u/0/viewer?mid=1_5aAIUVwgV8JL8FVx4PUckyEJSCBIz4&femb=1&ll=34.668468867384036%2C135.49536155121748&z=12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-[#b8d2df] shadow-sm active:scale-[0.98] transition-transform"
                >
                  <span className="text-sm font-semibold text-slate-800">官方 Google Maps</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#5a8fa3]" />
                </a>
              </div>
              {passAttractions.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-[#b8d2df] px-4 py-10 text-center text-sm text-slate-400">
                  評價即將新增
                </div>
              ) : (
                <div className="space-y-3">
                  {passAttractions.map((a) => (
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
