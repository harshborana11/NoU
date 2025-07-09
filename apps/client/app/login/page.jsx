"use client"
import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const page = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    if (session) {
      router.push('/game/dashboard')
    }
  }, [session])



  return (<>
    <div className="flex gap-9  justify-center items-center h-[80vh]">
      <div>
        <span className="Logo text-9xl">NoU</span>
      </div>
      <form className="flex flex-col justify-center items-center gap-3" onSubmit={handleSubmit}>
        <input className="border border-[var(--foreground)]" type="text" name="" value={username} />
        <input className="border border-[var(--foreground)]" type="email" name="" value={email} />
        <input className="border border-[var(--foreground)]" type="password" name="" value={password} />
        <button type="submit">Login</button>
        <button onClick={() => { signIn("github") }}>Sign in With GitHub</button>
        <button onClick={() => { signIn("google") }}>Sign in With google</button>
      </form>
    </div>
  </>)
}

export default page
