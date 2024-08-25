import { useDispatch, useSelector } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useEffect, useRef, useState } from "react";
import { fetchState } from "../../router-config/stateSlice";
import axios from "axios";
import { apiEndPoint } from "../../webApi/webapi";
import userSlice from "../../router-config/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DonateForm() {
  const navigate=useNavigate();
  const [citys, setCitys] = useState([]);
  const { categoryList, error, } = useSelector((state) => state.category)
  const { currentUser } = useSelector((state) => state.user);
  const { stateList } = useSelector((item) => item.state);
  const dispatch = useDispatch()
  const [name, setBookName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [author, setAuthorName] = useState(" ");
  const [language, setLanguage] = useState("");
  const [edition, setEdition] = useState(" ");
  const [publicationDate, setPublicationDate] = useState(" ");
  const [pincode, setPinCode] = useState(" ");
  const [cityId, setCity] = useState(" ");
  const [categoryId, setCategory] = useState(" ");
  const stateObject = useRef("");

  let photos = [];

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
