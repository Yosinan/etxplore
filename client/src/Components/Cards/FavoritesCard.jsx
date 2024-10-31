/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon, HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"; // Outlined heart
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"; // Solid/filled heart
import img1 from "../../assets/landscape.jpg"; // Default image


export default function PostsCard({
    id,
    title,
    description,
    image, // Image prop passed from parent
    isArticle,
    user,
    onSave, // Function to handle save/favorite post
    postedAt,
}) {
    const navigate = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false); // State to manage favorite status

    // Conditionally render the image: use the passed image prop, or the default image
    const imageUrl = image || img1;

    // console.log("User Profile Picture URL:", postedAt);

    const handleSave = () => {
        const newIsFavorited = !isFavorited;
        console.log("New favorite state:", newIsFavorited);
        setIsFavorited(newIsFavorited); // Toggle favorite state
        onSave(id, newIsFavorited); // Call the save function passed from parent with the new state
    };

    // console.log("Image from backend", image);

    return (
        <div className="max-w-xs w-full shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-100">
            <div className="relative">
                <img src={imageUrl} alt="post-image" className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black opacity-60"></div>
                {/* Save/Favorite Icon Button */}
                <button
                    className="absolute top-2 right-2 p-2 rounded-full focus:outline-none"
                    onClick={handleSave}
                >
                    {!isFavorited ? (
                        <SolidHeartIcon className="h-6 w-6 text-red-600" />
                    ) : (
                        <OutlineHeartIcon className="h-6 w-6 text-white" />
                    )}
                </button>
            </div>

            <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                    {/* User Profile Picture and Username with Posted Time */}
                    <div className="flex items-center space-x-2">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.username}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <UserCircleIcon className="w-8 h-8 text-gray-400" />
                        )}
                        <div className="flex flex-col">
                            <span className="font-medium">{user.username}</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">{postedAt}</span>
                </div>

                {/* Post Title */}
                <h5 className="text-lg font-bold text-gray-800 mb-1">{title}</h5>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-2 h-16 overflow-hidden">{description}</p>
            </div>

            {isArticle && (
                <div className="p-4">
                    <button
                        onClick={() => navigate(`/detail/${id}`)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Explore more...
                    </button>
                </div>
            )}
        </div>
    );
}
