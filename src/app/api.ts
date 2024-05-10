import { FilmType } from "./types"

export const getFilms = async (): Promise<FilmType[]> => {
  try {
    const res = await fetch("https://swapi.dev/api/films")
    const data = await res.json()
    const films: FilmType[] = data.results
  
    return films
  } catch(error) {
    console.log("Error al obtener las películas: ", error)
    throw error
  }
}

export const getFilm = async (id: number): Promise<FilmType> => {
  try {
    const res = await fetch(`https://swapi.dev/api/films/${id}`)
    const film: FilmType = await res.json()

    return film
  } catch(error) {
    console.log(`Error al obtener la película. ID ${id}:`, error)
    throw error
  }

}