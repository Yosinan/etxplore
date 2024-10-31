import img from "../../assets/lalibela3.jpg"
import { Link } from "react-router-dom"
export default function Banner() {
  return (
    <div className=" my-6 md:my-12 ">
      <div className="relative mb-4 font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
        <img src={img} alt="Banner Image" className="absolute inset-0 w-full h-full object-cover" />

        <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6 roboto-bold">Visit Ethiopia</h2>
          <p className="text-lg text-center text-gray-200 roboto-bold">Explore Ethiopia from home and share your travel stories!</p>

          <Link to={"/explore"}>
            <button
              type="button"
              className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}