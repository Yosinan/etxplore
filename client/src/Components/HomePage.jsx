import NavBar from "./ReusableComponent/NavBar";
import BillBoard from "./ReusableComponent/Billboard";
import Footer from "./ReusableComponent/Footer";
import MonthlyCelebration from "./MonthlyCelebration";
import Banner from "./ReusableComponent/Banner";
import { useState } from "react";
export default function HomePage() {
  const [backgroundColor, setbackgroundColor] = useState("#fff");
  return (
    <div
      style={{
        background: backgroundColor,
      }}
      className={`w-full`}>
      <BillBoard>
        <div className="mt-5">
          <NavBar setbackgroundColor={setbackgroundColor} />
        </div>
      </BillBoard>

      <MonthlyCelebration />

      <Banner />

      <Footer />
    </div>
  );
}
