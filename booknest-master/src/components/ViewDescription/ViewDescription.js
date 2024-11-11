import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ViewDescription.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemInToCart } from "../../router-config/cartSlice";
import { toast, ToastContainer } from "react-toastify";


function ViewDescription() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const book = location.state.bookDetails;

    const handleAddToCart = () => {
        dispatch(addItemInToCart({ bookId: book._id, quantity: 1 }));
        toast.success("Book added to cart!");
        navigate("/cart"); // Optionally navigate to the cart page after adding
    };

    return <>
        <Header/>
        <div className="mt-5" id="layoutSidenav">
            <div id="layoutSidenav_nav">
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <div className="container-fluid" id="main_wrapper">
                            <div className="container" id="container_wrapper">
                                <div className="mid_wrapper">
                                    <div id="div1">
                                        <div id="main_image" className="image">
                                            <img
                                                src={book.photos}
                                                alt="Book Cover"
                                                id="mainDescriptionImage"
                                            />
                                        </div>
                                    </div>
                                    <div id="div2">
                                        <div>
                                            <p className="dectitel">{book.name}</p>
                                            <p className="desprice">&#8377; {book.price===0?"Free": book.price}</p>
                                            <span className="decauther">By:  <span className="authername"> {book.author} </span>  (Author)  </span>
                                            <p className="bookdescription">{book.description.substring(0, 120)}</p>
                                            <p className="decauther">publication Date : <span className="bookdescription ml-2">{book.publicationDate}</span></p>
                                            <p className="decauther"> Edition :<span className="bookdescription ml-3"> {book.edition}</span></p>
                                        </div>
                                        <div className="discriptionbuttons">
                                            <a>
                                                <button className="discriptionbtn2" onClick={handleAddToCart}>Add to cart</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <Footer/>
    </>
}
export default ViewDescription;
