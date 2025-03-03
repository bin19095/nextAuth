import { firestore } from "../../../lib/firebaseAdmin";
import { sendMagicLinkEmail } from "../../../utils/sendMagicLinkEmail";
import { randomBytes } from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Mehthod not allowed" });	
  try{
  const { email } = req.body;
  console.log("email received from magicLink", email);

  if (!email) return res.status(400).json({ error: "Email is required" });
  // Generate a random token
  const magicToken = randomBytes(32).toString("hex");
  const magicTokenExpiry = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes

  // Store token & expiry time in Firestore
 
  const userRef = firestore.collection("users").doc(email);
  
  await userRef.update({ email, magicToken, magicTokenExpiry }, { merge: true });
  
   // Send email with magic link
   const link = `${process.env.NEXTAUTH_URL}/auth/verify-magic-link?token=${magicToken}`;
   await sendMagicLinkEmail(email, link);
   res.status(200).json({message:"Magic link set!"});
  } catch (err) {
    console.error("Error storing maic token",err);
  }

 
 
  res.status(200).json({ message: "Magic link sent!",  });
}
