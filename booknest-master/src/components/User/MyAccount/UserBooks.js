// booknest-master/src/components/User/MyAccount/UserBooks.js
import axios from "../../../Interceptor.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiEndPoint } from "../../../WebApi/WebApi.js";
import NotUpload from "./NotUpload/NotUpload.js";

function UserBooks() {
    const { currentUser } = useSelector((state) => state.user);
    const [booklist, setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchBookByUserId = async () => {
        try {
            console.log("Fetching books for user:", currentUser?._id);
            const response = await axios.post(apiEndPoint.SEARCH_BOOK_BY_USERID, { userId: currentUser._id });

            if (response.data && response.data.status && Array.isArray(response.data.result)) {
                setBooks(response.data.result);
                console.log("Books fetched:", response.data.result);
            } else {
                console.log("No books found or unexpected response structure.");
                setBooks([]);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const updateBook = async (book) => {
        try {
            const response = await axios.post(apiEndPoint.SEARCH_CITY_BY_ID, { cityId: book.cityId });
            navigate("/updateBooks", { state: { books: book, state_id: response.data.state } });
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    useEffect(() => {
        fetchBookByUserId();
    }, []);

    return (
        <div className="tab-pane fade show active" id="userBooks" role="tabpanel">
            {booklist.length > 0 ? (
                <div className="myaccount-content">
                    <h5>Books</h5>
                    <div className="myaccount-table table-responsive text-center col-lg-12">
                        <table className="table align-middle mb-0 bg-white">
                            <thead className="thead-light">
                                <tr>
                                    <th className="pt-2 pb-2">Image</th>
                                    <th className="pt-2 pb-2">Name</th>
                                    <th className="pt-2 pb-2">Author</th>
                                    <th className="pt-2 pb-2">Price</th>
                                    <th className="pt-2 pb-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booklist.filter((book) => book.price > 0).map((book, index) => (
                                    <tr key={index}>
                                        <td className="p-3">
                                            <img src={book.photos} height='150px' width='120px' alt={book.name} />
                                        </td>
                                        <td className="p-3">{book?.name}</td>
                                        <td className="p-3">{book?.author.substring(0, 30)}</td>
                                        <td className="p-3">{book?.price}</td>
                                        <td className="p-3">
                                            <button onClick={() => updateBook(book)} className="btn btn-sqr">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NotUpload />
            )}
        </div>
    );
}

export default UserBooks;
