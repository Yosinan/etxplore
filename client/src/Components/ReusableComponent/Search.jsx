import { useState } from "react";
import { Button, Input, Card, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import LargeCard from "../Cards/LargeCard";
import img1 from "../../assets/landscape.jpg";
import { baseUrl } from "../../utils/api";
import Loading from "../ReusableComponent/Loading";

export default function Search() {
  const location = useLocation(); // hook to track current page
  const isHomeOrExplore = location.pathname === "/" || location.pathname === "/explore";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/articles/search?q=${searchQuery}`);
      const data = await response.json();
       if (response.ok) {
        setSearchResults(data);
      }
      else {
        console.error("Error fetching search results:", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  // const currentItems = searchResults.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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
      <div className="relative mr-3 md:mr-0 flex w-full gap-2 md:w-max ">
        <Input
          type="search"
          color={isHomeOrExplore ? "white" : "black"}
          label="Type here..."
          className="pr-20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
        <Button
          size="sm"
          color="yellow"
          className="!absolute right-1 top-1 rounded"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {loading && <Loading />}

      {!loading && searchResults.length > 0 && (
        <div className="mt-8 md:mt-16">
          <div className="px-8 py-2">
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
              {currentItems.length > 0 ? (
                currentItems.map((article) => {
                  const description = article.description
                    .split(" ")
                    .slice(0, 25)
                    .join(" ");
                  return (
                    <LargeCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      description={description}
                      image={article.image || img1}
                      isArticle={true}
                    />
                  );
                })
              ) : (
                <p>No Cultural Articles available.</p>
              )}
            </div>

            {/* {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={prev}
                  disabled={currentPage === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <IconButton
                        key={page}
                        variant={currentPage === page ? "filled" : "text"}
                        color="gray"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </IconButton>
                    )
                  )}
                </div>

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
            )} */}
          </div>
        </div>
      )}
    </>
  );
}