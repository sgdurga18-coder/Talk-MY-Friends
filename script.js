import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  collection,
  getDocs,
  query,
  limit
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


let currentUser = null;


// Firebase Login Check
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;

  loadUsers();

});


// Load Firebase Users
async function loadUsers() {

  const usersList =
    document.getElementById("usersList");

  if (!usersList) return;

  try {

    const usersQuery = query(
      collection(db, "users"),
      limit(50)
    );

    const snapshot =
      await getDocs(usersQuery);

    usersList.innerHTML = "";

    snapshot.forEach((userDoc) => {

      const user = userDoc.data();

      if (user.uid === currentUser.uid) {
        return;
      }

      const card =
        document.createElement("div");

      card.className = "user-card";

      card.innerHTML = `
        <img
          src="${user.photoURL || "https://via.placeholder.com/100"}"
          class="user-avatar"
          alt="Profile"
        >

        <div class="user-info">
          <h3>${user.fullName || "User"}</h3>
          <p>@${user.username || "username"}</p>
        </div>

        <button class="chat-btn">
          💬 Chat
        </button>
      `;


      // REAL UID CHAT CONNECTION
      const chatButton =
        card.querySelector(".chat-btn");

      chatButton.addEventListener(
        "click",
        () => {

          window.location.href =
            "chat.html?uid=" +
            encodeURIComponent(user.uid);

        }
      );


      usersList.appendChild(card);

    });

  } catch (error) {

    console.error(
      "Error loading users:",
      error
    );

  }

}