// api/users
// get all users

const pg = require('pg');
import auth from '../auth/[...nextauth]';

console.log(auth);

const pool = new pg.Pool({
  host: 'mouse.db.elephantsql.com',
  port: 5432,
  database: process.env.POSTGRESQL_USER,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASS,
  max: 512,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

export default async function handler(req, res) {
  // const rows = await pool.query(`
  //   SELECT * FROM products
  // `)
  // console.log(rows);
  res.status(200).json({ name: 'John Doe' })
}