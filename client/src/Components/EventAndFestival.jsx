import { useEffect, useState } from "react";
import EventCard from "./Cards/EventCard";
import img1 from "../assets/landscape.jpg"; // You can keep this as a placeholder or remove it
import NavbarDefault from "./ReusableComponent/NavBar";
import Footer from "./ReusableComponent/Footer";
import BillBoard3 from "./ReusableComponent/Billboard3";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import PopUpForFestival from "./PopUpMessages/popupForFestival";
import { baseUrl } from "../utils/api";
import Loading from "./ReusableComponent/Loading";

export default function EventAndFestival() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(festivals.length / itemsPerPage);

  // Popup state
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null); // To hold the selected festival data

  // Calculate the festivals for the current page
  const currentItems = festivals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch festivals from the API
  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch(`${baseUrl}/events/all`);
        const data = await response.json();
        setFestivals(data); // Assuming the response is an array of festival objects
      } catch (error) {
        console.error("Error fetching festivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  // Handle page change
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

  // Handle opening the popup and setting the selected festival
  const handleShowMore = (festival) => {
    console.log(festival);
    setSelectedFestival(festival);
    setOpenPopup(true);
  };

  // Handle closing the popup
  const handleOpenPopup = () => setOpenPopup(!openPopup);

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <NavbarDefault />
      <BillBoard3 />

      <div className="mt-8 md:mt-16">
        <h1 className="text-start ml-12 text-2xl roboto-black">Festivals</h1>

        {/* Card Grid */}
        <div className="px-8 py-2">
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {currentItems.length > 0 ? (
              currentItems.map((festival) => {
                const description = festival.description
                  .split(" ")
                  .slice(0, 25)
                  .join(" ");
                const date = new Date(festival.date);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                });

                return (
                  <EventCard
                    key={festival.id}
                    id={festival.id}
                    name={festival.name}
                    description={description}
                    image={`http://localhost:8000/storage/${festival.media}` || img1}
                    location={festival.location}
                    date={formattedDate}
                    onShowMore={() => handleShowMore(festival)} // Pass the festival data to the onShowMore handler
                  />
                );
              })
            ) : (
              <p>No Festivals available.</p>
            )}
          </div>

          {/* Pagination Controls */}
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

      <Footer />

      {/* Popup for Festival Details */}
      {selectedFestival && (
        <PopUpForFestival
          open={openPopup}
          handleOpen={handleOpenPopup}
          celebration={selectedFestival} // Pass the selected festival data to the popup
        />
      )}
    </>
  );
}
