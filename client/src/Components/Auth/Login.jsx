import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/api';
import img1 from "../../assets/Vector.png";
import img2 from "../../assets/email.png";
import img3 from "../../assets/password.png";
import img5 from "../../assets/login.png";
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPassword = () => {
    alert("Forgot Password clicked!");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });

      if (!response.data.token) {
        throw new Error("Login failed");
      }
      
      login(response.data.token); // Set the token in the context
      
      // console.log("Login successful:", response.data);
      navigate('/'); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="relative flex w-full max-w-4xl h-auto md:flex-row p-4 rounded-lg shadow-lg bg-white">
        
        {/* Left side (form) */}
        <div className="flex flex-col items-start p-6 w-full md:w-1/2">
          {/* Back Arrow */}
          <div className="flex items-center mb-4 mt-4 hover:scale-105 transition-transform duration-200">
            <img
              src={img1}
              alt="Back Arrow"
              className="h-6 w-6 ml-2 cursor-pointer text-gray-600"
              onClick={() => navigate('/')} // Navigate to root when clicked
            />
          </div>

          <div className='flex flex-col justify-center items-center mb-6'>
            <h2 className="roboto-bold text-2xl text-center mb-2">Login</h2>
            <p className="roboto-medium text-sm text-gray-700">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          {/* Form */}
          <form
            className="w-full sm:w-3/4 md:w-5/6 p-4 mb-6 bg-gray-100 shadow-inner rounded-lg"
            onSubmit={handleLogin}
          >
            {/* Email Field */}
            <div className="flex items-center p-1 mb-4 relative bg-white rounded-lg shadow-sm">
              <img src={img2} alt="Email Icon" className="h-5 w-5 ml-4" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="flex-1 p-3 pl-5 pr-0 border-0 focus:outline-none focus:ring-1 focus:ring-green-500 font-volkhov text-sm rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center p-1 mb-0 relative bg-white rounded-lg shadow-sm">
              <img src={img3} alt="Password Icon" className="h-5 w-5 ml-4" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="flex-1 p-3 pl-5 pr-0 border-0 focus:outline-none focus:ring-1 focus:ring-green-500 font-volkhov text-sm rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
              />

              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600 hover:text-black"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

          </form>

          {/* Login Button */}
          <button
            className={`w-full sm:w-3/4 md:w-5/6 py-3 text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          {/* Forgot Password Button */}
          <div className="flex justify-end mb-1 mt-4">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline focus:outline-none transition-colors duration-200"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>


          {/* Redirect to Sign Up */}
          <p className="text-gray-600 mt-4 text-sm text-center">
            Don’t have an account?
            <a
              onClick={() => navigate('/signup')}
              className="font-poppins text-base font-bold leading-6 text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200 cursor-pointer ml-1"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Right-side Image Section */}
        <div className="hidden md:flex absolute right-0 top-0 h-full items-center justify-center" style={{ width: '60%', maxWidth: '400px' }}>
          <img
            src={img5}
            alt="Illustration"
            className="opacity-100 h-full w-full object-cover rounded-tr-lg rounded-br-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
