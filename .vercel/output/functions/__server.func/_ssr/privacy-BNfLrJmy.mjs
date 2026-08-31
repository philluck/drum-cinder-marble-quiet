import { i as formatPhoneDisplay, n as SITE } from "./utils-wE6rptyI.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as LegalLayout } from "./legal-layout-D08zIrHE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-BNfLrJmy.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Политика конфиденциальности",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Настоящая политика определяет порядок обработки персональных данных на сайте",
				" ",
				SITE.domain,
				" в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "1. Оператор" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Оператор: ",
				SITE.master,
				", ",
				SITE.address,
				". Телефон:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `tel:${SITE.phone}`,
					children: formatPhoneDisplay(SITE.phone)
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "2. Какие данные обрабатываются" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Имя, номер телефона, адрес доставки, состав заказа, комментарий, сведения о согласии на обработку данных и технические данные браузера (состав корзины и факт согласия с cookie, хранящиеся на вашем устройстве)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "3. Цели и правовые основания" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Данные нужны, чтобы принять и выполнить заказ на заточку, связаться с вами, организовать доставку или самовывоз, учесть участие в программе лояльности. Основания: согласие субъекта (ст. 6, п. 1, пп. 1 152-ФЗ) и исполнение договора по вашей заявке (пп. 5)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "4. Как передаём заказ" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Сайт не хранит заявки на собственном сервере. Текст заказа формируется в браузере и по вашей команде открывается в мессенджере WhatsApp (сервис компании Meta Platforms) или Telegram. После отправки обработка идёт уже на стороне мессенджера и у оператора. Звонок по номеру телефона — отдельный канал связи." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "5. Срок хранения" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Корзина в браузере хранится, пока вы её не очистите. Сообщения в мессенджере и сведения, необходимые для исполнения заказа, оператор хранит в течение срока оказания услуги и далее — в пределах сроков, установленных законодательством РФ (в том числе для бухгалтерского и налогового учёта, если они применимы)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "6. Передача третьим лицам" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Без вашего отдельного поручения данные не продаются и не передаются, кроме случаев, предусмотренных законом, и кроме передачи в мессенджер, который вы сами выбрали для отправки заказа." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "7. Права субъекта" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Вы вправе запросить сведения об обработке, потребовать уточнения, блокирования или уничтожения данных, отозвать согласие, обжаловать действия оператора в Роскомнадзор или в суд. Запрос направляйте по телефону оператора." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "8. Cookie" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Используются только технические записи в localStorage: состав заказа и факт ознакомления с уведомлением о cookie. Подробнее — в",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cookies",
					children: "политике cookie"
				}),
				"."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "9. Изменения" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Актуальная редакция всегда опубликована на этой странице. Дата публикации: 31 августа 2026 г." })
		]
	});
}
//#endregion
export { PrivacyPage as component };
