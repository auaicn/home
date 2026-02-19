"use client"

import { useState, useRef, useEffect } from "react"
import type {
  ChecklistSubCategoryDef,
  ChecklistSubCategoryState,
  ChecklistItemDef,
  SelectedProduct,
} from "@/lib/types/checklist"
import { getProducts, getMinPrice, getProductLabel, getProductNote } from "@/lib/data/data"

interface ItemPanelProps {
  subCategory: ChecklistSubCategoryDef
  state: ChecklistSubCategoryState
  onSelectItem: (product: SelectedProduct | null) => void
  onUpdateMemo: (memo: string) => void
  onAddItem: (item: ChecklistItemDef) => void
  onRemoveItem: (itemId: string) => void
}

function formatKrw(n: number): string {
  if (n === 0) return "가격 미입력"
  return `${n.toLocaleString()}원`
}

interface MemoAreaProps {
  memo: string
  defaultNote: string
  onChange: (v: string) => void
  onBlur: () => void
  onReset: () => void
}

function MemoArea({ memo, defaultNote, onChange, onBlur, onReset }: MemoAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 내용에 따라 높이 자동 조절
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }, [memo])

  return (
    <div className="mt-1.5 flex gap-2 items-start">
      <textarea
        ref={textareaRef}
        value={memo}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={2}
        placeholder="메모"
        className="flex-1 text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-1 focus:ring-zinc-400 placeholder:text-zinc-300 overflow-hidden"
      />
      <div className="flex flex-col gap-1 shrink-0">
        <button
          type="button"
          onClick={onBlur}
          className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          title="저장"
        >
          저장
        </button>
        <button
          type="button"
          onClick={onReset}
          className={[
            "text-xs transition-colors",
            memo !== defaultNote
              ? "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              : "text-zinc-200 dark:text-zinc-700 cursor-default",
          ].join(" ")}
          title="초기화"
          disabled={memo === defaultNote}
        >
          초기화
        </button>
      </div>
    </div>
  )
}

