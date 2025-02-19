"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../utils/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link href="/">Home</Link>
      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            <Link href="/my-tickets">My Tickets</Link>
            <button onClick={handleLogout} className="text-red-300">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
