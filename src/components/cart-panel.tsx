import * as Dialog from "@radix-ui/react-dialog";
import { Check, Truck, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  cartTotals,
  resolveCart,
  useCart,
} from "@/lib/cart-store";
import { buildOrderMessage, telUrl, telegramUrl, whatsappUrl } from "@/lib/order";
import type { PriceList } from "@/lib/price/types";
import { SITE } from "@/lib/site";
import { cn, formatPrice, formatRub } from "@/lib/utils";

export function CartPanel({ list }: { list: PriceList }) {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const resolved = useMemo(() => resolveCart(list, lines), [list, lines]);
  const totals = cartTotals(resolved);
  const free = totals.amount >= list.freeDeliveryFrom && totals.amount > 0;
  const remaining = Math.max(0, list.freeDeliveryFrom - totals.amount);
  const progress = Math.min(100, (totals.amount / list.freeDeliveryFrom) * 100);
  const [step, setStep] = useState<"cart" | "form">("cart");

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setStep("cart");
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-[-1px_0_0_rgba(243,239,232,0.1)] focus:outline-none"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Dialog.Title className="font-display text-lg">
              {step === "cart" ? "Заказ" : "Оформление"}
            </Dialog.Title>
            <Dialog.Close
              className="grid size-11 place-items-center rounded-md text-muted hover:bg-elevated hover:text-fg"
              aria-label="Закрыть"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          {step === "cart" ? (
            <CartStep
              resolved={resolved}
              totals={totals}
              free={free}
              remaining={remaining}
              progress={progress}
              freeFrom={list.freeDeliveryFrom}
              setQty={setQty}
              onClear={clear}
              onNext={() => setStep("form")}
            />
          ) : (
            <CheckoutStep
              list={list}
              resolved={resolved}
              totals={totals}
              free={free}
              onBack={() => setStep("cart")}
              onSent={() => {
                clear();
                setStep("cart");
                setOpen(false);
              }}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CartStep({
  resolved,
  totals,
  free,
  remaining,
  progress,
  freeFrom,
  setQty,
  onClear,
  onNext,
}: {
  resolved: ReturnType<typeof resolveCart>;
  totals: ReturnType<typeof cartTotals>;
  free: boolean;
  remaining: number;
  progress: number;
  freeFrom: number;
  setQty: (id: string, qty: number) => void;
  onClear: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {resolved.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            Пока пусто. Отметьте позиции в прайсе — соберём сумму и отправим мастеру.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {resolved.map((line) => (
              <li key={line.id} className="flex items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="text-sm">{line.item.name}</p>
                  <p className="mt-1 text-xs text-subtle">{line.categoryLabel}</p>
                  <p className="mt-1 text-sm tabular-nums text-steel">
                    {formatPrice(line.item.price)}
                  </p>
                </div>
                <QtyStepper value={line.qty} onChange={(n) => setQty(line.id, n)} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-border px-5 py-4">
        <div className="rounded-md bg-elevated p-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Truck className="size-4 text-steel" />
            {free
              ? "Бесплатная доставка"
              : `До бесплатной доставки ${formatRub(remaining)}`}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-steel transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-subtle">Порог: {formatRub(freeFrom)}</p>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-subtle">Итого</p>
            <p className="font-display text-2xl tabular-nums">
              {totals.from ? "от " : ""}
              {formatRub(totals.amount)}
            </p>
          </div>
          {resolved.length > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-subtle underline-offset-2 hover:text-muted hover:underline"
            >
              Очистить
            </button>
          ) : null}
        </div>
        <Button className="mt-4 w-full" size="lg" disabled={resolved.length === 0} onClick={onNext}>
          Оформить
        </Button>
      </div>
    </>
  );
}

function CheckoutStep({
  list,
  resolved,
  totals,
  free,
  onBack,
  onSent,
}: {
  list: PriceList;
  resolved: ReturnType<typeof resolveCart>;
  totals: ReturnType<typeof cartTotals>;
  free: boolean;
  onBack: () => void;
  onSent: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function validate(): boolean {
    if (name.trim().length < 2) {
      setError("Укажите имя");
      return false;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Укажите телефон");
      return false;
    }
    if (method === "delivery" && address.trim().length < 6) {
      setError("Укажите адрес доставки");
      return false;
    }
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных");
      return false;
    }
    setError("");
    return true;
  }

  function message() {
    return buildOrderMessage({
      draft: { name, phone, method, address, comment },
      lines: resolved,
      amount: totals.amount,
      from: totals.from,
      freeDelivery: free && method === "delivery",
      freeDeliveryFrom: list.freeDeliveryFrom,
    });
  }

  function sendWhatsApp() {
    if (!validate()) return;
    window.open(whatsappUrl(message()), "_blank", "noopener,noreferrer");
    toast("Открываем WhatsApp с заказом");
    onSent();
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-4">
          <Field label="Имя" htmlFor="order-name">
            <Input
              id="order-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </Field>
          <Field label="Телефон" htmlFor="order-phone">
            <Input
              id="order-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7"
            />
          </Field>
          <fieldset>
            <legend className="text-sm font-medium text-muted">Как передать инструмент</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ["pickup", "Самовывоз"],
                  ["delivery", "Доставка"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMethod(value)}
                  className={cn(
                    "h-11 rounded-md text-sm transition-[background-color,color] duration-150",
                    method === value
                      ? "bg-primary text-primary-fg"
                      : "bg-elevated text-muted",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          {method === "delivery" ? (
            <Field label="Адрес в Иркутске" htmlFor="order-address">
              <Input
                id="order-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="street-address"
              />
            </Field>
          ) : (
            <p className="text-sm text-muted">Заберёте по адресу: {SITE.address}</p>
          )}
          {method === "delivery" ? (
            <p className="flex items-start gap-2 text-sm text-muted">
              {free ? (
                <>
                  <Check className="mt-0.5 size-4 text-steel" />
                  Сумма заказа даёт бесплатную доставку
                </>
              ) : (
                <>
                  <Truck className="mt-0.5 size-4 text-steel" />
                  Бесплатно от {formatRub(list.freeDeliveryFrom)}. Сейчас доставку согласуем отдельно.
                </>
              )}
            </p>
          ) : null}
          <Field label="Комментарий" htmlFor="order-comment">
            <Textarea
              id="order-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Когда удобно, особенности инструмента"
            />
          </Field>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4 accent-steel"
            />
            <span>
              Согласен на{" "}
              <a href="/consent" className="text-fg underline-offset-2 hover:underline">
                обработку персональных данных
              </a>{" "}
              и принимаю{" "}
              <a href="/privacy" className="text-fg underline-offset-2 hover:underline">
                политику конфиденциальности
              </a>
              .
            </span>
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
        </div>
      </div>
      <div className="border-t border-border px-5 py-4">
        <p className="font-display text-xl tabular-nums">
          {totals.from ? "от " : ""}
          {formatRub(totals.amount)}
        </p>
        <Button className="mt-3 w-full" size="lg" onClick={sendWhatsApp}>
          Заказать в WhatsApp
        </Button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button asChild variant="secondary">
            <a href={telegramUrl()} target="_blank" rel="noreferrer">
              Telegram
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={telUrl()}>Позвонить</a>
          </Button>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 w-full py-2 text-sm text-muted hover:text-fg"
        >
          Назад к списку
        </button>
      </div>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
