import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const SessionMaker = () => {
  const [players, setPlayers] = useState(4)
  const router = useRouter()
  const { data: session } = useSession()
  const startGameSession = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/data/createSession', { method: 'POST', headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ username: session.user.username, roomSize: players }) })
      if (res.ok) {
        let data = await res.json()
        console.log(data)
        router.push(`/game/sessions/${data.id}`)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <form className="flex flex-col mx-5  " onSubmit={startGameSession}>
        <h1>No. of players</h1>
        <fieldset>
          <div>
            <label htmlFor="players-2">2</label>
            <input onChange={() => setPlayers(2)} checked={players === 2} id="players-2" type="radio" name="" value="" />
          </div>
          <div>
            <label htmlFor="players-3">3</label>
            <input onChange={() => setPlayers(3)} checked={players === 3} id="players-3" type="radio" name="" value="" />
          </div>
          <div>
            <label htmlFor="players-4">4</label>
            <input onChange={() => setPlayers(4)} checked={players === 4} id="players-4" type="radio" name="" value="" />
          </div>
        </fieldset>
        <button type="submit">Lets start the game!</button>
      </form>
    </div>
  )
}

export default SessionMaker
