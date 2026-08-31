import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { CartPanel } from "@/components/cart-panel";
import { CookieBanner } from "@/components/cookie-banner";
import { StickyCart } from "@/components/sticky-cart";
import { FALLBACK_PRICE_LIST } from "@/lib/price/fallback";
import { getPriceList } from "@/lib/price/get-price-list";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <CartHost />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "#1c1916",
            color: "#f3efe8",
            border: "1px solid #2a2724",
          },
        }}
      />
    </QueryClientProvider>
  );
}

function CartHost() {
  const { data } = useQuery({
    queryKey: ["price-list"],
    queryFn: () => getPriceList(),
    placeholderData: FALLBACK_PRICE_LIST,
  });
  const list = data ?? FALLBACK_PRICE_LIST;
  return (
    <>
      <CartPanel list={list} />
      <StickyCart list={list} />
      <CookieBanner />
    </>
  );
}
