import NavBar from "../ReusableComponent/NavBar";
import BillBoard2 from "../ReusableComponent/Billboard2";
import Footer from "../ReusableComponent/Footer";
import ExploreList from "./ExploreList";
export default function ExplorePage(){
    return (
        <div className="w-full ">
          <BillBoard2>
            <NavBar />
          </BillBoard2>
          
    <ExploreList />

 
     <Footer />
        </div>
      );
    
}