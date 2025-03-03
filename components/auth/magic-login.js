import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MagicLogin() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetch("/api/auth/verify-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            router.push("/profile");
          }
        })
        .catch(() => setError("Something went wrong"))
        .finally(() => setLoading(false));
    }
  }, [token]);



  return (
    <div>
      <h2>{loading ? "Verifying..." : error ? error : "Success!"}</h2>
    </div>
  );
}
