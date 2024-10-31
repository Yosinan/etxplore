/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function SmallCard({ 
    title, 
    image, 
    user,
    onSave, // Function to handle save/favorite post
    postedAt }) {  

  // Debugging log to check the profile picture URL
  console.log("User Profile Picture URL:", user.profilePicture);

  const avatarUrl = user.profilePicture || "https://via.placeholder.com/150"; // Default image
  
  return (
    <Card 
      className="w-80 h-80 shadow-lg hover:scale-105 duration-300 cursor-pointer" 
      onClick={onSave}  // Attach the onClick event
    >
      <CardHeader floated={false} className="h-2/3">
        <img src={image} alt="festival-picture" className="w-full h-full shadow-none" />
      </CardHeader>

      <CardBody className="flex justify-center flex-col items-center h-1/3">
        <div className="mb-3 flex items-center justify-between">
          {/* User Profile Picture and Username with Posted Time */}
          <div className="flex items-center space-x-2">
            {user.profilePicture ? (
              <img
                src={avatarUrl}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
            )}
            <div className="flex flex-col">
              <Typography variant="small" className="font-medium">
                {user.username}
              </Typography>
            </div>
          </div>
          <Typography
            color="gray"
            className="text-xs text-right"
          >
            {postedAt} {/* Format this in your preferred way */}
          </Typography>
        </div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-2 roboto-bold relative group"
        >
          {title}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-700 transition-all duration-300 group-hover:w-full"></span>
        </Typography>
      </CardBody>
    </Card>
  );
}
