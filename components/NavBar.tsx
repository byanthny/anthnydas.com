import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full max-w-[] p-6 px-[20%] pt-3">
      <div className="bg-neutral-900/50 backdrop-blur-md rounded-lg w-full flex flex-row justify-between items-center border-neutral-700/10 border-2 px-6 py-3">
        <h1 className="text-lg font-bold">@byanthny</h1>
        <div className="flex flex-row items-center gap-3">
          <Link href="/" className="text-neutral-300 hover:text-white">
            index
          </Link>
          {/* <Link href="/" className="text-neutral-300 hover:text-white">
            log
          </Link> */}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
