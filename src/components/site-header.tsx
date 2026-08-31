import { Link } from "@tanstack/react-router";
import { Phone, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Mark } from "@/components/mark";
import { SITE } from "@/lib/site";
import { useCart } from "@/lib/cart-store";
import { formatPhoneDisplay } from "@/lib/utils";

export function SiteHeader() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const setOpen = useCart((s) => s.setOpen);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const shown = ready ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2.5 text-fg">
          <Mark className="size-8" />
          <span className="font-display text-sm tracking-tight sm:text-base">
            ТУПЫХ<span className="text-muted">.NET</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="/#price" className="transition-colors hover:text-fg">
            Прайс
          </a>
          <a href="/#how" className="transition-colors hover:text-fg">
            Как сдать
          </a>
          <a href="/#loyalty" className="transition-colors hover:text-fg">
            Клуб
          </a>
          <a href="/#contacts" className="transition-colors hover:text-fg">
            Контакты
          </a>
        </nav>
        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex h-11 items-center gap-2 rounded-md px-2 text-sm text-fg transition-colors hover:bg-elevated sm:px-3"
          >
            <Phone className="size-4 text-steel" />
            <span className="hidden sm:inline">{formatPhoneDisplay(SITE.phone)}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative grid size-11 place-items-center rounded-md text-fg transition-colors hover:bg-elevated"
            aria-label="Заказ"
          >
            <ShoppingBag className="size-5" />
            {shown > 0 ? (
              <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-fg tabular-nums">
                {shown}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
