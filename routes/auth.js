import express from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) return res.status(400).json({ msg: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) return res.status(400).json({ msg: "Invalid credentials" });

    const validPass = bcrypt.compareSync(password, user.rows[0].password);
    if (!validPass) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
