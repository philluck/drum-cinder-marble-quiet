import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { formatPhoneDisplay } from "@/lib/utils";
import { telegramUrl } from "@/lib/order";

export function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.18em] text-steel uppercase">Мастерская</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Где острить в Иркутске</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-3">
          <article className="bg-surface p-6">
            <MapPin className="size-5 text-steel" />
            <h3 className="mt-4 font-display text-lg">Адрес</h3>
            <p className="mt-2 text-sm text-muted">{SITE.address}</p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline"
            >
              Открыть карту
            </a>
          </article>
          <article className="bg-surface p-6">
            <Phone className="size-5 text-steel" />
            <h3 className="mt-4 font-display text-lg">Связь</h3>
            <p className="mt-2 text-sm text-muted">
              {SITE.master}
              <br />
              WhatsApp, Telegram, звонок
            </p>
            <a
              href={`tel:${SITE.phone}`}
              className="mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline"
            >
              {formatPhoneDisplay(SITE.phone)}
            </a>
          </article>
          <article className="bg-surface p-6">
            <Clock className="size-5 text-steel" />
            <h3 className="mt-4 font-display text-lg">Режим</h3>
            <p className="mt-2 text-sm text-muted">
              По записи. Срок заточки обычно 1–2 дня, срочное — по договорённости.
            </p>
          </article>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={`https://wa.me/${SITE.phoneDigits}`} target="_blank" rel="noreferrer">
              Написать в WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={telegramUrl()} target="_blank" rel="noreferrer">
              Telegram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
