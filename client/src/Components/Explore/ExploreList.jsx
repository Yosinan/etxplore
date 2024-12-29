import { useState, useEffect } from "react";
import axios from "axios";
import LargeCard from "../Cards/LargeCard";
import { Button, IconButton, Select, Option } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import img1 from "../../assets/landscape.jpg";
import { baseUrl } from "../../utils/api";
import Loading from "../ReusableComponent/Loading";

export default function ExploreList() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle Category Click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle Region Change
  const handleRegionChange = (event) => {
    setSelectedRegion(event);
  };

  const resetFilters = () => {
    setSelectedRegion("");
    setSelectedCategory("");
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${baseUrl}/articles/`);
        const sortedArticles = response.data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        console.log("Sorted Articles:", sortedArticles[2].media);
        setArticles(sortedArticles);
        setFilteredArticles(sortedArticles); // Initialize filteredArticles with sortedArticles
      } catch (error) {
        console.error("Error fetching Articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {

    // Fetch Regions
    const fetchRegions = async () => {
      const response = await axios.get(`${baseUrl}/regions`);
      setRegions(response.data);
    };

    // Fetch Categories
    const fetchCategories = async () => {
      const response = await axios.get(`${baseUrl}/categories`);
      // console.log("Categories:", response.data);
      setCategories(response.data);
    };

    fetchRegions();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter Articles based on selected Region and Category
    const filterArticles = () => {
      let filtered = articles;

      if (selectedRegion) {
        filtered = filtered.filter(
          (article) => article.region_id === selectedRegion
        );
      }
      // console.log("Selected Category:", filtered[0].categories.includes(selectedCategory));

      if (selectedCategory) {
        filtered = filtered.filter(
          (article) =>
            article.categories.some((category) => category.id === selectedCategory)
        );
      }

      setFilteredArticles(filtered);
    };

    filterArticles();
  }, [selectedRegion, selectedCategory, articles]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentItems = filteredArticles.slice(
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-8 md:mt-16">
      <div className="p-4 md:p-8 flex flex-col md:flex-row justify-around">
        <div className="w-full md:w-1/3 space-y-4">
          {/* Region Filter */}
          <Select
            label="Select Region"
            onChange={(event) => {
              handleRegionChange(event);
            }}
            className="w-full"
          >
            {regions.map((region) => (
              <Option key={region.id} value={region.id}>
                {region.region_name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto space-x-4 mt-4 md:mt-0 md:flex-wrap flex-nowrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              color={selectedCategory === category.id ? "green" : "white"}
              className={`px-4 py-2 mx-2 md:mx-0 ${selectedCategory === category.id ? "" : "border-2 border-green-500"
                }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.category_name}
            </Button>
          ))}
        </div>

        {/* Reset Filters Button */}
        <div className="mt-4 md:mt-0">
          <Button color="black" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

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
                  image={article.media[0]}
                  isArticle={true}
                />
              );
            })
          ) : (
            <p>No Cultural Articles available.</p>
          )}
        </div>

        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  );
}