import dynamic from "next/dynamic"
import { getFilm, getCharacter } from "../api"
import { FilmType, CharacterType } from "../types"
import AllCharacters from "./components/AllCharacters"
import Link from "next/link"
import { getIdFromUrl } from "../hooks/useGetIdFromUrl"
import { Metadata } from "next"

export async function generateMetadata({ params: { id } }: { params: { id: number } }): Promise<Metadata> {
  const film = await getFilm(id)

  return {
    title: `${film.title} - Star Wars`,
    description: film.opening_crawl
  }
}

export default async function FilmPage({ params: { id } }: { params: { id: number } }) {
  const film: FilmType = await getFilm(id)

  const getCharacterDetails = async (characterURL: string): Promise<CharacterType | null> => {
    try {
      const normalizedId = getIdFromUrl({ query: { url: characterURL, q: "people" } })
      const character = await getCharacter(normalizedId)
      return character
    } catch (error) {
      console.log(`Error: ${error}`)
      return null
    }
  }

  const charactersDetails = await Promise.all(
    film.characters.map(async (characterUrl) => {
      return await getCharacterDetails(characterUrl)
    })
  )

  function allCharacters() {
    return <AllCharacters charactersDetails={charactersDetails} />
  }

  const DynamicAllCharacters = dynamic(async () => allCharacters, { ssr: false })

  return (
    <>
      {film &&
        <article className="flex flex-col justify-center p-16 pb-4">
          <div className="flex gap-8">
            <img src="/film-banner.webp" alt={`Banner ${film.title}`} width={700} height={400} />
            <div className="flex flex-col">
              <h1 className="text-5xl mb-4 font-bold">{film.title}</h1>
              <p className="text-4xl text-primary opacity-85">Episode: {getIdFromUrl({ query: { url: film.url, q: "films" } })}</p>
              <p className="text-2xl opacity-85">{film.director}</p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-8 justify-center">
            {
              charactersDetails.splice(0, 6).map((character, index) => (
                <>
                  {character && (
                    <Link href={`/characters/${getIdFromUrl({ query: { url: character.url, q: "people" } })}`}>
                      <div key={index} className="hover:text-primary transition-all ease-in-out duration-300">
                        <h2 className="pl-2 text-lg">{character.name}</h2>
                        <img
                          loading="lazy"
                          className="rounded-lg"
                          src="/character.webp"
                          alt={`${character.name}`}
                          width={200}
                          height={100}
                        />
                      </div>
                    </Link >
                  )}
                </>
              ))
            }
            <DynamicAllCharacters />
          </div>
        </article >
      }
    </>
  )
}