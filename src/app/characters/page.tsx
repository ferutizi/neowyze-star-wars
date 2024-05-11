import Link from "next/link";
import { getCharacters } from "../api";
import { CharacterType } from "../types";

export default async function Characters() {
  const characters = await getCharacters()

  const getIdFromUrl = (url: CharacterType["url"]): string => {
    const id = url.replace("https://swapi.dev/api/people/", "").replace("/", "")
    return id
  }

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 p-14">
      {
        characters.map((character) =>
          <article className="flex flex-col items-center">
            <Link href={`characters/${getIdFromUrl(character.url)}`} key={character.name}>
              <h2>{character.name}</h2>
              <img className="rounded-lg" src="/character.png" alt={character.name} width={400} height={200} />
              <div className="flex justify-around">
                <p>{character.gender}</p>
                <p>{character.eye_color}</p>
              </div>
            </Link>
          </article>
        )
      }
    </section>
  )
}