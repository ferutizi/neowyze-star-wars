import Nav from "./Nav";

export default function Header() {
  return(
    <header className="flex items-center justify-center pl-14">
      <div className="flex items-center max-w-screen-xl w-full">
        <img src="/logo.png" alt="Star Wars logo" width={120} height={100} />
        <Nav />
      </div>
    </header>
  )
}