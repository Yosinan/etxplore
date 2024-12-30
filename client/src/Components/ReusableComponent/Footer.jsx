import { Typography } from "@material-tailwind/react";
import img1 from "../../assets/play.png";
import img2 from "../../assets/app.png";
export default function Footer() {
  return (
    <div className="px-2  pt-16 mx-auto sm:max-w-xl md:max-w-full  md:px-16 shadow-2xl bg-transparent">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          {/* Brand Logo */}
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 roboto-black">
            <h1 className="text-3xl roboto-bold">
              <span className="text-green-500">Et</span>
              <span className="text-yellow-500">X</span>
              <span className="text-red-500">plore</span>
            </h1>
          </Typography>

          <div className="mt-1 lg:max-w-sm">
            <p className="text-base roboto-medium">
              Discover the beauty of Ethiopia from the comfort of your home, and
              easily share your memorable travel experiences online.
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-lg roboto-bold tracking-wide ">Contacts</p>
          <div className="flex roboto-medium">
            <p className="mr-1 text-gray-800 roboto-bold">Phone:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              0911467823
            </a>
          </div>
          <div className="flex roboto-medium">
            <p className="mr-1 text-gray-800 roboto-bold">Email:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              explorethiopia@gmail.com
            </a>
          </div>
        </div>

        <div>
          <span className="text-lg roboto-bold tracking-wide ">
            Follow Us On
          </span>

          <div className="flex items-center mt-1 space-x-3">
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 102 102"
                id="instagram">
                <defs>
                  <radialGradient
                    id="a"
                    cx="6.601"
                    cy="99.766"
                    r="129.502"
                    gradientUnits="userSpaceOnUse">
                    <stop offset=".09" stopColor="#fa8f21"></stop>
                    <stop offset=".78" stopColor="#d82d7e"></stop>
                  </radialGradient>
                  <radialGradient
                    id="b"
                    cx="70.652"
                    cy="96.49"
                    r="113.963"
                    gradientUnits="userSpaceOnUse">
                    <stop
                      offset=".64"
                      stopColor="#8c3aaa"
                      stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#8c3aaa"></stop>
                  </radialGradient>
                </defs>
                <path
                  fill="url(#a)"
                  d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path>
                <path
                  fill="url(#b)"
                  d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path>
                <path
                  fill="#fff"
                  d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                  transform="translate(-422.637 -426.196)"></path>
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 28.87 28.87"
                id="linkedin">
                <g>
                  <g>
                    <rect
                      width="28.87"
                      height="28.87"
                      rx="6.48"
                      ry="6.48"
                      fill="#0b86ca"></rect>
                    <path
                      d="M8 12h3v9.68H8zm1.53-4.81a1.74 1.74 0 1 1-1.74 1.75 1.74 1.74 0 0 1 1.74-1.75M12.92 12h2.89v1.32a3.16 3.16 0 0 1 2.85-1.56c3 0 3.61 2 3.61 4.61v5.31h-3V17c0-1.12 0-2.57-1.56-2.57s-1.8 1.22-1.8 2.48v4.79h-3z"
                      fill="#fff"></path>
                  </g>
                </g>
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="5.368 13.434 53.9 37.855"
                id="youtube">
                <path
                  fill="#FFF"
                  d="M41.272 31.81c-4.942-2.641-9.674-5.069-14.511-7.604v15.165c5.09-2.767 10.455-5.301 14.532-7.561h-.021z"></path>
                <path
                  fill="#E8E0E0"
                  d="M41.272 31.81c-4.942-2.641-14.511-7.604-14.511-7.604l12.758 8.575c.001 0-2.324 1.289 1.753-.971z"></path>
                <path
                  fill="#CD201F"
                  d="M27.691 51.242c-10.265-.189-13.771-.359-15.926-.803-1.458-.295-2.725-.95-3.654-1.9-.718-.719-1.289-1.816-1.732-3.338-.38-1.268-.528-2.323-.739-4.9-.323-5.816-.4-10.571 0-15.884.33-2.934.49-6.417 2.682-8.449 1.035-.951 2.239-1.563 3.591-1.816 2.112-.401 11.11-.718 20.425-.718 9.294 0 18.312.317 20.426.718 1.689.317 3.273 1.267 4.203 2.492 2 3.146 2.035 7.058 2.238 10.118.084 1.458.084 9.737 0 11.195-.316 4.836-.57 6.547-1.288 8.321-.444 1.12-.823 1.711-1.479 2.366a7.085 7.085 0 0 1-3.76 1.922c-8.883.668-16.426.813-24.987.676zM41.294 31.81c-4.942-2.641-9.674-5.09-14.511-7.625v15.166c5.09-2.767 10.456-5.302 14.532-7.562l-.021.021z"></path>
              </svg>
            </a>

            <a
              href="/"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 1024 1024"
                id="facebook">
                <path
                  fill="#1877f2"
                  d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"></path>
                <path
                  fill="#fff"
                  d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-center pb-5  border-t lg:flex-row">
        {/* App Download Section */}

        <div className="flex flex-col items-center mt-1">
          <h2 className="text-xl roboto-bold mb-1">Get EtXplore App</h2>
          <div className="flex space-x-4">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer">
              <img src={img1} alt="Get it on Google Play" className="h-8" />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={img2} alt="Download on the App Store" className="h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
