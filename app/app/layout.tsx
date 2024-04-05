import { ReactNode } from "react"
import LayoutApp from "@/components/@layout/app"
import EventsReader from "@/components/EventsReader"
import { Toaster } from "react-hot-toast"

interface Props {
  readonly children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <LayoutApp>
        <EventsReader />
        {children}
      </LayoutApp>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ style: { maxWidth: 500 } }} />
    </>
  )
}
