import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres", // default database
  password: "newpassword",
  port: 5432,
});

async function createDatabase() {
  try {
    await client.connect();
    await client.query("CREATE DATABASE eventdb");
    console.log("✅ Database 'eventdb' created successfully!");
    await client.end();
  } catch (err) {
    console.error("❌ Error creating database:", err);
  }
}

createDatabase();
