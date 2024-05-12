import { Metadata } from "next"
import { getCharacter } from "../../api"
import { CharacterType } from "../../types"

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  const character = await getCharacter(id)

  return {
    title: `${character.name} - Star Wars`,
    description: `${character.name} character Star Wars`
  }
}

export default async function CharacterPage({ params: { id } }: { params: { id: string } }) {
  const character: CharacterType = await getCharacter(id)

  const { name, eye_color, birth_year, hair_color, height, skin_color, mass } = character

  return (
    <>
      {character &&
        <section className="flex gap-8 p-16">
          <img className="rounded-lg" src="/character.webp" alt={name} width={400} height={200} />
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl text-primary font-bold">{name}</h1>
            {eye_color !== "uknwon" && eye_color !== "n/a" &&
              <p>Eye color: {eye_color}</p>
            }
            {birth_year !== "uknwon" && birth_year !== "n/a" &&
              <p>Birth year: {birth_year}</p>
            }
            {hair_color !== "uknwon" && hair_color !== "n/a" &&
              <p>Hair color: {hair_color}</p>
            }
            {height !== "uknwon" && height !== "n/a" &&
              <p>Height: {height}</p>
            }
            {skin_color !== "uknwon" && skin_color !== "n/a" &&
              <p>Skin color: {skin_color}</p>
            }
            {mass !== "uknwon" && mass !== "n/a" &&
              <p>Mass: {mass}</p>
            }
          </div>
        </section>
      }
    </>
  )
}