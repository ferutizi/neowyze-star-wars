import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return(
    <header className="flex items-center justify-center pl-14">
      <div className="flex items-center max-w-[1920px] w-full">
        <Link href="/">
          <img src="/logo.png" alt="Star Wars logo" width={120} height={100} />
        </Link>
        <Nav />
      </div>
    </header>
  )
}