import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import EventSmallCard from "./Cards/EventSmallCard";
import PopUpForFestival from './PopUpMessages/popupForFestival';
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseUrl } from '../utils/api';
import Loading from './ReusableComponent/Loading';

export default function MonthlyCelebration() {
  const sliderRef = useRef(null);
  const [celebrations, setCelebrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCelebration, setSelectedCelebration] = useState(null);  // State for selected celebration

  const settings = {
    infinite: celebrations.length > 4,
    autoplay: true,
    speed: 500,
    slidesToShow: Math.min(4, celebrations.length),
    slidesToScroll: Math.min(4, celebrations.length),
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, celebrations.length),
          slidesToScroll: Math.min(3, celebrations.length),
          infinite: celebrations.length > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, celebrations.length),
          slidesToScroll: Math.min(2, celebrations.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, celebrations.length),
          slidesToScroll: Math.min(1, celebrations.length),
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchCelebrations = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events/current-month`);
        const sortedCelebrations = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log(sortedCelebrations);
        setCelebrations(sortedCelebrations);
      } catch (error) {
        console.error("Error fetching celebrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrations();
  }, []);

  if (loading) {
    return <Loading/>
  }

  const handleCardClick = (celebration) => {
    setSelectedCelebration(celebration);  // Set the selected celebration to trigger the popup
  };

  const handleClosePopup = () => {
    setSelectedCelebration(null);  // Close the popup
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  return (
    <>
      <section className="p-4 md:p-8 mt-5 md:mt-10 ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="roboto-bold text-2xl md:text-3xl text-center text-blue-1000 mt-4">13 Months Of Sunshine</h1>
          <h2 className="roboto-bold text-xl mb-5 md:text-2xl text-center text-gray-700 mt-2">
            Annual Festivities: <span className="text-green-400">{currentMonth}</span>
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-100 rounded-full shadow-md"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {celebrations.map((celebration, index) => (
              <EventSmallCard
                key={index}
                title={celebration.name}

                time={celebration.time}
                image={`http://localhost:8000/storage/${celebration.media}` || "https://via.placeholder.com/300"}
                onClick={() => handleCardClick(celebration)}  // Handle card click and trigger popup
              />
            ))}
          </Slider>

          <button
            onClick={() => sliderRef.current.slickNext()}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-100 rounded-full shadow-md"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </section>

      {/* Popup for the selected celebration */}
      {selectedCelebration && (
        <PopUpForFestival
          open={!!selectedCelebration}
          handleOpen={handleClosePopup}
          celebration={selectedCelebration}  // Pass the selected celebration data
        />
      )}
    </>
  );
}
