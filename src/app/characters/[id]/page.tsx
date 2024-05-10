import { getCharacter } from "../../api"
import { CharacterType } from "../../types"

export default async function CharacterPage({params: {id}}: {params: {id: string}}) {
  const character: CharacterType = await getCharacter(id)

  return(
    <>
      {character &&
        <section>
          <h1>{character.name}</h1>
          {/* img */}
          <p>{character.eye_color}</p>
          <p>{character.birth_year}</p>
          <p>{character.hair_color}</p>
          <p>{character.height}</p>
          <p>{character.skin_color}</p>
          <p>{character.mass}</p>
        </section>
      }
    </>
  )
}