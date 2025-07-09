import pkg from 'pg';
import { v4 as uuidv4 } from "uuid"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config()
const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


export const oauth = async (req, res) => {
  const { email, username } = req.body
  if (!email || !username) {
    return res.status(400).json({ error: "email and username are required" })
  }
  const result = await pool.query("SELECT uuid, username FROM oauth WHERE email = $1", [email])
  if (result.rowCount > 0) {
    const token = jwt.sign(
      { uuid: result.rows[0].uuid },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );
    let data = result.rows[0]
    console.log(token)
    res.status(200).json({ ...data, token });
  } else {
    try {
      const uuid = uuidv4()
      const result = await pool.query(
        'INSERT INTO oauth (username, email, uuid) VALUES ($1, $2 , $3 ) RETURNING *',
        [username, email, uuid]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log(err)
    }
  }
};



