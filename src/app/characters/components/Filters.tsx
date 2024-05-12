'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Filters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearchGender = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('gender', term)
    } else {
      params.delete('gender')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <button onClick={() => handleSearchGender('male')}>male</button>
      <button onClick={() => handleSearchGender('female')}>female</button>
    </>
  )
}