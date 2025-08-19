"use client"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"

const HIDE_DELAY = 100 // px to scroll before hiding
const HIDE_TIMEOUT_MS = 50 // ms delay before hiding

const NavBar = () => {
  const [show, setShow] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const hideTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (
            currentScrollY > lastScrollY.current &&
            currentScrollY > HIDE_DELAY
          ) {
            // Scrolling down
            if (hideTimeout.current) clearTimeout(hideTimeout.current)
            hideTimeout.current = setTimeout(() => {
              setShow(false)
            }, HIDE_TIMEOUT_MS)
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up
            if (hideTimeout.current) clearTimeout(hideTimeout.current)
            setShow(true)
          }
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full max-w-[] p-6 px-[20%] pt-3 z-50 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-neutral-900/50 backdrop-blur-md rounded-lg w-full flex flex-row justify-between items-center border-neutral-700/10 border-2 px-6 py-3">
        <h1 className="text-lg font-bold">@byanthny</h1>
        <div className="flex flex-row items-center gap-3">
          <Link href="/" className="text-neutral-300 hover:text-white">
            index
          </Link>
          {/* <Link href="/" className="text-neutral-300 hover:text-white">
            log
          </Link> */}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
