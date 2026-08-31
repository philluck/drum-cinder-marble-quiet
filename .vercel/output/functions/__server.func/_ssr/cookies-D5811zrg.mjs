import { n as SITE } from "./utils-wE6rptyI.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as LegalLayout } from "./legal-layout-D08zIrHE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookies-D5811zrg.js
var import_jsx_runtime = require_jsx_runtime();
function CookiesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Файлы cookie и локальное хранилище",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Сайт ",
				SITE.domain,
				" не использует рекламные и аналитические cookie третьих лиц. В браузере сохраняются только технические данные, без которых сервис заказа не работает."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Что сохраняем" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "text-fg",
				children: "tupih-cart"
			}), " — состав заказа (позиции и количество), чтобы список не пропадал при обновлении страницы."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "text-fg",
				children: "tupih-cookie-consent"
			}), " — отметка, что вы видели это уведомление и не нужно показывать его снова."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Срок" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Записи хранятся на вашем устройстве бессрочно, пока вы не очистите данные сайта в настройках браузера или не нажмёте «Очистить» в заказе." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Отказ" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Вы можете запретить запись в настройках браузера. Тогда корзина не будет сохраняться между визитами, оформить заказ через форму всё равно можно в рамках одного сеанса." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Правовая основа: необходимость для оказания услуги по вашей инициативе и ст. 6 152-ФЗ в части технических данных, а также требование информировать пользователя о cookie в соответствии с практикой Роскомнадзора." })
		]
	});
}
//#endregion
export { CookiesPage as component };
