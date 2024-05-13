import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="flex items-center justify-center p-2 md:pl-14">
      <div className="flex items-center max-w-[1920px] w-full">
        <Link href="/">
          <img src="/logo.webp" alt="Star Wars logo" width={120} height={100} />
        </Link>
        <Nav />
      </div>
    </header>
  )
}