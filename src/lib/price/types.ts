export type PriceAmount = {
  amount: number;
  from: boolean;
};

export type PriceItem = {
  id: string;
  name: string;
  price: PriceAmount;
  note: string;
};

export type PriceSection = {
  title: string;
  items: PriceItem[];
};

export type PriceCategory = {
  id: string;
  sheetName: string;
  navLabel: string;
  title: string;
  subtitle: string;
  sections: PriceSection[];
};

export type PriceList = {
  categories: PriceCategory[];
  freeDeliveryFrom: number;
  source: "live" | "fallback";
  fetchedAt: string;
  disclaimer: string;
  guarantee: string;
};
