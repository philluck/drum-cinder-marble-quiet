import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cartTotals, resolveCart, useCart } from "@/lib/cart-store";
import type { PriceList } from "@/lib/price/types";
import { formatRub } from "@/lib/utils";

export function StickyCart({ list }: { list: PriceList }) {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  const resolved = resolveCart(list, lines);
  const totals = cartTotals(resolved);
  if (totals.count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg items-center justify-between gap-3 rounded-lg bg-primary px-3 py-2 text-primary-fg shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <p className="text-sm">
          <span className="tabular-nums">{totals.count}</span>
          {" · "}
          {totals.from ? "от " : ""}
          <span className="tabular-nums">{formatRub(totals.amount)}</span>
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setOpen(true)}
        >
          К заказу
        </Button>
      </div>
    </div>
  );
}
