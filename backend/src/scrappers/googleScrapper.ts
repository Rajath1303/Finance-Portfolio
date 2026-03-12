import puppeteer from "puppeteer";

export async function fetchGoogleFinance(symbol: string, code: string) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'],
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        );

        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        });

        await page.goto(`https://www.google.com/finance/quote/${symbol}:${code}`, {
            waitUntil: 'networkidle2',
        });
        await page.waitForSelector('.gyFHrc', { timeout: 10000 });

        const pe_ratio = await page.evaluate(() => {
            let pe = '';
            document.querySelectorAll('.gyFHrc').forEach((row) => {
                const label = (row.querySelector('.mfs7Fc') as HTMLElement)?.innerText?.trim();
                if (label === 'P/E RATIO') {
                    pe = (row.querySelector('.P6K39c') as HTMLElement)?.innerText?.trim();
                }
            });
            return pe;
        });
        await page.waitForSelector('table.slpEwd', { timeout: 10000 });

        const eps = await page.evaluate(() => {
            let eps = '';
            document.querySelectorAll('table.slpEwd tr.roXhBd').forEach((row) => {
                const label = (row.querySelector('.rsPbEe') as HTMLElement)?.innerText?.trim();
                if (label === 'Earnings per share') {
                    eps = (row.querySelector('.QXDnM') as HTMLElement)?.innerText?.trim();
                }
            });
            return eps;
        });
        await browser.close();
        return { pe_ratio: Number(pe_ratio), eps: Number(eps) };
    } catch (err) {
        throw err
    }
}