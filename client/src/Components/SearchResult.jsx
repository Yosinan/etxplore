import NavbarDefault from "./ReusableComponent/NavBar";
import Footer from "./ReusableComponent/Footer";
import LargeCard from "./Cards/LargeCard";
import img1 from "../assets/landscape.jpg"

export default function SearchResult(){
      // Create an array of 8 festival objects
  const searchResults = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    title: "Gonder epiphany",
    description: "Gondar's celebration of Ethiopian Epiphany, known as Timket, is one of the most vibrant and grandiose in the country. Celebrated on January 19th and 20th, the event marks the baptism of Jesus in the Jordan River. The heart of the celebration.",
    image: img1,
  }));
    return(
        <>
        <NavbarDefault />
        <div className="mt-8 md:mt-16">
   <h1 className="text-start ml-12 text-2xl roboto-black">Search Results...</h1>
      {/* Card Grid */}
      <div className="px-8 py-2">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {searchResults.map((result) => {
            const description = result.description.split(" ").slice(0, 25).join(" ");

            return (
              <LargeCard
                key={result.id}
                title={result.title}
                description={description}
                image={result.image}
              />
            );
          })}
        </div>
      </div>
    </div>

        <Footer />
        
        </>
    )
}