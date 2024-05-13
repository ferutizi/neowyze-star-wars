'use client'

import { CharacterType } from "@/app/types"
import Link from "next/link"
import { useState } from "react"

interface AllCharactersProps {
  charactersDetails: (CharacterType | null)[] | null
}

export default function AllCharacters({ charactersDetails }: AllCharactersProps) {
  const [viewAll, setViewAll] = useState<boolean>(false)

  return (
    <div className="flex flex-wrap gap-8 justify-center items-center mt-8 lg:px-52">
      {
        !viewAll ?
          <button
            className="col-span-6 decoration-white underline underline-offset-8 hover:decoration-primary transition-all ease-in-out duration-300"
            onClick={() => setViewAll(true)}
          >Show all
          </button>
          : <>
            {charactersDetails?.map((character, index) => (
              <>
                {character && (
                  <Link href={`/characters/${character.url.replace("https://swapi.dev/api/people/", "").replace("/", "")}`}>
                    <article key={index} className="hover:text-primary transition-all ease-in-out duration-300">
                      <h2 className="pl-2 text-lg text-center lg:text-start">{character.name}</h2>
                      <img
                        className="rounded-lg"
                        src="/character.webp"
                        alt={`${character.name}`}
                        width={200}
                        height={100}
                      />
                    </article>
                  </Link>
                )}
              </>))}
          </>
      }
    </div>

  )
}