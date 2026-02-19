import type { CategoryTotal } from "@/lib/types/checklist"

interface CategoryTabsProps {
  totals: CategoryTotal[]
  activeCategoryId: string
  onSelect: (id: string) => void
}

function formatKrw(n: number): string {
  if (n === 0) return ""
  if (n >= 10000) return `${Math.round(n / 10000)}만`
  return `${n.toLocaleString()}`
}

export function CategoryTabs({
  totals,
  activeCategoryId,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex overflow-x-auto scrollbar-none px-4 gap-1">
        {totals.map((cat) => {
          const isActive = cat.id === activeCategoryId
          const price = formatKrw(cat.priceKrw)
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={[
                "shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive
                  ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                  : "border-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300",
              ].join(" ")}
            >
              {cat.label}
              {price && (
                <span className="ml-1.5 text-xs font-normal text-zinc-400 dark:text-zinc-500">
                  {price}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
