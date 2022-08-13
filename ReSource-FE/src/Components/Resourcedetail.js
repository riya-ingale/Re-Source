import React,{useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import img1 from ".././Images/chem-quip.jpg";
// import img2 from "../Images/microscope.jpg";
// import img3 from "../Images/chem-quip.jpg";
import "../Css/resourcedetail.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router';

export default function Resourcedetail() {
  // const images = require.context('../../../', true);
//   var data = {};
//   console.log('http://127.0.0.1:8000/resource/getdetails/'+useParams()['id']);
//   fetch('http://127.0.0.1:8000/resource/getdetails/'+useParams()['id'], { //role id update require wait for landing page
//   method: 'GET',
//   headers: { "Content-Type": "application/json" },
//   // body: JSON.stringify(logindata)
// }).then(async response=>{
//   data = await response.json();})

var data = {

  "status": 200,
  "message": "Resource fetched",
  "data": {
      "id": 9,
      "name": "Tungsten Turbidimeter",
      "specification": "3.0",
      "subject": "Science",
      "dimension": "153 mm x 395 mm x 305 mm",
      "details": "TL2350 Turbidimeter, silicone oil, oiling cloth, USEPA filter assembly, 1-inch sample cells (30 mL) with caps (6x), Gelex secondary turbidity standardization kit, Stablcal calibration kit, power supply, power cord, dust cover",
      "quantity": 10,
      "cost": 45999,
      "req_approval": 0,
      "lab": 3
  },
  "images": [
      [
          "media/resource_images/3NGQBVLXCN.jpeg"
      ],
      [
          "media/resource_images/M2AW277Z5U.jpeg"
      ]
    ],
    "updated":0
};


const [users, setUsers] = useState();
const { id } = useParams();
const [slots,setSlots] = useState('');
const [date, setDate] = useState('');
const [quant, setQuant] = useState('');
useEffect(() => {
  fetch(
          "http://127.0.0.1:8000/resource/getdetails/"+id
        ).then(async response=>{
          setUsers(await response.json());})
          // image_fetcher(users.images)
          // console.log(image)
}, [id])

const image_arr = []
const image_fetcher = (num) => {
  for(let i = 0;i<num;i++){
    const temp = require("../temp_images/temp"+String(i+1)+".jpeg");
    image_arr[i] = temp;
  }
  console.log(image_arr)
  // setImage(image_arr)
}

if(users !== undefined && data['updated']===0){
  data = users;
  data['updated'] = 1;
  console.log(data);
  image_fetcher(data.images);
  // for(let i = 0;i<users.images;i++){
  //   // console.log("Checker");
  //   // const temp = require("../temp_images/temp"+String(i+1)+".jpeg")
  //   // // console.log(temp);
  //   // setImg([...img, temp]);
  // }
}
// console.log(img)

const slot_fetch = () => {

  const quantity = quant;
  sessionStorage.setItem("Date",date);
  sessionStorage.setItem("Quantity",quantity);
  const slot = {date,quantity}
  console.log(slot)
  fetch("http://127.0.0.1:8000/resource/getdetails/"+id, { //role id update require wait for landing page
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slot)
    }).then(async response=>{
      data = await response.json();
      setSlots(data['available_slots']);

    })
}

const handleCapacity = (e) =>{
  setQuant(e.target.value);
}


const handleDate = (e) =>{
  setDate(e.target.value);
}

const [slotbook, setSlotbook] = useState({});

const handleClick = (e) =>{
  if(e.target.value in slotbook){
    setSlotbook({ ...slotbook, [e.target.value]:  (slotbook[e.target.value]+1)%2});
  }
  else{
    setSlotbook({ ...slotbook, [e.target.value]:  1});
  }
}

const book_slot = (e) =>{
  console.log(slotbook);
  const required_quantity = Number(sessionStorage.getItem('Quantity'));
  const date = sessionStorage.getItem("Date");
  const workforce_id = 1 //sessionStorage.getItem("user_id");
  const resource_id = id;
  const slots_overall = [];
  var iterator = 0;
  for(const [key, val] of Object.entries(slotbook)) {
    if (val === 1){
      slots_overall[iterator] = [Number(key),Number(key)+1];
      iterator+=1;
    }
  }

  const slot_data = {required_quantity,date,workforce_id,resource_id,slots_overall}
  console.log(slot_data);
      fetch('http://127.0.0.1:8000/resource/addslots/', { //role id update require wait for landing page
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slot_data)
    }).then(async response=>{
      const msg = await response.json();
      console.log(msg)
      if(msg['status'] == 200){
        console.log(msg['message'])
      }
    })

}


