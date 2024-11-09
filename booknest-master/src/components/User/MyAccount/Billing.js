// booknest-master/src/components/User/MyAccount/Billing.js
import { useSelector } from "react-redux";
import { apiEndPoint } from "../../../WebApi/WebApi.js";
import axios from "../../../Interceptor.js";
import { useEffect, useState } from "react";

function BillingAddress() {
    const { currentUser } = useSelector((state) => state.user);
    const [orderList, setOrderList] = useState([]);

    const fetchOrderByUserId = async () => {
        try {
            console.log("Fetching billing address for user:", currentUser?._id);
            const response = await axios.post(apiEndPoint.FETCH_ORDER, { userId: currentUser._id });

            if (response.data && Array.isArray(response.data.orderlist)) {
                setOrderList(response.data.orderlist);
                console.log("Orders fetched:", response.data.orderlist);
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
        <div className="tab-pane fade" id="address-edit" role="tabpanel">
            <div className="myaccount-content">
                <h5>Billing Address</h5>
                <address>
                    <p><strong>{currentUser?.name}</strong></p>
                    <p>{orderList[orderList.length - 1]?.delieveryAddress || "No address available"}</p>
                    <p>Mobile: {currentUser?.contact}</p>
                </address>
            </div>
        </div>
    );
}

export default BillingAddress;
