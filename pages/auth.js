import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import MagicLinkForm from "../components/auth/MagicLinkForm";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <AuthForm />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <MagicLinkForm />
      </div>
    </>
  );
}

export default AuthPage;
