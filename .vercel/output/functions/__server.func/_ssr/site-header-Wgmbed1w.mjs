import { i as __toESM } from "../_runtime.mjs";
import { i as formatPhoneDisplay, n as SITE, r as cn } from "./utils-wE6rptyI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ShoppingBag, u as Phone } from "../_libs/lucide-react.mjs";
import { a as useCart } from "./router-Mip_sizj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-Wgmbed1w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl tracking-tight",
						children: ["ТУПЫХ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: ".NET"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-sm text-sm text-muted",
						children: [
							SITE.master,
							". Заточка ножей и инструмента, ",
							SITE.city,
							"."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cookies",
								className: "hover:text-fg",
								children: "Файлы cookie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/loyalty",
								className: "hover:text-fg",
								children: "Программа лояльности"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-fg",
								children: "Политика конфиденциальности"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/consent",
								className: "hover:text-fg",
								children: "Согласие на обработку ПДн"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "edge-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 text-xs text-subtle sm:flex-row sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						SITE.master,
						". Все права защищены."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Идея и разработка сайта",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SITE.developer.url,
							target: "_blank",
							rel: "noreferrer",
							className: "text-muted underline-offset-2 hover:text-fg hover:underline",
							children: SITE.developer.name
						})
					] })]
				})
			]
		})
	});
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-fg", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "20",
				width: "26",
				height: "7",
				rx: "1.2",
				fill: "currentColor",
				opacity: "0.28"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 21.5 L23 7.5 L26.2 9.2 L8.4 23.2 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M23 7.5 L26.2 9.2 L25.1 6.2 Z",
				fill: "currentColor",
				opacity: "0.7"
			})
		]
	});
}
function SiteHeader() {
	const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
	const setOpen = useCart((s) => s.setOpen);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const shown = ready ? count : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-sm tracking-tight sm:text-base",
						children: ["ТУПЫХ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: ".NET"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-6 text-sm text-muted md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#price",
							className: "transition-colors hover:text-fg",
							children: "Прайс"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#how",
							className: "transition-colors hover:text-fg",
							children: "Как сдать"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#loyalty",
							className: "transition-colors hover:text-fg",
							children: "Клуб"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#contacts",
							className: "transition-colors hover:text-fg",
							children: "Контакты"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${SITE.phone}`,
						className: "inline-flex h-11 items-center gap-2 rounded-md px-2 text-sm text-fg transition-colors hover:bg-elevated sm:px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 text-steel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: formatPhoneDisplay(SITE.phone)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(true),
						className: "relative grid size-11 place-items-center rounded-md text-fg transition-colors hover:bg-elevated",
						"aria-label": "Заказ",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), shown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-fg tabular-nums",
							children: shown
						}) : null]
					})]
				})
			]
		})
	});
}
//#endregion
export { SiteHeader as n, SiteFooter as t };
