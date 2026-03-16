import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "brevly",
  password: "5432",
  port: 5432,
});