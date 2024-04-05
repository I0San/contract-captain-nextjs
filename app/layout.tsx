import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Web3Provider } from "@/components/@web3/Web3Provider"
import GA from "@/components/@core/ga"

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), { ssr: false })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://contract-captain.com'),
  title: "Contract Captain",
  description: "Smart contract administration tool for developers and moderators",
  keywords: ["Solidity", "Smart Contract", "Moderators", "Developers", "Tool", "Web3"],
  authors: [{ name: "IoSan", url: "https://github.com/I0San" }],
}

interface Props {
  readonly children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GA />
        <ReduxProvider>
          <Web3Provider>
            {children}
          </Web3Provider>
        </ReduxProvider>
      </body>
    </html>
  )
}
