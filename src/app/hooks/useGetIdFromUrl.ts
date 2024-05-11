import { FilmType, CharacterType } from "../types"

type filmQueryType = {
  url: FilmType["url"],
  q: "films"
}

type CharacterQueryType = {
  url: CharacterType["url"],
  q: "people"
}

interface getIdProps {
  query: filmQueryType | CharacterQueryType
}

export const getIdFromUrl = ({ query }: getIdProps): string => {
  const id = query.url.replace(`https://swapi.dev/api/${query.q}/`, "").replace("/", "")
  return id
}