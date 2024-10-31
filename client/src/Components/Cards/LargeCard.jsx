import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import img1 from "../../assets/landscape.jpg";
import { useNavigate } from "react-router-dom";

export default function LargeCard({ id, title, description, image, isArticle }) {
  const navigate = useNavigate();

  let imageUrl = null;
  if (image.startsWith('images/')) {
    imageUrl = `http://localhost:8000/storage/${image}`;

  }
  else {
    imageUrl = img1;
  }
  // const imageUrl = image && image.startsWith('images/') ? `http://localhost:8000/storage/${image}` : (image || img1);

  return (
    <Card className="w-full max-w-[22rem] shadow-xl hover:scale-105 duration-100">
      {/* Set fixed height and aspect ratio for image container */}
      <CardHeader floated={false} className="relative h-56">
        <img
          src={imageUrl}
          alt="post-image"
          className="object-cover w-full h-full" // Ensures consistent size and cropping
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>

      <CardBody>
        <div className="mb-3 flex items-center justify-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="roboto-bold text-xl relative group"
          >
            {title}
            {/* Underline effect */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
          </Typography>
        </div>

        {/* Set a fixed height for the description to maintain consistency */}
        <Typography
          color="gray"
          className="roboto-bold text-sm h-16 overflow-hidden"
        >
          {description}
        </Typography>
      </CardBody>

      {isArticle && (
        <CardFooter className="pt-1">
          <Button
            size="lg"
            fullWidth={true}
            onClick={() => navigate(`/detail/${id}`)}
          >
            Explore more...
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
