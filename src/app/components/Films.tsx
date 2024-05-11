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
              <h2 className="text-2xl text-primary font-bold">{film.title}</h2>
              <Image src="/film-banner.jpg" alt={`Banner ${film.title}`} width={500} height={400} />
              <p className="text-xl py-2">Episode {getIdFromUrl(film.url)}</p>
            </article>
          </Link>
        )
      }
    </>
  )
}