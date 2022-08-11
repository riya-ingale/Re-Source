import { Add, Remove } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import styled from "styled-components";
import { mobile } from "../Css/responsive";

import img1 from "../Images/microscope.jpg"
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
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

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
`;

const Cart = () => {
  return (
    <Container>
      
      
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton>ADD RESOURCES</TopButton>
          {/* <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts> */}
          <TopButton type="filled">CHANGE SLOT TIMINGS</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
               
              <ProductDetail>
                <Image src={img1} />
                <Details>
                  <ProductName>
                    <b>Product:</b> Name
                  </ProductName>
                  <ProductName>
                    <b>Institute Name:</b> Name
                  </ProductName>
                  <ProductName>
                    <b>Institute Address:</b> Address
                  </ProductName>
                  <ProductId>
                    <b>Date:</b> 12/12/2012
                  </ProductId>
                  {/* <ProductColor color="black" /> */}
                  <ProductSize>
                    <b>Time slot</b> 7:00pm-8:00pm
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                {/* <IconButton color="#1ca9c9"><Add /></IconButton>
                 <ProductAmount>1</ProductAmount> */}
                 <IconButton color="#1ca9c9"><Remove /></IconButton>
                  {/* <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove /> */}
                </ProductAmountContainer>
                <ProductPrice>₹ 30</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>CGST</SummaryItemText>
              <SummaryItemPrice>₹10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>SGST</SummaryItemText>
              <SummaryItemPrice>₹10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>-₹10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹0</SummaryItemPrice>
            </SummaryItem>
            <Button>PROCEED TO PAYMENT</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      
    </Container>
  );
};

export default Cart;
