import { useCallback,useEffect,useState } from "react";
import useRazorpay from "react-razorpay";

export default function App() {

 

// const [options,setOptions] = useState({});

// const id = 1
  // useEffect(() =>{


  //   fetch('http://127.0.0.1:8000/placeorder/payment/', {
  //   method: 'POST',
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({"user_id":1})
  // }).then(response=>response.json())
  //         .then(body=>  {
  //           console.log(body)
  //           // setOptions(body);
  //           options['amount'] = body['amount']
  //           options['amount_due'] = body['amount_due']
  //           options['id'] = body["order_id"]
  //         })
  //   // console.log(options);
  // },[id])

  // const data = await fetch("http://127.0.0.1:8000/placeorder/payment/", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({"user_id":1}),
  // }).then((t) => t.json());

  // console.log(data);

//   var options = {
//     "key": "rzp_test_DfplOiJGao9t7P",
//     "id": data.order_id,
//     "name": "Re-Source Resources", 
//     "description": "Test Transaction",
//     "entity": "order",
//     "amount": data.amount,
//     "amount_paid": data.amount_paid,
//     "amount_due": data.amount_due,
//     "currency": "INR",
//     "receipt": "receipt#1",
//     "offer_id": null,
//     "status": "created",
//     "attempts": 0,
//     "notes": [],
//     "created_at": 1582628071,
  
//     'callback_url': "http://127.0.0.1:8000/placeorder/handlerequest/",
//     prefill: {
//         name: "ABS",
//         email: "abs@gmail.com",
//         contact: "+919876543212"
//     },
//     theme: {
//         color: "#3399cc"
//     }
// };
// const Razorpay = useRazorpay();

//   const handlePayment = useCallback(() => {
//     // const order = await createOrder(params);
//     const rzpay = new Razorpay(options);
//     console.log(options);
//     console.log(rzpay);
//     rzpay.open();
//   }, [Razorpay]);
async function showRazorpay() {
  const data = await fetch("http://127.0.0.1:8000/placeorder/payment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"order_id":3}),
    // Instead of harding sent the order_id for which the button has been clicked
  }).then((t) => t.json())
  console.log(sessionStorage.getItem("user_id"))
  console.log(data);

  var options = {
    "key": "rzp_test_DfplOiJGao9t7P",
    "order_id": data.order_id,
    "name": "Re-Source Resources", 
    "description": "Test Transaction",
    "entity": "order",
    "amount": data.amount,
    "amount_paid": data.amount_paid,
    "amount_due": data.amount_due,
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
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
  return (
    <div className="App">
      <button onClick={showRazorpay}>Click</button>
    </div>
  );
}
