import { locales } from "@/config/i18n.config";
import { expect, test } from "@/e2e/lib/test";

test.describe("imprint page", () => {
	test.skip("should have document title", async ({ createImprintPage }) => {
		for (const locale of locales) {
			const { i18n, imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page).toHaveTitle(
				[i18n.t("ImprintPage.meta.title"), i18n.t("Metadata.name")].join(" | "),
			);
		}
	});

	test.skip("should have imprint text", async ({ createImprintPage }) => {
		const imprints = {
			de: "Offenlegung",
			en: "Legal disclosure",
		};

		for (const locale of locales) {
			const { imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page.getByRole("main")).toContainText(imprints[locale]);
		}
	});

	test.skip("should not have any automatically detectable accessibility issues", async ({
		createAccessibilityScanner,
		createImprintPage,
	}) => {
		for (const locale of locales) {
			const { imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			const { getViolations } = await createAccessibilityScanner();
			expect(await getViolations()).toEqual([]);
		}
	});

	test.skip("should not have visible changes", async ({ createImprintPage }) => {
		for (const locale of locales) {
			const { imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page).toHaveScreenshot();
		}
	});
});
