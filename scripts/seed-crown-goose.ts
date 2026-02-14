/**
 * Seed Crown Goose bedding products
 * Run: pnpm tsx scripts/seed-crown-goose.ts
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { QuoteDatabase } from '@/lib/types/quotes';

const DB_PATH = path.join(process.cwd(), 'data', 'quotes.json');

const CROWN_GOOSE_PRODUCTS = [
  {
    product: '거위털이불',
    quotes: [
      {
        vendor: 'Crown Goose',
        vendorEn: 'Crown Goose',
        productModel: 'Grand Duke Goose Down Duvet (Very Warm)',
        price: 471.12,
        currency: 'USD' as const,
        originalPrice: 879.0,
        discount: '40%',
        url: 'https://en.crowngoose.com/products/grand-duke-goose-down-duvet',
        specifications: {
          warmthLevel: 'Very Warm',
          filling: 'Polish Goose Down',
          size: 'Queen',
          fillPower: '800+',
          material: '100% Cotton Shell',
        },
        notes: '프리미염 호텔급 품질, 신혼부부 결혼선물 추천',
        references: [
          'https://en.crowngoose.com/',
          'https://millenniummagazine.com/home-decor/crown-goose-sweet-dreams-are-made-of-this/',
        ],
      },
      {
        vendor: 'Crown Goose',
        vendorEn: 'Crown Goose',
        productModel: 'Duke Goose Down Duvet (Warm)',
        price: 408.55,
        currency: 'USD' as const,
        originalPrice: 762.0,
        discount: '40%',
        url: 'https://en.crowngoose.com/products/duke-goose-down-duvet',
        specifications: {
          warmthLevel: 'Warm',
          filling: 'Polish Goose Down',
          size: 'Queen',
          fillPower: '750+',
          material: '100% Cotton Shell',
        },
        notes: '중간~가을 계절용, 우수한 보온성',
        references: [
          'https://en.crowngoose.com/',
          'https://crowngooseusa.com/',
        ],
      },
      {
        vendor: 'Crown Goose',
        vendorEn: 'Crown Goose',
        productModel: 'Count Goose Down Duvet (Medium)',
        price: 337.03,
        currency: 'USD' as const,
        originalPrice: 629.0,
        discount: '40%',
        url: 'https://en.crowngoose.com/products/count-goose-down-duvet',
        specifications: {
          warmthLevel: 'Medium',
          filling: 'Polish Goose Down',
          size: 'Queen',
          fillPower: '700+',
          material: '100% Cotton Shell',
        },
        notes: '봄/가을용 중간 보온성 이불',
        references: [
          'https://en.crowngoose.com/',
          'https://millenniummagazine.com/home-decor/crown-goose-sweet-dreams-are-made-of-this/',
        ],
      },
      {
        vendor: 'Crown Goose',
        vendorEn: 'Crown Goose',
        productModel: 'Duchess Goose Down Duvet (Cool)',
        price: 274.45,
        currency: 'USD' as const,
        originalPrice: 512.0,
        discount: '40%',
        url: 'https://en.crowngoose.com/products/duchess-goose-down-duvet',
        specifications: {
          warmthLevel: 'Cool',
          filling: 'Polish Goose Down',
          size: 'Queen',
          fillPower: '650+',
          material: '100% Cotton Shell',
        },
        notes: '여름용 가벼운 이불, 통풍성 우수',
        references: [
          'https://en.crowngoose.com/',
          'https://casiestewart.com/review-crown-goose-duvet-cover/',
        ],
      },
    ],
  },
  {
    product: '거위털베개',
    quotes: [
      {
        vendor: 'Crown Goose',
        vendorEn: 'Crown Goose',
        productModel: 'Triple Layer Goose Down Pillow',
        price: 167.17,
        currency: 'USD' as const,
        originalPrice: 334.34,
        discount: '50%',
        url: 'https://en.crowngoose.com/products/triple-layer-goose-down-pillow',
        specifications: {
          type: 'Pillow',
          filling: 'Polish Goose Down',
          size: 'Standard (20x26)',
          layers: 'Triple Layer',
          fillPower: '700+',
        },
        notes: '호텔 수준의 편안함, 조절 가능한 높이',
        references: [
          'https://en.crowngoose.com/',
          'https://millenniummagazine.com/home-decor/crown-goose-sweet-dreams-are-made-of-this/',
        ],
      },
    ],
  },
  {
    product: '거위털매트리스패드',
    quotes: [
      {
        vendor: 'Crown Goose',
        vendorEn: 'Crown Goose',
        productModel: 'Baron Goose Down Topper',
        price: 364.74,
        currency: 'USD' as const,
        originalPrice: 430.41,
        discount: '15%',
        url: 'https://en.crowngoose.com/products/baron-goose-down-topper',
        specifications: {
          type: 'Mattress Topper',
          filling: 'Polish Goose Down',
          size: 'Queen',
          thickness: '2 inches',
          fillPower: '800+',
        },
        notes: '기존 매트리스 위에 덧대서 사용, 편안함 극대화',
        references: [
          'https://en.crowngoose.com/',
          'https://crowngooseusa.com/',
        ],
      },
    ],
  },
];

async function seedCrownGoose() {
  try {
    console.log('🌾 Crown Goose 데이터 시드 시작...\n');

    // Load database
    const dbData = await fs.readFile(DB_PATH, 'utf-8');
    const db: QuoteDatabase = JSON.parse(dbData);

    let addedCount = 0;

    // Add products and quotes
    for (const { product, quotes } of CROWN_GOOSE_PRODUCTS) {
      if (!db.categories['혼수/침구'].products[product]) {
        db.categories['혼수/침구'].products[product] = {
          name: product,
          tags: ['침구', 'Crown Goose', '거위털'],
          quotes: [],
        };
      }

      for (const quoteData of quotes) {
        const quote = {
          ...quoteData,
          id: generateQuoteId(),
          addedDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
        };

        db.categories['혼수/침구'].products[product].quotes.push(quote);
        addedCount++;

        console.log(
          `✅ 추가됨: ${product} > ${quote.productModel} ($${quote.price})`
        );
      }
    }

    // Update metadata
    db.lastUpdated = new Date().toISOString();
    let totalQuotes = 0;
    const currencies = new Set<string>();

    for (const category of Object.values(db.categories)) {
      for (const prod of Object.values(category.products)) {
        totalQuotes += prod.quotes.length;
        for (const quote of prod.quotes) {
          currencies.add(quote.currency);
        }
      }
    }

    db.metadata = {
      totalQuotes,
      totalVendors: Object.keys(db.vendors).length,
      totalCategories: Object.keys(db.categories).length,
      currencies: Array.from(currencies),
    };

    // Save database
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');

    console.log(`\n✨ 완료!\n총 ${addedCount}개 견적 추가됨`);
    console.log(`총 견적: ${db.metadata.totalQuotes}`);
    console.log(`통화: ${db.metadata.currencies.join(', ')}`);
  } catch (error) {
    console.error('❌ 에러:', error);
    process.exit(1);
  }
}

function generateQuoteId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `quote-${timestamp}-${random}`;
}

seedCrownGoose();
