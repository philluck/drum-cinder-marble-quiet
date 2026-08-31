import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { formatPhoneDisplay } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(92vh,820px)] overflow-hidden">
      <img
        src="/images/hero.jpg"
        alt="Заточка ножа на круге: искры по кромке лезвия"
        className="absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,var(--color-bg)_92%)]" />

      <div className="relative mx-auto flex min-h-[min(92vh,820px)] max-w-6xl flex-col justify-end px-4 pt-28 pb-16 sm:pb-20">
        <p className="stagger-in text-sm tracking-[0.18em] text-steel uppercase">
          {SITE.city} · {SITE.master}
        </p>
        <h1 className="stagger-in mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">
          Если тупое —
          <br />
          сюда
        </h1>
        <p className="stagger-in mt-5 max-w-xl text-base text-muted sm:text-lg">
          Профессиональная заточка маникюрных кусачек, парикмахерских ножниц,
          кухонных и охотничьих ножей, секаторов. Сохраняем геометрию. Работаем
          с мастерами и организациями.
        </p>
        <div className="stagger-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#price">Собрать заказ</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`tel:${SITE.phone}`}>{formatPhoneDisplay(SITE.phone)}</a>
          </Button>
        </div>
        <p className="stagger-in mt-6 flex items-center gap-2 text-sm text-muted">
          <MapPin className="size-4 text-steel" />
          {SITE.address}
        </p>
        <a
          href="#how"
          className="mt-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowDown className="size-4" />
          Как это работает
        </a>
      </div>
    </section>
  );
}
