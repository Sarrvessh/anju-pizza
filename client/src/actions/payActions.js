import { API_ENDPOINT } from "../utils/api";
import axios from "axios";
import { toast } from "react-toastify";

export const payActions = (token, price) => async (dispatch) => {
    dispatch({
        type: "PAYMENT_REQUEST"
    });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        // Simulate order creation by calling the backend API
        const response = await axios.post(
            `${API_ENDPOINT}/orders/pay`, 
            { amount: price }, 
            config
        );
        
        dispatch({
            type: "PAYMENT_REQUEST_SUCCESS",
            payload: response.data.order
        });
        toast.success("Payment initiated successfully");
        
    } catch (err) {
        toast.error(err.response?.data?.message || "Payment initiation failed");
        dispatch({
            type: "PAYMENT_REQUEST_FAILED"
        });
        return;
    }

    dispatch({
        type: "PAYMENT_REQUEST_COMPLETE",
    });
};

export const verifyPaymentAction = (token, order, paymentData) => async (dispatch) => {
    dispatch({
        type: "PAYMENT_VERIFICATION_REQUEST"
    });

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        // Simulate payment verification by calling the backend API
        await axios.post(
            `${API_ENDPOINT}/orders/verify`, 
            { order, paymentData }, 
            config
        );
        
        toast.success("Payment verified successfully");
        dispatch({
            type: "PAYMENT_VERIFICATION_SUCCESS"
        });
        
    } catch (err) {
        toast.error(err.response?.data?.message || "Payment verification failed");
        dispatch({
            type: "PAYMENT_VERIFICATION_FAILED"
        });
    }
};
