import { db } from "../../../lib/firestore-config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { hashPassword } from "../../../lib/auth";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res
        .status(422)
        .json({ error: "Please provide email and password" });
    }
    const isUserExisting = async (email) => {
      //This checks Firestore for an existing email and returns true if no match is found (meaning the email is unique).
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      // true if no documents match the query
      return !querySnapshot.empty;
    };

    // Hash the password before storing it in the database

    try {
      const userExists = await isUserExisting(email);
      if (userExists) {
        return res.status(409).json({ error: "Email already exists" });
      }
      const hashedPassword = await hashPassword(password);
      await addDoc(collection(db, "users"), {
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong, please try again" });
    }
  }
}
export default handler;
