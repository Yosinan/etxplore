/* eslint-disable react/prop-types */

import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import img from "../../assets/coffee.jpg"; // Default image



export default function PopUpForFestival({ open, handleOpen, celebration }) {
  const date = new Date(celebration.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
 
  return (
    <Dialog size="xl" open={open} handler={handleOpen}>
      <div className="relative flex flex-col md:flex-row">
        {/* Close (X) Button */}
        <button
          onClick={handleOpen}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-full object-cover rounded-l-md"
            src={`http://localhost:8000/storage/${celebration.media}`} // Use celebration image or default
            alt="festival"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 px-4 py-0 flex flex-col">
          <DialogHeader className="text-center">{celebration.name}</DialogHeader>

    
          <DialogBody className="text-sm roboto-bold text-gray-600">
            {celebration.description || "No description available."}
            <div className="mt-4">
              <p className="font-semibold text-gray-800">Date:</p>
              <p>{formattedDate}</p>
              <p className="font-semibold text-gray-800 mt-2">Location:</p>
              <p>{celebration.location}</p>
            </div>
          </DialogBody>
        </div>
      </div>
    </Dialog>
  );
}
