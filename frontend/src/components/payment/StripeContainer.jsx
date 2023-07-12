import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51NQjlFJ5CbgyGc9KwNCHlxlQ2uOEEOHZLHwPmGUncckWsMrwnjUu1SG6nXciTWaZ1hIlpuemv3cp99gE3RTEVSQw006ycTAgPN"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ amount, handlePayment, cus_id }) {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm
                amount={amount}
                handlePayment={handlePayment}
                cus_id={cus_id}
            />
        </Elements>
    )
}