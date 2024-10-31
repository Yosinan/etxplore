import { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { baseUrl } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleOpen = () => setOpen(!open);

  // Handle image file selection and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Title and Description are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("media", image);
    }

    try {
      await axios.post(`${baseUrl}/user-contributions/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Post sent successfully. It is pending approval.");
      handleOpen(); // Close the dialog
      // Optionally, you can reset the form fields here
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding post:", error);
      toast.error("Failed to add post");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="mr-4" variant="gradient">
        Add Cultural Chronicle
      </Button>

      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Cultural Chronicle
          </Typography>

          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          {/* Title Input */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Title
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          {/* Description Textarea */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Description
            </Typography>
            <Textarea
              rows={3}
              placeholder="eg. This is a white shoes with a comfortable sole."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>

          {/* Fancy Image Upload */}
          <div className="flex flex-col h-44 items-center justify-center border-2 border-dashed border-blue-gray-200 rounded-lg p-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mb-4 h-32 w-32 object-cover rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <PlusCircleIcon className="h-10 w-10 text-gray-500 mb-2" />
                <Typography variant="small" className="text-gray-500">
                  Drag and drop or click to upload an image
                </Typography>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              name="media"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="mt-1 cursor-pointer bg-blue-gray-100 py-2 px-4 rounded-lg text-blue-gray-700 hover:bg-blue-gray-200 focus:outline-none"
            >
              {imagePreview ? "Change Image" : "Upload Image"}
            </label>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            Add Post
          </Button>
        </DialogFooter>
      </Dialog>

      <ToastContainer />
    </>
  );
}