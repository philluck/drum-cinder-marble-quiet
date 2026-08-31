const STEPS = [
  {
    n: "01",
    title: "Выбираете позиции",
    text: "Отмечаете в прайсе, что нужно заточить. Сразу видите сумму — без звонка «а почём кусачки».",
  },
  {
    n: "02",
    title: "Отправляете заказ",
    text: "WhatsApp с готовым списком. Самовывоз на Набережной или доставка по Иркутску.",
  },
  {
    n: "03",
    title: "Забираете острыми",
    text: "Смотрим инструмент, подтверждаем цену, точим с сохранением угла. Гарантия на заточку.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.18em] text-steel uppercase">Логика</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Три шага, без очереди у витрины</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.n} className="bg-surface px-6 py-8">
              <p className="font-display text-sm text-steel tabular-nums">{step.n}</p>
              <h3 className="mt-4 font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
