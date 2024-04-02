import { ReactNode } from 'react'
import Navigation from './navigation'
import Header from './header'
import Footer from './footer'

interface Props {
  readonly children: ReactNode
}

export default function LayoutHomepage({ children }: Props) {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Navigation />
          <Header />
        </div>
        {children}
      </div>
      <Footer />
    </>
  )
}