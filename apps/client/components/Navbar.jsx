import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex font-large justify-between p-8 px-12">
      <span className="Logo">NoU</span>
      <div className="flex justify-around gap-3">
        <a href="https://github.com/harshborana11/NoU" target="/">GitHub</a>
        <Link href={'/login'}>Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
