export const sendMagicLink = async (email) => {
    try {
        
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      console.log("magicData",data);
      if (!response.ok) throw new Error(data.error || "Failed to send magic link");
  
      return { success: true, message: "Magic link sent! Check your email." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
