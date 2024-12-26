import puppeteer, { type Browser } from "puppeteer";

const maxRunningTime = 60 * 60 * 1000;

type CustomBrowser = Browser & {
	__BROWSER_START_TIME_MS__: number;
};

let browser: CustomBrowser | null = null;

const getBrowser = async () => {
	if (browser) {
		return browser;
	}
	browser = (await puppeteer.launch({
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-accelerated-2d-canvas",
			"--no-first-run",
			"--no-zygote",
			// '--single-process',
			"--disable-gpu",
			"--disable-web-security",
		],
	})) as CustomBrowser;
	browser.__BROWSER_START_TIME_MS__ = Date.now();
	return browser;
};

const cleanup = async (browser: CustomBrowser) => {
	if (Date.now() - browser.__BROWSER_START_TIME_MS__ >= maxRunningTime) {
		await getBrowser();
	}
};

const generator = async ({ content }: { content: string }) => {
	return pdf({ content });
};

const pdf = async ({ content }: { content: string }) => {
	let page = null;
	try {
		const browser = await getBrowser();
		page = await browser.newPage();
		await page.setContent(content, { waitUntil: ["domcontentloaded", "load"] });

		return await page.pdf({
			preferCSSPageSize: true,
			displayHeaderFooter: false,
			headerTemplate: "<div></div>",
			footerTemplate: "<div></div>",
			printBackground: true,
			scale: 1,
			format: "A4",
		});
	} finally {
		if (page) {
			await page.close();
			page = null;
		}
		await cleanup(browser as CustomBrowser);
	}
};

export default generator;
