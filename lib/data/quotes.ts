import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { QuoteDatabase, Quote, Product } from '@/lib/types/quotes';

const DB_PATH = path.join(process.cwd(), 'data', 'quotes.json');
const BACKUP_DIR = path.join(process.cwd(), 'data', '.backups');

/**
 * Load quotes from JSON file
 */
export async function loadQuotes(): Promise<QuoteDatabase> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to load quotes: ${error}`);
  }
}

/**
 * Save quotes to JSON file with backup
 */
export async function saveQuotes(db: QuoteDatabase): Promise<void> {
  try {
    // Update metadata
    db.lastUpdated = new Date().toISOString();
    db.metadata = calculateMetadata(db);

    // Create backup directory if not exists
    try {
      await fs.mkdir(BACKUP_DIR, { recursive: true });
    } catch {
      // Directory already exists
    }

    // Create backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `quotes-${timestamp}.json`);
    try {
      const existingData = await fs.readFile(DB_PATH, 'utf-8');
      await fs.writeFile(backupPath, existingData, 'utf-8');
    } catch {
      // No existing file to backup
    }

    // Save new data
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Failed to save quotes: ${error}`);
  }
}

/**
 * Calculate metadata from database
 */
function calculateMetadata(db: QuoteDatabase) {
  let totalQuotes = 0;
  const currencies = new Set<string>();

  for (const category of Object.values(db.categories)) {
    for (const product of Object.values(category.products)) {
      totalQuotes += product.quotes.length;
      for (const quote of product.quotes) {
        currencies.add(quote.currency);
      }
    }
  }

  return {
    totalQuotes,
    totalVendors: Object.keys(db.vendors).length,
    totalCategories: Object.keys(db.categories).length,
    currencies: Array.from(currencies),
  };
}

/**
 * Filter products by category
 */
export function filterByCategory(db: QuoteDatabase, category: string): Product[] {
  const categoryData = db.categories[category];
  if (!categoryData) return [];
  return Object.values(categoryData.products);
}

/**
 * Search quotes by keyword
 */
export function searchQuotes(db: QuoteDatabase, keyword: string): Quote[] {
  const results: Quote[] = [];
  const lowerKeyword = keyword.toLowerCase();

  for (const category of Object.values(db.categories)) {
    for (const product of Object.values(category.products)) {
      for (const quote of product.quotes) {
        if (
          quote.vendor.toLowerCase().includes(lowerKeyword) ||
          quote.productModel.toLowerCase().includes(lowerKeyword) ||
          product.name.toLowerCase().includes(lowerKeyword)
        ) {
          results.push(quote);
        }
      }
    }
  }

  return results;
}

/**
 * Get all quotes for a specific product
 */
export function getProductQuotes(
  db: QuoteDatabase,
  category: string,
  product: string
): Quote[] {
  const categoryData = db.categories[category];
  if (!categoryData) return [];

  const productData = categoryData.products[product];
  if (!productData) return [];

  return productData.quotes;
}

/**
 * Get quotes by vendor
 */
export function getVendorQuotes(db: QuoteDatabase, vendor: string): Quote[] {
  const results: Quote[] = [];

  for (const category of Object.values(db.categories)) {
    for (const product of Object.values(category.products)) {
      for (const quote of product.quotes) {
        if (quote.vendor === vendor) {
          results.push(quote);
        }
      }
    }
  }

  return results;
}

/**
 * Add a new quote to database
 */
export async function addQuote(
  category: string,
  product: string,
  quote: Omit<Quote, 'id' | 'addedDate' | 'lastUpdated'>
): Promise<Quote> {
  // Validate required fields
  if (!quote.vendor || !quote.productModel || !quote.price || !quote.url) {
    throw new Error('Missing required fields: vendor, productModel, price, url');
  }

  // Validate URL format
  try {
    new URL(quote.url);
  } catch {
    throw new Error(`Invalid URL: ${quote.url}`);
  }

  // Validate price
  if (quote.price <= 0) {
    throw new Error('Price must be greater than 0');
  }

  // Create new quote with ID and timestamps
  const newQuote: Quote = {
    ...quote,
    id: generateQuoteId(),
    addedDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  // Load database
  const db = await loadQuotes();

  // Initialize category if not exists
  if (!db.categories[category]) {
    db.categories[category] = {
      name: category,
      description: '',
      products: {},
    };
  }

  // Initialize product if not exists
  if (!db.categories[category].products[product]) {
    db.categories[category].products[product] = {
      name: product,
      tags: [],
      quotes: [],
    };
  }

  // Add quote
  db.categories[category].products[product].quotes.push(newQuote);

  // Save database
  await saveQuotes(db);

  return newQuote;
}

/**
 * Generate unique quote ID
 */
function generateQuoteId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `quote-${timestamp}-${random}`;
}

/**
 * Delete quote by ID
 */
export async function deleteQuote(quoteId: string): Promise<boolean> {
  const db = await loadQuotes();
  let found = false;

  for (const category of Object.values(db.categories)) {
    for (const product of Object.values(category.products)) {
      const index = product.quotes.findIndex((q) => q.id === quoteId);
      if (index !== -1) {
        product.quotes.splice(index, 1);
        found = true;
      }
    }
  }

  if (found) {
    await saveQuotes(db);
  }

  return found;
}

/**
 * Get quote by ID
 */
export async function getQuoteById(quoteId: string): Promise<Quote | null> {
  const db = await loadQuotes();

  for (const category of Object.values(db.categories)) {
    for (const product of Object.values(category.products)) {
      const quote = product.quotes.find((q) => q.id === quoteId);
      if (quote) return quote;
    }
  }

  return null;
}

/**
 * Get all categories
 */
export function getAllCategories(db: QuoteDatabase): string[] {
  return Object.keys(db.categories);
}
