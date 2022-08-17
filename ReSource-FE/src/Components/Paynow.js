import { useCallback,useEffect,useState } from "react";
import useRazorpay from "react-razorpay";

export default function App() {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = await createOrder(params);


    const rzpay = new Razorpay(options);
    console.log(options);
    console.log(rzpay)
    rzpay.open();
  }, [Razorpay]);

  var options = {
    "key": "rzp_test_DfplOiJGao9t7P",
    "id": "order_EKwxwAgItmmXdp",
    "name": "Re-Source Resources", 
    "description": "Test Transaction",
    "entity": "order",
    "amount": 100,
    "amount_paid": 0,
    "amount_due": 100,
    "currency": "INR",
    "receipt": "receipt#1",
    "offer_id": null,
    "status": "created",
    "attempts": 0,
    "notes": [],
    "created_at": 1582628071,
  
    'callback_url': "http://127.0.0.1:8000/placeorder/handlerequest/",
    prefill: {
        name: "ABS",
        email: "abs@gmail.com",
        contact: "+919876543212"
    },
    theme: {
        color: "#3399cc"
    }
};

// const [options,setOptions] = useState({});

const id = 1
  useEffect(() =>{


    fetch('http://127.0.0.1:8000/placeorder/payment/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"user_id":1})
  }).then(response=>response.json())
          .then(body=>  {
            console.log(body)
            // setOptions(body);
            options['amount'] = body['amount']
            options['amount_due'] = body['amount_due']
            options['id'] = body["order_id"]
          })
    // console.log(options);
  },[id])


  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}
