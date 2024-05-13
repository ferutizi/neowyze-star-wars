'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Filters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearchGender = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term !== "all") {
      params.set('gender', term)
    } else {
      params.delete('gender')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSearchEye = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term !== "all") {
      params.set('eye_color', term)
    } else {
      params.delete('eye_color')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form className="flex flex-col md:flex-row gap-4 md:gap-8 items-end w-fit m-auto justify-center text-2xl md:text-lg pt-14 pb-8">
      <label className="flex gap-4">
        Gender:
        <select
          className="text-background w-36 pl-1 rounded-lg outline-none"
          defaultValue={searchParams.get('gender')?.toString() || 'all'}
          onChange={(e) => handleSearchGender(e.target.value)}
        >
          <option value="all">All</option >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select >
      </label >
      <label className="flex gap-4">
        Eye Color
        <select
          defaultValue={searchParams.get('eye_color')?.toString() || 'all'}
          className="text-background w-36 pl-1 rounded-lg outline-none"
          onChange={(e) => handleSearchEye(e.target.value)}
        >
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="gold">Gold</option>
          <option value="orange">Orange</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="pink">Pink</option>
          <option value="brown">Brown</option>
          <option value="hazel">Hazel</option>
        </select>
      </label>
    </form >
  )
}