'use client'

import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { CharacterType } from "@/app/types"
import { getCharacters } from "@/app/api"
import Link from "next/link"
import { getIdFromUrl } from "@/app/hooks/useGetIdFromUrl"

let page = 2;

export default function LoadMore() {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      getCharacters(page).then((res) => {
        setCharacters([...characters, ...res])
      })
      page++
    }
  }, [inView])

  return (
    <>
      {
        characters.map(({ name, url, gender, eye_color }) =>
          <article key={name} className="flex flex-col items-center">
            <Link href={`characters/${getIdFromUrl({ query: { url: url, q: "people" } })}`}>
              <h2 className="text-2xl pl-2 text-primary font-bold">{name}</h2>
              <img className="rounded-lg" src="/character.webp" alt={name} width={400} height={200} />
              <div className="flex justify-around">
                {
                  gender !== "unknown" &&
                  gender !== "n/a" &&
                  <div className="flex items-center gap-4">
                    <p className="text-xl py-2">{gender}</p>
                    <img className="h-4" src={`/${gender}.webp`} alt="eye" height={8} />
                  </div>
                }
                {
                  eye_color !== "unknown" &&
                  eye_color !== "n/a" &&
                  <div className="flex items-center gap-4">
                    <img className={`h-6 eye ${"eye-" + eye_color}`} src="eye.webp" alt="eye" height={8} />
                    <p className="text-xl py-2">{eye_color}</p>
                  </div>
                }
              </div>
            </Link>
          </article>
        )
      }
      {/* You can replace the condition with 'next' property. getCharacters returns only 'results' prop */}
      {/* character.next !== null */}
      {page < 10 &&
        < div ref={ref}>Cargando mas...</div >
      }
    </>
  )
}