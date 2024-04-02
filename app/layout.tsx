import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Web3Provider } from "@/components/@web3/Web3Provider"

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Contract Captain",
  description: "Smart contract administration tool for developers and moderators",
}

interface Props {
  readonly children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Web3Provider>
            {children}
          </Web3Provider>
        </ReduxProvider>
      </body>
    </html>
  )
}
