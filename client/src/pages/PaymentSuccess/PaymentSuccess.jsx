import React from 'react'
import { useSearchParams } from "react-router-dom"
import './PaymentSuccess.css'

const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0];

    const referenceNum = seachQuery.get("reference")
    return (
        <div class="payment_success_card">
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: "#F8FAF5", margin: 'auto' }}>
                    <i class="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>We received your purchase request;<br /> Reference No. : {referenceNum} </p>
        </div>
    )
}

export default PaymentSuccess