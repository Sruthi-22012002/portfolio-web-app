const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3001;

// ✅ CORS - Allow frontend on port 3000
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Use a MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0612",
  database: "portfolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ Handlebars setup
const hbs = exphbs.create({ extname: ".handlebars" });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Fetch all contact messages
app.get("/submit-message", (req, res) => {
  const sql = "SELECT * FROM contacts";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err.message);
      return res.status(500).send("Database error: " + err.message);
    }
    res.render("submit-message", { messages: results });
  });
});

// Handle contact form POST request
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).json({ error: "Database error: " + err.message });
    }
    res.status(200).json({ message: "Message submitted successfully!" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

