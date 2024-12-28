import NavBar from "./ReusableComponent/NavBar";
import BillBoard from "./ReusableComponent/Billboard";
import Footer from "./ReusableComponent/Footer";
import MonthlyCelebration from "./MonthlyCelebration";
import Banner from "./ReusableComponent/Banner";
export default function HomePage() {
  return (
    <div className="w-full ">
      <BillBoard>
        <div className="mt-5">
          <NavBar />
        </div>
      </BillBoard>

      <MonthlyCelebration />

      <Banner />

      <Footer />
    </div>
  );
}
