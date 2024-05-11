import Link from "next/link"
import { getFilms } from "../api"
import Image from "next/image"
import { FilmType } from "../types"

export default async function Films() {
  const films = await getFilms()
  const getIdFromUrl = (url: FilmType["url"]): string => {
    const id = url.replace("https://swapi.dev/api/films/", "").replace("/", "")
    return id
  }

  return(
    <>
      {
        films.map(film => 
          <Link href={`/${getIdFromUrl(film.url)}`} key={film.episode_id}>
            <article className="">
              <h2>{film.title}</h2>
              <Image src="/film-banner.jpg" alt={`Banner ${film.title}`} width={1200} height={600} />
              <p>Episodio {getIdFromUrl(film.url)}</p>
            </article>
          </Link>
        )
      }
    </>
  )
}