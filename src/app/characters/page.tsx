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
                {
                  character.gender !== "unknown" &&
                  character.gender !== "n/a" &&
                  <div className="flex items-center gap-4">
                    <p>{character.gender}</p>
                    <img className="h-4" src={`/${character.gender}.png`} alt="eye" height={8} />
                  </div>
                }
                {
                  character.eye_color !== "unknown" &&
                  character.eye_color !== "n/a" &&
                  <div className="flex items-center gap-4">
                    <img className={`h-6 eye ${"eye-" + character.eye_color}`} src="eye.png" alt="eye" height={8} />
                    <p>{character.eye_color}</p>
                  </div>
                }
              </div>
            </Link>
          </article>
        )
      }
    </section>
  )
}