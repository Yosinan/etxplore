import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../ReusableComponent/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../ReusableComponent/Footer";
import PostsCard from "../Cards/PostsCard";
import { baseUrl } from '../../utils/api';
import ProfileNav from "./profileNav";
import img1 from "../../assets/landscape.jpg";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Card, Typography, Button } from "@material-tailwind/react";
import Loading from '../ReusableComponent/Loading';


const getImageUrl = (path) => {
  return `http://localhost:8000/storage/images/${path}`;
};


const getAvatarUrl = (path) => {
  return `http://localhost:8000/storage/avatars/${path}`;
};


// Helper function to format time
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export default function ViewPosts() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user-post`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCardData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <>
      <Navbar />

      <div className="p-4 md:p-8 flex flex-col justify-center items-center shadow-xl">
        <ProfileNav />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-full">
          {cardData.length > 0 ? (
            cardData.map((card) => {
              const imageUrl = card.media ? getImageUrl(card.media) : img1;
              const avatarUrl = card.user.avatar ? getAvatarUrl(card.user.avatar) : img1;
              return (
              <PostsCard
                key={card.id}
                title={card.title}
                image={imageUrl}
                description={card.description}
                user={{
                  username: card.user.username,
                  profilePicture: avatarUrl,
                }}
                onSave={() => handleSavePost(card.id)} // Pass the save/favorite handler
                postedAt={formatTimeAgo(card.created_at)}
              />
              );
          })
          ) : (
            <p>No posts available.</p>
          )}
        </div>

        {/* Add New Post Button */}
        <div className="mt-8 w-full flex justify-center">
          <Card className="flex flex-col items-center justify-center p-6 rounded-md shadow-md border border-gray-300 bg-white hover:bg-gray-100">
            <Button
              className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={() => navigate('/posts')}
            >
              <PlusIcon className="h-8 w-8 text-white" />
            </Button>
            <Typography
              variant="h6"
              className="mt-4 text-center text-blue-gray-800"
            >
              Add New Post
            </Typography>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
}
