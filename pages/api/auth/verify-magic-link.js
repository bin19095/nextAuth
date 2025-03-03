import { firestore } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
    console.log("verifying magic link hanlder");
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: "Token is required" });

  try {
    const userRef = await firestore.collection("users").where("magicToken", "==", token).get();

    if (userRef.empty) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const userDoc = userRef.docs[0];
    const userData = userDoc.data();
    const tokenExpiry = userData.magicTokenExpiry.toMillis ? userData.magicTokenExpiry.toMillis() : userData.magicTokenExpiry;
    if (tokenExpiry < Date.now()) {
        return res.status(400).json({ error: "Token has expired" });
      }
  
      // Clear the magic token after use
      await userDoc.ref.update({ magicToken: null, magicTokenExpiry: null });
  
      return res.status(200).json({ user: { id: userDoc.id, email: userData.email } }); // ✅ Return user object
    } catch (error) {
      console.error("Error verifying magic token:", error);
      return res.status(500).json({ error: "Failed to verify magic token" });
    }
}
