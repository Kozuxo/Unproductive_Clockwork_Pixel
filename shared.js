// shared.js

// Define shared variables and functions here
const firebaseConfig = {
  apiKey: "AIzaSyDiCHEzbfWANNoRFinVojyT8bLU3RukT7E",
  authDomain: "unproductive-clockwork-pixel.firebaseapp.com",
  databaseURL: "https://unproductive-clockwork-pixel-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "unproductive-clockwork-pixel",
  storageBucket: "unproductive-clockwork-pixel.appspot.com",
  messagingSenderId: "463047297753",
  appId: "1:463047297753:web:ce01a3e27d83a141fb0cc8",
  measurementId: "G-GC9VJVGVFW"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function displayUserInfo(username) {
  const userRef = database.ref('users/' + username.replace('.', '_'));
  userRef.once('value')
      .then((snapshot) => {
          const userData = snapshot.val();
          console.log('Retrieved user data:', userData);

          if (userData) {
              const userInfo = document.getElementById('user-info');
              userInfo.textContent = `Logged in as ${username}. Stats: HP(${userData.hp}), Attack(${userData.attack}), Defend(${userData.defend}), Agility(${userData.agility})`;

              // Update the user's coins count
              const coinsCountElement = document.getElementById('coinsCount');
              if (coinsCountElement) {
                  coinsCountElement.textContent = userData.coins;
              }
          } else {
              alert('User data not found');
          }
      })
      .catch((error) => {
          alert(error.message);
      });
}

function updateUserInfoFromDatabase(username) {
  return new Promise((resolve, reject) => {
    const userRef = database.ref('users/' + username.replace('.', '_'));
    userRef.once('value')
      .then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          // Update all user stats from the database
          userAttack = userData.attack;
          userDefense = userData.defend;
          userAgility = userData.agility;

          // Update user health and other stats
          userHp = userData.hp;
          updateStats();  // Update the user stats immediately
          resolve();  // Resolve the promise once the update is complete
        } else {
          reject(new Error('User data not found'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Other shared functions and variables
