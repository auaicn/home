/**
 * Quote - 개별 견적 정보
 */
export interface Quote {
  id: string;
  vendor: string;
  vendorEn?: string;
  productModel: string;
  price: number;
  currency: 'KRW' | 'USD' | 'EUR';
  originalPrice?: number;
  discount?: string;
  url: string;
  specifications: Record<string, string>;
  notes?: string;
  addedDate: string;
  lastUpdated: string;
  references?: string[];
}

/**
 * Product - 제품 (여러 견적 포함)
 */
export interface Product {
  name: string;
  nameEn?: string;
  tags: string[];
  quotes: Quote[];
}

/**
 * Category - 카테고리
 */
export interface Category {
  name: string;
  description: string;
  products: Record<string, Product>;
}

/**
 * Vendor - 업체 정보
 */
export interface Vendor {
  name: string;
  nameEn?: string;
  country?: string;
  website: string;
  category: string;
  description?: string;
  specialties: string[];
  references?: string[];
}

/**
 * QuoteDatabase - 전체 데이터베이스 구조
 */
export interface QuoteDatabase {
  version: string;
  lastUpdated: string;
  categories: Record<string, Category>;
  vendors: Record<string, Vendor>;
  metadata: {
    totalQuotes: number;
    totalVendors: number;
    totalCategories: number;
    currencies: string[];
  };
}
