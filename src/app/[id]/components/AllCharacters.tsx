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
    <div className="grid col-span-6 grid-cols-6 gap-8 w-100vw justify-center">
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
                    <div key={index} className="hover:text-primary transition-all ease-in-out duration-300">
                      <h2 className="pl-2 text-lg">{character.name}</h2>
                      <img
                        className="rounded-lg"
                        src="/character.png"
                        alt={`${character.name}`}
                        width={200}
                        height={100}
                      />
                    </div>
                  </Link>
                )}
              </>))}
          </>
      }
    </div>

  )
}