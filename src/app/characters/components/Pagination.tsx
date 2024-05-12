'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function Pagination() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const currentPage = Number(searchParams.get('page')) || 1
  console.log(currentPage)

  const nextPage = () => {
    const params = new URLSearchParams(searchParams)
    params.set('page', (currentPage + 1).toString())

    replace(`${pathName}?${params}`)
  }


  return (
    <div className="m-auto w-10 flex justify-center gap-8 text-lg pt-14 mb-4">
      <button className="hover:text-primary transition-all ease-in-out duration-300">{"<"}</button>
      <span>{currentPage}</span>
      <button onClick={() => nextPage()} className="hover:text-primary transition-all ease-in-out duration-300">{">"}</button>
    </div>
  )
}