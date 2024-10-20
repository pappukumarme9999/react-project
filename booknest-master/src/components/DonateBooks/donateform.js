import { useDispatch, useSelector } from "react-redux";
// useDispatch: Used to dispatch Redux actions. Here, it's used to fetch the state list using the fetchState action.
// useSelector: Retrieves values from the Redux store. It is used to get categoryList, currentUser, and stateList from the Redux store.

import { useEffect, useRef, useState } from "react";
// useEffect: A React hook for handling side effects (e.g., fetching state data after the component mounts).
// useRef: A hook that provides a reference to a DOM element or a value that persists across renders. Here, it's used to store the reference for the stateObject (dropdown selection for states).
// useState: Used for managing local component state (like form fields and dynamic data such as citys, name, description, etc.).

import axios from "axios";
// A promise-based HTTP client for making requests to the backend. It is used for submitting the form and fetching cities based on state selection.

import { toast, ToastContainer } from "react-toastify";
// toast: Used to show notifications such as success or error messages in a non-intrusive manner.
// ToastContainer: A component that renders the notifications on the screen.

import { useNavigate } from "react-router-dom";
// Used to programmatically navigate between routes. It is used here to navigate back to the /donateform after successfully submitting the form.

import { apiEndPoint } from "../../webApi/webapi";
// An object that likely holds API endpoint constants, used to make requests for actions such as adding a book or fetching cities by state.

import userSlice from "../../router-config/userSlice";
// This refers to Redux slices, particularly the one managing user-related state and actions (like currentUser).

import Footer from "../footer/footer";
import Header from "../header/header";
import { fetchState } from "../../router-config/stateSlice";

// The DonateForm component provides a form interface where users can submit details to donate books, including selecting the book’s category, language, location (city and state), and uploading an image. When the form is submitted, the data is sent to the backend.
function DonateForm() {
  const navigate=useNavigate();

  // State Variables

  // citys: Stores the list of cities fetched based on the selected state.
  const [citys, setCitys] = useState([]);
  const [name, setBookName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [author, setAuthorName] = useState(" ");
  const [language, setLanguage] = useState("");
  const [edition, setEdition] = useState(" ");
  const [publicationDate, setPublicationDate] = useState(" ");
  const [pincode, setPinCode] = useState(" ");
  const [cityId, setCity] = useState(" ");
  const [categoryId, setCategory] = useState(" ");

  // stateObject: A useRef reference to keep track of the selected state dropdown element.
  const stateObject = useRef("");

  const { categoryList, error, } = useSelector((state) => state.category)
  const { currentUser } = useSelector((state) => state.user);
  const { stateList } = useSelector((item) => item.state);
  const dispatch = useDispatch()

  let photos = [];

  // handle file input change (uploading book images). It saves the selected file to the photos variable.
  const onFileChange = event => {
    photos = (event.target.files[0]);
  }

   const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const stateId = stateObject.current.value;
      const userId = currentUser._id;
      const price = 0;
       let formData = new FormData();
      formData.append("photos", photos);      
      formData.set("name", name);
      formData.set("description", description);
      formData.set("author", author);
      formData.set("language", language);
      formData.set("edition", edition);
      formData.set("publicationDate", publicationDate);
      formData.set("pincode", pincode);
      formData.set("cityId", cityId);
      formData.set("categoryId", categoryId);
      formData.set("userId", userId);
      formData.set("price", price);
      let response = await axios.post(apiEndPoint.ADD_BOOK, formData);
     if(response.data.status==true)
      toast.success("Book Added SuccesFully");
      navigate('/donateform')
    }
    catch (err) {
      toast.error("Something Went Wrong");
    }
  }
 
  // This function fetches cities based on the selected state. It triggers when a state is selected from the dropdown, sending the stateId to the backend via an API request and updating the citys array with the response data.
   const featchCityById = async (stateId) => {
    try {
      let response = await axios.post(apiEndPoint.FEATCH_CITY_BY_STATE, { stateId: stateId });
      setCitys(response.data.city);
    }
    catch (err) {
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
    dispatch(fetchState());
     }, [])
