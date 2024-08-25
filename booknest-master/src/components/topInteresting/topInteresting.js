import { useSelector } from "react-redux";
import './top.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../interceptor.js";
import { apiEndPoint } from "../../webApi/webapi";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import booksCard from "../card/booksCard";
function TopInteresting() {
  const {currentUser} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const viewDescription = (book) => {
   
    navigate("/viewDescription", { state: { bookDetails: book } })
  }

  const [productByCategory, SetProductByCategory] = useState([]);
  const [isError, SetisError] = useState(null);
  const { TopProductList } = useSelector((state) => state.topProduct);
  const { categoryList, error, isLoading } = useSelector((state) => state.category)
  const loadProductByCategory = async (categoryId) => {
    try {
      let response = await axios.post(apiEndPoint.BOOK_BY_CATEGORY, { categoryId });
      if (response.data.status) {
        SetProductByCategory(response.data.result);
      }
    } catch (err) {
      SetisError("oops Something Went Wrong")
    }

  }
  const addToCart = async (id)=>{
    try{
      if(currentUser)
      {
        let response = await axios.post(apiEndPoint.ADD_TO_CART,{bookId:id,userId : currentUser._id});
        toast.success("Book is added to you'r cart");
      }
      else{
        toast.warning("You have to Login first");
      }
  }
    catch(err)
    {
    if(err.response.status==400)
        toast.warning("Book is already exists in cart");
    if(err.response.status==500)
      toast.error("Oops Something went wrong");
    }
  }

  const BuyNow=async(book,flag)=>{
    const buy={
      Buybook:[{bookId:book}],
      Buyflag:true
    }
     try{
       if(currentUser){
        navigate("/cart",{state:{Buybook:buy}})
          

       }else{
         toast.warning("You Have To Login First ")
       }

     }catch(err){
      if(err.response.status==500)
      toast.error("Oops Something Went Wrong");
     }
  }

  
  return <>
  <ToastContainer/>
    <section className="our-project" id="projectid">
      <div className="container heading-design">
        <div data-aos="fade-up" data-aos-duration="400">
          <h1><span>Top Books</span></h1>
          <p className="sub-heading container">  <p>Browse the collection of our best selling and top interresting products. <br /> ll definitely find what you are looking for..</p></p>
        </div>
        <div className="container topinteresting" data-aos="fade-up" data-aos-duration={400}>
          <nav>
            <div
              className="nav nav-tabs row"
              style={{ paddingLeft: "18%" }}
              id="nav-tab"
              role="tablist"
            >

              <button  className=" nav-link active col-2" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true"  >  All</button>
              {!error && categoryList?.filter((category) => category.categoryName == "Classics").map((category, index) =>
                <button key={index} onClick={() => loadProductByCategory(category._id)} className=" nav-link col-2" id="nav-Remodeling-tab" data-bs-toggle="tab" data-bs-target="#nav-Remodeling" type="button" role="tab" aria-controls="nav-Remodeling" aria-selected="false" >{category.categoryName}</button>)}

              {!error && categoryList?.filter((category) => category.categoryName == "Horror").map((category, index) =>
                <button key={index} onClick={() => loadProductByCategory(category._id)} className="nav-link col-2" id="nav-Construction-tab" data-bs-toggle="tab" data-bs-target="#nav-Construction" type="button" role="tab" aria-controls="nav-Construction" aria-selected="false" >{category.categoryName}</button>)}

              {!error && categoryList?.filter((category) => category.categoryName == "History").map((category, index) =>
                <button key={index} onClick={() => loadProductByCategory(category._id)} className="nav-link col-2" id="nav-Repair-tab" data-bs-toggle="tab" data-bs-target="#nav-Repair" type="button" role="tab" aria-controls="nav-Repair" aria-selected="false" >
                  {category.categoryName}
                </button>
              )}

            </div>
          </nav>
        </div>
        <div
          className="tab-content "
          id="nav-tabContent"
          data-aos="fade-up"
          data-aos-duration={500}
        >
          <div
            className="tab-pane fade show active container"
            id="nav-all"
            role="tabpanel"
            aria-labelledby="nav-all-tab"
            tabIndex={0}
          >
            <div className="row m-auto">

              {TopProductList?.map((book,index) =>              
               <div key={index} className="col-md-3 col-sm-6 mt-5" data-aos="fade-up" data-aos-duration="500">
                 <div className="card">
                  
                 {book.photos.split("@")[1] ? <img src={apiEndPoint.DISK_STORAGE+ book.photos.split("@")[1]} className="img-fluid cardimg" /> : <img src={"https://drive.google.com/uc?export=view&id=" + book.photos.substring(32, book.photos.lastIndexOf("/"))} className="img-fluid cardimg" />}
                
                 <a className="cardcircle"><i className="fa fa-shopping-cart carticon mt-3" style={{cursor:"pointer"}} onClick={()=>addToCart(book?._id)}></i></a>
                   <div className="card-body">
                     <p className="card-text cardtitle">{book?.name.substring(0,20)}</p>
                     <p className="cardprice"><span className="cardtitle">Author: </span>{book.author.substring(0,15)}</p>
                     
                     <b className="card-text cardprice"><span className="cardtitle">Price: </span>₹{book?.price==0?"Free":book.price}</b>
                     <br/>
                     <button className="btn mt-2  buttonhover" onClick={()=>BuyNow(book,true)} >Get Now</button><span className="viewcircle ml-2 "  onClick={() => viewDescription(book,1)}><small className="viewicon p-2 " ><i className="fa fa-eye" /></small></span>
                   </div>
                 </div>
               </div>)}
            </div>
            </div>
            
            
            <div className="row m-auto">
              {productByCategory.filter((book)=>book.permission&&book.status==true).map((book,index)=>
              <div key={index} className="col-md-3 col-sm-6 mt-5" data-aos="fade-up" data-aos-duration="500">
                <div className="card">
                {book.photos.split("@")[1] ? <img src={apiEndPoint.DISK_STORAGE+ book.photos.split("@")[1]} className="img-fluid cardimg" /> : <img src={"https://drive.google.com/uc?export=view&id=" + book.photos.substring(32, book.photos.lastIndexOf("/"))} className="img-fluid cardimg" />}
                  <a className="cardcircle"><i className="fa fa-shopping-cart carticon mt-3" style={{cursor:"pointer"}} onClick={()=>addToCart(book._id)}></i></a>
                  <div className="card-body">
                    <p className="card-text cardtitle">{book.name.substring(0, 20)}</p>
                    <p className="cardprice"><span className="cardtitle">Author: </span>{book.author.substring(0, 15)}</p>
                    <b className="card-text cardprice"><span className="cardtitle">Price: </span>₹{book.price}</b>
                    <br />
                    <button className="btn mt-2 buttonhover" >Get Now</button><span className="viewcircle ml-2 "  onClick={() => viewDescription(book)}><small className="viewicon p-2 " ><i className="fa fa-eye" /></small></span>
                  </div>
                </div>
              </div>)}
          </div>


        </div>
      </div>
    </section>






  </>
}

export default TopInteresting;