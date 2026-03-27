// Get or create unique userId for this user
let userId = localStorage.getItem("uid");

if (!userId) {
  userId = Date.now().toString(); // unique ID
  localStorage.setItem("uid", userId);
}

// On page load: join the user and update coins
fetch("/join", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId })
})
.then(res => res.json())
.then(data => {
  document.getElementById("coins").innerText = "Coins: " + data.coins;
})
.catch(err => console.error("Error joining user:", err));

// Update coins display helper
function updateCoins(coins) {
  document.getElementById("coins").innerText = "Coins: " + coins;
}

// Daily bonus
function daily() {
  fetch("/daily", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      updateCoins(data.coins);
      alert("📅 Daily bonus claimed!");
    } else {
      alert(data.msg);
    }
  })
  .catch(err => alert("Error: " + err));
}

// Spin
function spin() {
  fetch("/spin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => {
    updateCoins(data.coins);
    alert("🎰 You won: " + data.reward + " coins!");
  })
  .catch(err => alert("Error: " + err));
}
