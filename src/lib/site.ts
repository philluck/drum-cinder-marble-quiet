export const SITE = {
  name: "ТУПЫХ.NET",
  tagline: "Если тупое — сюда",
  title: "ТУПЫХ.NET — заточка ножей и инструмента в Иркутске",
  description:
    "Профессиональная заточка маникюрных кусачек, парикмахерских ножниц, кухонных и охотничьих ножей, секаторов. Актуальный прайс 2026. Гарантия. Иркутск.",
  master: "Роман Точильщиков",
  phone: "+79247065921",
  phoneDigits: "79247065921",
  address: "г. Иркутск, ул. Верхняя набережная, д. 145/8",
  city: "Иркутск",
  domain: "https://тупых.net",
  mapsUrl:
    "https://yandex.ru/maps/?text=%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%92%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F%20%D0%BD%D0%B0%D0%B1%D0%B5%D1%80%D0%B5%D0%B6%D0%BD%D0%B0%D1%8F%2C%20%D0%B4.%20145%2F8",
  developer: {
    name: "Филипп Эникеев",
    url: "https://it.burxan.ru",
  },
  sheetId: "1lo3Ktil_OdmZL0O_4ZxoXC5b7hVElDZ5AOWPPJ-48GY",
  disclaimer:
    "Цены указаны в рублях. «от» — минимальная стоимость, зависит от состояния и типа инструмента. Точную цену сообщаем после осмотра.",
  guarantee:
    "Заточка на профессиональном оборудовании. Сохраняем геометрию и рабочий угол. Гарантия на качество заточки.",
} as const;

export const CATEGORY_META: {
  id: string;
  sheetName: string;
  navLabel: string;
}[] = [
  { id: "manicure", sheetName: "Маникюр и педикюр", navLabel: "Маникюр и педикюр" },
  { id: "barber", sheetName: "Парикмахерский", navLabel: "Парикмахерский инструмент" },
  { id: "kitchen", sheetName: "Кухонные и HoReCa", navLabel: "Кухонные ножи и HoReCa" },
  { id: "grooming", sheetName: "Грумерский", navLabel: "Грумерский инструмент" },
  { id: "home", sheetName: "Бытовой", navLabel: "Бытовой инструмент" },
  { id: "garden", sheetName: "Садовый", navLabel: "Садовый инструмент" },
  { id: "tailor", sheetName: "Портновский", navLabel: "Портновский инструмент" },
  { id: "medical", sheetName: "Медицинский", navLabel: "Медицинский инструмент" },
  { id: "tweezers", sheetName: "Пинцеты", navLabel: "Пинцеты" },
  { id: "hunting", sheetName: "Охотничьи ножи", navLabel: "Охотничьи и туристические ножи" },
];
