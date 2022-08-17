import { useCallback } from "react";
import useRazorpay from "react-razorpay";

export default function App() {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = await createOrder(params);
    const options = {
      "key": "rzp_test_DfplOiJGao9t7P",
      "amount": "200",
      "currency": "INR",
      "name": "Re-Source Resources",
      "description": "Test Transaction",
      "order_id": "order_K6irE9WSJWtQBU",
      "callback_url": "http://127.0.0.1:8000/placeorder/handlerequest/",
      "prefill": {
          "name": "ABS",
          "email": "abs@gmail.com",
          "contact": "+919876543212"
      },
      "theme": {
          "color": "#2BA977"
      }
  };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}