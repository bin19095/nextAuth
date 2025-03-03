import NextAuth from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";
import { db } from "../../../lib/firestore-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { verifyPassword } from "../../../lib/auth";
// Email Provider imports
import EmailProvider from "next-auth/providers/email";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "../../../lib/firebaseAdmin";

// Verify environment variables
// console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
// console.log("EMAIL_SERVER:", process.env.EMAIL_SERVER);
// console.log("EMAIL_FROM:", process.env.EMAIL_FROM);

export default NextAuth({
  providers: [
      // 📌 Magic Link Authentication (Token-based)
      CredentialProviders({
        name: "Magic Link",
        credentials: {
          token: { label: "Token", type: "text" },
        },
        async authorize(credentials) {
          const { token } = credentials;
          console.log("authorization token here ",token)
          // Call backend to validate magic link token
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify-magic-link`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
  
          const data = await res.json();
          if (res.ok && data.user) {
            return { id: data.user.id, email: data.user.email };
          }
  
          throw new Error("Invalid or expired magic link");
        },
      }),
    //Email and Authentication
    CredentialProviders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", credentials.email));
        const querySnapshot = await getDocs(q);
        // querySnapshot return true if the item doesn't exist so, false means it exists
        if (querySnapshot.empty) {
          throw new Error("Couldn't find the user");
        }

        const userData = querySnapshot.docs[0].data();
        const isValid = await verifyPassword(
          credentials.password,
          userData.password
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        console.log("mail found in store",userData.email)
        return { id: querySnapshot.docs[0], email: userData.email };
      },
    }),
    
    // Email provider
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER, // SMTP email server
    //   from: process.env.EMAIL_FROM, // Your email
    // }),
  ],
  

  //

  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  // adapter: FirestoreAdapter(firestore), // Firestore as the DB
  // secret: process.env.NEXTAUTH_SECRET,
});
