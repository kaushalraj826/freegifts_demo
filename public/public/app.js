// Unique user ID for this client
let userId = localStorage.getItem("uid");
if (!userId) {
  userId = Date.now().toString();
  localStorage.setItem("uid", userId);
}

// Update coins display
function updateCoins(coins) {
  document.getElementById("coins").innerText = "Coins: " + coins;
}

// Join user on page load
fetch("/join", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId })
})
.then(res => res.json())
.then(data => updateCoins(data.coins))
.catch(err => console.error(err));

// Daily bonus
function daily() {
  fetch("/daily", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) updateCoins(data.coins);
    else alert(data.msg);
  })
  .catch(err => alert(err));
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
    alert("🎉 You won: " + data.reward + " coins!");
  })
  .catch(err => alert(err));
}
