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