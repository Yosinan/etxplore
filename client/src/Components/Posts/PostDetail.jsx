

import {
  Card,
  CardHeader,
  CardBody,
  Typography,

} from "@material-tailwind/react";
import Navbar from "../ReusableComponent/NavBar";
import Footer from "../ReusableComponent/Footer";


import img1 from "../../assets/landscape.jpg"
export default function PostDetail() {
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
            <img
              src={img1}
              alt="card-image"
              className="h-full w-full object-cover hover:scale-105"
            />
          </CardHeader>

          <CardBody>

            <Typography variant="h4" color="blue-gray" className="mb-2 text-center roboto-black">
              Gonder epiphany
            </Typography>

            <Typography className="roboto-bold ">
              Gonder celebration of Ethiopian Epiphany, known as Timket, is one of the most vibrant and grandiose festivals in Ethiopia, celebrated on
              January 19th and 20th. This event commemorates the baptism of Jesus Christ in the Jordan River and features colorful processions where the
              Tabot, a replica of the Ark of the Covenant, is carried through the streets by priests dressed in traditional attire. The atmosphere is filled
              with music, chanting, and the joyous participation of thousands dressed in white garments. The procession culminates at a nearby body of water,
              symbolizing Jesus baptism, where rituals of immersion
              take place, allowing attendees to experience renewal and purification. Beyond its religious significance, Timket fosters community spirit, with families
              and friends gathering to celebrate together, sharing meals and traditional dances. The historical backdrop of Gonder, with its stunning castles and churches,
              enhances the festivities, making Timket a unique blend of faith, culture, and communal joy that captivates both locals and visitors alike.
            </Typography>

          </CardBody>
        </Card>


      </div>

      <Footer />
    </>
  )
}