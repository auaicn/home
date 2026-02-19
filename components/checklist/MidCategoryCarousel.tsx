import type { ChecklistCategoryDef, MidCategoryTotal } from "@/lib/types/checklist"

interface MidCategoryCarouselProps {
  midCategories: ChecklistCategoryDef["midCategories"]
  totals: MidCategoryTotal[]
  activeMidCategoryId: string
  onSelect: (id: string) => void
}

function formatKrw(n: number): string {
  if (n === 0) return ""
  if (n >= 10000) return `${Math.round(n / 10000)}만`
  return `${n.toLocaleString()}`
}

export function MidCategoryCarousel({
  midCategories,
  totals,
  activeMidCategoryId,
  onSelect,
}: MidCategoryCarouselProps) {
  const totalMap = new Map(totals.map((t) => [t.id, t]))

  return (
    <div className="flex overflow-x-auto scrollbar-none px-4 py-3 gap-2">
      {midCategories.map((mid) => {
        const isActive = mid.id === activeMidCategoryId
        const total = totalMap.get(mid.id)
        const price = formatKrw(total?.priceKrw ?? 0)
        const selected = total?.selectedCount ?? 0
        const totalCount = total?.totalCount ?? mid.subCategories.length

        return (
          <button
            key={mid.id}
            type="button"
            onClick={() => onSelect(mid.id)}
            className={[
              "shrink-0 flex flex-col items-start px-3 py-2 rounded-lg border text-left transition-colors",
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 hover:border-zinc-400",
            ].join(" ")}
          >
            <span className="text-sm font-medium whitespace-nowrap">{mid.label}</span>
            <span
              className={[
                "text-xs mt-0.5",
                isActive
                  ? "text-zinc-300 dark:text-zinc-600"
                  : "text-zinc-400 dark:text-zinc-500",
              ].join(" ")}
            >
              {selected}/{totalCount}
              {price && ` · ${price}`}
            </span>
          </button>
        )
      })}
    </div>
  )
}
