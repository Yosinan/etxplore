import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../ReusableComponent/NavBar";
import Footer from "../ReusableComponent/Footer";
import FavorieCard from "../Cards/FavoritesCard";
import { baseUrl } from '../../utils/api';
import ProfileNav from "./profileNav";
import Loading from '../ReusableComponent/Loading';
import NoFavoriteFound from './NoFavoriteFound';


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

export default function FavoritePosts() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(true);
  const [error, setError] = useState(null);

  const handleSavePost = async (postId, isSaved) => {
    try {
      const url = isSaved ? `${baseUrl}/favorites/remove` : `${baseUrl}/favorites/add`;
      const method = isSaved ? 'delete' : 'post';
      const response = await axios({
        method: method,
        url: url,
        data: {
          id: postId,
          type: "user_contribution",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log("Post saved/unsaved successfully:", response.data);
        setIsSaved(!isSaved);
        toast.success(isSaved ? "Post unsaved successfully!" : "Post saved successfully!");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error saving/unsaving post:", error);
      alert("An error occurred while saving/unsaving the post. Please try again.");
    }
  };

  
  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // const articles = response.data.articles.map(article => ({
        //   id: article.id,
        //   title: article.title,
        //   description: article.description,
        //   media: article.media || "https://picsum.photos/id/428/367/267", // Use default image if media is not found
        //   user: {
        //     username: article.user.username,
        //     avatar: article.user.avatar,
        //   },
        // }));

       
        const userContributions = response.data.user_contributions.map(contribution => ({
          id: contribution.id,
          title: contribution.title,
          description: contribution.description,
          media: contribution.media,
          user: {
            username: contribution.user.username,
            avatar: contribution.user.avatar,
          },
          postedAt: contribution.created_at,
        }));
        setCardData(userContributions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading favorite posts: {error.message}</div>;
  }

  return (
    <>
      <Navbar />

      <div className="p-4 md:p-8 flex flex-col justify-center items-center shadow-xl">
        <ProfileNav />

        {/* If there are no favorites, display NoFavoriteFound */}
        {cardData.length === 0 ? (
          <NoFavoriteFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {cardData.map((card) => (
              <FavorieCard
                key={card.id}
                title={card.title}
                description={card.description}
                image={`http://localhost:8000/storage/images/${card.media}`}
                user={{
                  username: card.user.username,
                  profilePicture: `http://localhost:8000/storage/avatars/${card.user.avatar}`,
                }}
                onSave={() => handleSavePost(card.id, isSaved)}
                postedAt={formatTimeAgo(card.postedAt)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}