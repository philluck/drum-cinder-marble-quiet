import { createServerFn } from "@tanstack/react-start";
import { FALLBACK_PRICE_LIST } from "./fallback";
import type { PriceList } from "./types";

export const getPriceList = createServerFn({ method: "GET" }).handler(
  async (): Promise<PriceList> => {
    try {
      const { fetchPriceList } = await import("./fetch.server");
      return await fetchPriceList();
    } catch {
      return {
        ...FALLBACK_PRICE_LIST,
        source: "fallback",
        fetchedAt: new Date().toISOString(),
      };
    }
  },
);
