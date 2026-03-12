"use client";
import PortfolioTable from "@/components/PortfolioTable";
import { portfolioQueryHooks } from "@/api/queryHook";

export type Portfolio = {
  particulars: string;
  exchange_code: string;
  purchase_price: number;
  qty: number;
  portfolio_percentage: number;
  symbol: string;
  cmp: number;
  investment: number;
  present_value: number;
  gain_by_loss: number;
  pe_ratio: number;
  eps: number | null;
  sector: string;
};

export default function Home() {
  const { data, isLoading } = portfolioQueryHooks.getPortfolio();

  return (
    <div className="p-10">
      <PortfolioTable data={data} />
    </div>
  );
}
