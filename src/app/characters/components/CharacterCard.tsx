import "./eyeColors.css"
import { getIdFromUrl } from "@/app/hooks/useGetIdFromUrl"
import { CharacterType } from "@/app/types"
import Link from "next/link"

interface CharacterCardProps {
  character: CharacterType
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, url, gender, eye_color } = character

  return (
    <article key={name} className="flex flex-col items-center">
      <Link href={`characters/${getIdFromUrl({ query: { url: url, q: "people" } })}`}>
        <h2 className="text-2xl pl-2 text-primary font-bold">{name}</h2>
        <img className="rounded-lg" src="/character.webp" alt={name} width={400} height={200} />
        <div className="flex justify-around">
          {
            gender !== "unknown" &&
            gender !== "n/a" &&
            gender !== "none" &&
            <div className="flex items-center gap-4">
              <p className="text-xl py-2">{gender}</p>
              <img
                className="h-4"
                src={`/${gender === 'male' ? 'male' : ''}${gender === 'female' ? 'female' : ''}.webp`} alt={`gender ${gender}`}
                height={'auto'}
              />
            </div>
          }
          {
            eye_color !== "unknown" &&
            eye_color !== "n/a" &&
            <div className="flex items-center gap-4">
              <img
                className={`h-6 eye ${"eye-" + eye_color}`}
                src="eye.webp"
                alt="eye"
                height={'auto'}
              />
              <p className="text-xl py-2">{eye_color}</p>
            </div>
          }
        </div>
      </Link>
    </article>
  )
}