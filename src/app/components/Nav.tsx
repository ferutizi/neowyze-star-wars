'use client'

import Link from "next/link"
import { useState } from "react"

export default function Nav() {
  const [isFilmOn, setIsFilmOn] = useState<boolean>(true)

  return(
    <nav className="flex m-auto justify-center text-lg -translate-x-[120px] border-2 border-primary rounded-full text-slate-300">
      <Link href="/">
        <button
          className={`${isFilmOn ? "bg-primary text-black" : "hover:text-primary"} font-bold rounded-full w-48 py-2 transition-all ease-in-out duration-200`}
          onClick={() => setIsFilmOn(true)}
        >Películas
        </button>
      </Link>
      <Link href="/characters">
        <button
          className={`${!isFilmOn ? "bg-primary text-black" : "hover:text-primary"} font-bold rounded-full w-48 py-2 transition-all ease-in-out duration-200`}
          onClick={() => setIsFilmOn(false)}
        >Personajes
        </button>
      </Link>
    </nav>
  )
}