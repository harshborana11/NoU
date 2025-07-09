"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import SessionMaker from "../components/SessionMaker"
const page = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loginInfo, setLoginInfo] = useState()
  const checkLogin = async () => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }
  useEffect(() => {
    let data = checkLogin();
    setLoginInfo(data)
  }, [session, router])

  if (status === 'authenticated') {
    return (
      <div>
        Signed in as {session.user.email} <br /><button onClick={() => signOut()}>Sign out</button>
        <h2>Welcome, {session.user.username}</h2>
        <h2>your uuid is , {session.user.uuid}</h2>
        <SessionMaker />
      </div>
    )
  }
}

export default page
