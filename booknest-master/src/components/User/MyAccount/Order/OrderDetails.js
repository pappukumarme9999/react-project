import'./Order.css'
import { useLocation } from 'react-router-dom';
import { apiEndPoint } from '../../../../WebApi/WebApi.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from '../../../../Interceptor.js';
import Header from '../../../Header/Header.js';
import Footer from '../../../Footer/Footer.js';

function OrderDetails(){
    const{currentUser}=useSelector((state)=>state.user)
    const [orderDetails, setOrderDetails] = useState({});
    const location = useLocation();
    const order =location?.state?.order
   
    const fetchOrderDetailsById = async () => {
      try {
          console.log("Fetching order details for order ID:", order._id);
          const response = await axios.post(apiEndPoint.FETCH_ORDER_BY_ORDERID, { id: order._id });
          setOrderDetails(response.data.order || {});
          console.log("Order details loaded:", response.data.order);
      } catch (error) {
          console.error("Error fetching order details:", error);
      }
  };

  useEffect(() => {
      fetchOrderDetailsById();
  }, []);

   return<>
      <Header/>
      <div className="container orderDetailsContainer">
        <div>
        <div className='row'>
        
                 <div className='col-md-10 orderDetaildiv m-auto mt-3'>
                 <div className='row  d-flex justify-content-end me-1 '>
                 <div className='orderId mt-2 text-white'>
                 <span> OrderId :{orderDetails._id}</span>
                 </div>
                 </div>
                 <div className=' row mt-2 mb-2'>
                    <div className='col-md-5'>
                    <h6 className="contentcart"><span className="carttitle">Date :</span> {orderDetails.date}</h6>
                   </div>
                   <div className='col-md-5'>
                   <h6 className="contentcart"><span className="carttitle">Contact Person :</span>{orderDetails.contactPerson}</h6>
                   </div>     
                 </div>
                 <div className=' row mt-2 mb-2'>
                    <div className='col-md-5'>
                    <h6 className="contentcart"><span className="carttitle">contact Number :</span>{orderDetails.contactNumber}</h6>
                   </div>
                   <div className='col-md-5'>
                   <h6 className="contentcart"><span className="carttitle">Delievery Address :</span>{orderDetails.delieveryAddress}</h6>
                   </div>     
                 </div>
               
                <hr/>
                {orderDetails?.orderItem?.map((book, idx)=>
                <div className='row p-0 '>
                  <div className='col-md-2 mb-1'>
                  <img src={`data:image/png;base64,${book.bookId.photos}`} className="img-fluid" width='90px' height='60px' alt={book?.bookId?.name} />
                  </div>
                 <div className='col-md-4 mt-3'>
                    <h6 className="contentcart"><span className="carttitle">Title  : </span>{book?.bookId?.name}</h6>
                    <h6 className="contentcart"><span className="carttitle">Author : </span>{book?.bookId?.author}</h6>
                    <h6 className="contentcart"><span className="carttitle">Price  : </span>₹ {book?.bookId?.price}</h6> 
                 </div>
                  <div className='col-md-3 mt-3'>
                  <h6 className="contentcart"><span className="carttitle">Status : </span>{orderDetails?.status?.toUpperCase()}</h6>
                  </div>
                  <div className='col-md-3 mt-3'>
                  </div>
                  <hr/>
                </div>)}
                </div>
        </div>
        </div>

      </div>

   </>
}

export default OrderDetails;