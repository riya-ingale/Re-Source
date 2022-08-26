import { Add, Remove } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import styled from "styled-components";
import { mobile } from "../Css/responsive";
import React,{useEffect, useState} from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

import img1 from "../Images/microscope.jpg"
import { height } from "@mui/system";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
    width: auto;
    margin-right:10px;
    background-color: #1ca9c9;
    color: white;
    font-weight: 600;
    padding: 10px;
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #f2f8f9;
  margin: 10px;
  box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex : 4;
  
  display: flex;
  ${mobile({ flexDirection: "column" })}
  ${mobile({ lineHeight: "24 px" })}
  ${mobile({ display: "auto" })}
`;

const Image = styled.img`
  width: 50%;
  padding-bottom : 10px;
  ${mobile({width:"100%"})}
`;

const Details = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}
`;

const ProductName = styled.span`
  display:flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ flexDirection: "row" })}
`;

const ProductId = styled.span`
  display:flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ flexDirection: "row" })}`;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};';


const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 80%;
  border: 1px solid #f2f8f9;
  margin: 10px;
  box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
  
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1ca9c9;
  color: white;
  font-weight: 600;
  border-radius: 20px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const [res,setRes] = useState();
  const [isloaded,setIsloaded] = useState(false);
  useEffect(() => {
 
      fetch("http://127.0.0.1:8000/resource/cart/",
      {headers:{'Authorization':sessionStorage.getItem('token')}
      }).then(response=>response.json())
      .then(body=>  {setRes(body);
      setIsloaded(true);
    })

            // setPageCount(resource.total_pages); 
          
  }, [])
  console.log(res);
  const moreres = () =>{
    window.location.href = "/viewres"
  }

  const handleremove = (e,cart_id) =>{
    fetch("http://127.0.0.1:8000/resource/removeitem/"
    ,{method: 'POST',
    headers: { "Content-Type": "application/json",'Authorization':sessionStorage.getItem('token') },
    body: JSON.stringify({"c_id":cart_id})
  }
    ).then(async response=>{
      const data = await response.json();
      console.log(data)
      if(data['status'] == 200){
        console.log("Success removed a resource")
      }})
      window.location.href = '/cart';
  } 
  const handlepayment = () =>{
    fetch("http://127.0.0.1:8000/placeorder/requesttopay/"
    ,{method: 'POST',
    headers: { "Content-Type": "application/json",'Authorization':sessionStorage.getItem('token')}
  }
    ).then(async response=>{
      const data = await response.json();
      console.log(data)
      if(data['status'] == 200){
        console.log("Order sent to the Accounts Department")
      }})
      window.location.href = '/cart';
  }
  return (
   isloaded ?
   <Container>
        
        
   <Wrapper>
     <Title>YOUR CART</Title>
     <Top>
       <TopButton onClick={moreres}>ADD RESOURCES</TopButton>
       {/* <TopTexts>
         <TopText>Shopping Bag(2)</TopText>
         <TopText>Your Wishlist (0)</TopText>
       </TopTexts> */}
       {/* <TopButton type="filled">CHANGE SLOT TIMINGS</TopButton> */}
     </Top>
     <Bottom>
       <Info>
        { res.data.map((item,index) =>(
          <div>

         <Product>
           <ProductDetail>
             <Image src={require("../temp_images/temp"+String(index+1)+".jpeg")} />
             <Details>
               <ProductName>
                 <b>Product:</b> {item.resource_name}
               </ProductName>
               <ProductName>
                 <b>Institute Name:</b> {item.institute_name}
               </ProductName>
               {/* <ProductName>
                 <b>Institute Address:</b> Address
               </ProductName> */}
               <ProductId>
                 <b>Date:</b> {item.date}
               </ProductId>
               {/* <ProductColor color="black" /> */}
               <ProductSize>
                 <b>Time slot</b> {item.start_time}-{item.end_time}
               </ProductSize>
               {item.is_approved===1 &&
               <ProductSize>
               <Chip label="Approved" color="success"  />
               </ProductSize>
               }
               {item.is_approved===0 &&
               <ProductSize>
               <Chip label="Not Yet Approved" color="info"  />
               </ProductSize>
               }
               {item.is_approved===-1 &&
               <ProductSize>
               <Chip label="Rejected" color="error"  />
               </ProductSize>
               }
               {item.is_approved===2 &&
               <ProductSize>
               <Chip label="Order sent" color="success"  />
               </ProductSize>
               }
          
             </Details>
           </ProductDetail>
           <PriceDetail>
             <ProductAmountContainer>
             {/* <IconButton color="#1ca9c9"><Add /></IconButton>
             <ProductAmount>1</ProductAmount> */}
             <IconButton color="#1ca9c9" onClick={event => handleremove(event,item.c_id)}><Remove /></IconButton>
               {/* <Add />
               <ProductAmount>2</ProductAmount>
               <Remove /> */}
             </ProductAmountContainer>
             <ProductPrice>₹ {item.cost}</ProductPrice>
           </PriceDetail>
         </Product>
         <Hr />
         </div>
         ))}
       </Info>
       <Summary>
         <SummaryTitle>ORDER SUMMARY</SummaryTitle>
         <SummaryItem>
           <SummaryItemText>Subtotal</SummaryItemText>
           <SummaryItemPrice>₹{res.subtotal}</SummaryItemPrice>
         </SummaryItem>
         <SummaryItem>
           <SummaryItemText>Transaction Fees (%)</SummaryItemText>
           <SummaryItemPrice>{res.transaction_percent}%</SummaryItemPrice>
         </SummaryItem>
         <SummaryItem>
           <SummaryItemText>GST (%)</SummaryItemText>
           <SummaryItemPrice>{res.gst_percent}%</SummaryItemPrice>
         </SummaryItem>
         {/* <SummaryItem>
           <SummaryItemText>Discount</SummaryItemText>
           <SummaryItemPrice>-₹10</SummaryItemPrice>
         </SummaryItem> */}
         <SummaryItem type="total">
           <SummaryItemText>Total</SummaryItemText>
           <SummaryItemPrice>₹{res.final_total}</SummaryItemPrice>
         </SummaryItem>
         <Button onClick={handlepayment}>PROCEED TO PAYMENT</Button>
       </Summary>
     </Bottom>
   </Wrapper>
   
 </Container>
 : <div></div>
  );
};

export default Cart;
