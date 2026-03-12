import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchYahooFinance(symbol: string) {
    try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS`;

        const { data } = await axios.get(url);

        const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
        return Number(price);
    } catch (err) {
        throw err
    }
}