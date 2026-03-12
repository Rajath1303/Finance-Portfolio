import { Router } from "express";
const router = Router()
import { getPortfolioController } from "../controller/portfolioController";

router.get("/", getPortfolioController)

export default router