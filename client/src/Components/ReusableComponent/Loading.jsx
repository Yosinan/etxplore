import { Typography } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen w-screen bg-gray-400 z-50">
      <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 roboto-bold">
        <h1 className="text-2xl md:text-4xl roboto-bold flex">
          <span className="text-green-500 animate-bounce delay-100">E</span>
          <span className="text-yellow-500 animate-bounce delay-200">t</span>
          <span className="text-green-500 animate-bounce delay-300">X</span>
          <span className="text-red-500 animate-bounce delay-400">p</span>
          <span className="text-red-500 animate-bounce delay-500">l</span>
          <span className="text-red-500 animate-bounce delay-600">o</span>
          <span className="text-red-500 animate-bounce delay-700">r</span>
          <span className="text-red-500 animate-bounce delay-800">e</span>
          <span className="text-red-500 animate-bounce delay-700">...</span>
        </h1>
      </Typography>
    </div>
  );
}