export function ItemPanel({
  subCategory,
  state,
  onSelectItem,
  onUpdateMemo,
  onAddItem,
  onRemoveItem,
}: ItemPanelProps) {
  const [memo, setMemo] = useState(state.memo)
  const [addingLabel, setAddingLabel] = useState("")
  const [addingPrice, setAddingPrice] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  // appliances.json 연결 제품
  const applianceProducts = getProducts(
    subCategory.applianceKey,
    subCategory.applianceSection,
  )

  // 현재 선택된 항목의 기본 note (초기화 기준값)
  const selectedNote = (() => {
    if (!state.selectedItem) return ""
    const ap = applianceProducts.find((p) => (p.id as string) === state.selectedItem?.productId)
    if (ap) return getProductNote(ap)
    const manual = subCategory.items.find((i) => i.id === state.selectedItem?.productId)
    return manual?.memo ?? ""
  })()

  function handleMemoBlur() {
    onUpdateMemo(memo)
  }

  function handleResetMemo() {
    setMemo(selectedNote)
    onUpdateMemo(selectedNote)
  }

  function handleSelectAppliance(productId: string, productLabel: string, priceKrw: number, note: string) {
    const alreadySelected = state.selectedItem?.productId === productId
    if (alreadySelected) {
      onSelectItem(null)
      setMemo("")
      onUpdateMemo("")
    } else {
      onSelectItem({ productId, productLabel, priceKrw })
      setMemo(note)
      onUpdateMemo(note)
    }
  }

  function handleSelectManualItem(item: ChecklistItemDef) {
    const alreadySelected = state.selectedItem?.productId === item.id
    if (alreadySelected) {
      onSelectItem(null)
      setMemo("")
      onUpdateMemo("")
    } else {
      onSelectItem({
        productId: item.id,
        productLabel: item.label,
        priceKrw: item.priceKrw ?? 0,
      })
      const note = item.memo ?? ""
      setMemo(note)
      onUpdateMemo(note)
    }
  }

  function handleAddSubmit() {
    const label = addingLabel.trim()
    if (!label) return
    const price = Number.parseInt(addingPrice.replace(/,/g, ""), 10)
    const newItem: ChecklistItemDef = {
      id: `item-${Date.now()}`,
      label,
      priceKrw: Number.isNaN(price) ? 0 : price,
    }
    onAddItem(newItem)
    setAddingLabel("")
    setAddingPrice("")
    setIsAdding(false)
  }

  const hasAppliances = applianceProducts.length > 0
  const hasManualItems = subCategory.items.length > 0

  return (
    <div className="space-y-4">
      {/* appliances.json 연결 제품 목록 */}
      {hasAppliances && (
        <div>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-2">
            비교 제품 ({applianceProducts.length}개)
          </p>
          <div className="space-y-1.5">
            {applianceProducts.map((product) => {
              const productId = product.id as string
              const productLabel = getProductLabel(product)
              const price = getMinPrice(product)
              const note = getProductNote(product)
              const isSelected = state.selectedItem?.productId === productId

              return (
                <div key={productId}>
                  <button
                    type="button"
                    onClick={() => handleSelectAppliance(productId, productLabel, price, note)}
                    className={[
                      "w-full text-left px-3 py-2 rounded-lg border transition-colors",
                      isSelected
                        ? "border-zinc-900 bg-white dark:border-zinc-300 dark:bg-zinc-900"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 bg-white dark:bg-zinc-900",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm text-zinc-800 dark:text-zinc-200 truncate">
                          {productLabel}
                        </p>
                        {note && (
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                            {note}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {formatKrw(price)}
                        </p>
                      </div>
                    </div>
                  </button>
                  {/* 선택된 항목 바로 아래 메모 영역 */}
                  {isSelected && (
                    <MemoArea
                      memo={memo}
                      defaultNote={selectedNote}
                      onChange={setMemo}
                      onBlur={handleMemoBlur}
                      onReset={handleResetMemo}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 수동 입력 항목 목록 */}
      {hasManualItems && (
        <div>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-2">
            직접 입력 항목
          </p>
          <div className="space-y-1.5">
            {subCategory.items.map((item) => {
              const isSelected = state.selectedItem?.productId === item.id
              return (
                <div key={item.id} className="group">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectManualItem(item)}
                      className={[
                        "flex-1 text-left px-3 py-2 rounded-lg border transition-colors",
                        isSelected
                          ? "border-zinc-900 bg-white dark:border-zinc-300 dark:bg-zinc-900"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 bg-white dark:bg-zinc-900",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-sm text-zinc-800 dark:text-zinc-200 block truncate">
                            {item.label}
                          </span>
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-blue-500 hover:underline truncate block"
                            >
                              {new URL(item.url).hostname}
                            </a>
                          )}
                        </div>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 shrink-0">
                          {item.priceKrw ? `${item.priceKrw.toLocaleString()}원` : ""}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-300 dark:text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                  {/* 선택된 항목 바로 아래 메모 영역 */}
                  {isSelected && (
                    <MemoArea
                      memo={memo}
                      defaultNote={selectedNote}
                      onChange={setMemo}
                      onBlur={handleMemoBlur}
                      onReset={handleResetMemo}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 항목 추가 */}
      {isAdding ? (
        <div className="space-y-2">
          <input
            type="text"
            value={addingLabel}
            onChange={(e) => setAddingLabel(e.target.value)}
            placeholder="항목 이름"
            autoFocus
            className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          <input
            type="text"
            value={addingPrice}
            onChange={(e) => setAddingPrice(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSubmit()
              if (e.key === "Escape") setIsAdding(false)
            }}
            placeholder="가격 (원, 선택)"
            className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddSubmit}
              className="text-sm px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg"
            >
              추가
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-sm text-zinc-400 px-2"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          + 항목 추가
        </button>
      )}
    </div>
  )
}
