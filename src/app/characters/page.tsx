import "./eyeColors.css"
import { getCharacters } from "../api";
import { Metadata } from "next";
import LoadMore from "./components/LoadMore";
import { Suspense } from "react";
import Filters from "./components/Filters";
import CharacterCard from './components/CharacterCard';

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
    <main className="mt-[72px]">
      <Filters />
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 p-14 pt-0">
        <Suspense key={`${gender}-${eye_color}`}>
          {
            characters
              .filter(ch =>
                (!eye_color || ch.eye_color.includes(eye_color)) &&
                (!gender || ch.gender === gender)
              )
              .map((character) =>
                <CharacterCard key={character.name} character={character} />
              )
          }
        </Suspense>
        <LoadMore gender={gender} eyeColor={eye_color} />
      </section>
    </main>
  )
}