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
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

// tier: 'basic' = 基本＋高級皆可, 'premium' = 僅高級
const SPOTS = [
  // ── 基本＋高級 ──
  { name: '風見雞之館', price: 500, tier: 'basic' },
  { name: '萌黃之館', price: 500, tier: 'basic' },
  { name: '維也納・奧地利之家', price: 600, tier: 'basic' },
  { name: '芳香之家　荷蘭館', price: 800, tier: 'basic' },
  { name: '丹麥館', price: 600, tier: 'basic' },
  { name: 'SPACE11 達比修博物館', price: 500, tier: 'basic' },
  { name: '神戶北野美術館', price: 500, tier: 'basic' },
  { name: '神戶市立相樂園', price: 300, tier: 'basic' },
  { name: '神戶市立博物館（館藏品展覽室）', price: 300, tier: 'basic' },
  { name: 'KOBE 琉璃珠博物館', price: 500, tier: 'basic' },
  { name: '乒乓球場 Metro（使用30分鐘）', price: 600, tier: 'basic' },
  { name: 'MOSAIC 摩天輪', price: 800, tier: 'basic' },
  { name: 'BANDO 神戶青少年科學館（展覽室）', price: 600, tier: 'basic' },
  { name: '神戶市立小磯紀念美術館', price: 200, tier: 'basic' },
  { name: '神戶之緣美術館（企劃展）', price: 200, tier: 'basic' },
  { name: '兵庫縣立美術館（館藏展）', price: 550, tier: 'basic' },
  { name: '橫尾忠則現代美術館（企劃展）', price: 800, tier: 'basic' },
  { name: 'BB 廣場美術館', price: 500, tier: 'basic' },
  { name: '阪神・淡路大震災紀念館', price: 650, tier: 'basic' },
  { name: '王子動物園', price: 600, tier: 'basic' },
  { name: '白鶴美術館', price: 800, tier: 'basic' },
  { name: '東灘地車博物館', price: 600, tier: 'basic' },
  { name: '澤之鶴資料館', price: 500, tier: 'basic' },
  { name: '白鶴酒造資料館', price: 800, tier: 'basic' },
  { name: '菊正宗酒造資料館', price: 600, tier: 'basic' },
  { name: '神戶酒心館', price: 400, tier: 'basic' },
  { name: '濱福鶴 吟釀工房', price: 500, tier: 'basic' },
  { name: '六甲山牧場', price: 600, tier: 'basic' },
  { name: '有馬溫泉 金之湯（平日）', price: 650, tier: 'basic' },
  { name: '有馬溫泉 銀之湯（平日）', price: 550, tier: 'basic' },
  { name: '郵票文化博物館', price: 800, tier: 'basic' },
  { name: '須磨離宮公園', price: 400, tier: 'basic' },
  { name: '兵庫縣立兵庫津博物館', price: 300, tier: 'basic' },
  // ── 僅高級 ──
  { name: '神戶布引香草園／空中纜車', price: 2500, tier: 'premium' },
  { name: '竹中大工道具館', price: 1000, tier: 'premium' },
  { name: 'boh boh KOBE 號', price: 2200, tier: 'premium' },
  { name: '御座船 安宅丸', price: 1700, tier: 'premium' },
  { name: '皇室公主號', price: 1700, tier: 'premium' },
  { name: '神戶海事博物館', price: 900, tier: 'premium' },
  { name: 'felissimo chocolate museum', price: 1000, tier: 'premium' },
  { name: '神戶動物王國', price: 2400, tier: 'premium' },
  { name: '神戶天際浮舟（平日・附1杯飲料）', price: 1500, tier: 'premium' },
  { name: '神戶時尚美術館', price: 1000, tier: 'premium' },
  { name: '六甲有馬空中纜車（來回）', price: 1400, tier: 'premium' },
  { name: '摩耶 View Line（摩耶纜車＋空中纜車來回）', price: 900, tier: 'premium' },
  { name: 'ROKKO 森林之聲博物館', price: 1700, tier: 'premium' },
  { name: '六甲高山植物園', price: 900, tier: 'premium' },
  { name: '自然體感展望台　六甲枝垂', price: 1000, tier: 'premium' },
  { name: '有馬 鱒魚池（釣魚費用）', price: 1600, tier: 'premium' },
  { name: '有馬玩具博物館', price: 1000, tier: 'premium' },
  { name: '須磨浦山上遊園（空中纜車、軌道車、展望閣）', price: 1500, tier: 'premium' },
]

