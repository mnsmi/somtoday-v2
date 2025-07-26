import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'index.html';
  } else {
    const el = document.getElementById('userEmail');
    if (el) el.textContent = `Ingelogd als: ${user.email}`;
  }
});

document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).then(() => (window.location.href = 'index.html'));
});

function showPage(id) {
  const loader = document.getElementById('custom-loader');
  loader.style.display = 'flex';

  setTimeout(() => {
    document.querySelectorAll('.page-section').forEach(page => {
      page.style.display = (page.id === id) ? 'block' : 'none';
    });
    loader.style.display = 'none';
  }, 1000);
}

function handleHashChange() {
  const hash = window.location.hash.substring(1) || 'rooster';
  showPage(hash);

  document.querySelectorAll('.sidebar a').forEach(link => {
    const href = link.getAttribute('href').substring(1);
    link.classList.toggle('active', href === hash);
    link.toggleAttribute('aria-current', href === hash);
  });
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

document.querySelectorAll('.vakje').forEach(vakje => {
  vakje.addEventListener('click', () => {
    document.getElementById('popup-vak').textContent = vakje.dataset.vak;
    document.getElementById('popup-info').textContent = vakje.dataset.info;
    document.getElementById('popup').style.display = 'block';
  });
});

window.sluitPopup = () => {
  document.getElementById('popup').style.display = 'none';
};

document.getElementById('kleurKiezer')?.addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--accentkleur', e.target.value);
});

document.getElementById('darkModeToggle')?.addEventListener('change', (e) => {
  document.body.classList.toggle('darkmode', e.target.checked);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const el = document.getElementById('accountEmail');
    if (el) el.textContent = user.email;
  }
});