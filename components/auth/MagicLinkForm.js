import { useState } from "react";
import { sendMagicLink } from "../../utils/sendMagicLink";

export default function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const result = await sendMagicLink(email);
    setMessage(result.message);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Sign in with Magic Link</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-md mb-2"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          Send Magic Link
        </button>
      </form>

      {message && <p className="mt-2 text-center text-gray-700">{message}</p>}
    </div>
  );
}
