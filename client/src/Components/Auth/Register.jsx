import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';
import img1 from "../../assets/Vector.png";
import img2 from "../../assets/user.png";
import img3 from "../../assets/email.png";
import img4 from "../../assets/password.png";
import img5 from "../../assets/login.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          password_confirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      
      // store token in local storage
      login(data.token);
      toast.success("Sign up successful!");
      // console.log("Token:", data.token);
      // console.log("Success:", data);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="relative flex w-full max-w-4xl h-auto md:flex-row p-4 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col items-start p-6 w-full md:w-1/2">
          {/* Back arrow to navigate to the login page */}
          <div className="flex items-center mb-4 mt-4 hover:scale-105 transition-transform duration-200">
            <img
              src={img1}
              alt="Back Arrow"
              className="h-6 w-6 ml-2 cursor-pointer text-gray-600"
              onClick={() => navigate("/login")} // Navigate to Login page
            />
          </div>

          {/* Title and Description */}
          <div className="flex flex-col justify-center items-center mb-6">
            <h2 className="roboto-bold text-2xl text-center mb-2">Sign Up</h2>
            <p className="roboto-medium text-sm text-gray-700">
              Welcome to EtXplore - Let’s create your account
            </p>
          </div>

          {/* Form Section */}
          <form
            className="w-full sm:w-3/4 md:w-5/6 p-4 mb-6 bg-gray-100 shadow-inner rounded-lg"
            onSubmit={handleSignUp}
          >
            {/* Username Field */}
            <div className="flex items-center p-1 mb-4 relative bg-white rounded-lg shadow-sm">
              <img src={img2} alt="Username Icon" className="h-6 w-6 ml-4" />
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="flex-1 p-3 pl-5 pr-0 border-0 focus:outline-none focus:ring-1 focus:ring-green-500 font-volkhov text-sm rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center p-1 mb-4 relative bg-white rounded-lg shadow-sm">
              <img src={img3} alt="Email Icon" className="h-6 w-6 ml-4" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="flex-1 p-3 pl-5 pr-0 border-0 focus:outline-none focus:ring-1 focus:ring-green-500 font-volkhov text-sm rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center p-1 mb-4 relative bg-white rounded-lg shadow-sm">
              <img src={img4} alt="Password Icon" className="h-6 w-6 ml-4" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="flex-1 p-3 pl-5 pr-0 border-0 focus:outline-none focus:ring-1 focus:ring-green-500 font-volkhov text-sm rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                required
              />
            </div>

            {/* confirm password field */}
            <div className="flex items-center p-1 mb-1 relative bg-white rounded-lg shadow-sm">
              <img src={img4} alt="Password Icon" className="h-6 w-6 ml-4" />
              <input
                id="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                className="flex-1 p-3 pl-5 pr-0 border-0 focus:outline-none focus:ring-1 focus:ring-green-500 font-volkhov text-sm rounded-lg"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                aria-label="Confirm Password"
                required
              />
            </div>

            {/* Display error message */}
            {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
          </form>

          {/* Sign Up Button */}
          <button
            className="w-full sm:w-3/4 md:w-5/6 py-3 text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300"
            type="submit"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Redirect to Login */}
          <p className="text-gray-600 mt-4 text-sm text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-poppins text-sm font-bold leading-6 text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
            >
              Log In
            </a>
          </p>
        </div>

        {/* Right-side Image Section */}
        <div className="hidden md:flex absolute right-0 top-0 h-full items-center justify-center" style={{ width: "60%", maxWidth: "400px" }}>
          <img
            src={img5}
            alt="Sign Up Illustration"
            className="opacity-100 h-full w-full object-cover rounded-tr-lg rounded-br-lg"
          />
        </div>
      </div>
    </div>
      <ToastContainer />
    </>
    
  );
};

export default SignUp;
