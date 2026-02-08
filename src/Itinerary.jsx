import { useEffect, useMemo, useRef, useState } from 'react'
import Papa from 'papaparse'
import {
  CalendarDays,
  MapPin,
  Hotel,
  AlertTriangle,
  LoaderCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react'

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlbSUrrCfQ89v0cndsfOOToAHp3t-gXogcdAyUr8hgS-ZalrHpHkRfBUOoLM8frANMYVXT07pm9gip/pub?gid=0&single=true&output=csv'

function normalizeText(value) {
  if (value == null) return ''
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
}

function parseCsvToItems(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: 'greedy',
  })

  if (result.errors?.length) {
    const first = result.errors[0]
    throw new Error(first?.message || 'CSV parse error')
  }

  const raw = Array.isArray(result.data) ? result.data : []

  let lastDate = ''
  return raw
    .map((row) => {
      const date = normalizeText(row.date)
      const time = normalizeText(row.time)
      const spot = normalizeText(row.spot)
      const stayStation = normalizeText(row['stay station'])
      const hotel = normalizeText(row.hotel)
      const area = normalizeText(row.area)
      const notes = normalizeText(row.備註 ?? row.notes ?? '')

      const resolvedDate = date || lastDate
      if (resolvedDate) lastDate = resolvedDate

      return {
        date: resolvedDate,
        time,
        spot,
        stayStation,
        hotel,
        area,
        notes,
      }
    })
    .filter((item) => item.date && (item.time || item.spot || item.stayStation || item.hotel || item.area || item.notes))
}

