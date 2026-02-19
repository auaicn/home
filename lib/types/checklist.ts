// ─── 정적 정의 (lib/data/checklist.ts에서 편집) ──────────────────────────────
//
// 계층 구조:
//   대분류 (Category)     예: 가전제품
//   └─ 중분류 (MidCategory) 예: 주방가전
//      └─ 소분류 (SubCategory) 예: 냉장고
//         └─ 항목 (Item)       예: LG 디오스 846L

export interface ChecklistItemDef {
  id: string
  label: string        // 제품/견적 이름
  priceKrw?: number   // 직접 입력 가격 (appliances.json 외 항목)
  url?: string         // 구매/참고 링크
  memo?: string        // 초기 메모
}

export interface ChecklistSubCategoryDef {
  id: string
  label: string        // 예: 냉장고
  applianceKey?: string     // appliances.json 최상위 키 (예: "refrigerator")
  applianceSection?: string // 중첩 섹션 키 (예: vacuum → "robot")
  items: ChecklistItemDef[] // 수동 입력 항목 (appliances 연결 시 병용 가능)
}

export interface ChecklistMidCategoryDef {
  id: string
  label: string          // 예: 주방가전
  subCategories: ChecklistSubCategoryDef[]
}

export interface ChecklistCategoryDef {
  id: string
  label: string          // 예: 가전제품
  midCategories: ChecklistMidCategoryDef[]
}

// ─── 런타임 상태 ──────────────────────────────────────────────────────────────

/** 항목에 체크된 제품 정보 */
export interface SelectedProduct {
  productId: string
  productLabel: string // brand + model
  priceKrw: number    // 최저가 (없으면 0)
}

/** 소분류 하나의 런타임 상태 */
export interface ChecklistSubCategoryState {
  def: ChecklistSubCategoryDef
  selectedItem: SelectedProduct | null  // 소분류당 항목 하나 선택
  memo: string
  isExpanded: boolean
}

/** 소분류 집계 */
export interface SubCategoryTotal {
  id: string
  label: string
  isSelected: boolean
  priceKrw: number
}

/** 중분류 집계 */
export interface MidCategoryTotal {
  id: string
  label: string
  selectedCount: number
  totalCount: number
  priceKrw: number
  subCategories: SubCategoryTotal[]
}

/** 대분류 집계 */
export interface CategoryTotal {
  id: string
  label: string
  selectedCount: number
  totalCount: number
  priceKrw: number
  midCategories: MidCategoryTotal[]
}
