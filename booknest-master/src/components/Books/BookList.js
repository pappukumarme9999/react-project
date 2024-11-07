import "./BookList.css";
import { useLocation } from "react-router-dom";
import Books from "./Books";
function BookList() {

    const location = useLocation();
    const books = location.state.dataList;
    return <>
       {books.map((book)=>
        <div className="mainDivofList">
            <div className="listRigthPart">
                <div className="ListBookImage">
                    <img
                        className="ListBookImg"
                        src="./booklist.png"
                        alt="booklist"
                    />
                </div>
            </div>
            <div className="leftBookList">
                <div className="booklistContaint">
                    <div className="booklistName">
                        <h3>{book.name}</h3>
                    </div>
                    <div>
                        <p className="ListPrice">
                            
                            <span> ₹ </span> {book.price}
                        </p>
                    </div>
                    <div className="booklistDes">
                        <p>
                            
                        </p>
                    </div>
                </div>
                <div className="bookListAddToCart">
                    <a href="">Add To Cart</a>
                    <i classname="fa fa-shopping-cart" />
                </div>
            </div>
             </div>)}
    </>



}

export default BookList;