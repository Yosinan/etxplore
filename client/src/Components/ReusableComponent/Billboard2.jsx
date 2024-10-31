import { Carousel, Typography } from "@material-tailwind/react";
import img1 from "../../assets/keffa.jpg";
import img2 from "../../assets/dance.jpg";
import img3 from "../../assets/Tihlo.png"

// eslint-disable-next-line react/prop-types
export default function BillBoard2({ children }) {
  const billBordData = [
    {
        image: img1,
        title: "Keffa Coffee",
        description: "Origin place of Coffee..."
  
    },
    {
        image: img2,
        title: "The Vibrant Essence of Ethiopian Dance",
        description: " Ethiopian dance showcases culture,..."
  
    },
    {
      image: img3,
      title: "Thihlo food",
      description: "The Thigrian people favorite food..."

  },
  ];

  return (
    <div className="relative h-[400px] lg:h-[415px]">
 

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
                  className="mb-4 text-3xl  lg:text-4xl roboto-bold"
                >
                  {data.title}
                </Typography>
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-lg  lg:text-2xl roboto-bold"
                >
                  {data.description}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
