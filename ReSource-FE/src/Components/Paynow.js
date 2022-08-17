import React from 'react'

export default function Paynow() {
    // var options = {
    //     "key": "{{razorpay_merchant_id}}", // Enter the Key ID generated from the Dashboard
    //     "amount": "{% widthratio final_price 1 100 %}", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //     "currency": "INR",
    //     "name": "WonderShop",
    //     "description": "Test Transaction",
    //     "order_id": "{{order_id}}", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //     "callback_url": "{{callback_url}}",
    //     "prefill": {
    //       "name": "{{request.user.name}}",
    //       "email": "{{request.user.email}}",
    //       "contact": "+91" + "{{request.user.phone}}"
    //     },
    //     "theme": {
    //       "color": "#2BA977"
    //     }
    //   };
    //   var rzp1 = new Razorpay(options);
      function handleSubmit(e) {
        // rzp1.open();
        e.preventDefault();
      }
      
  return (
    <>
    <div className="info">
    <div className="container">
        <h1 >Payment Summary</h1>
        {/* Total Amount - {{final_price}} */}
        <br/>
        <form onSubmit={handleSubmit}>
            <button id="rzp-button1" className="btn"  type="submit">Pay Now</button>
        </form>
    </div>
    </div>
    </>
  )
}

