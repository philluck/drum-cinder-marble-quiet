import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xl tracking-tight">
              ТУПЫХ<span className="text-muted">.NET</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              {SITE.master}. Заточка ножей и инструмента, {SITE.city}.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <Link to="/cookies" className="hover:text-fg">
              Файлы cookie
            </Link>
            <Link to="/loyalty" className="hover:text-fg">
              Программа лояльности
            </Link>
            <Link to="/privacy" className="hover:text-fg">
              Политика конфиденциальности
            </Link>
            <Link to="/consent" className="hover:text-fg">
              Согласие на обработку ПДн
            </Link>
          </nav>
        </div>
        <div className="edge-line" />
        <div className="flex flex-col gap-2 text-xs text-subtle sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.master}. Все права защищены.</p>
          <p>
            Идея и разработка сайта{" "}
            <a
              href={SITE.developer.url}
              target="_blank"
              rel="noreferrer"
              className="text-muted underline-offset-2 hover:text-fg hover:underline"
            >
              {SITE.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
