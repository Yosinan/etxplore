import { UserIcon, EyeIcon, StarIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/api";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import  LogoutConfirmation  from "../PopUpMessages/logoutConfirmPopUp";
import { useState } from "react";

export default function ProfileNav() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Perform logout logic here
    logout();
    axios.post(`${baseUrl}/logout/`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Use stored token
      },
    });
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <ul className="flex gap-2 md:gap-8 roboto-bold mt-2">
        <Link
          to="/displayProfile"
          className={`flex items-center gap-2 hover:scale-105 ${isActive("/displayProfile") ? "text-green-500" : ""}`}
        >
          <UserIcon className="h-5 w-5" /> Profile
        </Link>

        <Link
          to="/viewPosts"
          className={`flex items-center gap-2 hover:scale-105 ${isActive("/viewPosts") ? "text-green-500" : ""}`}
        >
          <EyeIcon className="h-5 w-5" /> View Posts
        </Link>

        <Link
          to="/favoritePosts"
          className={`flex items-center gap-2 hover:scale-105 ${isActive("/favoritePosts") ? "text-green-500" : ""}`}
        >
          <StarIcon className="h-5 w-5" /> Favorites
        </Link>

        <button
          onClick={() => setModalOpen(true)} // Open the modal
          className={`flex items-center gap-2 hover:scale-105 ${isActive("/logout") ? "text-green-500" : ""}`}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
        </button>
      </ul>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation
        open={modalOpen}
        handleClose={() => setModalOpen(false)} // Close the modal
        onConfirm={handleLogout} // Handle logout confirmation
      />
    </>
  );
}
