import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { t as FALLBACK_PRICE_LIST } from "./fallback-BTs_Ojje.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/get-price-list-CdAzgcKJ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getPriceList_createServerFn_handler = createServerRpc({
	id: "8a98787a67ec3252ae066b084b5e90936ec517b51d5bbd19d16e245a825fc902",
	name: "getPriceList",
	filename: "src/lib/price/get-price-list.ts"
}, (opts) => getPriceList.__executeServer(opts));
var getPriceList = createServerFn({ method: "GET" }).handler(getPriceList_createServerFn_handler, async () => {
	try {
		const { fetchPriceList } = await import("./fetch.server-BvXhUc5m.mjs");
		return await fetchPriceList();
	} catch {
		return {
			...FALLBACK_PRICE_LIST,
			source: "fallback",
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
});
//#endregion
export { getPriceList_createServerFn_handler };
