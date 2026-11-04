'use client'

import type { CSSProperties } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const name = "anthony das"

const NavBar = () => {
  const pathname = usePathname()
  const isLogPage = pathname === '/log'

  return (
    <nav className={`fixed top-0 w-full p-6 px-5 sm:px-[10%] md:px-[16%] lg:px-[20%] pt-3 z-50`}>
      <div className="bg-neutral-900/50 backdrop-blur-md rounded-lg w-full flex flex-row justify-between items-center border border-neutral-700/50 px-6 py-3">
        <div className="text-lg">
          {/* the cyan dot is the site's mark. the letters are split so they can lift on hover */}
          <Link href="/" className="nav-name text-white font-bold" aria-label={name}>
            <span className="nav-dot" aria-hidden="true" />
            <span className="wave" aria-hidden="true">
              {name.split("").map((letter, i) => (
                <span key={i} style={{ "--i": i } as CSSProperties}>
                  {letter === " " ? " " : letter}
                </span>
              ))}
            </span>
          </Link>
          {isLogPage && ' - log'}
        </div>
        <div className="flex flex-row items-center gap-3">
          <Link href="/" className="text-neutral-300 hover:text-white">
            index
          </Link>
          <Link href="/log" className="text-neutral-300 hover:text-white">
            log
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
