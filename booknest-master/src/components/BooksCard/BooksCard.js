import { useSelector, useState } from "react-redux";
import { apiEndPoint } from "../../WebApi/WebApi.js";
import Books from "../Books/Books";
import ViewDescription from "../ViewDescription/ViewDescription";

function Cards({ books }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="row m-auto bg-dark">
      {books.filter((book) => book.permission && book.status === true).map((book, index) => (
        <div key={index} className="col-md-3 col-sm-6 mt-5" data-aos="fade-up" data-aos-duration="500">

          <div className="card">
          {/* Set the src based on whether the photo is in Base64 format */}
          <img
              src={book.photos.startsWith("data:image") ? book.photos : `${book.photos}`}
              className="img-fluid cardimg"
              alt={book.name}
            />


            <a className="cardcircle">
              <i
                className="fa fa-shopping-cart carticon mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => Books.addToCart(book._id)}
              ></i>
            </a>

            <div className="card-body">
              <p className="card-text cardtitle">{book.name.substring(0, 20)}</p>
              <p className="cardprice"><span className="cardtitle">Author: </span>{book.author.substring(0, 15)}</p>
              <b className="card-text cardprice"><span className="cardtitle">Price: </span>₹{book.price}</b>
              <br />
              <button className="btn mt-2 w-100 buttonhover" onClick={() => ViewDescription(book)}>View More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
