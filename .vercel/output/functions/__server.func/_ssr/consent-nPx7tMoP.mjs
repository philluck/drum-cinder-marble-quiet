import { i as formatPhoneDisplay, n as SITE } from "./utils-wE6rptyI.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as LegalLayout } from "./legal-layout-D08zIrHE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consent-nPx7tMoP.js
var import_jsx_runtime = require_jsx_runtime();
function ConsentPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Согласие на обработку персональных данных",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Нажимая «Заказать в WhatsApp» и отмечая соответствующее поле, я, субъект персональных данных, свободно, своей волей и в своём интересе даю согласие оператору — ",
				SITE.master,
				", ",
				SITE.address,
				", тел.",
				" ",
				formatPhoneDisplay(SITE.phone),
				" — на обработку моих персональных данных в соответствии со ст. 9 Федерального закона от 27.07.2006 № 152-ФЗ."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Перечень данных" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Фамилия, имя; номер телефона; адрес доставки; состав и стоимость заказа; комментарий; сведения о выбранном способе передачи инструмента." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Цели" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Приём заявки на заточку, связь со мной, расчёт стоимости, организация самовывоза или доставки, учёт в программе лояльности, исполнение требований закона." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Действия с данными" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача (в мессенджер, который я выбираю для отправки заказа), удаление и уничтожение — как с использованием средств автоматизации, так и без них." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Срок и отзыв" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Согласие действует до достижения целей обработки либо до отзыва. Отозвать согласие можно, сообщив об этом оператору по телефону. Отзыв не влияет на законность обработки, выполненной до него. Политика оператора:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					children: "политика конфиденциальности"
				}),
				"."
			] })
		]
	});
}
//#endregion
export { ConsentPage as component };
