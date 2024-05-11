import Link from "next/link"
import { getFilms } from "../api"


export default async function Films() {
  const films = await getFilms()
  return(
    <>
      {
        films.map(film => 
          <Link href={`/${film.episode_id}`} key={film.episode_id}>
            <article>
              <h2>{film.title}</h2>
              {/* img */}
              <p>Episodio {film.episode_id}</p>
            </article>
          </Link>
        )
      }
    </>
  )
}