import Link from "next/link"
import { getFilms } from "./api"
import { FilmType } from "./types"

export default async function Home() {
  const films: FilmType[] = await getFilms()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
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
      </section>
    </main>
  );
}
