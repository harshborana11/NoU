"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000', {
  autoConnect: false,
});

const page = () => {
  const params = useParams();
  const sessionId = params.sessionId;
  const [resp, setRes] = useState(null)
  const { data: session, status } = useSession()
  const joinSession = async () => {
    if (status !== 'authenticated' || !session || !params?.sessionId) return;
    try {
      const res = await fetch('http://localhost:5000/api/data/joinSession', { method: 'POST', headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ username: session.user.username, sessionId: params.sessionId }) })
      let data = await res.json()
      setRes(JSON.stringify(data))
      console.log(data)
      socket.connect();
      socket.emit('join-session', sessionId);
      socket.on('user-joined', ({ socketId }) => {
        console.log('🟢 Another player joined:', socketId);
      });


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [params.sessionid]);

  useEffect(() => {
    joinSession()
  }, [status])





  return (
    <div>
      {params.sessionId}
      {resp}
    </div>
  )
}

export default page
