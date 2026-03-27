let userId = localStorage.getItem("uid");

if (!userId) {
  userId = Date.now();
  localStorage.setItem("uid", userId);
}

fetch("/join", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId })
})
.then(res => res.json())
.then(data => {
  document.getElementById("coins").innerText = "Coins: " + data.coins;
});

function daily() {
  fetch("/daily", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById("coins").innerText = "Coins: " + data.coins;
    } else {
      alert(data.msg);
    }
  });
}

function spin() {
  fetch("/spin", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userId })
  })
  .then(res => res.json())
  .then(data => {
    alert("🎉 You won: " + data.reward);
    document.getElementById("coins").innerText = "Coins: " + data.coins;
  });
}
