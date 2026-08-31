import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as formatPrice, n as SITE, o as formatRub, r as cn } from "./utils-wE6rptyI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as Slot, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as FALLBACK_PRICE_LIST } from "./fallback-BTs_Ojje.mjs";
import { c as Plus, f as Minus, i as TriangleAlert, r as Truck, t as X, y as Check } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as QueryClientProvider, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Mip_sizj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function QtyStepper({ value, onChange, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex h-11 items-center rounded-md bg-elevated shadow-[0_0_0_1px_rgba(243,239,232,0.1)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 place-items-center text-muted transition-colors duration-150 hover:text-fg",
				onClick: () => onChange(value - 1),
				"aria-label": "Уменьшить",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-6 text-center text-sm tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 place-items-center text-muted transition-colors duration-150 hover:text-fg",
				onClick: () => onChange(value + 1),
				"aria-label": "Увеличить",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg shadow-[0_0_0_1px_rgba(243,239,232,0.12)] hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[0_0_0_1px_rgba(243,239,232,0.1)] hover:bg-surface",
			ghost: "text-fg hover:bg-elevated",
			outline: "text-fg shadow-[0_0_0_1px_rgba(243,239,232,0.14)] hover:bg-elevated",
			steel: "bg-steel text-bg hover:opacity-90"
		},
		size: {
			sm: "h-9 rounded-sm px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm",
			lg: "h-12 rounded-md px-5 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md bg-elevated px-3 text-base text-fg shadow-[0_0_0_1px_rgba(243,239,232,0.1)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[0_0_0_1px_rgba(197,205,214,0.7)] md:text-sm", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-muted", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-md bg-elevated px-3 py-2.5 text-base text-fg shadow-[0_0_0_1px_rgba(243,239,232,0.1)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[0_0_0_1px_rgba(197,205,214,0.7)] md:text-sm", className),
		...props
	});
}
var useCart = create()(persist((set, get) => ({
	lines: [],
	open: false,
	checkoutOpen: false,
	add: (id, qty = 1) => {
		const lines = [...get().lines];
		const i = lines.findIndex((l) => l.id === id);
		if (i >= 0) {
			const current = lines[i];
			if (current) lines[i] = {
				...current,
				qty: current.qty + qty
			};
		} else lines.push({
			id,
			qty
		});
		set({ lines });
	},
	setQty: (id, qty) => {
		if (qty <= 0) {
			set({ lines: get().lines.filter((l) => l.id !== id) });
			return;
		}
		set({ lines: get().lines.map((l) => l.id === id ? {
			...l,
			qty
		} : l) });
	},
	remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),
	clear: () => set({ lines: [] }),
	setOpen: (open) => set({ open }),
	setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen })
}), {
	name: "tupih-cart",
	partialize: (s) => ({ lines: s.lines })
}));
function resolveCart(list, lines) {
	const index = /* @__PURE__ */ new Map();
	for (const cat of list.categories) for (const section of cat.sections) for (const item of section.items) index.set(item.id, {
		item,
		categoryLabel: cat.navLabel,
		categoryId: cat.id
	});
	const resolved = [];
	for (const line of lines) {
		const found = index.get(line.id);
		if (!found) continue;
		resolved.push({
			id: line.id,
			qty: line.qty,
			item: found.item,
			categoryLabel: found.categoryLabel,
			categoryId: found.categoryId
		});
	}
	return resolved;
}
function cartTotals(resolved) {
	return {
		amount: resolved.reduce((sum, l) => sum + l.item.price.amount * l.qty, 0),
		from: resolved.some((l) => l.item.price.from),
		count: resolved.reduce((sum, l) => sum + l.qty, 0)
	};
}
function buildOrderMessage(opts) {
	const { draft, lines, amount, from, freeDelivery, freeDeliveryFrom } = opts;
	const totalLabel = (from ? "от " : "") + formatRub(amount);
	const method = draft.method === "pickup" ? `Самовывоз: ${SITE.address}` : freeDelivery ? `Доставка бесплатно (от ${formatRub(freeDeliveryFrom)})\nАдрес: ${draft.address}` : `Доставка (стоимость согласуем, бесплатно от ${formatRub(freeDeliveryFrom)})\nАдрес: ${draft.address}`;
	const items = lines.map((l, i) => {
		const price = (l.item.price.from ? "от " : "") + formatRub(l.item.price.amount);
		return `${i + 1}. ${l.item.name} × ${l.qty} — ${price} (${l.categoryLabel})`;
	}).join("\n");
	return [
		`Заказ с ${SITE.name}`,
		"",
		`Имя: ${draft.name}`,
		`Телефон: ${draft.phone}`,
		method,
		"",
		"Позиции:",
		items,
		"",
		`Итого: ${totalLabel}`,
		draft.comment ? `\nКомментарий: ${draft.comment}` : "",
		"",
		"Точную цену подтверждаем после осмотра инструмента."
	].filter((line) => line !== "").join("\n");
}
function whatsappUrl(text) {
	return `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(text)}`;
}
function telegramUrl() {
	return `https://t.me/+${SITE.phoneDigits}`;
}
function telUrl() {
	return `tel:${SITE.phone}`;
}
function CartPanel({ list }) {
	const open = useCart((s) => s.open);
	const setOpen = useCart((s) => s.setOpen);
	const lines = useCart((s) => s.lines);
	const setQty = useCart((s) => s.setQty);
	const clear = useCart((s) => s.clear);
	const resolved = (0, import_react.useMemo)(() => resolveCart(list, lines), [list, lines]);
	const totals = cartTotals(resolved);
	const free = totals.amount >= list.freeDeliveryFrom && totals.amount > 0;
	const remaining = Math.max(0, list.freeDeliveryFrom - totals.amount);
	const progress = Math.min(100, totals.amount / list.freeDeliveryFrom * 100);
	const [step, setStep] = (0, import_react.useState)("cart");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (!next) setStep("cart");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-[-1px_0_0_rgba(243,239,232,0.1)] focus:outline-none",
			"aria-describedby": void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-lg",
					children: step === "cart" ? "Заказ" : "Оформление"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "grid size-11 place-items-center rounded-md text-muted hover:bg-elevated hover:text-fg",
					"aria-label": "Закрыть",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), step === "cart" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartStep, {
				resolved,
				totals,
				free,
				remaining,
				progress,
				freeFrom: list.freeDeliveryFrom,
				setQty,
				onClear: clear,
				onNext: () => setStep("form")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutStep, {
				list,
				resolved,
				totals,
				free,
				onBack: () => setStep("cart"),
				onSent: () => {
					clear();
					setStep("cart");
					setOpen(false);
				}
			})]
		})] })
	});
}
function CartStep({ resolved, totals, free, remaining, progress, freeFrom, setQty, onClear, onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 overflow-y-auto px-5 py-4",
		children: resolved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-12 text-center text-sm text-muted",
			children: "Пока пусто. Отметьте позиции в прайсе — соберём сумму и отправим мастеру."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: resolved.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: line.item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: line.categoryLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm tabular-nums text-steel",
							children: formatPrice(line.item.price)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QtyStepper, {
					value: line.qty,
					onChange: (n) => setQty(line.id, n)
				})]
			}, line.id))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md bg-elevated p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-steel" }), free ? "Бесплатная доставка" : `До бесплатной доставки ${formatRub(remaining)}`]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1 overflow-hidden rounded-full bg-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-steel transition-[width] duration-200",
							style: { width: `${progress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-subtle",
						children: ["Порог: ", formatRub(freeFrom)]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: "Итого"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl tabular-nums",
					children: [totals.from ? "от " : "", formatRub(totals.amount)]
				})] }), resolved.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClear,
					className: "text-xs text-subtle underline-offset-2 hover:text-muted hover:underline",
					children: "Очистить"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				size: "lg",
				disabled: resolved.length === 0,
				onClick: onNext,
				children: "Оформить"
			})
		]
	})] });
}
function CheckoutStep({ list, resolved, totals, free, onBack, onSent }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("pickup");
	const [address, setAddress] = (0, import_react.useState)("");
	const [comment, setComment] = (0, import_react.useState)("");
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function validate() {
		if (name.trim().length < 2) {
			setError("Укажите имя");
			return false;
		}
		if (phone.replace(/\D/g, "").length < 10) {
			setError("Укажите телефон");
			return false;
		}
		if (method === "delivery" && address.trim().length < 6) {
			setError("Укажите адрес доставки");
			return false;
		}
		if (!consent) {
			setError("Нужно согласие на обработку персональных данных");
			return false;
		}
		setError("");
		return true;
	}
	function message() {
		return buildOrderMessage({
			draft: {
				name,
				phone,
				method,
				address,
				comment
			},
			lines: resolved,
			amount: totals.amount,
			from: totals.from,
			freeDelivery: free && method === "delivery",
			freeDeliveryFrom: list.freeDeliveryFrom
		});
	}
	function sendWhatsApp() {
		if (!validate()) return;
		window.open(whatsappUrl(message()), "_blank", "noopener,noreferrer");
		toast("Открываем WhatsApp с заказом");
		onSent();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 overflow-y-auto px-5 py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Имя",
					htmlFor: "order-name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "order-name",
						value: name,
						onChange: (e) => setName(e.target.value),
						autoComplete: "name"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Телефон",
					htmlFor: "order-phone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "order-phone",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						inputMode: "tel",
						autoComplete: "tel",
						placeholder: "+7"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm font-medium text-muted",
					children: "Как передать инструмент"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [["pickup", "Самовывоз"], ["delivery", "Доставка"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMethod(value),
						className: cn("h-11 rounded-md text-sm transition-[background-color,color] duration-150", method === value ? "bg-primary text-primary-fg" : "bg-elevated text-muted"),
						children: label
					}, value))
				})] }),
				method === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Адрес в Иркутске",
					htmlFor: "order-address",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "order-address",
						value: address,
						onChange: (e) => setAddress(e.target.value),
						autoComplete: "street-address"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Заберёте по адресу: ", SITE.address]
				}),
				method === "delivery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex items-start gap-2 text-sm text-muted",
					children: free ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-steel" }), "Сумма заказа даёт бесплатную доставку"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "mt-0.5 size-4 text-steel" }),
						"Бесплатно от ",
						formatRub(list.freeDeliveryFrom),
						". Сейчас доставку согласуем отдельно."
					] })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Комментарий",
					htmlFor: "order-comment",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "order-comment",
						value: comment,
						onChange: (e) => setComment(e.target.value),
						placeholder: "Когда удобно, особенности инструмента"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-start gap-3 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: consent,
						onChange: (e) => setConsent(e.target.checked),
						className: "mt-1 size-4 accent-steel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Согласен на",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/consent",
							className: "text-fg underline-offset-2 hover:underline",
							children: "обработку персональных данных"
						}),
						" ",
						"и принимаю",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/privacy",
							className: "text-fg underline-offset-2 hover:underline",
							children: "политику конфиденциальности"
						}),
						"."
					] })]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: error
				}) : null
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-xl tabular-nums",
				children: [totals.from ? "от " : "", formatRub(totals.amount)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3 w-full",
				size: "lg",
				onClick: sendWhatsApp,
				children: "Заказать в WhatsApp"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: telegramUrl(),
						target: "_blank",
						rel: "noreferrer",
						children: "Telegram"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: telUrl(),
						children: "Позвонить"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onBack,
				className: "mt-3 w-full py-2 text-sm text-muted hover:text-fg",
				children: "Назад к списку"
			})
		]
	})] });
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
var KEY = "tupih-cookie-consent";
function CookieBanner() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			setVisible(localStorage.getItem(KEY) !== "1");
		} catch {
			setVisible(true);
		}
	}, []);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-3xl flex-col gap-3 rounded-lg bg-elevated p-4 shadow-[0_0_0_1px_rgba(243,239,232,0.12)] sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex-1 text-sm text-muted",
				children: [
					"Сайт хранит в браузере состав заказа и факт согласия с cookie. Это нужно, чтобы корзина не обнулялась. Подробнее — в",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cookies",
						className: "text-fg underline-offset-2 hover:underline",
						children: "политике cookie"
					}),
					"."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => {
					try {
						localStorage.setItem(KEY, "1");
					} catch {}
					setVisible(false);
				},
				children: "Понятно"
			})]
		})
	});
}
function StickyCart({ list }) {
	const lines = useCart((s) => s.lines);
	const setOpen = useCart((s) => s.setOpen);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return null;
	const totals = cartTotals(resolveCart(list, lines));
	if (totals.count === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 sm:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto mx-auto flex max-w-lg items-center justify-between gap-3 rounded-lg bg-primary px-3 py-2 text-primary-fg shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: totals.count
					}),
					" · ",
					totals.from ? "от " : "",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: formatRub(totals.amount)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => setOpen(true),
				children: "К заказу"
			})]
		})
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getPriceList = createServerFn({ method: "GET" }).handler(createSsrRpc("8a98787a67ec3252ae066b084b5e90936ec517b51d5bbd19d16e245a825fc902"));
function Providers({ children }) {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 6e4,
		refetchOnWindowFocus: false
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client,
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-center",
				toastOptions: {
					className: "font-sans",
					style: {
						background: "#1c1916",
						color: "#f3efe8",
						border: "1px solid #2a2724"
					}
				}
			})
		]
	});
}
function CartHost() {
	const { data } = useQuery({
		queryKey: ["price-list"],
		queryFn: () => getPriceList(),
		placeholderData: FALLBACK_PRICE_LIST
	});
	const list = data ?? FALLBACK_PRICE_LIST;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPanel, { list }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyCart, { list }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieBanner, {})
	] });
}
var styles_default = "/assets/styles-BP22nK2O.css";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE.title },
			{
				name: "description",
				content: SITE.description
			},
			{
				name: "theme-color",
				content: "#0c0b0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Unbounded:wght@500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Providers, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-Df_JTr3J.mjs");
var Route$4 = createFileRoute("/")({
	loader: () => getPriceList(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./consent-nPx7tMoP.mjs");
var Route$3 = createFileRoute("/consent")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: `Согласие на обработку персональных данных — ${SITE.name}` }] })
});
var $$splitComponentImporter$2 = () => import("./cookies-D5811zrg.mjs");
var Route$2 = createFileRoute("/cookies")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: `Файлы cookie — ${SITE.name}` }] })
});
var $$splitComponentImporter$1 = () => import("./loyalty-CMe0IH-3.mjs");
var Route$1 = createFileRoute("/loyalty")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: `Программа лояльности «Клуб Тупых» — ${SITE.name}` }] })
});
var $$splitComponentImporter = () => import("./privacy-BNfLrJmy.mjs");
var Route = createFileRoute("/privacy")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: `Политика конфиденциальности — ${SITE.name}` }] })
});
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	ConsentRoute: Route$3.update({
		id: "/consent",
		path: "/consent",
		getParentRoute: () => Route$5
	}),
	CookiesRoute: Route$2.update({
		id: "/cookies",
		path: "/cookies",
		getParentRoute: () => Route$5
	}),
	LoyaltyRoute: Route$1.update({
		id: "/loyalty",
		path: "/loyalty",
		getParentRoute: () => Route$5
	}),
	PrivacyRoute: Route.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useCart as a, telegramUrl as i, Route$4 as n, Button as o, getPriceList as r, QtyStepper as s, router_exports as t };
