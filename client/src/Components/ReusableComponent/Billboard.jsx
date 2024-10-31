import { Carousel, Typography } from "@material-tailwind/react";
import img1 from "../../assets/Rectangle 1 (1).png";
import img2 from "../../assets/landscape.jpg";
import img3 from "../../assets/coffee2.jfif";

// eslint-disable-next-line react/prop-types
export default function BillBoard({ children }) {
  const billBordData = [
    {
        image: img1,
        title: "Connect with fellow travelers and relive your Ethiopian adventures.",
  
    },
    {
        image: img2,
        title: "Explore Ethiopia from home and share your travel stories.",
  
    },
    {
      image: img3,
      title: "Discover Ethiopia's Coffee Ceremony and Share Your Unique Cultural Stories.",

  },
  ];

  return (
    <div className="relative h-[605px] lg:h-[615px]">
 

      {/* Carousel content */}
      <div className="absolute inset-0 z-10">{children}</div>
      <Carousel
        autoplay={true}
        nextArrow={false}
        dots={false}
        prevArrow={false}
        loop={true}
        transition={{ duration: 1 }}
        className="h-full"
      >
        {billBordData.map((data, index) => (
          <div key={index} className="relative h-full w-full">
            <img
              src={data.image}
              alt={`image ${index + 1}`}
              className="h-full w-full object-cover brightness-150 duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-xl md:text-2xl lg:text-3xl roboto-bold"
                >
                  {data.title}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
