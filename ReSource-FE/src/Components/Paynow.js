import { useCallback } from "react";
import useRazorpay from "react-razorpay";

export default function App() {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = await createOrder(params);
    const options = {
      "key": "rzp_test_DfplOiJGao9t7P",
      "id": "order_EKwxwAgItmmXdp",
      "entity": "order",
      "amount": 50000,
      "amount_paid": 0,
      "amount_due": 50000,
      "currency": "INR",
      "receipt": "receipt#1",
      "offer_id": null,
      "status": "created",
      "attempts": 0,
      "notes": [],
      "created_at": 1582628071,
    
      callback_url: "http://127.0.0.1:8000/placeorder/handlerequest/",
      prefill: {
          name: "ABS",
          email: "abs@gmail.com",
          contact: "+919876543212"
      },
      theme: {
          color: "#2BA977"
      }
  };

    const rzpay = new Razorpay(options);
    console.log(options);
    console.log(rzpay)
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}