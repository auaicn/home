"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import type {
  ChecklistCategoryDef,
  ChecklistItemDef,
  ChecklistSubCategoryState,
  SelectedProduct,
  CategoryTotal,
  MidCategoryTotal,
  SubCategoryTotal,
} from "@/lib/types/checklist"

const STORAGE_KEY = "checklist-state-v1"

// localStorage에 저장할 직렬화 가능한 형태
type PersistedState = Record<
  string,
  { selectedItem: SelectedProduct | null; memo: string }
>

function loadPersistedState(): PersistedState {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as PersistedState
  } catch {
    return {}
  }
}

function savePersistedState(states: Map<string, ChecklistSubCategoryState>) {
  if (typeof window === "undefined") return
  const out: PersistedState = {}
  for (const [id, state] of states) {
    out[id] = { selectedItem: state.selectedItem, memo: state.memo }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(out))
}

function buildInitialState(
  categories: ChecklistCategoryDef[],
  persisted: PersistedState,
): Map<string, ChecklistSubCategoryState> {
  const map = new Map<string, ChecklistSubCategoryState>()
  for (const cat of categories) {
    for (const mid of cat.midCategories) {
      for (const sub of mid.subCategories) {
        const saved = persisted[sub.id]
        map.set(sub.id, {
          def: sub,
          selectedItem: saved?.selectedItem ?? null,
          memo: saved?.memo ?? sub.items[0]?.memo ?? "",
          isExpanded: true,
        })
      }
    }
  }
  return map
}

export function useChecklist(initialCategories: ChecklistCategoryDef[]) {
  const [categories, setCategories] =
    useState<ChecklistCategoryDef[]>(initialCategories)

  const [subCategoryStates, setSubCategoryStates] = useState<
    Map<string, ChecklistSubCategoryState>
  >(() => buildInitialState(initialCategories, loadPersistedState()))

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    initialCategories[0]?.id ?? "",
  )
  const [activeMidCategoryId, setActiveMidCategoryId] = useState<string>(
    initialCategories[0]?.midCategories[0]?.id ?? "",
  )

  // 상태 변경 시 localStorage 자동 저장
  useEffect(() => {
    savePersistedState(subCategoryStates)
  }, [subCategoryStates])

  // 중분류 전체 열기/닫기
  const expandAll = useCallback(
    (midCategoryId: string) => {
      setSubCategoryStates((prev) => {
        const next = new Map(prev)
        for (const cat of categories) {
          for (const mid of cat.midCategories) {
            if (mid.id !== midCategoryId) continue
            for (const sub of mid.subCategories) {
              const cur = next.get(sub.id)
              if (cur) next.set(sub.id, { ...cur, isExpanded: true })
            }
          }
        }
        return next
      })
    },
    [categories],
  )

  const collapseAll = useCallback(
    (midCategoryId: string) => {
      setSubCategoryStates((prev) => {
        const next = new Map(prev)
        for (const cat of categories) {
          for (const mid of cat.midCategories) {
            if (mid.id !== midCategoryId) continue
            for (const sub of mid.subCategories) {
              const cur = next.get(sub.id)
              if (cur) next.set(sub.id, { ...cur, isExpanded: false })
            }
          }
        }
        return next
      })
    },
    [categories],
  )

  // 소분류 expand/collapse 토글
  const toggleExpand = useCallback((subCategoryId: string) => {
    setSubCategoryStates((prev) => {
      const next = new Map(prev)
      const cur = next.get(subCategoryId)
      if (cur) next.set(subCategoryId, { ...cur, isExpanded: !cur.isExpanded })
      return next
    })
  }, [])

  // 소분류에서 항목 선택/해제
  const selectItem = useCallback(
    (subCategoryId: string, product: SelectedProduct | null) => {
      setSubCategoryStates((prev) => {
        const next = new Map(prev)
        const cur = next.get(subCategoryId)
        if (cur) next.set(subCategoryId, { ...cur, selectedItem: product })
        return next
      })
    },
    [],
  )

  // 메모 수정
  const updateMemo = useCallback((subCategoryId: string, memo: string) => {
    setSubCategoryStates((prev) => {
      const next = new Map(prev)
      const cur = next.get(subCategoryId)
      if (cur) next.set(subCategoryId, { ...cur, memo })
      return next
    })
  }, [])

  // 소분류에 항목(Item) 추가
  const addItem = useCallback(
    (subCategoryId: string, item: ChecklistItemDef) => {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          midCategories: cat.midCategories.map((mid) => ({
            ...mid,
            subCategories: mid.subCategories.map((sub) =>
              sub.id === subCategoryId
                ? { ...sub, items: [...sub.items, item] }
                : sub,
            ),
          })),
        })),
      )
    },
    [],
  )

  // 소분류에서 항목(Item) 삭제
  const removeItem = useCallback(
    (subCategoryId: string, itemId: string) => {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          midCategories: cat.midCategories.map((mid) => ({
            ...mid,
            subCategories: mid.subCategories.map((sub) =>
              sub.id === subCategoryId
                ? { ...sub, items: sub.items.filter((i) => i.id !== itemId) }
                : sub,
            ),
          })),
        })),
      )
      // 삭제된 항목이 선택된 항목이면 선택 해제
      setSubCategoryStates((prev) => {
        const next = new Map(prev)
        const cur = next.get(subCategoryId)
        if (cur?.selectedItem?.productId === itemId) {
          next.set(subCategoryId, { ...cur, selectedItem: null })
        }
        return next
      })
    },
    [],
  )

  // 대분류 변경 시 첫 번째 중분류로 초기화
  const setActiveCategory = useCallback(
    (categoryId: string) => {
      setActiveCategoryId(categoryId)
      const cat = categories.find((c) => c.id === categoryId)
      if (cat?.midCategories[0]) {
        setActiveMidCategoryId(cat.midCategories[0].id)
      }
    },
    [categories],
  )

  // 집계 계산
  const totals = useMemo<CategoryTotal[]>(() => {
    return categories.map((cat) => {
      const midCategories: MidCategoryTotal[] = cat.midCategories.map((mid) => {
        const subCategories: SubCategoryTotal[] = mid.subCategories.map(
          (sub) => {
            const state = subCategoryStates.get(sub.id)
            return {
              id: sub.id,
              label: sub.label,
              isSelected: !!state?.selectedItem,
              priceKrw: state?.selectedItem?.priceKrw ?? 0,
            }
          },
        )
        return {
          id: mid.id,
          label: mid.label,
          selectedCount: subCategories.filter((s) => s.isSelected).length,
          totalCount: subCategories.length,
          priceKrw: subCategories.reduce((s, v) => s + v.priceKrw, 0),
          subCategories,
        }
      })
      return {
        id: cat.id,
        label: cat.label,
        selectedCount: midCategories.reduce((s, v) => s + v.selectedCount, 0),
        totalCount: midCategories.reduce((s, v) => s + v.totalCount, 0),
        priceKrw: midCategories.reduce((s, v) => s + v.priceKrw, 0),
        midCategories,
      }
    })
  }, [categories, subCategoryStates])

  const grandTotal = useMemo(
    () => totals.reduce((s, v) => s + v.priceKrw, 0),
    [totals],
  )

  return {
    categories,
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
  }
}
