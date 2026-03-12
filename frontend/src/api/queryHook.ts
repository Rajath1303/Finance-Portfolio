import { useQuery } from "@tanstack/react-query"
import { getPortfolio } from "./portfolio"

export const portfolioQueryHooks = {
    getPortfolio: () => {
        return useQuery({
            queryKey: ["getPortfolio"],
            queryFn: getPortfolio,
            refetchInterval: 30000,
            staleTime: 30000,
        })
    }
}