import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { fetchState } from "../../router-config/stateSlice";
import { fetchCategory } from "../../router-config/categorySlice";
import { fetchCitiesByState } from "../../router-config/citySlice";
import { imageToBase64 } from "../../utils/imageToBase64";
import { addBook, resetAddBookState } from "../../router-config/addBookSlice";
import axios from "../../Interceptor.js";
import { apiEndPoint } from "../../WebApi/WebApi.js";

function SellboooksForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State hooks for form fields
    const [bookName, setBookName] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [language, setLanguage] = useState("");
    const [edition, setEdition] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [pincode, setPincode] = useState("");
    const [cityId, setCityId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [photoBase64, setPhotoBase64] = useState("");
    const [price, setPrice] = useState(""); // Additional field for selling

    // Redux selectors
    const { categoryList = [] } = useSelector((state) => state.category || {});
    const { currentUser } = useSelector((state) => state.user || {});
    const { stateList = [] } = useSelector((state) => state.state || {});
    const { cityList = [] } = useSelector((state) => state.city || {});
    const { loading = false, success = false, error = null } = useSelector((state) => state.addBook);

    // Fetch initial states and categories
    useEffect(() => {
        dispatch(fetchState());
        dispatch(fetchCategory());
    }, [dispatch]);

    // Handle success/error on form submission
    useEffect(() => {
        if (success) {
            toast.success("Book listed for sale successfully!");
            navigate("/book");
            dispatch(resetAddBookState());
        } else if (error) {
            toast.error("Failed to list book for sale.");
        }
    }, [success, error, dispatch, navigate]);

    // Convert image file to Base64
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64String = await imageToBase64(file);
                setPhotoBase64(base64String);
            } catch (error) {
                console.error("Error converting image to base64:", error);
                toast.error("Failed to process image. Please try again.");
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.set("photos", photoBase64);
        formData.set("name", bookName);
        formData.set("description", description);
        formData.set("author", author);
        formData.set("language", language);
        formData.set("edition", edition);
        formData.set("publicationDate", publicationDate);
        formData.set("pincode", pincode);
        formData.set("cityId", cityId);
        formData.set("categoryId", categoryId);
        formData.set("userId", currentUser._id);
        formData.set("price", price); // Additional price field

        dispatch(addBook(formData));
    };

    // Fetch cities based on selected state
    const handleStateChange = (event) => {
        const selectedStateId = event.target.value;
        dispatch(fetchCitiesByState(selectedStateId));
        setCityId("");
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="container-fluid py-5 h-100 donateformContainer">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-2 donateformimage">
                        <img src="/img/donar/form.jpg" alt="Form" style={{ height: '500px', width: '500px' }} />
                    </div>
                    <div className="col-lg-10 col-xl-6">
                        <div className="card rounded-3">
                            <div className="card-body donateformcontain p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 sty">Book Details</h3>
                                <form onSubmit={handleSubmit} className="px-md-2">
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Edition" value={edition} onChange={(e) => setEdition(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Enter Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                    <input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-control" required>
                                            <option>Select Book Category</option>
                                            {categoryList.map((category) => (
                                                <option key={category._id} value={category._id}>{category.categoryName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control" required>
                                            <option>Select Language</option>
                                            <option>Marathi</option>
                                            <option>Hindi</option>
                                            <option>English</option>
                                        </select>                                    </div>
                                    <div className="form-group">
                                        <select onChange={handleStateChange} className="form-control mb-2" required>
                                            <option>Select State</option>
                                            {stateList.map((state) => (
                                                <option key={state._id} value={state._id}>{state.stateName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select value={cityId} onChange={(e) => setCityId(e.target.value)} className="form-control mb-2" required>
                                            <option>Select City</option>
                                            {cityList.map((city) => (
                                                <option key={city._id} value={city._id}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                    <input type="number" placeholder="Enter Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" placeholder="Enter Publication Date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} className="form-control" required />
                                    </div>
                                    <div className="row form-group"  >
                                        <div className="col-md-12">
                                        <input type="file" onChange={handleFileChange} placeholder="Images" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <textarea placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} cols="70" rows="4" className="form-control" required />
                                    </div>
                                    <div className="form-group">
                                    <button className="btn w-100 text-center submitbtn" style={{ outline: "none" }} type="submit">SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SellboooksForm;
