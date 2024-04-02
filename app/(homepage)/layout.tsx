import { ReactNode } from "react"
import LayoutHomepage from "@/components/@layout/homepage"

interface Props {
  readonly children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <LayoutHomepage>
      {children}
    </LayoutHomepage>
  )
}
