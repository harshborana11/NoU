import pkg from 'pg';
import { v4 as uuidv4 } from "uuid"
import { ErrorsOnCreatingGameSession } from '../utils/errors.js';

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const createSession = async (req, res) => {
  try {
    const { username, roomSize } = await req.body
    const id = uuidv4()
    const result = await pool.query(
      'insert into game_sessions (id, host_username,room_size , state) values ($1, $2 , $3, $4 ) returning *',
      [id, username, roomSize, 'waiting']
    );
    const data = result.rows[0];
    res.status(201).json({ info: data, id });
  } catch (err) {
    let responce = ErrorsOnCreatingGameSession(err)
    res.status(responce.error).json({ error: responce.error, message: responce.message });
  }

}

export const joinSession = async (req, res) => {
  try {
    const { username, sessionId } = req.body
    const result = await pool.query("SELECT * FROM game_sessions WHERE id = $1", [sessionId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Session not found" });
    }
    const session = result.rows[0];
    if (session.participants.includes(username)) {
      return res.status(200).json({ message: "Already joined" });
    }
    if (session.participants.length >= session.room_size) {
      return res.status(403).json({ error: "Room is full" });
    }
    await pool.query(
      "UPDATE game_sessions SET participants = array_append(participants, $1) WHERE id = $2",
      [username, sessionId]
    );
    return res.status(200).json({ message: "Joined successfully", sessionId });
  } catch (err) {
    console.log(err)
  }
}


