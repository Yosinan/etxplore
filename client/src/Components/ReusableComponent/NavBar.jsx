import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  UserCircleIcon,
  HomeIcon,
  GlobeAltIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import Search from "./Search";
import LogoutConfirmation from "../PopUpMessages/logoutConfirmPopUp"; // Import the confirmation component
import { baseUrl } from "../../utils/api";
import axios from "axios";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for logout confirmation
  const location = useLocation(); // To track the current page location
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Get authentication state
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Assume setIsLoggedIn is available in the context

  // Event listener to close nav on window resize
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const isHomeOrExplore =
    location.pathname === "/" || location.pathname === "/explore";

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-16">
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 roboto-bold">
        <Link
          to="/"
          className={`flex items-center gap-x-1 p-1 roboto-bold ${
            isHomeOrExplore
              ? "text-white hover:text-green-500"
              : "text-black hover:text-green-500"
          }`}>
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 roboto-bold">
        <Link
          to="/explore"
          className={`flex items-center gap-x-1 p-1 roboto-bold ${
            isHomeOrExplore
              ? "text-white hover:text-yellow-500"
              : "text-black hover:text-yellow-700"
          }`}>
          <GlobeAltIcon className="h-5 w-5" />
          Explore
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 roboto-bold">
        <Link
          to="/posts"
          className={`flex items-center gap-x-1 p-1 roboto-bold ${
            isHomeOrExplore
              ? "text-white hover:text-red-500"
              : "text-black hover:text-red-500"
          }`}>
          <PencilIcon className="h-4 w-4" />
          Chronicles
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className="flex items-center gap-x-2 p-1 roboto-bold">
        <Link
          to="/festival"
          className={`flex items-center gap-x-1 p-1 roboto-bold ${
            isHomeOrExplore
              ? "text-white hover:text-green-500"
              : "text-black hover:text-green-500"
          }`}>
          <BoltIcon className="h-5 w-5" />
          Festival
        </Link>
      </Typography>

      {/* Display Login/Logout or Profile link based on login status */}
      {!isLoggedIn ? (
        <Typography
          as="li"
          variant="small"
          className="flex items-center gap-x-2 p-1 roboto-bold">
          <Link
            to="/login"
            className="md:hidden flex items-center gap-x-2 text-white hover:text-blue-500">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Login
          </Link>
        </Typography>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 roboto-bold">
            <Link
              to="/displayProfile"
              className="md:hidden flex items-center gap-x-4 text-white hover:text-blue-500">
              <UserIcon className="h-5 w-5" />
              View Profile
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            className="flex items-center gap-x-2 p-1 roboto-bold">
            <Button
              className="md:hidden bg-red-400 flex items-center gap-x-4 text-gray-200 "
              onClick={() => setShowLogoutConfirm(true)} // Show logout confirmation on click
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Logout
            </Button>
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <>
      <Navbar className="mx-auto w-full py-2 lg:py-4 bg-transparent backdrop-blur-md border-none">
        <div className="container mx-auto flex items-center justify-between text-white">
          {/* Brand Logo */}
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium">
            <h1 className="text-2xl font-bold">
              <span className="text-green-500">Et</span>
              <span className="text-yellow-500">X</span>
              <span className="text-red-500">plore</span>
            </h1>
          </Typography>

          {/* Navigation List */}
          <div className="hidden lg:block">{navList}</div>

          {/* Search Bar */}
          <div className="lg:ml-16 hidden lg:block">
            <Search />
          </div>

          {/* Login Button or User Icon */}
          <div>
            {isLoggedIn ? (
              <Link to="/displayProfile">
                <UserCircleIcon
                  className={`hidden lg:block h-9 w-9 hover:scale-105 ${
                    isHomeOrExplore ? "text-white" : "text-gray-900"
                  }`}
                />
              </Link>
            ) : (
              <Link to="/login">
                <Button className="hidden lg:block" color="green">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <IconButton
            variant="text"
            className={`ml-auto h-6 w-6 lg:hidden ${
              isHomeOrExplore ? "text-white" : "text-black"
            }`}
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>

        {/* Mobile Nav */}
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            <div className="flex items-center">
              <Search />
            </div>
          </div>
        </MobileNav>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation
        open={showLogoutConfirm}
        handleClose={() => setShowLogoutConfirm(false)} // Close the modal
        onConfirm={handleLogout} // Handle logout confirmation
      />
    </>
  );
}
