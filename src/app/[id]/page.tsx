import { getFilm } from "../api"
import { FilmType } from "../types"

export default async function FilmPage({params: {id}}: {params: {id: number}}) {
  const film: FilmType = await getFilm(id)

  return(
    <>
      {film &&
        <article>
          <h1>{film.title}</h1>
          {/* img */}
          <p>Episodio: {film.episode_id}</p>
          <p>{film.director}</p>
        </article>
      }
    </>
  )
}