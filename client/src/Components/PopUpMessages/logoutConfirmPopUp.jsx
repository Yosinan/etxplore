/* eslint-disable react/prop-types */

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function  LogoutConfirmation({ open, handleClose, onConfirm }) {
  return (
    <Dialog size="sm" open={open} handler={handleClose}>
      <DialogBody color="black" className="text-base roboto-black">
        Are you sure you want to logout?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>No</span>
        </Button>
        <Button variant="gradient" color="green" onClick={() => {
          onConfirm(); // Call the confirm function
          handleClose(); // Close the modal
        }}>
          <span>YES</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
