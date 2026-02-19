import type { ApplianceCategory, ApplianceProduct, AppliancesDB } from "@/lib/types/data"
import appliancesData from "./data.json"

const db = appliancesData as AppliancesDB

/** appliances.json에서 제품 목록 가져오기 */
export function getProducts(
  applianceKey?: string,
  applianceSection?: string,
): ApplianceProduct[] {
  if (!applianceKey) return []
  const cat = db[applianceKey] as ApplianceCategory | undefined
  if (!cat) return []
  if (applianceSection) {
    return cat.sections?.[applianceSection]?.products ?? []
  }
  return cat.products ?? []
}

/** 제품의 최저가 (없으면 0) */
export function getMinPrice(product: ApplianceProduct): number {
  const p = product.price_krw
  if (!p) return 0
  if (typeof p === "number") return p
  if (typeof p === "object" && "min" in p) return (p as { min: number }).min
  return 0
}

/** 제품 표시명 */
export function getProductLabel(product: ApplianceProduct): string {
  return `${product.brand} ${product.model}`
}

/** 제품 노트 (pros/cons 요약) */
export function getProductNote(product: ApplianceProduct): string {
  return product.note ?? ""
}
