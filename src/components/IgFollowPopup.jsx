import { useState, useEffect } from 'react'
import { Instagram, X } from 'lucide-react'

const STORAGE_KEY = 'ig_followed'

export default function IgFollowPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // 已追蹤過就永遠不顯示
    if (localStorage.getItem(STORAGE_KEY)) return
    // 進頁面 1.5 秒後彈出
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  function dismiss() {
    setVisible(false)
  }

  function followed() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[480px] rounded-3xl bg-white p-6 shadow-2xl">
        {/* 關閉 */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 active:scale-95 transition-transform"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 內容 */}
        <div className="text-center">
          <p className="text-lg font-bold text-slate-800">
            用心整理的內容，追蹤一下吧🥹
          </p>
          <p className="mt-1 text-sm text-slate-400">小資旅遊・有趣實用攻略</p>

          <a
            href="https://www.instagram.com/perper_17travel/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#5a8fa3] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#b8d2df] active:scale-[0.98] transition-transform"
          >
            <Instagram className="h-5 w-5" />
            @perper_17travel
          </a>
        </div>

        {/* 按鈕列 */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-500 active:bg-slate-50 transition-colors"
          >
            下次再說
          </button>
          <button
            type="button"
            onClick={followed}
            className="flex-1 rounded-xl bg-[#b8d2df]/40 py-2.5 text-sm font-semibold text-[#5a8fa3] ring-1 ring-[#b8d2df] active:bg-[#b8d2df]/60 transition-colors"
          >
            已追蹤，別再顯示
          </button>
        </div>
      </div>
    </div>
  )
}
