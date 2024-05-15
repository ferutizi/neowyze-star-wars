'use client'

import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"
import { CharacterType, FiltersType } from "@/app/types"
import { getCharacters } from "@/app/api"
import CharacterCard from "./CharacterCard"

interface LoadMoreProps {
  gender?: string,
  eyeColor?: string
}

let page = 2;

export default function LoadMore({ gender, eyeColor }: LoadMoreProps) {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      if (page < 10) {
        getCharacters(page).then((res) => {
          setCharacters([...characters, ...res])
        })
      }
      page++
    }
  }, [inView, characters])

  return (
    <>
      {
        characters
          .filter(ch =>
            (!eyeColor || ch.eye_color.includes(eyeColor)) &&
            (!gender || ch.gender === gender)
          )
          .map((character) =>
            <CharacterCard key={character.name} character={character} />
          )
      }
      {/* You can replace the condition with 'next' property. getCharacters returns only 'results' prop */}
      {/* character.next !== null */}
      {page < 10 &&
        < div ref={ref}>Loading...</div >
      }
    </>
  )
}