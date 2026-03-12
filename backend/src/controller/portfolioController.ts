import { Request, Response } from "express";
import { fetchPortfolio } from "../service/portfolioservices";

export const getPortfolioController = async (req: Request, res: Response)=> {
    try {
        const data = await fetchPortfolio();
        res.json(data)
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch portfolio"
        })
    }
}