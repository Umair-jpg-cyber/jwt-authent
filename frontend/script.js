const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/;
  const passwordRegex = /^(?=[A-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let isValid = true;

  if (!emailRegex.test(email)) {
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!phoneRegex.test(phone)) {
    phoneError.textContent = "Phone must be 11 digits!";
    isValid = false;
  } else {
    phoneError.textContent = "";
  }

  if (!passwordRegex.test(password)) {
    passwordError.textContent =
      "Password must start with uppercase, include lowercase, number, special char, and be 8+ chars.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (!isValid) return;

  // Store users in localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!existingUser) {
    users.push({ username, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully. Try logging in.");
    form.reset();
    return;
  }

  // Login request if user found
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        alert("Login successful");
        localStorage.setItem("token", data.token);
        form.reset();
      } else {
        alert("Invalid login");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});
