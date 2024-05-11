import { getFilm } from "../api"
import { FilmType } from "../types"

export default async function FilmPage({params: {id}}: {params: {id: number}}) {
  const film: FilmType = await getFilm(id)
  const getIdFromUrl = (url: FilmType["url"]): string => {
    const id = url.replace("https://swapi.dev/api/films/", "").replace("/", "")
    return id
  }
  
  return(
    <>
      {film &&
        <article>
          <h1>{film.title}</h1>
          {/* img */}
          <p>Episodio: {getIdFromUrl(film.url)}</p>
          <p>{film.director}</p>
        </article>
      }
    </>
  )
}