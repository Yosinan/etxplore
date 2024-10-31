import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../ReusableComponent/NavBar";
import Footer from "../ReusableComponent/Footer";
import ProfileNav from "./profileNav";
import { Card, Input, Typography, Button } from "@material-tailwind/react";
import { baseUrl } from "../../utils/api";
import axios from "axios";

export default function DisplayProfile() {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
    
  // fecth user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

    return (
        <>
            <Navbar />

            <div className="p-12 flex flex-col justify-center items-center shadow-lg rounded-md border bg-white max-w-screen-md mx-auto my-4">
                <h1 className="text-center text-2xl roboto-bold">Hi, {user.first_name}</h1>
                <ProfileNav />
                <Card color="transparent" shadow={false}>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                First Name
                            </Typography>
                            <Input
                                size="lg"
                                value={user.first_name == null ? "" : user.first_name}
                                readOnly
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Last Name
                            </Typography>
                            <Input
                                size="lg"
                                value={user.last_name == "null" ? "" : user.last_name}
                                readOnly
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Your Email
                            </Typography>
                            <Input
                              size="lg"
                              placeholder="name@mail.com"
                              value={user.email}
                              disabled
                            />
                        </div>
                    </form>
                </Card>
                <Link
                    to="/editProfile"
                    state={{
                        initialFirstName: user.first_name == null ? "" : user.first_name,
                        initialLastName: user.last_name == null ? "" : user.last_name,
                        initialAvatar: user.avatar,
                        email: user.email,
                    }}
                >
                    <Button className="text-end">Edit</Button>
                </Link>
            </div>

            <Footer />
        </>
    );
}
