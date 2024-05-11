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
        characters.map(({ name, url, gender, eye_color }) =>
          <article className="flex flex-col items-center">
            <Link href={`characters/${getIdFromUrl(url)}`} key={name}>
              <h2 className="text-2xl pl-2 text-primary font-bold">{name}</h2>
              <img className="rounded-lg" src="/character.png" alt={name} width={400} height={200} />
              <div className="flex justify-around">
                {
                  gender !== "unknown" &&
                  gender !== "n/a" &&
                  <div className="flex items-center gap-4">
                    <p className="text-xl py-2">{gender}</p>
                    <img className="h-4" src={`/${gender}.png`} alt="eye" height={8} />
                  </div>
                }
                {
                  eye_color !== "unknown" &&
                  eye_color !== "n/a" &&
                  <div className="flex items-center gap-4">
                    <img className={`h-6 eye ${"eye-" + eye_color}`} src="eye.png" alt="eye" height={8} />
                    <p className="text-xl py-2">{eye_color}</p>
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