// Purpose: The useEffect hook runs after the component mounts to fetch the list of states by dispatching the fetchState() action.
// Dependencies: Since the dependency array is empty ([]), this effect will only run once when the component is initially rendered.

  return <>
  
    <section>
      <Header /> 
      <ToastContainer/>
      <div className="container-fluid py-5 h-100 donateformContainer">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-2 donateformimage">
          <img src="\img\donates\donateimg.jpg" style={{ height: '500px', width: '500px' }}/>
          </div>
          <div className="col-lg-10 col-xl-6" >
            <div className="card rounded-3">

              <div className="card-body donateformcontain p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 sty">
                  Book Donation Form
                </h3>
                <form onSubmit={handleSubmit} className="px-md-2">
                  <div className="row form-group"  >
                    <div className="">
                      <input onChange={(event) => setBookName(event.target.value)} placeholder="Enter Book Name" type="text" className="form-control" required />
                    </div>
                  </div>
                  <div className="row form-group"  >
                    <div className="">
                      <input onChange={(event) => setEdition(event.target.value)} placeholder="Enter Edition" type="text" className="form-control" required />
                    </div>
                  </div>
                  <div className="row form-group"  >
                    <div className="">
                      <input onChange={(event) => setPublicationDate(event.target.value)} placeholder="Enter Publication Date" type="date" className="form-control" required/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className=" col-md-12">
                      <input onChange={(event) => setAuthorName(event.target.value)} placeholder="Enter Author Name" type="text" className="form-control" required/>
                    </div>

                  </div>
                  <div className="row form-group">
                    <div>
                      <select onChange={(event) => setCategory(event.target.value)} className="form-control">Category
                        <option>Select Book Category</option>
                        {!error && categoryList.map((category, index) => <option value={category._id} key={index}>{category.categoryName}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div>
                      <select onChange={(event) => setLanguage(event.target.value)} className="form-control">language
                        <option>Select Language</option>
                        <option>Hindi</option>
                        <option>English</option>

                      </select></div>
                 </div>
                  <div className="row form-group mt-2"  >
                    <div className=" col-md-6">
                      <select  ref={stateObject}   className="form-control" onChange={(event) => featchCityById(event.target.value)}>State
                        <option >Select State</option>
                        {stateList.map((state, index) =>
                          <option key={index} value={state._id}>{state.stateName}</option>
                        )}

                      </select>
                    </div>
                    <div className=" col-md-6">
                      <select onChange={(event) => setCity(event.target.value)} className="form-control">City
                        <option >Select City</option>
                        {citys.map((city, index) =>
                          <option value={city._id} >{city.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="row form-group"  >
                   <div className=" col-md-6">
                      <input onChange={(event) =>setPinCode(event.target.value)} type="number" placeholder=" Enter Pincode" className="form-control" required/>
                    </div>
                  </div>

                  <div className="row form-group">
                    <div>
                      <input onChange={onFileChange} type="file" multiple placeholder="Images" className="form-control" required/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div>
                      <textarea onChange={(event) => setDescription(event.target.value)} cols='70' rows='4' placeholder="Enter Description" />
                    </div>
                  </div>
                  <div>
                    <button className="btn w-100 text-center submitbtn" style={{ outline: "none" }} type="submit">SUBMIT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />

</>
}

export default DonateForm;


// Detailed Explanation of Major Keywords and Methods:

// useDispatch:

// This hook gives you access to the Redux dispatch method. In this case, it is used to dispatch the fetchState action to load the list of states when the component mounts.


// useSelector:

// Retrieves pieces of state from the Redux store, such as:
// categoryList: A list of book categories.
// currentUser: The currently logged-in user.
// stateList: A list of states fetched from the store.


// useNavigate:

// Used for programmatic navigation in React Router. After a successful form submission, the user is redirected to /donateform.


// useEffect:

// The useEffect hook is used to run side-effects like data fetching after the component has been mounted.


// useRef:

// A hook that allows you to persist a value (or DOM element) across renders without triggering a re-render. Here, it's used to store the state dropdown’s current selection.


// FormData:

// A special JavaScript object used to construct key-value pairs that can be sent with a multipart/form-data request. This is essential for handling file uploads along with other form data.


// axios:

// A popular HTTP client used to make requests to the backend. In this component, it is used for both POST and GET requests (e.g., ADD_BOOK to submit form data, and FEATCH_CITY_BY_STATE to fetch cities based on the selected state).


// Toast Notifications:

// Toast notifications provide feedback to the user for actions like successful book submission or errors during the process.