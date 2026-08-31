import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Loyalty } from "@/components/loyalty";
import { PriceCatalog } from "@/components/price-catalog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FALLBACK_PRICE_LIST } from "@/lib/price/fallback";
import { getPriceList } from "@/lib/price/get-price-list";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: () => getPriceList(),
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  const { data } = useQuery({
    queryKey: ["price-list"],
    queryFn: () => getPriceList(),
    initialData: initial ?? FALLBACK_PRICE_LIST,
  });
  const list = data ?? FALLBACK_PRICE_LIST;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} — ${SITE.master}`,
    description: SITE.description,
    url: SITE.domain,
    telephone: SITE.phone,
    image: "/images/hero.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Верхняя набережная, д. 145/8",
      addressLocality: SITE.city,
      addressCountry: "RU",
    },
    areaServed: SITE.city,
  };

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <PriceCatalog list={list} />
        <Loyalty />
        <Contacts />
      </main>
      <SiteFooter />
    </div>
  );
}
