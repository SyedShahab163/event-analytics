import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "eventdb",
  password: "newpassword",
  port: 5432,
});

client.connect()
  .then(() => {
    console.log("✅ Database Connected!");
    client.end();
  })
  .catch(err => console.error("❌ Connection Error:", err));
