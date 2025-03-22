import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5clTeTt-VjBrH69si1K2QGEWf8IFOqSw",
  authDomain: "freemovie24-55b77.firebaseapp.com",
  projectId: "freemovie24-55b77",
  storageBucket: "freemovie24-55b77.firebasestorage.app",
  messagingSenderId: "336149877402",
  appId: "1:336149877402:web:0121038e9f5ff2a8a7c523",
  measurementId: "G-C8ELXWHKZJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        await addDoc(collection(db, 'users'), {
            email: email,
            phone: phone,
            password: password
        });
        alert('User registered successfully!');
    } catch (error) {
        console.error('Error adding user: ', error);
    }
});

document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const adminEmail = document.getElementById('admin-email').value;
    const adminPassword = document.getElementById('admin-password').value;

    if (adminEmail === 'admin@gmail.com' && adminPassword === '123') {
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                userList.innerHTML += `
                    <div>
                        <p>Email: ${user.email}</p>
                        <p>Phone: ${user.phone}</p>
                        <p>Password: ${user.password}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    } else {
        alert('Invalid admin credentials');
    }
});