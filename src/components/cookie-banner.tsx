import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "tupih-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-lg bg-elevated p-4 shadow-[0_0_0_1px_rgba(243,239,232,0.12)] sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-muted">
          Сайт хранит в браузере состав заказа и факт согласия с cookie. Это нужно,
          чтобы корзина не обнулялась. Подробнее — в{" "}
          <Link to="/cookies" className="text-fg underline-offset-2 hover:underline">
            политике cookie
          </Link>
          .
        </p>
        <Button
          size="sm"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
        >
          Понятно
        </Button>
      </div>
    </div>
  );
}
