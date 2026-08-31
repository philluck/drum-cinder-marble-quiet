import { i as __toESM } from "../_runtime.mjs";
import { a as formatPrice, i as formatPhoneDisplay, n as SITE, r as cn } from "./utils-wE6rptyI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as FALLBACK_PRICE_LIST } from "./fallback-BTs_Ojje.mjs";
import { _ as Compass, b as ArrowDown, d as PawPrint, g as Cross, h as Flower2, l as Pipette, m as House, n as UtensilsCrossed, o as Shirt, p as MapPin, s as Scissors, u as Phone, v as Clock } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useCart, i as telegramUrl, n as Route$4, o as Button, r as getPriceList, s as QtyStepper } from "./router-Mip_sizj.mjs";
import { n as SiteHeader, t as SiteFooter } from "./site-header-Wgmbed1w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Df_JTr3J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contacts() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contacts",
		className: "scroll-mt-20 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-[0.18em] text-steel uppercase",
					children: "Мастерская"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl sm:text-4xl",
					children: "Где острить в Иркутске"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "bg-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5 text-steel" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg",
									children: "Адрес"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: SITE.address
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: SITE.mapsUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline",
									children: "Открыть карту"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "bg-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-5 text-steel" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg",
									children: "Связь"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: [
										SITE.master,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"WhatsApp, Telegram, звонок"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${SITE.phone}`,
									className: "mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline",
									children: formatPhoneDisplay(SITE.phone)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "bg-surface p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5 text-steel" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg",
									children: "Режим"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "По записи. Срок заточки обычно 1–2 дня, срочное — по договорённости."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://wa.me/${SITE.phoneDigits}`,
							target: "_blank",
							rel: "noreferrer",
							children: "Написать в WhatsApp"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: telegramUrl(),
							target: "_blank",
							rel: "noreferrer",
							children: "Telegram"
						})
					})]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate min-h-[min(92vh,820px)] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero.jpg",
				alt: "Заточка ножа на круге: искры по кромке лезвия",
				className: "absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,var(--color-bg)_92%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-[min(92vh,820px)] max-w-6xl flex-col justify-end px-4 pt-28 pb-16 sm:pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "stagger-in text-sm tracking-[0.18em] text-steel uppercase",
						children: [
							SITE.city,
							" · ",
							SITE.master
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "stagger-in mt-4 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl",
						children: [
							"Если тупое —",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"сюда"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "stagger-in mt-5 max-w-xl text-base text-muted sm:text-lg",
						children: "Профессиональная заточка маникюрных кусачек, парикмахерских ножниц, кухонных и охотничьих ножей, секаторов. Сохраняем геометрию. Работаем с мастерами и организациями."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stagger-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#price",
								children: "Собрать заказ"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${SITE.phone}`,
								children: formatPhoneDisplay(SITE.phone)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "stagger-in mt-6 flex items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-steel" }), SITE.address]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#how",
						className: "mt-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" }), "Как это работает"]
					})
				]
			})
		]
	});
}
var STEPS = [
	{
		n: "01",
		title: "Выбираете позиции",
		text: "Отмечаете в прайсе, что нужно заточить. Сразу видите сумму — без звонка «а почём кусачки»."
	},
	{
		n: "02",
		title: "Отправляете заказ",
		text: "WhatsApp с готовым списком. Самовывоз на Набережной или доставка по Иркутску."
	},
	{
		n: "03",
		title: "Забираете острыми",
		text: "Смотрим инструмент, подтверждаем цену, точим с сохранением угла. Гарантия на заточку."
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "scroll-mt-20 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-[0.18em] text-steel uppercase",
					children: "Логика"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl sm:text-4xl",
					children: "Три шага, без очереди у витрины"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3",
					children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-surface px-6 py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm text-steel tabular-nums",
								children: step.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-xl",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: step.text
							})
						]
					}, step.n))
				})
			]
		})
	});
}
function Loyalty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "loyalty",
		className: "scroll-mt-20 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-[0.18em] text-steel uppercase",
					children: "Клуб Тупых"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl sm:text-4xl",
					children: "Десятая заточка — за счёт дома"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-muted",
					children: "Для мастеров маникюра, барберов, поваров и грумеров, кто возит инструмент регулярно. Считаем заказы по телефону, без пластиковых карточек."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 space-y-3 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-steel",
								children: "01"
							}), "10 заточек — 11-я в подарок, в пределах средней суммы ваших заказов."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-steel",
								children: "02"
							}), "Салонам и кухням — забор по графику и счёт для организации."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-steel",
								children: "03"
							}), "Бесплатная доставка от порога в прайсе, сейчас это 2 000 ₽."]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/loyalty",
						children: "Правила программы"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
				className: "overflow-hidden rounded-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/tools.jpg",
					alt: "Инструмент, который принимаем в заточку: ножи, ножницы, кусачки, секатор",
					className: "aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
				})
			})]
		})
	});
}
var ICONS = {
	manicure: Scissors,
	barber: Scissors,
	kitchen: UtensilsCrossed,
	grooming: PawPrint,
	home: House,
	garden: Flower2,
	tailor: Shirt,
	medical: Cross,
	tweezers: Pipette,
	hunting: Compass
};
function PriceCatalog({ list }) {
	const [active, setActive] = (0, import_react.useState)(list.categories[0]?.id ?? "");
	const category = (0, import_react.useMemo)(() => list.categories.find((c) => c.id === active) ?? list.categories[0], [list.categories, active]);
	const lines = useCart((s) => s.lines);
	const add = useCart((s) => s.add);
	const setQty = useCart((s) => s.setQty);
	const qtyOf = (id) => lines.find((l) => l.id === id)?.qty ?? 0;
	if (!category) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "price",
		className: "scroll-mt-20 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tracking-[0.18em] text-steel uppercase",
							children: "Прайс"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl sm:text-4xl",
							children: "Что точим и почём"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm text-muted",
							children: list.disclaimer
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							list.source === "live" ? "Цены с живого прайса" : "Резервная копия прайса",
							" · ",
							"бесплатная доставка от",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: [list.freeDeliveryFrom.toLocaleString("ru-RU"), " ₽"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0",
					children: list.categories.map((cat) => {
						const Icon = ICONS[cat.id] ?? Scissors;
						const on = cat.id === category.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActive(cat.id),
							className: cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition-[background-color,color,box-shadow] duration-150", on ? "bg-primary text-primary-fg" : "bg-elevated text-muted shadow-[0_0_0_1px_rgba(243,239,232,0.08)] hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), cat.navLabel]
						}, cat.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(243,239,232,0.08)] sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl",
							children: category.title
						}),
						category.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm text-muted",
							children: category.subtitle
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-8",
							children: category.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [section.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs tracking-[0.16em] text-steel uppercase",
								children: section.title
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: section.items.map((item) => {
									const qty = qtyOf(item.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium sm:text-base",
												children: item.name
											}), item.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-subtle",
												children: item.note
											}) : null]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-4 sm:justify-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "min-w-24 text-sm tabular-nums text-steel sm:text-right",
												children: formatPrice(item.price)
											}), qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
												value: qty,
												onChange: (n) => setQty(item.id, n)
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "secondary",
												onClick: () => {
													add(item.id);
													toast("Добавлено в заказ", { duration: 1600 });
												},
												children: "В заказ"
											})]
										})]
									}, item.id);
								})
							})] }, section.title || "main"))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-subtle",
					children: list.guarantee
				})
			]
		})
	});
}
function Home() {
	const initial = Route$4.useLoaderData();
	const { data } = useQuery({
		queryKey: ["price-list"],
		queryFn: () => getPriceList(),
		initialData: initial ?? FALLBACK_PRICE_LIST
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
			addressCountry: "RU"
		},
		areaServed: SITE.city
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCatalog, { list }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loyalty, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contacts, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Home as component };
