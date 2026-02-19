"use client"

import { useMemo } from "react"
import type { ChecklistCategoryDef } from "@/lib/types/checklist"
import { useChecklist } from "@/lib/hooks/useChecklist"
import { CategoryTabs } from "./CategoryTabs"
import { MidCategoryCarousel } from "./MidCategoryCarousel"
import { SubCategoryList } from "./SubCategoryList"

interface ChecklistPageProps {
  categories: ChecklistCategoryDef[]
}

function formatKrw(n: number): string {
  if (n === 0) return "0원"
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}억원`
  if (n >= 10000) return `${Math.round(n / 10000).toLocaleString()}만원`
  return `${n.toLocaleString()}원`
}

export function ChecklistPage({ categories }: ChecklistPageProps) {
  const {
    categories: cats,
    subCategoryStates,
    activeCategoryId,
    activeMidCategoryId,
    setActiveCategory,
    setActiveMidCategoryId,
    expandAll,
    collapseAll,
    toggleExpand,
    selectItem,
    updateMemo,
    addItem,
    removeItem,
    totals,
    grandTotal,
  } = useChecklist(categories)

  const activeCategory = useMemo(
    () => cats.find((c) => c.id === activeCategoryId) ?? cats[0],
    [cats, activeCategoryId],
  )

  const activeCategoryTotal = useMemo(
    () => totals.find((t) => t.id === activeCategoryId),
    [totals, activeCategoryId],
  )

  const activeMidCategory = useMemo(
    () => activeCategory?.midCategories.find((m) => m.id === activeMidCategoryId),
    [activeCategory, activeMidCategoryId],
  )

  const activeMidCategoryTotal = useMemo(
    () => activeCategoryTotal?.midCategories.find((m) => m.id === activeMidCategoryId),
    [activeCategoryTotal, activeMidCategoryId],
  )

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            신혼집 준비
          </h1>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            총 {formatKrw(grandTotal)}
          </span>
        </div>
      </header>

      {/* 대분류 탭 */}
      <div className="bg-white dark:bg-zinc-900">
        <div className="max-w-2xl mx-auto">
          <CategoryTabs
            totals={totals}
            activeCategoryId={activeCategoryId}
            onSelect={setActiveCategory}
          />
        </div>
      </div>

      {/* 중분류 캐러셀 */}
      {activeCategory && activeCategoryTotal && (
        <div className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
          <div className="max-w-2xl mx-auto">
            <MidCategoryCarousel
              midCategories={activeCategory.midCategories}
              totals={activeCategoryTotal.midCategories}
              activeMidCategoryId={activeMidCategoryId}
              onSelect={setActiveMidCategoryId}
            />
          </div>
        </div>
      )}

      {/* 중분류 집계 바 */}
      {activeMidCategoryTotal && (
        <div className="bg-white dark:bg-zinc-900 px-4 pb-2 pt-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="max-w-2xl mx-auto flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
            <span>
              {activeMidCategory?.label} · {activeMidCategoryTotal.selectedCount}/{activeMidCategoryTotal.totalCount}개 선택
            </span>
            <span>{activeMidCategoryTotal.priceKrw > 0 ? formatKrw(activeMidCategoryTotal.priceKrw) : ""}</span>
          </div>
        </div>
      )}

      {/* 소분류 목록 */}
      <main className="flex-1 py-2">
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden">
          {activeMidCategory ? (
            <SubCategoryList
              midCategory={activeMidCategory}
              subCategoryStates={subCategoryStates}
              onExpandAll={() => expandAll(activeMidCategoryId)}
              onCollapseAll={() => collapseAll(activeMidCategoryId)}
              onToggleExpand={toggleExpand}
              onSelectItem={selectItem}
              onUpdateMemo={updateMemo}
              onAddItem={addItem}
              onRemoveItem={removeItem}
            />
          ) : (
            <p className="text-sm text-zinc-400 text-center py-8">
              중분류를 선택하세요
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
