import dynamic from "next/dynamic"
import { getFilm, getCharacter } from "../api"
import { FilmType, CharacterType } from "../types"
import AllCharacters from "./components/AllCharacters"
import Link from "next/link"
import { getIdFromUrl } from "../hooks/useGetIdFromUrl"
import { Metadata } from "next"
import Image from "next/image"

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
        <section className="flex flex-col justify-center p-6 md:p-14 pb-4 mt-[72px]">
          <div className="flex lg:flex-row flex-col gap-8">
            <Image src="/film-banner.webp" alt={`Banner ${film.title}`} width={600} height={400} />
            <div className="flex flex-col mb-8 md:mb-0 items-center md:items-start gap-4">
              <h1 className="text-4xl md:text-5xl font-bold">{film.title}</h1>
              <p className="text-3xl md:text-4xl text-primary opacity-85">Episode: {getIdFromUrl({ query: { url: film.url, q: "films" } })}</p>
              <p className="text-xl md:text-2xl opacity-85">{film.director}</p>
            </div>
          </div>
          <h3 className="m-auto text-2xl my-6 text-primary opacity-85">Characters</h3>
          <div className="flex flex-wrap gap-6 justify-center items-center lg:px-52">
            {
              charactersDetails.splice(0, 6).map((character, index) => (
                <>
                  {character && (
                    <Link href={`/characters/${getIdFromUrl({ query: { url: character.url, q: "people" } })}`}>
                      <article key={index} className="hover:text-primary transition-all ease-in-out duration-300">
                        <h2 className="pl-2 text-lg text-center lg:text-start">{character.name}</h2>
                        <Image
                          loading="lazy"
                          className="rounded-lg"
                          src="/character.webp"
                          alt={`${character.name}`}
                          width={200}
                          height={100}
                        />
                      </article>
                    </Link >
                  )}
                </>
              ))
            }
          </div>
          <DynamicAllCharacters />
        </section >
      }
    </>
  )
}