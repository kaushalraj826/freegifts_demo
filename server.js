const express = require("express");
const path = require("path");
const app = express();

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

let users = {};

// Join route
app.post("/join", (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { coins: 100, lastDaily: 0 };
  }

  res.json(users[userId]);
});

// Daily bonus
app.post("/daily", (req, res) => {
  const { userId } = req.body;
  let now = Date.now();

  if (now - users[userId].lastDaily > 86400000) {
    users[userId].coins += 20;
    users[userId].lastDaily = now;
    return res.json({ success: true, coins: users[userId].coins });
  }

  res.json({ success: false, msg: "Already claimed" });
});

// Spin
app.post("/spin", (req, res) => {
  const { userId } = req.body;
  let reward = Math.floor(Math.random() * 50);
  users[userId].coins += reward;

  res.json({ reward, coins: users[userId].coins });
});

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Railway port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
