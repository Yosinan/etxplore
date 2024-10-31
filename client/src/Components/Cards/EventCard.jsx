import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const EventCard = ({ id, name, description, image, location, date, onShowMore }) => {

    const toggleDescription = () => {
            onShowMore();  // Call the onShowMore prop when the "Show More" button is clicked
       
       
    };

    const shortDescription = description.split(" ").slice(0, 10).join(" ") + "...";

    return (
        <Card className="w-full max-w-[22rem] shadow-xl hover:scale-105 duration-100">
            <CardHeader floated={false} color="blue-gray">
                <img src={image} alt={name} className="h-48 w-full object-cover" />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 roboto-bold">
                    {name}
                </Typography>
                <Typography className="mb-2 roboto-medium">
                  {shortDescription}
                </Typography>
                <Button color="black" className="text-xs py-1 px-1" onClick={toggleDescription}>
                Show More
                </Button>

                <Typography className="mt-2 text-sm">
                    <strong>📍 Location:</strong> {location}
                </Typography>
                <Typography className="mb-2 text-sm roboto-bold">
                    <strong>📅 Date:</strong> {date}
                </Typography>
            </CardBody>
        </Card>
    );
};

EventCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onShowMore: PropTypes.func.isRequired,  // Add the onShowMore prop
};

export default EventCard;