const TABS = [
  { id: 'calculator', label: '方案試算', Icon: Calculator },
  { id: 'reviews', label: '景點介紹', Icon: Star },
]

// ─── Sub-components ─────────────────────────────────────────────────────────

function IgFooter() {
  return (
    <section className="mt-8 rounded-2xl bg-[#4a6fa3] px-6 py-6 text-white shadow-lg shadow-[#b8d2df]">
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
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#4a6fa3] shadow transition-transform active:scale-95"
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

const PASS_PRICES = {
  basic:   { 1: 2500, 2: 3900 },
  premium: { 1: 4500, 2: 7200 },
}

export default function KobePass() {
  const [activeTab, setActiveTab] = useState('calculator')
  const [passType, setPassType] = useState('basic')   // 'basic' | 'premium'
  const [selectedDays, setSelectedDays] = useState(1)
  const [checked, setChecked] = useState({})

  const passPrice = PASS_PRICES[passType][selectedDays]
  const visibleSpots = passType === 'basic'
    ? SPOTS.filter((s) => s.tier === 'basic')
    : SPOTS

  const checkedSpots = visibleSpots.filter((s) => checked[s.name])
  const totalOriginal = checkedSpots.reduce((sum, s) => sum + s.price, 0)
  const savings = totalOriginal - passPrice

  const toggle = (name) =>
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }))

  const switchPassType = (type) => {
    setPassType(type)
    setChecked({})
  }

  return (
    <div className="min-h-screen bg-[#faf7f4] text-slate-900">
      <IgFollowPopup />
      <div className="mx-auto w-full max-w-[480px] px-4 pb-16">

        {/* ── Cover ──────────────────────────────────────────────── */}
        <section className="relative py-10 text-center">
          <div className="absolute inset-0 -z-10 rounded-b-3xl bg-gradient-to-br from-[#b8d2df] to-[#4a6fa3] opacity-10" />
          <div className="mb-4 flex items-center justify-center gap-4">
            <img
              src="/ig.jpg"
              alt="perper"
              className="h-20 w-20 rounded-full object-cover ring-2 ring-[#b8d2df]"
            />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4a6fa3]">
              <img src="/logorb.png" alt="logo" className="h-16 w-16 object-contain" />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#b8d2df]/40 px-3 py-1 text-xs font-semibold text-[#4a6fa3] ring-1 ring-[#b8d2df]">
            <Ticket className="h-3.5 w-3.5" />
            神戶・優惠票券
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-widest text-slate-900 [font-family:'Shippori_Mincho',serif] [text-shadow:0_1px_6px_rgba(0,0,0,0.15),0_0_1px_rgba(0,0,0,0.08)]">
            神戶觀光 SMART PASSPORT
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
                    ? 'bg-white text-[#4a6fa3] shadow-sm ring-1 ring-[#b8d2df]'
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
            {/* 方案介紹 */}
            <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-[#b8d2df] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="h-5 w-5 text-[#4a6fa3]" />
                <h2 className="text-base font-bold text-slate-800">選擇方案</h2>
              </div>

              {/* 基本 / 高級 切換 */}
              <div className="flex gap-2 mb-3">
                {(['basic', 'premium'] ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => switchPassType(type)}
                    className={[
                      'flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ring-1',
                      passType === type
                        ? 'bg-[#4a6fa3] text-white ring-[#4a6fa3]'
                        : 'bg-white text-slate-500 ring-[#b8d2df]',
                    ].join(' ')}
                  >
                    {type === 'basic' ? '基本票' : '高級票'}
                  </button>
                ))}
              </div>

              {/* 1日 / 2日 切換 */}
              <div className="flex gap-2">
                {[1, 2].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDays(d)}
                    className={[
                      'flex-1 rounded-xl py-3 text-center ring-1 transition-colors',
                      selectedDays === d
                        ? 'bg-[#4a6fa3] text-white ring-[#4a6fa3]'
                        : 'bg-white text-slate-600 ring-[#b8d2df]',
                    ].join(' ')}
                  >
                    <div className="text-sm font-bold">{d} 日券</div>
                    <div className={`text-xs mt-0.5 ${selectedDays === d ? 'text-white/80' : 'text-slate-400'}`}>
                      ¥{PASS_PRICES[passType][d].toLocaleString()}｜約 NT${Math.round(PASS_PRICES[passType][d] / 5).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>

              <a
                href="https://www.feel-kobe.jp/tw/smartpass/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#b8d2df]/20 px-4 py-2.5 text-sm font-semibold text-[#4a6fa3] ring-1 ring-[#b8d2df] active:scale-[0.98] transition-transform"
              >
                <ExternalLink className="h-4 w-4" />
                官方網站購票
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
                ※ 此價格僅計算景點票價，另有合作餐廳折扣等優惠。
              </p>
            </div>

            {/* 景點清單 */}
            <section className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  {passType === 'basic' ? '基本票適用景點' : '高級票適用景點（含基本所有景點）'}
                </p>
                {checkedSpots.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setChecked({})}
                    className="text-xs text-rose-400 underline underline-offset-2"
                  >
                    清除全部
                  </button>
                )}
              </div>

              {/* 高級票 section 分組 */}
              {passType === 'premium' && (
                <p className="mb-2 text-xs font-semibold text-[#4a6fa3]">── 基本＋高級 共通景點</p>
              )}
              <div className="space-y-2 mb-4">
                {SPOTS.filter((s) => s.tier === 'basic').map((spot) => {
                  const isChecked = !!checked[spot.name]
                  return (
                    <button
                      key={spot.name}
                      type="button"
                      onClick={() => toggle(spot.name)}
                      className={[
                        'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ring-1 transition-colors active:scale-[0.99]',
                        isChecked ? 'bg-[#4a6fa3]/10 ring-[#4a6fa3]' : 'bg-white ring-[#b8d2df]',
                      ].join(' ')}
                    >
                      {isChecked
                        ? <CheckSquare className="h-5 w-5 shrink-0 text-[#4a6fa3]" />
                        : <Square className="h-5 w-5 shrink-0 text-slate-300" />}
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

              {passType === 'premium' && (
                <>
                  <p className="mb-2 text-xs font-semibold text-[#4a6fa3]">── 高級票限定景點</p>
                  <div className="space-y-2">
                    {SPOTS.filter((s) => s.tier === 'premium').map((spot) => {
                      const isChecked = !!checked[spot.name]
                      return (
                        <button
                          key={spot.name}
                          type="button"
                          onClick={() => toggle(spot.name)}
                          className={[
                            'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ring-1 transition-colors active:scale-[0.99]',
                            isChecked ? 'bg-[#4a6fa3]/10 ring-[#4a6fa3]' : 'bg-white ring-[#b8d2df]',
                          ].join(' ')}
                        >
                          {isChecked
                            ? <CheckSquare className="h-5 w-5 shrink-0 text-[#4a6fa3]" />
                            : <Square className="h-5 w-5 shrink-0 text-slate-300" />}
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
                </>
              )}
            </section>

            <IgFooter />
          </>
        )}

        {/* ── 景點介紹 Tab ──────────────────────────────────────── */}
        {activeTab === 'reviews' && (
          <>
            <section className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <h2 className="text-xl font-bold text-slate-800">景點介紹</h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">神戶 SMART PASSPORT 實際遊玩心得</p>

              {/* 官方連結 */}
              <div className="mb-5 flex flex-col gap-2">
                <a
                  href="https://www.feel-kobe.jp/tw/smartpass/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-[#b8d2df] shadow-sm active:scale-[0.98] transition-transform"
                >
                  <span className="text-sm font-semibold text-slate-800">官方購票網站</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#4a6fa3]" />
                </a>
                <a
                  href="https://www.feel-kobe.jp/tw/smartpass/facility/#basic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-[#b8d2df] shadow-sm active:scale-[0.98] transition-transform"
                >
                  <span className="text-sm font-semibold text-slate-800">官方景點列表</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#4a6fa3]" />
                </a>
              </div>

              <div className="space-y-4">
                {ATTRACTIONS.filter((a) => a.kobePass).map((a) => (
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
