import "./Books.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import axios from "../../Interceptor.js";
import { apiEndPoint } from "../../WebApi/WebApi.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

function Books() {
  const { currentUser } = useSelector((state) => state.user);
  const { categoryList = [], error } = useSelector((state) => state.category); // Set default empty array for safe mapping
  const navigate = useNavigate();
  const location = useLocation();

  const keyword = location.state?.Books || [];
  const [bookData, setBookData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookError, setBookError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadBooks = async () => {
    console.log("Loading books, page:", page);

    setLoading(true);
    try {
      const response = await axios.get(
        `${apiEndPoint.TOTAL_BOOKS}?page=${page}`
      );
      if (response.data.status) {
        console.log("Books loaded:", response.data.bookList.length);
        setBookData(prevBooks => [...prevBooks, ...response.data.bookList]);
        setPage(prevPage => prevPage + 1);
      } else {
        setBookError("Failed to load books.");
      }
    } catch (error) {
      console.error("Error loading books:", error);
      setBookError("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const buyNow = (book) => {
    try {
      if (!currentUser) {
        return toast.warning("Please, login first!");
      }
      navigate("/cart", {
        state: { buyBook: { bookId: book.bookId, status: true } },
      });
    } catch (error) {
      if (error.response.status == 500)
        toast.error("Something went wrong while buying book!");
    }
  };

  const handlePriceSelect = async (price) => {
    const [minPrice, maxPrice] = price.split("-");
    try {
      const response = await axios.post(apiEndPoint.PRICE, { minPrice, maxPrice });
      setBookData(response.data.result || []);
    } catch (error) {
      toast.error("Failed to filter by price range.");
    }
  };

  const viewBookByCategory = async (categoryID) => {
    console.log("Viewing books by category ID:", categoryID);
    if (!categoryID) {
      // toast.error("Invalid Category ID");
      return; // Prevent API call if categoryID is undefined
    }

    try {
      const response = await axios.post(apiEndPoint.BOOK_BY_CATEGORY, { categoryId: categoryID });
      if (response.data.status) {
        console.log("Books by category loaded:", response.data.result.length);
        setBookData(response.data.result);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching categories!");
    }
  };

  const searchByAuthor = async (author) => {
    console.log("Searching books by author:", author);
    try {
      const response = await axios.post(apiEndPoint.SEARCH_BY_AUTHOR, {
        author,
      });
      if (response.data.status) {
        console.log("Books by author loaded:", response.data.result.length);
        setAuthors(response.data.result);
      }
    } catch (error) {
      console.error("Error searching by author:", error);
      toast.error("Something went wrong while searching by author!");
    }
  };

  const viewListInbooks = (data) => {
    const list = data
    navigate("/bookList", { state: { dataList: list } });
  };

  const addToCart = async (id) => {
    if (!currentUser) {
      return toast.warning("You have to Login first");
    }

    try {
      await axios.post(apiEndPoint.ADD_TO_CART, {
        bookId: id,
        userId: currentUser._id,
      });
      toast.success("Book added to your cart");
    } catch (error) {
      if (error.response.status === 400) {
        toast.warning("Book already exists in cart");
      } else {
        toast.error("Something went wrong while adding to cart");
      }
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get(apiEndPoint.TOTAL_BOOKS);
      if (response.data.status) {
        setBookData(response.data.bookList);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching books!");
    }
  };

  const viewDescription = (book) => {
    navigate("/viewDescription", { state: { bookDetails: book } });
  };

  useEffect(() => {
    console.log("Initial loading of books and fetching categories");
    loadBooks();
    fetchAllBooks();
    viewBookByCategory();
    searchByAuthor();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container-fluid">
        <div className="FilterMainDiv">
          <div className="RightPart">
            {/* <button className="SearchButton">Search</button> */}
            <div className="rightpartHeading">
              <p className="Heading">Categories</p>
            </div>
            <div className="CategoryList">
              <ul>
                <li className="listhover" onClick={loadBooks}>
                  All
                </li>
                {!error &&
                  categoryList.map((category) => (
                    <li
                      key={category._id}
                      className="listhover"
                      onClick={() => viewBookByCategory(category._id)}
                    >
                      {category.categoryName}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="dropdown dropdownbtn">
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton dropdownofOther"
              >
                {authors.map((book, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => searchByAuthor(book.author)}
                  >
                    {book.author}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="LeftPart">
            <div className="mainImage">
              <img src="../../img/banner/9.jpg" alt="Banner" />
            </div>
            <div className="headingbook">
              <p className="heading">BOOK</p>
            </div>

            <InfiniteScroll
              dataLength={bookData?.length || 0} // Safe fallback for length
              next={loadBooks}
              hasMore={!loading && bookData.length < 100}
              loader={<p>Loading...</p>}
              endMessage={<p>Books are Finished</p>}
            >
              <div className="row m-auto">
                {bookData
                  .map((book, index) => (
                    <div
                      key={index}
                      className="col-md-4 col-sm-6 mt-5"
                      data-aos="fade-up"
                      data-aos-duration="500"
                    >
                      <div className="card">
                        <img
                          src={book.photos}
                          className="img-fluid cardimg"
                          alt={book.name}
                        />
                        <button className="card-action">
                          <i
                            className="fa fa-shopping-cart carticon mt-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => addToCart(book._id)}
                          ></i>
                        </button>
                        <div className="card-body">
                          <p className="card-text cardtitle">
                            {book.name.substring(0, 15)}
                          </p>
                          <p className="cardprice">
                            <span className="cardtitle">Author: </span>
                            {book.author.substring(0, 10)}
                          </p>
                          <b className="card-text cardprice">
                            <span className="cardtitle">Price: </span>₹
                            {book.price}
                          </b>
                          <br />
                          <button
                            className="btn mt-2 bookbuynowbutton"
                            onClick={() => buyNow(book)}
                          >
                            Get Now
                          </button>
                          <span
                            className="viewcircle ml-2"
                            onClick={() => viewDescription(book)}
                          >
                            <small className="viewicon p-2">
                              <i className="fa fa-eye" />
                            </small>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </InfiniteScroll>
            {/* <div className="row m-auto">
              {keyword?.map((book, index) =>
                <div key={index} className="col-md-4 col-sm-6 mt-5" data-aos="fade-up" data-aos-duration="500">
                  <div className="card">
                    <img
                      src={book.photos}
                      className="img-fluid cardimg"
                      alt={book.name}
                    />
                    <a href="" className="card-action"><i className="fa fa-shopping-cart carticon mt-3" style={{ cursor: "pointer" }} onClick={() => addToCart(book._id)}></i></a>
                    <div className="card-body">
                      <p className="card-text cardtitle">{book.name.substring(0, 15)}</p>
                      <p className="cardprice"><span className="cardtitle">Author: </span>{book.author.substring(0, 10)}</p>
                      <b className="card-text cardprice"><span className="cardtitle">Price: </span>₹{book.price}</b>
                      <br />
                      <button className="btn mt-2  bookbuynowbutton" >Get Now</button><span className="viewcircle ml-2 " onClick={() => viewDescription(book)}><small className="viewicon p-2 " ><i className="fa fa-eye" /></small></span>
                    </div>
                  </div>
                </div>)}
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Books;
