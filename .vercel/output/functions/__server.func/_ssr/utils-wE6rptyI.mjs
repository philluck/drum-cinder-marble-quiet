import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-wE6rptyI.js
var SITE = {
	name: "ТУПЫХ.NET",
	tagline: "Если тупое — сюда",
	title: "ТУПЫХ.NET — заточка ножей и инструмента в Иркутске",
	description: "Профессиональная заточка маникюрных кусачек, парикмахерских ножниц, кухонных и охотничьих ножей, секаторов. Актуальный прайс 2026. Гарантия. Иркутск.",
	master: "Роман Точильщиков",
	phone: "+79247065921",
	phoneDigits: "79247065921",
	address: "г. Иркутск, ул. Верхняя набережная, д. 145/8",
	city: "Иркутск",
	domain: "https://тупых.net",
	mapsUrl: "https://yandex.ru/maps/?text=%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F%20%D0%BD%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F%2C%20%D0%B4.%20145%2F8",
	developer: {
		name: "Филипп Эникеев",
		url: "https://it.burxan.ru"
	},
	sheetId: "1lo3Ktil_OdmZL0O_4ZxoXC5b7hVElDZ5AOWPPJ-48GY",
	disclaimer: "Цены указаны в рублях. «от» — минимальная стоимость, зависит от состояния и типа инструмента. Точную цену сообщаем после осмотра.",
	guarantee: "Заточка на профессиональном оборудовании. Сохраняем геометрию и рабочий угол. Гарантия на качество заточки."
};
var CATEGORY_META = [
	{
		id: "manicure",
		sheetName: "Маникюр и педикюр",
		navLabel: "Маникюр и педикюр"
	},
	{
		id: "barber",
		sheetName: "Парикмахерский",
		navLabel: "Парикмахерский инструмент"
	},
	{
		id: "kitchen",
		sheetName: "Кухонные и HoReCa",
		navLabel: "Кухонные ножи и HoReCa"
	},
	{
		id: "grooming",
		sheetName: "Грумерский",
		navLabel: "Грумерский инструмент"
	},
	{
		id: "home",
		sheetName: "Бытовой",
		navLabel: "Бытовой инструмент"
	},
	{
		id: "garden",
		sheetName: "Садовый",
		navLabel: "Садовый инструмент"
	},
	{
		id: "tailor",
		sheetName: "Портновский",
		navLabel: "Портновский инструмент"
	},
	{
		id: "medical",
		sheetName: "Медицинский",
		navLabel: "Медицинский инструмент"
	},
	{
		id: "tweezers",
		sheetName: "Пинцеты",
		navLabel: "Пинцеты"
	},
	{
		id: "hunting",
		sheetName: "Охотничьи ножи",
		navLabel: "Охотничьи и туристические ножи"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatRub(amount) {
	return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
}
function formatPrice(price) {
	return (price.from ? "от " : "") + formatRub(price.amount);
}
function formatPhoneDisplay(phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 11 && digits.startsWith("7")) return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
	return phone;
}
function slugItemId(categoryId, name) {
	return `${categoryId}::${name}`;
}
//#endregion
export { formatPrice as a, formatPhoneDisplay as i, SITE as n, formatRub as o, cn as r, slugItemId as s, CATEGORY_META as t };
