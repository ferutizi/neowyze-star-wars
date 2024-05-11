import { getFilm, getCharacter } from "../api"
import { FilmType, CharacterType } from "../types"

export default async function FilmPage({params: {id}}: {params: {id: number}}) {
  const film: FilmType = await getFilm(id)

  const getIdFromUrl = (url: FilmType["url"]): string => {
    const id = url.replace("https://swapi.dev/api/films/", "").replace("/", "")
    return id
  }

  const getCharacterDetails = async (characterURL: string): Promise<CharacterType | null> => {
    try {
      const normalizedId = characterURL.replace("https://swapi.dev/api/people/", "").replace("/", "").trim()
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


  return(
    <>
      {film &&
        <article className="flex flex-col justify-center p-16">
          <div className="flex gap-8">
            <img src="/film-banner.jpg" alt={`Banner ${film.title}`} width={800} height={400} />
            <div className="flex flex-col">
              <h1 className="text-6xl mb-4">{film.title}</h1>
              <p className="text-4xl text-primary opacity-85">Episodio: {getIdFromUrl(film.url)}</p>
              <p className="text-2xl opacity-85">{film.director}</p>
            </div>
          </div>
          <div>
          <div className="grid grid-cols-6 gap-8 justify-center">
            {
              charactersDetails.map((character, index) => (
                <>
                  {character && (
                    <div key={index}>
                      <h2 className="pl-2 text-lg">{character.name}</h2>
                      <img
                        className="rounded-lg"
                        src="/character.png"
                        alt={`${character.name}`}
                        width={200}
                        height={100}
                      />
                    </div>
                  )}
                </>
              ))
            }
          </div>
          </div>
        </article>
      }
    </>
  )
}