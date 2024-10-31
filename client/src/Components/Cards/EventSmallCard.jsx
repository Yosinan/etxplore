/* eslint-disable react/prop-types */
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

console
export default function EventSmallCard({ title, time, image, onClick }) {  // Added onClick prop
    return (
        <Card
            className="w-80 h-80 shadow-lg hover:scale-105 duration-300 cursor-pointer"
            onClick={onClick}  // Attach the onClick event
        >
            <CardHeader floated={false} className="h-2/3">
                <img src={image} alt="festival-picture" className="w-full h-full shadow-none" />
            </CardHeader>

            <CardBody className="flex justify-center flex-col items-center h-1/3">
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2 roboto-bold relative group"
                >
                    {title}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-700 transition-all duration-300 group-hover:w-full"></span>
                </Typography>
                <Typography color="blue-gray" className="roboto-bold">
                    {time}
                </Typography>
            </CardBody>
        </Card>
    );
}
