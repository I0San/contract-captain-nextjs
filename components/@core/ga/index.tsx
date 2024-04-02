'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import ReactGA from "react-ga4"


export default function GA() {
  const shouldInit = useRef(true)
  const pathName = usePathname()

  useEffect(() => {
    if (shouldInit.current) {
      shouldInit.current = false
      ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALITICS_ID}`)
    }
  }, [])

  useEffect(() => {
    if (!pathName) return
    ReactGA.send({ hitType: "pageview", page: pathName})
  }, [pathName])

  return <></>
}