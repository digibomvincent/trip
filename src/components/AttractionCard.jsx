import { MapPin, Clock, Play, Star } from 'lucide-react'

function StarIcon({ fill }) {
  if (fill === 'full') return <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
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
        const fill = score >= n ? 'full' : score >= n - 0.5 ? 'half' : 'empty'
        return <StarIcon key={n} fill={fill} />
      })}
      <span className="ml-1 text-xs text-slate-400">
        {score != null ? `${score}/5` : '?/5'}
      </span>
    </div>
  )
}

export default function AttractionCard({ name, type, area, score, duration, review, price, reels }) {
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
