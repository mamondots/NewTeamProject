import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop";


const MainLayout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
        <Footer></Footer>

    </ScrollToTop>
  );
};

export default MainLayout;