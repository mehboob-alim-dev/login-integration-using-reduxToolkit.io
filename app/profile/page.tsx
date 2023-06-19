"use client";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Perform navigation back to login page
    router.push("/");
  };

  return (
    <>
      <h1>Profile page</h1>
      <button onClick={() => handleLogout()} style={{ marginTop: "10px" }}>
        Logout
      </button>
    </>
  );
}
