/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import img1 from "../../assets/accomodation.png";

export default function Accommodation({ accommodations }) {
  return (
    <Card className="w-full max-w-[22rem] shadow-xl hover:scale-105">
      <CardHeader floated={false} color="blue-gray">
        <img src={img1} alt="accommodation" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="roboto-bold text-xl relative inline-block group"
          >
            Accommodation
            {/* Underline effect */}
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
          </Typography>
        </div>
        {accommodations.map((accommodation, index) => (
          <div key={index} className="mb-4">
            <Typography variant="h6" color="blue-gray" className="roboto-bold text-lg">
              {accommodation.hotel_name}
            </Typography>
            <Typography color="gray" className="roboto-bold text-sm">
              <a href={accommodation.link_to_booking_site} target="_blank" rel="noopener noreferrer">
                Book here
              </a>
            </Typography>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}