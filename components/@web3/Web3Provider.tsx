'use client'
import { ReactNode } from "react"
import { WagmiProvider, createConfig, http } from "wagmi"
import { bsc, bscTestnet, goerli, localhost, mainnet, polygon, polygonMumbai } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, goerli, polygon, polygonMumbai, bsc, bscTestnet, localhost],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
      [goerli.id]: http(
        // goerli.rpcUrls.default.http[0],
        `https://goerli.blockpi.network/v1/rpc/public`
      ),
      [polygon.id]: http(polygon.rpcUrls.default.http[0]),
      [polygonMumbai.id]: http(polygonMumbai.rpcUrls.default.http[0]),
      [bsc.id]: http(bsc.rpcUrls.default.http[0]),
      [bscTestnet.id]: http(bscTestnet.rpcUrls.default.http[0]),
      [localhost.id]: http(localhost.rpcUrls.default.http[0])
    },
    ssr: true,
    cacheTime: 3_000,
    
    // Required
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
    appName: "Contract Captain",
    // Optional
    appDescription: "Smart contract administration tool for developers and moderators",
    appUrl: "https://contract-captain.com/",
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)

export const queryClient = new QueryClient()

interface Props {
  readonly children: ReactNode
}

export const Web3Provider = ({ children }: Props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}