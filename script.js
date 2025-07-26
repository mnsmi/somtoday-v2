import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPHInNObFJ9BVj73Wtieu1EWCVJbnF0fg",
  authDomain: "somtoday-f1197.firebaseapp.com",
  projectId: "somtoday-f1197",
  storageBucket: "somtoday-f1197.appspot.com",
  messagingSenderId: "502669719508",
  appId: "1:502669719508:web:a8af071834142aad658841"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.onload = () => {
  const backgrounds = [
    "url('img/back1.jpg')",
    "url('img/back2.jpg')",
    "url('img/back3.jpg')",
    "url('img/back4.jpg')",
    "url('img/back5.jpg')"
  ];
  document.body.style.backgroundImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

document.getElementById('togglePassword')?.addEventListener('change', (e) => {
  const pw = document.getElementById('password');
  pw.type = e.target.checked ? 'text' : 'password';
});

const form = document.getElementById('loginForm');
const status = document.getElementById('status');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "";
  status.style.color = 'inherit';

  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    status.textContent = "Vul zowel e-mailadres als wachtwoord in.";
    status.style.color = 'red';
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => (window.location.href = "dashboard.html"))
    .catch(() => {
      status.textContent = "Inloggen mislukt. Controleer je gegevens.";
      status.style.color = "red";
    });
});

const logo = document.querySelector('img[alt="Somtoday logo"]');
if (logo) {
  logo.addEventListener('contextmenu', e => e.preventDefault());
  logo.setAttribute("draggable", "false");
}