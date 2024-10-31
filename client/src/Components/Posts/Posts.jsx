import { useState, useEffect } from "react";
import axios from "axios";
import PostsCard from "../Cards/PostsCard";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import img1 from "../../assets/landscape.jpg";
import NavbarDefault from "../ReusableComponent/NavBar";
import Footer from "../ReusableComponent/Footer";
import AddPost from "../PopUpMessages/addNewPost";
import { baseUrl } from "../../utils/api";
import { useAuth } from "../../Context/AuthContext"; // Import useAuth for authentication
import Loading from "../ReusableComponent/Loading";
import { toast } from "react-toastify";

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

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;  // Items displayed per page

  const { isLoggedIn } = useAuth(); // Check if the user is logged in

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user-contributions`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        console.log("token" + localStorage.getItem("token"));
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

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // Slice the posts array to show only the items for the current page
  const currentItems = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <NavbarDefault />
      <div className="mt-8 md:mt-16">
        <div className="flex justify-between items-center px-8">
          <h1 className="text-xl font-bold pl-8">Cultural Chronicles</h1>

          {isLoggedIn && (
            <div className="flex justify-end">
              <AddPost />
            </div>
          )}
        </div>

        <div className="px-8 py-2">
          {loading ? (
            <Loading/>
          ) : (
            <>
              <div className="gap-y-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center pt-10">
                {currentItems.length > 0 ? (
                  currentItems.map((post) => {
                    const description = post.description.split(" ").slice(0, 15).join(" ") + "...";
                    
                    const imageUrl = post.media ? getImageUrl(post.media) : "https://picsum.photos/id/428/367/267";
                    const avatarUrl = post.user.avatar ? getAvatarUrl(post.user.avatar) : img1;

                    return (
                      <PostsCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        description={description}
                        image={imageUrl} // Pass the image URL to the PostsCard component
                        isArticle={false}
                        user={{
                          username: post.user.username,
                          profilePicture: avatarUrl,
                        }}
                        onSave={() => handleSavePost(post.id, isSaved)} // Pass the save/favorite handler
                        postedAt={formatTimeAgo(post.created_at)} // Format the createdAt field
                      />
                    );
                  })
                ) : (
                      <p>No Cultural Chronicles available.</p>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  {/* Previous Button */}
                  <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                  </Button>

                  {/* Page Number Buttons */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <IconButton
                        key={page}
                        variant={currentPage === page ? "filled" : "text"}
                        color="black"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </IconButton>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={next}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
