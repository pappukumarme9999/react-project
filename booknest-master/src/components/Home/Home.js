import { ToastContainer } from "react-toastify";
import BestAuthor from "../BestAuthor/BestAuthor";
import Service from "../Service/Service";
import Loader from "../Spinner/Loader";
import Banner from "../Banner/Banner";
import Carousal from "../Carousal/Carousal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TopInteresting from "../TopInteresting/TopInteresting";

function Home(){
   return<>
    {/* <Loader/> */}
    <ToastContainer/>
    <div>

    </div>
    <Header/>
    <Service/>
    <Carousal />
    <TopInteresting/>
    <BestAuthor/>
    <Banner/>
    <Footer/>
  
   </>
}

export default Home;