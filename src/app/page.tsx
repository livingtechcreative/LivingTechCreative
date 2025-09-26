import { apiService } from "@/lib/api"
import HomeClient from "@/components/home-client"

export default async function Home() {
  // Server-side fetch to avoid CORS in browser
  const portfolios = await apiService.getPortfolios()

  return <HomeClient portfolios={portfolios} />
}
