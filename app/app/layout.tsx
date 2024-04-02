import { ReactNode } from "react"
import type { Metadata } from "next"
import LayoutApp from "@/components/@layout/app"

export const metadata: Metadata = {
  title: "App | Contract Captain",
  description: "Smart contract administration tool for developers and moderators",
}

interface Props {
  readonly children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <LayoutApp>
      {children}
    </LayoutApp>
  )
}