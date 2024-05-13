import Link from "next/link"
import { getFilms } from "../api"
import Image from "next/image"
import { getIdFromUrl } from "../hooks/useGetIdFromUrl"

export default async function Films() {
  const films = await getFilms()

  return (
    <>
      {
        films.map(film =>
          <Link href={`/${getIdFromUrl({ query: { url: film.url, q: "films" } })}`} key={film.episode_id}>
            <article>
              <h2 className="text-2xl text-primary font-bold">{film.title}</h2>
              <Image src="/film-banner.webp" alt={`Banner ${film.title}`} width={500} height={250} priority={true} />
              <p className="text-xl py-2">Episode {getIdFromUrl({ query: { url: film.url, q: "films" } })}</p>
            </article>
          </Link>
        )
      }
    </>
  )
}