// Travel Buddy Prototype v0.1 - Global Script
const authForm = document.getElementById("authForm");
const createAccountBtn = document.getElementById("createAccountBtn");
const guestBtn = document.getElementById("guestBtn");
const message = document.getElementById("message");

authForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    message.textContent = "Please enter your email and password.";
    return;
  }

  message.style.color = "#1d7a35";
  message.textContent = "Sign in flow will connect here.";
});

createAccountBtn.addEventListener("click", function () {
  message.style.color = "#1d7a35";
  message.textContent = "Create account flow will connect here.";
});

guestBtn.addEventListener("click", function () {
  window.location.href = "home.html";
});

// Travel Buddy Prototype v0.1 - Release Reward Calculator

const releaseMilesInput = document.getElementById("releaseMiles");
const previewMiles = document.getElementById("previewMiles");
const previewPoints = document.getElementById("previewPoints");
const previewBonus = document.getElementById("previewBonus");

function calculateRewardEstimate(miles) {
  const safeMiles = Math.max(0, Number(miles) || 0);

  let bonusPoints = 0;
  let bonusLabel = "No bonus yet";

  if (safeMiles >= 1000) {
    bonusPoints = 750;
    bonusLabel = "1,000+ Mile Bonus";
  } else if (safeMiles >= 500) {
    bonusPoints = 250;
    bonusLabel = "500+ Mile Bonus";
  } else if (safeMiles >= 100) {
    bonusPoints = 100;
    bonusLabel = "100+ Mile Bonus";
  }

  const basePoints = safeMiles;
  const totalPoints = basePoints + bonusPoints;

  return {
    miles: safeMiles,
    totalPoints,
    bonusLabel
  };
}

function updateRewardPreview() {
  if (!releaseMilesInput || !previewMiles || !previewPoints || !previewBonus) {
    return;
  }

  const reward = calculateRewardEstimate(releaseMilesInput.value);

  previewMiles.textContent = reward.miles.toLocaleString();
  previewPoints.textContent = reward.totalPoints.toLocaleString();
  previewBonus.textContent = reward.bonusLabel;
}

if (releaseMilesInput) {
  releaseMilesInput.addEventListener("input", updateRewardPreview);
  updateRewardPreview();
}