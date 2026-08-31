import { SITE } from "@/lib/site";
import { formatRub } from "@/lib/utils";
import type { ResolvedLine } from "@/lib/cart-store";

export type OrderDraft = {
  name: string;
  phone: string;
  method: "pickup" | "delivery";
  address: string;
  comment: string;
};

export function buildOrderMessage(opts: {
  draft: OrderDraft;
  lines: ResolvedLine[];
  amount: number;
  from: boolean;
  freeDelivery: boolean;
  freeDeliveryFrom: number;
}): string {
  const { draft, lines, amount, from, freeDelivery, freeDeliveryFrom } = opts;
  const totalLabel = (from ? "от " : "") + formatRub(amount);
  const method =
    draft.method === "pickup"
      ? `Самовывоз: ${SITE.address}`
      : freeDelivery
        ? `Доставка бесплатно (от ${formatRub(freeDeliveryFrom)})\nАдрес: ${draft.address}`
        : `Доставка (стоимость согласуем, бесплатно от ${formatRub(freeDeliveryFrom)})\nАдрес: ${draft.address}`;

  const items = lines
    .map((l, i) => {
      const price = (l.item.price.from ? "от " : "") + formatRub(l.item.price.amount);
      return `${i + 1}. ${l.item.name} × ${l.qty} — ${price} (${l.categoryLabel})`;
    })
    .join("\n");

  return [
    `Заказ с ${SITE.name}`,
    "",
    `Имя: ${draft.name}`,
    `Телефон: ${draft.phone}`,
    method,
    "",
    "Позиции:",
    items,
    "",
    `Итого: ${totalLabel}`,
    draft.comment ? `\nКомментарий: ${draft.comment}` : "",
    "",
    "Точную цену подтверждаем после осмотра инструмента.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(text)}`;
}

export function telegramUrl(): string {
  return `https://t.me/+${SITE.phoneDigits}`;
}

export function telUrl(): string {
  return `tel:${SITE.phone}`;
}
