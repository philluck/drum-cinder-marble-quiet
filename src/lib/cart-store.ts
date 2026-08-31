import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PriceItem, PriceList } from "@/lib/price/types";

export type CartLine = {
  id: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      checkoutOpen: false,
      add: (id, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.id === id);
        if (i >= 0) {
          const current = lines[i];
          if (current) lines[i] = { ...current, qty: current.qty + qty };
        } else {
          lines.push({ id, qty });
        }
        set({ lines });
      },
      setQty: (id, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.id !== id) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        });
      },
      remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
      setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen }),
    }),
    {
      name: "tupih-cart",
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export type ResolvedLine = {
  id: string;
  qty: number;
  item: PriceItem;
  categoryLabel: string;
  categoryId: string;
};

export function resolveCart(list: PriceList, lines: CartLine[]): ResolvedLine[] {
  const index = new Map<string, { item: PriceItem; categoryLabel: string; categoryId: string }>();
  for (const cat of list.categories) {
    for (const section of cat.sections) {
      for (const item of section.items) {
        index.set(item.id, {
          item,
          categoryLabel: cat.navLabel,
          categoryId: cat.id,
        });
      }
    }
  }
  const resolved: ResolvedLine[] = [];
  for (const line of lines) {
    const found = index.get(line.id);
    if (!found) continue;
    resolved.push({
      id: line.id,
      qty: line.qty,
      item: found.item,
      categoryLabel: found.categoryLabel,
      categoryId: found.categoryId,
    });
  }
  return resolved;
}

export function cartTotals(resolved: ResolvedLine[]) {
  const amount = resolved.reduce((sum, l) => sum + l.item.price.amount * l.qty, 0);
  const from = resolved.some((l) => l.item.price.from);
  const count = resolved.reduce((sum, l) => sum + l.qty, 0);
  return { amount, from, count };
}
