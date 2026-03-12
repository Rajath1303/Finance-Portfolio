import api from "./axiosClient"
export const getPortfolio = () => {
    return api.get("/api/portfolio").then((res) => res.data).catch((err) => { throw err })
}