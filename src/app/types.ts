export type FilmType = {
  title: string,
  episode_id: number,
  characters: string[],
  created: string,
  director: string,
  edited: string,
  opening_crawl: string,
  planets: string[],
  producer: string,
  release_date: string,
  species: string[],
  starships: string[],
  url: string,
  vehicles: string[]
}

export type CharacterType = {
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: string[],
  species: string[],
  vehicles: string[],
  starships: string[],
  created: string,
  edited: string,
  url: string
}