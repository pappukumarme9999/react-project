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
  const { categoryList, error, isLoading } = useSelector(
    (state) => state.category
  );
  const navigate = useNavigate();
  const location = useLocation();

  const keyword = location.state?.Books || [];
  const [bookData, setBookData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookError, setBookError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadBooks = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        `${apiEndPoint.TOTAL_BOOKS}?page=${page}`
      );
      if (response.data.status) {
        setBookData([...bookData, ...response.data.bookList]);
        setPage(page + 1);
      }
    } catch (error) {
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

  // const handlePriceSelect = async (price) => {
  //   const maxPrice = price.split("-")[0];
  //   const minPrice = price.split("-")[1];
  //   try {
  //     let response = await axios.post(apiEndPoint.PRICE, { minPrice: minPrice, maxPrice: maxPrice });
  //     setData(response.data.result);
  //   }
  //   catch (error) {
  //   }
  // }

  const viewBookByCategory = async (categoryID) => {
    try {
      const response = await axios.get(
        `${apiEndPoint.BOOK_BY_CATEGORY}?categoryId=${categoryID}`
      );
      if (response.data.status) {
        setBookData(response.data.bookList);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching categories!");
    }
  };

  const searchByAuthor = async (author) => {
    try {
      const response = await axios.post(apiEndPoint.SEARCH_BY_AUTHOR, {
        author,
      });
      if (response.data.status) {
        setAuthors(response.data.bookList);
      }
    } catch (error) {
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
            <button className="SearchButton">Search</button>
            <div className="rightpartHeading">
              <p className="Heading">Categories</p>
            </div>
            <div className="CategoryList">
              <ul>
                <li className="listhover" onClick={fetchAllBooks}>
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
              dataLength={bookData.length}
              next={loadBooks}
              hasMore={!loading && bookData.length < 100}
              loader={<p>Loading...</p>}
              endMessage={<p>Books are Finished</p>}
            >
              <div className="row m-auto">
                {bookData
                  .filter((book) => book.permission && book.status)
                  .map((book, index) => (
                    <div
                      key={index}
                      className="col-md-4 col-sm-6 mt-5"
                      data-aos="fade-up"
                      data-aos-duration="500"
                    >
                      <div className="card">
                        <img
                          src={`${apiEndPoint.DISK_STORAGE}${book.photos.split("@")[1]}`}
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
            <div className="row m-auto">
              {keyword?.filter((book) => book.permission && book.status == true).map((book, index) =>
                <div key={index} className="col-md-4 col-sm-6 mt-5" data-aos="fade-up" data-aos-duration="500">
                  <div className="card">
                    <img
                      src={`${apiEndPoint.DISK_STORAGE}${book.photos.split("@")[1]}`}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Books;
