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
    <form className="flex gap-8">
      <label>
        Gender:
        <select
          className="text-black"
          defaultValue="all"
          onChange={(e) => handleSearchGender(e.target.value)}
        >
          <option value="all" > All</option >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select >
      </label >
      <label>
        Eye Color
        <select
          defaultValue="all"
          className="text-black"
          onChange={(e) => handleSearchEye(e.target.value)}
        >
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </label>
    </form >
  )
}