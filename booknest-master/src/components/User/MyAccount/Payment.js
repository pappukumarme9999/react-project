import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../Interceptor.js";
import { apiEndPoint } from "../../../WebApi/WebApi.js";

function Payment() {
    const { currentUser } = useSelector((state) => state.user);
    const [orderList, setOrderList] = useState([]);

    const fetchOrderByUserId = async () => {
        try {
            console.log("Fetching payment details for user:", currentUser?._id);
            const response = await axios.post(apiEndPoint.FETCH_ORDER, { userId: currentUser._id });

            if (response.data && Array.isArray(response.data.orderlist)) {
                setOrderList(response.data.orderlist);
                console.log("Orders fetched successfully:", response.data.orderlist);
            } else {
                console.log("No orders found or unexpected response structure.");
                setOrderList([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrderByUserId();
    }, []);

    return (
        <div className="tab-pane fade" id="payment-method" role="tabpanel">
            <div className="myaccount-content">
                <h5>Payment Method</h5>
                {orderList.length === 0 ? (
                    <p className="saved-message">You haven't saved any payment methods yet.</p>
                ) : (
                    <p className="saved-message">
                        Your last payment method was {orderList[orderList.length - 1]?.paymentMode}.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Payment;
