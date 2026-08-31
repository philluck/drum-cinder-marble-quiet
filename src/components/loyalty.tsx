import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Loyalty() {
  return (
    <section id="loyalty" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm tracking-[0.18em] text-steel uppercase">Клуб Тупых</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Десятая заточка — за счёт дома
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Для мастеров маникюра, барберов, поваров и грумеров, кто возит инструмент
            регулярно. Считаем заказы по телефону, без пластиковых карточек.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <span className="text-steel">01</span>
              10 заточек — 11-я в подарок, в пределах средней суммы ваших заказов.
            </li>
            <li className="flex gap-3">
              <span className="text-steel">02</span>
              Салонам и кухням — забор по графику и счёт для организации.
            </li>
            <li className="flex gap-3">
              <span className="text-steel">03</span>
              Бесплатная доставка от порога в прайсе, сейчас это 2 000 ₽.
            </li>
          </ul>
          <Button asChild variant="outline" className="mt-8">
            <Link to="/loyalty">Правила программы</Link>
          </Button>
        </div>
        <figure className="overflow-hidden rounded-xl">
          <img
            src="/images/tools.jpg"
            alt="Инструмент, который принимаем в заточку: ножи, ножницы, кусачки, секатор"
            className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
        </figure>
      </div>
    </section>
  );
}
