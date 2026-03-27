const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

let users = {};

// join
app.post("/join", (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { coins: 100, lastDaily: 0 };
  }

  res.json(users[userId]);
});

// daily bonus
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

// spin
app.post("/spin", (req, res) => {
  const { userId } = req.body;

  let reward = Math.floor(Math.random() * 50);
  users[userId].coins += reward;

  res.json({ reward, coins: users[userId].coins });
});

// 🔥 IMPORTANT FIX (Railway port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
