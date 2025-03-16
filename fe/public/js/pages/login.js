import { authService } from '../services/auth.js';
import { loadPage } from '../router/router.js';
import { CLIENT_ID, REDIRECT_URI } from '../utils/constants.js';
const form = document.getElementById('loginForm');

form.addEventListener('formValid', async () => {
  const user = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
  };

  const result = await authService.login(user);
  if (result) {
    loadPage('/');
  }
});

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
  const passwordInput = document.getElementById('password');
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

const login42Button = document.querySelector('[data-translationKey="login42"]');
if (login42Button) 
{
  login42Button.addEventListener("click", async function () {
    try {
      const response = await fetch ("http://localhost:8000/auth/login", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok){
        throw new Error("Login error");
      }
      const redirect_url = await response.text();
      console.log("Redirect URL:", redirect_url);
      window.location.href = redirect_url;
    } 
    catch (error) {
      console.error("Login error:", error);
    }
      // window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/logout") {
      fetch("http://localhost:8000/api/auth/logout", {
          method: "POST",
          credentials: "include",
      })
      .then(response => response.json())
      .then(data => {
          console.log("Logout successful:", data);
          window.location.href = "/"; // Redirige a la home tras cerrar sesión
      })
      .catch(error => console.error("Logout error:", error));
  }
});
