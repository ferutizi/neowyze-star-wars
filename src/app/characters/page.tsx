import Link from "next/link";
import { getCharacters } from "../api";
import { getIdFromUrl } from "../hooks/useGetIdFromUrl";
import { Metadata } from "next";
import LoadMore from "./components/LoadMore";
import { FiltersType } from "../types";

export const metadata: Metadata = {
  title: `Star Wars Characters - Neowyze`,
  description: "Characters of Star Wars films",
};

export default async function Characters() {
  const characters = await getCharacters(1)

  const filters: FiltersType = {
    eye: { isActive: true, color: "blue" },
    gender: { isActive: true, gen: "male" }
  }

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 p-14">
      {
        characters
          .filter(ch =>
            (!filters.eye.isActive || ch.eye_color === filters.eye.color) &&
            (!filters.gender.isActive || ch.gender === filters.gender.gen)
          )
          .map(({ name, url, gender, eye_color }) =>
            <article key={name} className="flex flex-col items-center">
              <Link href={`characters/${getIdFromUrl({ query: { url: url, q: "people" } })}`}>
                <h2 className="text-2xl pl-2 text-primary font-bold">{name}</h2>
                <img className="rounded-lg" src="/character.webp" alt={name} width={400} height={200} />
                <div className="flex justify-around">
                  {
                    gender !== "unknown" &&
                    gender !== "n/a" &&
                    <div className="flex items-center gap-4">
                      <p className="text-xl py-2">{gender}</p>
                      <img className="h-4" src={`/${gender}.webp`} alt="eye" height={8} />
                    </div>
                  }
                  {
                    eye_color !== "unknown" &&
                    eye_color !== "n/a" &&
                    <div className="flex items-center gap-4">
                      <img className={`h-6 eye ${"eye-" + eye_color}`} src="eye.webp" alt="eye" height={8} />
                      <p className="text-xl py-2">{eye_color}</p>
                    </div>
                  }
                </div>
              </Link>
            </article>
          )
      }
      <LoadMore filters={filters} />
    </section>
  )
}