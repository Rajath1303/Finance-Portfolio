import { fetchGoogleFinance } from "../scrappers/googleScrapper"
import { fetchYahooFinance } from "../scrappers/yahooScrapper"
import data from "../portfolio.json"
import cache from "../cache"
const portfolio = data.data
const CACHE_TTL = Number(process.env.CACHE_TTL) || 120000
export const fetchPortfolio = async () => {
    const cacheKey = "portfolio"

    const cached = cache[cacheKey]

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log("Serving from cache")
        return cached.data
    }
    try {
        console.log("Fetching fresh data")
        const stocks = []
        for (const stock of portfolio) {
            const cmp = await fetchYahooFinance(stock.symbol)
            const googleData = await fetchGoogleFinance(stock.symbol, stock.exchange_code)
            const investment = stock.purchase_price * stock.qty
            const present_value = cmp * stock.qty
            const gain_by_loss = present_value - investment
            stocks.push({ ...stock, cmp, investment, present_value, gain_by_loss, ...googleData })
        }
        cache[cacheKey] = {
            data: stocks,
            timestamp: Date.now()
        }
        return stocks
    } catch (error) {
        throw error
    }
}