import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "black",
            color: "#black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "18px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#black" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "red"
        }
    }
}

const token = localStorage.getItem("token");

export default function PaymentForm({ amount, handlePayment, cus_id }) {


    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod;

                const response = await axios.post("http://localhost:8000/orders/payment", {
                    amount: amount * 100,
                    id,
                    cus_id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true);
                    window.location.reload(false);
                }

            } catch (error) {
                console.log("Error", error)
                toast.error("Failed checkout please try again");
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            {!success ?
                <form className="row" onSubmit={handleSubmit}>
                    <fieldset className="form-control">

                        <CardElement options={CARD_OPTIONS} />

                    </fieldset>
                    <button className="btn btn-info mt-2" onClick={handlePayment}>
                        <strong> Pay ${amount.toFixed(2)}</strong>
                    </button>
                </form>
                :
                <div>
                    {<h2>Pay booking Successfully!</h2>}
                    {toast.success("Order checkout successfully!")}
                </div>
            }

            <ToastContainer autoClose={2000} />
        </>
    )
}