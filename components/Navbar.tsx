"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { signOut, getAuth, User } from "firebase/auth"; // Adjust the import path based on your Firebase setup
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth(); // Get the Auth instance
      await signOut(auth);
      setUser(null); // Clear user state
      router.push("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white relative z-50 border-b-2 border-black px-4">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-5">
        {/* Logo Section */}
        <div className="flex flex-row font-poppins font-bold text-[26px] z-10 items-center relative text-black">
          Nearby Hostels
        </div>

        {/* Authentication Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="w-[117px] h-[45px] bg-red-600 rounded-3xl text-white font-davidLibre flex justify-center items-center text-[15.5px] hover:bg-red-700 drop-shadow-lg transition"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <div className="w-[117px] h-[45px] bg-[#000000] rounded-3xl text-white font-davidLibre flex justify-center items-center text-[15.5px] hover:bg-white drop-shadow-lg hover:text-black transition">
              Login
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
