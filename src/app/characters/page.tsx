import Link from "next/link";
import { getCharacters } from "../api";

export default async function Characters () {
  const characters = await getCharacters()

  return(
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 p-14">
      {
        characters.map((character) => 
          // Gets id from the end of the url
          <Link href={`characters/${character.url.replace("https://swapi.dev/api/people/", "").replace("/", "")}`} key={character.name}>
            <article>
              <h2>{character.name}</h2>
              {/* img */}
              <p>{character.eye_color}</p>
              <p>{character.gender}</p>
            </article>
          </Link>
        )
      }
    </section>
  )
}