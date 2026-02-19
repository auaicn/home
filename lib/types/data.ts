export interface ApplianceProduct {
  id: string
  brand: string
  model: string
  price_krw?: { min: number; max: number } | number | null
  note?: string
  [key: string]: unknown
}

export interface ApplianceSection {
  label: string
  products: ApplianceProduct[]
}

export interface ApplianceCategory {
  label: string
  note?: string
  products?: ApplianceProduct[]
  sections?: Record<string, ApplianceSection>
}

export interface AppliancesMeta {
  title: string
  updated: string
  currency: string
  categories: string[]
}

export interface AppliancesDB {
  meta: AppliancesMeta
  [key: string]: ApplianceCategory | AppliancesMeta | unknown
}
