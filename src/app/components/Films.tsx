import Link from "next/link"
import { getFilms } from "../api"
import Image from "next/image"

export default async function Films() {
  const films = await getFilms()
  return(
    <>
      {
        films.map(film => 
          <Link href={`/${film.episode_id}`} key={film.episode_id}>
            <article>
              <h2>{film.title}</h2>
              <Image src="/film-banner.jpg" alt="Banner Star Wars film" width={1200} height={600} />
              <p>Episodio {film.episode_id}</p>
            </article>
          </Link>
        )
      }
    </>
  )
}