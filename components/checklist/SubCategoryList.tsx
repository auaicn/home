"use client"

import type {
  ChecklistCategoryDef,
  ChecklistSubCategoryState,
  ChecklistItemDef,
  SelectedProduct,
} from "@/lib/types/checklist"
import { ItemPanel } from "./ItemPanel"

interface SubCategoryListProps {
  midCategory: ChecklistCategoryDef["midCategories"][number]
  subCategoryStates: Map<string, ChecklistSubCategoryState>
  onExpandAll: () => void
  onCollapseAll: () => void
  onToggleExpand: (subCategoryId: string) => void
  onSelectItem: (subCategoryId: string, product: SelectedProduct | null) => void
  onUpdateMemo: (subCategoryId: string, memo: string) => void
  onAddItem: (subCategoryId: string, item: ChecklistItemDef) => void
  onRemoveItem: (subCategoryId: string, itemId: string) => void
}

function formatKrw(n: number): string {
  if (n === 0) return ""
  return `${n.toLocaleString()}원`
}

export function SubCategoryList({
  midCategory,
  subCategoryStates,
  onExpandAll,
  onCollapseAll,
  onToggleExpand,
  onSelectItem,
  onUpdateMemo,
  onAddItem,
  onRemoveItem,
}: SubCategoryListProps) {
  const allExpanded = midCategory.subCategories.every(
    (sub) => subCategoryStates.get(sub.id)?.isExpanded ?? false,
  )

  return (
    <div>
      {/* 모두 열기/닫기 버튼 */}
      <div className="flex justify-end px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={allExpanded ? onCollapseAll : onExpandAll}
          className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          {allExpanded ? "모두 닫기" : "모두 열기"}
        </button>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {midCategory.subCategories.map((sub) => {
          const state = subCategoryStates.get(sub.id)
          const isSelected = !!state?.selectedItem
          const isExpanded = state?.isExpanded ?? true
          const price = state?.selectedItem?.priceKrw ?? 0

          return (
            <div key={sub.id}>
              {/* 소분류 행 */}
              <button
                type="button"
                onClick={() => onToggleExpand(sub.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={[
                      "shrink-0 w-2 h-2 rounded-full",
                      isSelected
                        ? "bg-zinc-900 dark:bg-zinc-100"
                        : "bg-zinc-200 dark:bg-zinc-700",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-sm",
                      isSelected
                        ? "font-medium text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 dark:text-zinc-400",
                    ].join(" ")}
                  >
                    {sub.label}
                  </span>
                  {isSelected && state?.selectedItem?.productLabel && (
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                      {state.selectedItem.productLabel}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {isSelected && price > 0 && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatKrw(price)}
                    </span>
                  )}
                  <span className="text-zinc-300 dark:text-zinc-600 text-xs">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </div>
              </button>

              {/* 항목 패널 */}
              {isExpanded && state && (
                <div className="bg-zinc-50 dark:bg-zinc-800/30 px-4 pb-4 pt-2">
                  <ItemPanel
                    subCategory={sub}
                    state={state}
                    onSelectItem={(product) => onSelectItem(sub.id, product)}
                    onUpdateMemo={(memo) => onUpdateMemo(sub.id, memo)}
                    onAddItem={(item) => onAddItem(sub.id, item)}
                    onRemoveItem={(itemId) => onRemoveItem(sub.id, itemId)}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
