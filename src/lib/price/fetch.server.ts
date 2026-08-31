import { CATEGORY_META, SITE } from "@/lib/site";
import { FALLBACK_PRICE_LIST } from "./fallback";
import { assemblePriceList, parseCategorySheet, parseFreeDelivery } from "./parse";
import type { PriceList } from "./types";

const TTL_MS = 60_000;
let cache: { at: number; data: PriceList } | null = null;

function sheetCsvUrl(sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SITE.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

async function fetchCsv(sheetName: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(sheetCsvUrl(sheetName), {
      signal: controller.signal,
      headers: { "User-Agent": "tupih.net-price/1.0" },
    });
    if (!res.ok) throw new Error(`Sheet ${sheetName}: ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function loadLive(): Promise<PriceList> {
  const seoCsv = await fetchCsv("SEO для сайта");
  const freeDeliveryFrom = parseFreeDelivery(seoCsv, FALLBACK_PRICE_LIST.freeDeliveryFrom);

  const results = await Promise.allSettled(
    CATEGORY_META.map(async (meta) => {
      const csv = await fetchCsv(meta.sheetName);
      return parseCategorySheet(csv, meta);
    }),
  );

  const categories = results
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter((c): c is NonNullable<typeof c> => c !== null);

  if (categories.length === 0) {
    throw new Error("No categories parsed from live sheet");
  }

  return assemblePriceList(categories, freeDeliveryFrom, "live");
}

export async function fetchPriceList(): Promise<PriceList> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const data = await loadLive();
    cache = { at: Date.now(), data };
    return data;
  } catch {
    return {
      ...FALLBACK_PRICE_LIST,
      source: "fallback",
      fetchedAt: new Date().toISOString(),
    };
  }
}
