'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav() {
  const path = usePathname()
  const isCharacterPage = path.includes("characters")

  return (
    <nav className="flex m-auto justify-center text-lg -translate-x-[120px] border-2 border-primary rounded-full text-slate-300">
      <Link href="/">
        <button
          className={`${!isCharacterPage ? "bg-primary text-black" : "hover:text-primary"} font-bold rounded-full w-44 py-2 transition-all ease-in-out duration-200`}
        >Films
        </button>
      </Link>
      <Link href="/characters">
        <button
          className={`${isCharacterPage ? "bg-primary text-black" : "hover:text-primary"} font-bold rounded-full w-44 py-2 transition-all ease-in-out duration-200`}
        >Characters
        </button>
      </Link>
    </nav>
  )
}