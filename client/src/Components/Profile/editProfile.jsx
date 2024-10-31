import { useState, useEffect } from "react";
import Navbar from "../ReusableComponent/NavBar";
import Footer from "../ReusableComponent/Footer";
import ProfileNav from "./profileNav";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { Card, Input, Typography, Button } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfile() {
  const location = useLocation();
  const { history } = useNavigate();
  const { initialFirstName, initialLastName, email, initialAvatar } = location.state || {};

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatar ? initialAvatar : null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Avatar File:", file);
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (initialAvatar) {
      setAvatarPreview(initialAvatar);
    }
  }, [initialAvatar]);


  const handlePasswordChange = async () => {
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    try {
      const response = await axios.put(`${baseUrl}/password`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Password Response:", response.data);
      toast.success("Password changed successfully");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error changing password ", error.response ? error.response.data : error.message);
      toast.error("Failed to change password");
    }
  };

 

  const handleSaveProfile = async () => {
    
    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response  = await axios.post(`${baseUrl}/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile Response:", response.data );

     toast.success("Profile updated successfully");
      history.push("/displayProfile");
    } catch (error) {
      console.error("Error saving profile:", error);
      // Optionally, handle the error (e.g., show a notification)

    }
  };

  // const handleSaveProfile = async () => {
  //   const formData = {
  //     first_name: String(firstName),
  //     last_name: String(lastName),
  //   };

  //   if (avatar) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(avatar);
  //     reader.onload = async () => {
  //       formData.avatar = reader.result;

  //       // Log formData
  //       console.log("FormData:", formData);

  //       try {
  //         const response = await axios.put(`${baseUrl}/profile/update`, formData, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             "Content-Type": "application/json",
  //           },
  //         });

  //         console.log("Profile Response:", response.data);

  //         alert("Profile updated successfully");
  //         // history.push("/displayProfile");
  //       } catch (error) {
  //         console.error("Error saving profile:", error.response ? error.response.data : error.message);
  //         // Optionally, handle the error (e.g., show a notification)
  //       }
  //     };
  //     reader.onerror = (error) => {
  //       console.error("Error reading file:", error);
  //     };
  //   };
  // };

  return (
    <>
      <Navbar />

      <div className="p-6 md:p-12 flex flex-col items-center shadow-lg rounded-md border bg-white max-w-screen-lg mx-auto my-4">
        <h1 className="text-center text-2xl roboto-bold">Edit Profile</h1>
        <ProfileNav />

        <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
          {/* Profile Section */}
          <Card color="transparent" shadow={false} className="flex-1 p-6">
            <form className="mt-8 mb-2 w-full">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Avatar
                </Typography>
                <div className="flex items-center">
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div
                      className={`w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center ${!avatarPreview ? "bg-gray-200" : ""}`}
                    >
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Typography color="gray" className="text-sm">
                          Upload
                        </Typography>
                      )}
                    </div>
                  </label>
                </div>

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  First Name
                </Typography>
                <Input
                  size="lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Last Name
                </Typography>
                <Input
                  size="lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  value={email}
                  disabled
                />
              </div>
            </form>
          </Card>

          {/* Password Change Section */}
          <Card color="transparent" shadow={false} className="flex-1 p-6 md:py-28">
            <Typography variant="h6" color="blue-gray" className="mb-4 text-center">
              Change Password
            </Typography>
            <form className="mb-2 w-full">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Old Password
                </Typography>
                <Input
                  size="lg"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  type="password"
                  placeholder="Enter old password"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  New Password
                </Typography>
                <Input
                  size="lg"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Confirm Password
                </Typography>
                <Input
                  size="lg"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="!border-t-blue-gray-200 focus:!border-t-blue-gray-900"
                />
              </div>
              <div className="flex gap-4 mt-4 justify-center">
                <Button onClick={handlePasswordChange}>Change Password</Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Save Button for Profile Changes */}
        <div className="flex gap-4 mt-4">
          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}
