import admin from "firebase-admin";
import serviceAccount from "./firebase-adminsdk.json"; // 🔥 Your downloaded Firebase key

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();
export { admin, firestore };
