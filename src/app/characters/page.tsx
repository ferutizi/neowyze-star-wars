import Link from "next/link";
import { getCharacters } from "../api";
import { CharacterType } from "../types";

export default async function Characters () {
  const characters = await getCharacters()

  const getIdFromUrl = (url: CharacterType["url"]): string => {
    const id = url.replace("https://swapi.dev/api/people/", "").replace("/", "")
    return id
  }

  return(
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 p-14">
      {
        characters.map((character) => 
          // Gets id from the end of the url
          <Link href={`characters/${getIdFromUrl(character.url)}`} key={character.name}>
            <article>
              <h2>{character.name}</h2>
              <img src="/character.png" alt={character.name} width={400} height={200} />
              <p>{character.eye_color}</p>
              <p>{character.gender}</p>
            </article>
          </Link>
        )
      }
    </section>
  )
}