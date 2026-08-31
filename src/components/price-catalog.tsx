import {
  Compass,
  Cross,
  Flower2,
  House,
  PawPrint,
  Pipette,
  Scissors,
  Shirt,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import type { PriceList } from "@/lib/price/types";
import { cn, formatPrice } from "@/lib/utils";

const ICONS: Record<string, typeof Scissors> = {
  manicure: Scissors,
  barber: Scissors,
  kitchen: UtensilsCrossed,
  grooming: PawPrint,
  home: House,
  garden: Flower2,
  tailor: Shirt,
  medical: Cross,
  tweezers: Pipette,
  hunting: Compass,
};

export function PriceCatalog({ list }: { list: PriceList }) {
  const [active, setActive] = useState(list.categories[0]?.id ?? "");
  const category = useMemo(
    () => list.categories.find((c) => c.id === active) ?? list.categories[0],
    [list.categories, active],
  );
  const lines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);
  const setQty = useCart((s) => s.setQty);
  const qtyOf = (id: string) => lines.find((l) => l.id === id)?.qty ?? 0;

  if (!category) return null;

  return (
    <section id="price" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.18em] text-steel uppercase">Прайс</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Что точим и почём</h2>
            <p className="mt-3 max-w-xl text-sm text-muted">{list.disclaimer}</p>
          </div>
          <p className="text-xs text-subtle">
            {list.source === "live" ? "Цены с живого прайса" : "Резервная копия прайса"}
            {" · "}
            бесплатная доставка от{" "}
            <span className="tabular-nums text-muted">
              {list.freeDeliveryFrom.toLocaleString("ru-RU")} ₽
            </span>
          </p>
        </div>

        <div className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {list.categories.map((cat) => {
            const Icon = ICONS[cat.id] ?? Scissors;
            const on = cat.id === category.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-[background-color,color,box-shadow] duration-150",
                  on
                    ? "bg-primary text-primary-fg"
                    : "bg-elevated text-muted shadow-[0_0_0_1px_rgba(243,239,232,0.08)] hover:text-fg",
                )}
              >
                <Icon className="size-4" />
                {cat.navLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(243,239,232,0.08)] sm:p-6">
          <h3 className="font-display text-2xl">{category.title}</h3>
          {category.subtitle ? (
            <p className="mt-2 max-w-2xl text-sm text-muted">{category.subtitle}</p>
          ) : null}

          <div className="mt-6 space-y-8">
            {category.sections.map((section) => (
              <div key={section.title || "main"}>
                {section.title ? (
                  <p className="mb-3 text-xs tracking-[0.16em] text-steel uppercase">
                    {section.title}
                  </p>
                ) : null}
                <ul className="divide-y divide-border">
                  {section.items.map((item) => {
                    const qty = qtyOf(item.id);
                    return (
                      <li
                        key={item.id}
                        className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium sm:text-base">{item.name}</p>
                          {item.note ? (
                            <p className="mt-1 text-xs text-subtle">{item.note}</p>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <p className="min-w-24 text-sm tabular-nums text-steel sm:text-right">
                            {formatPrice(item.price)}
                          </p>
                          {qty > 0 ? (
                            <QtyStepper
                              value={qty}
                              onChange={(n) => setQty(item.id, n)}
                            />
                          ) : (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                add(item.id);
                                toast("Добавлено в заказ", { duration: 1600 });
                              }}
                            >
                              В заказ
                            </Button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-subtle">{list.guarantee}</p>
      </div>
    </section>
  );
}