function splitLines(text) {
  const t = normalizeText(text)
  if (!t) return []
  return t
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function Itinerary() {
  const [items, setItems] = useState([])
  const [activeDate, setActiveDate] = useState('')
  const [status, setStatus] = useState({ type: 'loading', message: '' })
  const [notesOpenKeys, setNotesOpenKeys] = useState(() => new Set())
  const tabsRef = useRef(null)

  const toggleNotes = (key) => {
    setNotesOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const reload = async () => {
    setStatus({ type: 'loading', message: '' })
    try {
      const res = await fetch(CSV_URL, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      const parsed = parseCsvToItems(text)
      setItems(parsed)
      setStatus({ type: 'ready', message: '' })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setStatus({ type: 'error', message: msg })
    }
  }

  useEffect(() => {
    void reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dates = useMemo(() => {
    const seen = new Set()
    const ordered = []
    for (const it of items) {
      if (!it.date || seen.has(it.date)) continue
      seen.add(it.date)
      ordered.push(it.date)
    }
    return ordered
  }, [items])

  useEffect(() => {
    if (!activeDate && dates.length) setActiveDate(dates[0])
  }, [activeDate, dates])

  const dayItems = useMemo(
    () => items.filter((it) => it.date === activeDate),
    [items, activeDate],
  )

  const hotelInfo = useMemo(() => {
    if (!dayItems.length) return null
    const withHotel = dayItems.find((it) => normalizeText(it.hotel))
    if (!withHotel) return null
    return {
      hotelLines: splitLines(withHotel.hotel),
      stationLines: splitLines(withHotel.stayStation),
    }
  }, [dayItems])

  const scrollActiveTabIntoView = () => {
    const root = tabsRef.current
    if (!root) return
    const el = root.querySelector('[data-active="true"]')
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollActiveTabIntoView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 text-slate-900">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-5">
        <header className="mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-200 backdrop-blur">
            <CalendarDays className="h-4 w-4" />
            旅遊行程 Itinerary
          </div>
          <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-900">
            大阪・京都・琵琶湖・奈良
          </h1>
          <p className="mt-1 text-sm text-slate-600">點選日期，查看當天上午/下午安排與住宿。</p>
        </header>

        <div className="sticky top-0 z-20 -mx-4 mb-4 border-b border-amber-200/70 bg-amber-50/70 px-4 py-3 backdrop-blur">
          <div
            ref={tabsRef}
            className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch]"
          >
            {dates.map((d) => {
              const selected = d === activeDate
              return (
                <button
                  key={d}
                  type="button"
                  data-active={selected ? 'true' : 'false'}
                  onClick={() => setActiveDate(d)}
                  className={[
                    'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition',
                    selected
                      ? 'bg-amber-900 text-amber-50 shadow-sm'
                      : 'bg-white/80 text-slate-700 ring-1 ring-amber-200 hover:bg-white',
                  ].join(' ')}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        {status.type === 'loading' && (
          <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-amber-200 backdrop-blur">
            <div className="flex items-center gap-3 text-slate-700">
              <LoaderCircle className="h-5 w-5 animate-spin text-amber-700" />
              <div className="text-sm">載入行程中…</div>
            </div>
          </div>
        )}

        {status.type === 'error' && (
          <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-rose-200 backdrop-blur">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-700" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-rose-800">載入失敗</div>
                <div className="mt-1 break-words text-xs text-slate-600">{status.message}</div>
                <button
                  type="button"
                  onClick={() => void reload()}
                  className="mt-3 rounded-lg bg-rose-700 px-3 py-2 text-xs font-semibold text-rose-50 hover:bg-rose-800"
                >
                  重新載入
                </button>
              </div>
            </div>
          </div>
        )}

        {status.type === 'ready' && !dates.length && (
          <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-amber-200 backdrop-blur">
            <div className="text-sm text-slate-700">目前沒有可顯示的行程資料。</div>
          </div>
        )}

        {status.type === 'ready' && dates.length > 0 && (
          <section aria-label="itinerary list" className="relative">
            <div className="relative pl-7">
              <div className="pointer-events-none absolute left-3 top-0 h-full w-px bg-amber-200" />

              <div className="space-y-3">
                {dayItems.map((it, idx) => {
                  const spotLines = splitLines(it.spot)
                  const notesLines = splitLines(it.notes)
                  const hasNotes = notesLines.length > 0
                  const hasMeta = it.area || it.time
                  const cardKey = `${it.date}-${idx}-${it.time}-${it.spot}`
                  const notesOpen = notesOpenKeys.has(cardKey)

                  return (
                    <article
                      key={cardKey}
                      className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-amber-100"
                    >
                      <div className="absolute left-2 top-5 h-3 w-3 rounded-full bg-amber-700 ring-4 ring-amber-100" />

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {it.time && (
                              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                                {it.time}
                              </span>
                            )}
                            {it.area && (
                              <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-900">
                                {it.area}
                              </span>
                            )}
                          </div>
                        </div>

                        {hasMeta && (
                          <div className="shrink-0 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-amber-200">
                            Day plan
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex gap-3">
                        {spotLines.length > 0 && (
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                              <MapPin className="h-4 w-4 shrink-0 text-amber-800" />
                              行程
                            </div>
                            <ul className="mt-2 space-y-1 text-sm text-slate-900">
                              {spotLines.map((line, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
                                  <span className="min-w-0 break-words">{line}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {hasNotes && (
                          <>
                            {spotLines.length > 0 && (
                              <div className="w-px shrink-0 bg-amber-200" aria-hidden />
                            )}
                            <div className="min-w-0 flex-1">
                              <button
                                type="button"
                                onClick={() => toggleNotes(cardKey)}
                                className="flex w-full items-center justify-between gap-2 rounded-lg py-1 text-left text-xs font-semibold text-slate-700 hover:bg-amber-50"
                                aria-expanded={notesOpen}
                              >
                                <span className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 shrink-0 text-amber-700" />
                                  備註
                                </span>
                                {notesOpen ? (
                                  <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                                )}
                              </button>
                              {notesOpen && (
                                <ul className="mt-2 space-y-1 text-sm text-slate-900">
                                  {notesLines.map((line, i) => (
                                    <li key={i} className="flex gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
                                      <span className="min-w-0 break-words">{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>

              {hotelInfo && (
                <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-slate-50 shadow-sm ring-1 ring-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-200">
                    <Hotel className="h-4 w-4 text-amber-300" />
                    Tonight&apos;s Hotel
                  </div>
                  <div className="mt-2 space-y-1 text-sm font-semibold">
                    {hotelInfo.hotelLines.map((line, i) => (
                      <div key={i} className="whitespace-pre-line">
                        {line}
                      </div>
                    ))}
                  </div>
                  {hotelInfo.stationLines.length > 0 && (
                    <div className="mt-3 text-xs text-slate-300">
                      <span className="font-semibold text-amber-200">車站：</span>
                      {hotelInfo.stationLines.join(' / ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

