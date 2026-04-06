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

// Travel Buddy Prototype v0.1 - Release Save + Redirect

const confirmReleaseBtn = document.getElementById("confirmReleaseBtn");

function saveReleaseDraft() {
  const releasePhoto = document.getElementById("releasePhoto");
  const releaseLocation = document.getElementById("releaseLocation");
  const releaseMiles = document.getElementById("releaseMiles");
  const releaseJourney = document.getElementById("releaseJourney");
  const releaseCaption = document.getElementById("releaseCaption");

  if (!releaseLocation || !releaseMiles || !releaseJourney || !releaseCaption) {
    return null;
  }

  const reward = calculateRewardEstimate(releaseMiles.value);

  const releaseData = {
    buddyName: "Buddy Atlas",
    photoName: releasePhoto && releasePhoto.files[0] ? releasePhoto.files[0].name : "No photo uploaded",
    location: releaseLocation.value.trim(),
    miles: Number(releaseMiles.value) || 0,
    journey: releaseJourney.value.trim(),
    caption: releaseCaption.value.trim(),
    estimatedPoints: reward.totalPoints,
    bonusTier: reward.bonusLabel,
    releasedAt: new Date().toISOString()
  };

  localStorage.setItem("travelBuddyLatestRelease", JSON.stringify(releaseData));
  return releaseData;
}

if (confirmReleaseBtn) {
  confirmReleaseBtn.addEventListener("click", function () {
    const releaseData = saveReleaseDraft();

    if (!releaseData) return;

    if (!releaseData.location || !releaseData.journey) {
      alert("Please enter at least a release location and journey description.");
      return;
    }

    window.location.href = "buddy.html";
  });
}