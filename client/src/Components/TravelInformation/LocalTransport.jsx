/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import img1 from "../../assets/accomodation.png";

export default function LocalTransport({ transports }) {
  return (
    <Card className="w-full max-w-[22rem] shadow-xl hover:scale-105">
      <CardHeader floated={false} color="blue-gray">
        <img src={img1} alt="local transport" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="roboto-bold text-xl relative inline-block group"
          >
            Local Transport
            {/* Underline effect */}
            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-yellow-700 transition-all duration-300 group-hover:w-full"></span>
          </Typography>
        </div>
        {transports.map((transport, index) => (
          <div key={index} className="mb-4">
            <Typography variant="h6" color="blue-gray" className="roboto-bold text-lg">
              {transport.transport_type}
            </Typography>
            <Typography color="gray" className="roboto-bold text-sm">
              {transport.details}
            </Typography>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}