var slotting = <div></div>;
if(slots !== '' && slots!== undefined){
 slotting = 
  <div>
  <div className=''>
  <div className="card card-booking">
  <div className="outer-slot-div">

    {slots.map((item) =>(
      <div className="cat">
      <label>
          <input type="checkbox" value={item[0]} onClick={handleClick}/><span>{item[0]}:00 - {item[1]}:00</span>
      </label>
      </div>
    ))}
    
  </div>
  </div>
  </div>

  <div className='d-flex justify-content-center bookNow'>
      <button className="button-86" role="button" onClick={book_slot}>Book Now</button>
  </div>
  </div>
 }



  return (
    <>
      <div className="pd-wrap" >
        <div className="container">
          <div className="heading-section">
            <h2>Product Details</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Carousel fade>
                { image_arr.map((item) =>(
                <Carousel.Item>
                  <img className="d-block w-100"  src={item} alt="First slide" />
                </Carousel.Item>
))}
                {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image_arr[1]}
                    alt="Second slide"
                  />
                </Carousel.Item> */}
                {/* <Carousel.Item>
                  <img className="d-block w-100" src={image_arr[2]} alt="Third slide" />
                </Carousel.Item> */}
              </Carousel>
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">{data.data.name}</div>
                  {/* <div className="reviews-counter"> */}
                    {/* <div className="rate">
                      <input
                        type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        checked
                      />
                      <label for="star5" title="text">
                        5 stars
                      </label>
                      <input
                        type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        checked
                      />
                      <label for="star4" title="text">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        checked
                      />
                      <label for="star3" title="text">
                        3 stars
                      </label>
                      <input type="radio" id="star2" name="rate" value="2" />
                      <label for="star2" title="text">
                        2 stars
                      </label>
                      <input type="radio" id="star1" name="rate" value="1"/>
                      <label for="star1" title="text">
                        1 star
                      </label>
                    </div>
                    <span>3 Reviews</span>
                  </div> */}
                  <div className="product-price-discount">
                    <span>Cost per hour: Rs{data.data.cost}</span>
                  </div>
                </div>
                <p>
                    Specification: {data.data.specification}
                    <br></br>
                    Details:
                  {data.data.details}
                  
                </p>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <div className='row'>
                        <div className='col-md-6'>
                            <ul className="list-bullets">
                                <li className="mb-2"><strong className='strlist'>Domain: </strong> {data.data.subject}</li>
                                <li className="mb-2"><strong className='strlist'>Dimension: </strong>{data.data.dimension}</li>
                                {/* <li className="mb-2"><strong>Specification: </strong>High Bandwidth</li> */}
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <ul className="list-bullets">
                                <li className="mb-2"><strong className='strlist'>Quantity: </strong>{data.data.quantity}</li>
                                <li className="mb-2"><strong className='strlist'>Details: </strong>{data.data.details}</li>
                                {/* <li className="mb-2"><strong></strong></li> */}
                            </ul>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <form>
          <div className="row slot-booking">
            <div className="col-md-4 d-flex justify-content-center">
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDate}
              />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <TextField
                id="standard-basic"
                label="Capacity"
                variant="standard"
                onChange={handleCapacity}
              />
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Button className="Searchbtn" variant="outlined" onClick={slot_fetch}>Find Slots</Button>
            </div>
          </div>
        </form>

        {slotting}
        </div>
      </div>
    </>
  );
}
