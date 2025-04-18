const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const SECRET_KEY = "simpleSecret";

app.use(cors());
app.use(bodyParser.json());

let users = [
  { username: "test", password: "Test1234@" },
  { username: "admin", password: "Admin1234@" },
  { username: "umair", password: "Umair123@" },
  { username: "ali", password: "Ali@43ok@" },
  { username: "hamza", password: "Hamza22@" },
  { username: "qasim", password: "Qasim221@" },

];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid login" });
  }
});

app.get("/secret", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json({ message: "Access granted", user });
  });
});

app.listen(3000, () =>
  console.log("✅ Server running at http://localhost:3000")
);
