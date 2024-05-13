import Link from "next/link";
import { getCharacters } from "../api";
import { getIdFromUrl } from "../hooks/useGetIdFromUrl";
import { Metadata } from "next";
import LoadMore from "./components/LoadMore";
import { Suspense } from "react";
import Filters from "./components/Filters";

export const metadata: Metadata = {
  title: `Star Wars Characters - Neowyze`,
  description: "Characters of Star Wars films",
};

export default async function Characters({
  searchParams
}: {
  searchParams?: {
    gender?: string,
    eye_color?: string
  }
}) {
  const characters = await getCharacters(1)
  const gender = searchParams?.gender
  const eye_color = searchParams?.eye_color

  return (
    <>
      <Filters />
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 p-14 pt-0">
        <Suspense key={gender}>
          {
            characters
              .filter(ch =>
                /* if isActive is false or filter match with character prop-- > map */
                (!eye_color || ch.eye_color.includes(eye_color)) &&
                (!gender || ch.gender === gender)
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
        </Suspense>
        <LoadMore gender={gender} eyeColor={eye_color} />
      </section>
    </>
  )
}