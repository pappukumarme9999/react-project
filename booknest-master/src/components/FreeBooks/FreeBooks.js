import { apiEndPoint } from "../../WebApi/WebApi.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './FreeBooks.css';
import axios from "../../Interceptor.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


function FreeBooks() {

  const [freeProduct, SetFreeProduct] = useState([]);

  const [freeerror, setFreeError] = useState(null)

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();


  const loadFreeProduct = async () => {
    try {
      let response = await axios.get(apiEndPoint.FREE_BOOK_API);
      if (response.data.status) {
        SetFreeProduct(response.data.bookList)
      }
    } catch (err) {
      setFreeError("oops Something Went Wrong");
    }
  }

  const viewDescription = (book) => {
    navigate("/viewDescription", { state: { bookDetails: book } })
  }

  const BuyNow = async (book, flag) => {
    const buy = {
      Buybook: [{ bookId: book }],
      Buyflag: true
    }

    try {
      if (currentUser) {
        navigate("/cart", { state: { Buybook: buy } })


      } else {
        toast.warning("You Have To Login First ")
      }

    } catch (err) {
      if (err.response.status == 500)
        toast.error("Oops Something Went Wrong");
    }
  }

  const addToCart = async (id) => {
    try {
      if (currentUser) {
        let response = await axios.post(apiEndPoint.ADD_TO_CART, { bookId: id, userId: currentUser._id });
        toast.success("Book is added to you'r cart");
      }
      else {
        toast.warning("You have to Login first");
      }
    }
    catch (err) {
      if (err.response.status == 400)
        toast.warning("Book is already exists in cart");
      if (err.response.status == 500)
        toast.error("Oops Something went wrong");
    }
  }

  useEffect(() => {
    loadFreeProduct()
  }, [])

  return <>
    <Header />
    <ToastContainer />
    <section className="blog" id="blogid">
      <div className="container heading-design">
        <div className=" row">

          {!freeerror && freeProduct.filter((book) => book.permission && book.status == true).map((book, index) =>
            <div key={index} className="col-md-3 col-sm-6 mt-5" data-aos="fade-up" data-aos-duration="500">
              <div className="card">
                {book.photos.startsWith("data:image")
                  ? (
                    <img
                      src={book.photos}
                      className="img-fluid cardimg"
                      alt={book.name}
                    />
                  )
                  : (
                    <img
                      src={`${apiEndPoint.DISK_STORAGE}${book.photos.split("@")[1] || book.photos}`}
                      className="img-fluid cardimg"
                      alt={book.name}
                    />
                  )
                }
                <a className="cardcircle">
                  <i
                    className="fa fa-shopping-cart carticon mt-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => addToCart(book._id)}
                  ></i>
                </a>
                <div className="card-body">
                  <p className="card-text cardtitle">{book.name.substring(0, 20)}</p>
                  <p className="cardprice"><span className="cardtitle">Author: </span>{book.author.substring(0, 15)}</p>
                  <b className="card-text cardprice"><span className="cardtitle">Price: </span>₹ Free</b>
                  <br />
                  <button className="btn mt-2 buynowbutton" onClick={() => BuyNow(book, true)}>
                    Get Now
                  </button>
                  <span className="viewcircle ml-2" onClick={() => viewDescription(book)}>
                    <small className="viewicon p-2"><i className="fa fa-eye" /></small>
                  </span>
                </div>
              </div>

            </div>)}

        </div>
      </div>
    </section>

    <Footer />
  </>
}

export default FreeBooks;