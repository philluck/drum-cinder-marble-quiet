import { n as SITE, s as slugItemId, t as CATEGORY_META } from "./utils-wE6rptyI.mjs";
import { t as FALLBACK_PRICE_LIST } from "./fallback-BTs_Ojje.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fetch.server-BvXhUc5m.js
function parseCsv(text) {
	const rows = [];
	let row = [];
	let cur = "";
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (inQuotes) {
			if (c === "\"") {
				if (text[i + 1] === "\"") {
					cur += "\"";
					i += 1;
				} else inQuotes = false;
			} else cur += c;
		} else if (c === "\"") inQuotes = true;
		else if (c === ",") {
			row.push(cur);
			cur = "";
		} else if (c === "\n") {
			row.push(cur);
			rows.push(row);
			row = [];
			cur = "";
		} else if (c !== "\r") cur += c;
	}
	if (cur.length > 0 || row.length > 0) {
		row.push(cur);
		rows.push(row);
	}
	return rows.map((r) => r.map((cell) => cell.trim()));
}
function parsePrice(raw) {
	const cleaned = raw.replace(/\s/g, " ").trim();
	if (!cleaned) return null;
	const from = /^от(\s|$)/i.test(cleaned);
	const digits = cleaned.replace(/[^\d]/g, "");
	if (!digits) return null;
	const amount = Number(digits);
	if (!Number.isFinite(amount) || amount <= 0) return null;
	return {
		amount,
		from
	};
}
var SKIP_NAME = /цены указаны|заточка на профессиональном|гарантия на качество|выберите направление|^→|актуальны на/i;
function parseCategorySheet(csv, meta) {
	const rows = parseCsv(csv).filter((r) => r.some((c) => c.length > 0));
	if (rows.length === 0) return null;
	let title = meta.navLabel;
	let subtitle = "";
	let headerIndex = rows.findIndex((r) => /наименование/i.test(r[0] ?? ""));
	if (headerIndex === -1) headerIndex = 2;
	if (rows[0]?.[0]) title = rows[0][0];
	if (headerIndex > 1 && rows[1]?.[0]) subtitle = rows[1][0];
	const sections = [];
	let current = {
		title: "",
		items: []
	};
	const flush = () => {
		if (current.items.length > 0) sections.push(current);
		current = {
			title: "",
			items: []
		};
	};
	for (const row of rows.slice(headerIndex + 1)) {
		const name = (row[0] ?? "").replace(/^→\s*/, "").trim();
		const priceRaw = row[1] ?? "";
		const note = row[2] ?? "";
		if (!name) continue;
		if (SKIP_NAME.test(name) || name.length > 90 && !priceRaw) continue;
		const price = parsePrice(priceRaw);
		if (!price) {
			flush();
			current = {
				title: name,
				items: []
			};
			continue;
		}
		const item = {
			id: slugItemId(meta.id, name),
			name,
			price,
			note
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
		sections
	};
}
function parseFreeDelivery(csv, fallback = 2e3) {
	const rows = parseCsv(csv);
	for (const row of rows) for (let i = 0; i < row.length; i++) if (/бесплат/i.test(row[i] ?? "")) {
		const next = (row[i + 1] ?? "").replace(/\s/g, "");
		const n = Number(next);
		if (Number.isFinite(n) && n > 0) return n;
	}
	return fallback;
}
function assemblePriceList(categories, freeDeliveryFrom, source) {
	return {
		categories,
		freeDeliveryFrom,
		source,
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		disclaimer: SITE.disclaimer,
		guarantee: SITE.guarantee
	};
}
var TTL_MS = 6e4;
var cache = null;
function sheetCsvUrl(sheetName) {
	return `https://docs.google.com/spreadsheets/d/${SITE.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}
async function fetchCsv(sheetName) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 8e3);
	try {
		const res = await fetch(sheetCsvUrl(sheetName), {
			signal: controller.signal,
			headers: { "User-Agent": "tupih.net-price/1.0" }
		});
		if (!res.ok) throw new Error(`Sheet ${sheetName}: ${res.status}`);
		return await res.text();
	} finally {
		clearTimeout(timer);
	}
}
async function loadLive() {
	const freeDeliveryFrom = parseFreeDelivery(await fetchCsv("SEO для сайта"), FALLBACK_PRICE_LIST.freeDeliveryFrom);
	const categories = (await Promise.allSettled(CATEGORY_META.map(async (meta) => {
		return parseCategorySheet(await fetchCsv(meta.sheetName), meta);
	}))).map((r) => r.status === "fulfilled" ? r.value : null).filter((c) => c !== null);
	if (categories.length === 0) throw new Error("No categories parsed from live sheet");
	return assemblePriceList(categories, freeDeliveryFrom, "live");
}
async function fetchPriceList() {
	if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
	try {
		const data = await loadLive();
		cache = {
			at: Date.now(),
			data
		};
		return data;
	} catch {
		return {
			...FALLBACK_PRICE_LIST,
			source: "fallback",
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
}
//#endregion
export { fetchPriceList };
