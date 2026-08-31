import { CATEGORY_META, SITE } from "@/lib/site";
import { slugItemId } from "@/lib/utils";
import type { PriceAmount, PriceCategory, PriceItem, PriceList, PriceSection } from "./types";

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else if (c !== "\r") {
      cur += c;
    }
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows.map((r) => r.map((cell) => cell.trim()));
}

export function parsePrice(raw: string): PriceAmount | null {
  const cleaned = raw.replace(/\s/g, " ").trim();
  if (!cleaned) return null;
  const from = /^от(\s|$)/i.test(cleaned);
  const digits = cleaned.replace(/[^\d]/g, "");
  if (!digits) return null;
  const amount = Number(digits);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return { amount, from };
}

const SKIP_NAME =
  /цены указаны|заточка на профессиональном|гарантия на качество|выберите направление|^→|актуальны на/i;

export function parseCategorySheet(
  csv: string,
  meta: (typeof CATEGORY_META)[number],
): PriceCategory | null {
  const rows = parseCsv(csv).filter((r) => r.some((c) => c.length > 0));
  if (rows.length === 0) return null;

  let title = meta.navLabel;
  let subtitle = "";
  let headerIndex = rows.findIndex((r) => /наименование/i.test(r[0] ?? ""));
  if (headerIndex === -1) headerIndex = 2;

  if (rows[0]?.[0]) title = rows[0][0];
  if (headerIndex > 1 && rows[1]?.[0]) subtitle = rows[1][0];

  const sections: PriceSection[] = [];
  let current: PriceSection = { title: "", items: [] };

  const flush = () => {
    if (current.items.length > 0) {
      sections.push(current);
    }
    current = { title: "", items: [] };
  };

  for (const row of rows.slice(headerIndex + 1)) {
    const name = (row[0] ?? "").replace(/^→\s*/, "").trim();
    const priceRaw = row[1] ?? "";
    const note = row[2] ?? "";
    if (!name) continue;
    if (SKIP_NAME.test(name) || (name.length > 90 && !priceRaw)) continue;

    const price = parsePrice(priceRaw);
    if (!price) {
      flush();
      current = { title: name, items: [] };
      continue;
    }

    const item: PriceItem = {
      id: slugItemId(meta.id, name),
      name,
      price,
      note,
    };
    current.items.push(item);
  }
  flush();

  if (sections.length === 0) return null;

  return {
    id: meta.id,
    sheetName: meta.sheetName,
    navLabel: meta.navLabel,
    title,
    subtitle,
    sections,
  };
}

export function parseFreeDelivery(csv: string, fallback = 2000): number {
  const rows = parseCsv(csv);
  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      if (/бесплат/i.test(row[i] ?? "")) {
        const next = (row[i + 1] ?? "").replace(/\s/g, "");
        const n = Number(next);
        if (Number.isFinite(n) && n > 0) return n;
      }
    }
  }
  return fallback;
}

export function assemblePriceList(
  categories: PriceCategory[],
  freeDeliveryFrom: number,
  source: PriceList["source"],
): PriceList {
  return {
    categories,
    freeDeliveryFrom,
    source,
    fetchedAt: new Date().toISOString(),
    disclaimer: SITE.disclaimer,
    guarantee: SITE.guarantee,
  };
}
