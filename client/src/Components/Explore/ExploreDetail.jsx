import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Popover,
  Carousel,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import Navbar from "../ReusableComponent/NavBar";
import Footer from "../ReusableComponent/Footer";
import Accommodation from "../TravelInformation/Accomodation";
import LocalTransport from "../TravelInformation/LocalTransport";
import TravelTips from "../TravelInformation/TravelTips";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/api";
import agew from "../../assets/agew.png";
import Loading from "../ReusableComponent/Loading";

export default function ExploreDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log("Fetching article with id:", id);
        const response = await fetch(`${baseUrl}/articles/${id}`);
        const data = await response.json();

        console.log(data);

        console.log("Fetched article:", data);

        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <Loading />
  }

  // Check if any travel information is available
  const hasTravelInfo = article.travel_information && article.travel_information.length > 0;

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-8">
        <Card className="w-full flex flex-col md:flex-row p-2">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-full md:w-2/5 shrink-0 rounded-r-none"
          >
            {/* Carousel for images */}
            <Carousel className="rounded-xl">
              {Array.isArray(article.media) && article.media.length > 0 ? (
                article.media.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:8000/storage/${image}`}
                      alt={`article-image-${index}`}
                      className="h-full w-full object-cover"
                    />
                   </div>
                 ))
              ) : (
                <img
                  src={article.image}
                  alt="fallback-image"
                  className="h-full w-full object-cover"
                />
              )}
            </Carousel>
          </CardHeader>

          <CardBody>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 text-center roboto-black"
            >
              {article.title}
            </Typography>

            <Typography className="roboto-bold ">{article.description}</Typography>

            <div className="flex gap-4 md:justify-around flex-wrap mt-4">
              {/* Dynamic Popover Buttons */}
              {article.language && (
                <Popover
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <PopoverHandler>
                    <Button color="green">Language</Button>
                  </PopoverHandler>
                  <PopoverContent className="roboto-black">
                    {article.language}
                  </PopoverContent>
                </Popover>
              )}

              {article.history && (
                <Popover
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <PopoverHandler>
                    <Button color="green">History</Button>
                  </PopoverHandler>
                  <PopoverContent className="roboto-black">
                    {article.history}
                  </PopoverContent>
                </Popover>
              )}

              {article.practices && (
                <Popover
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <PopoverHandler>
                    <Button color="green">Practice</Button>
                  </PopoverHandler>
                  <PopoverContent className="roboto-black">
                    {article.practices}
                  </PopoverContent>
                </Popover>
              )}

              {article.traditions && (
                <Popover
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <PopoverHandler>
                    <Button color="green">Tradition</Button>
                  </PopoverHandler>
                  <PopoverContent className="roboto-black">
                    {article.traditions}
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Only display travel information if any exists */}
        {hasTravelInfo ? (
          <div className="mt-8 md:mt-9">
            <h1 className="text-2xl roboto-black text-center">Travel Information</h1>

            <div className="flex flex-col justify-around md:flex-row mt-4">
              {article.travel_information[0].accommodations && (
                <Accommodation accommodations={article.travel_information[0].accommodations} />
              )}
              {article.travel_information[0].local_transport && (
                <LocalTransport transports={article.travel_information[0].local_transport} />
              )}
              {article.travel_information[0].travel_tips && (
                <TravelTips tips={article.travel_information[0].travel_tips} />
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 md:mt-9">
            <h1 className="text-2xl roboto-black text-center">No Travel Information Available</h1>
            <p className="text-center mt-4">Please check back later for more details.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
