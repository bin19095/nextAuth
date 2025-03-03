import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const VerifyMagicLink = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (token) => {
    try {
      
    const result = await signIn("credentials",{ token, redirect: false});

    if (result?.ok) {
        console.log("Authentication successful");
          router.push("/profile");
        } else {
          console.error("Failed to create session:", result.error);
        } 
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  return <div>Verifying magic link...</div>;
};

export default VerifyMagicLink;
