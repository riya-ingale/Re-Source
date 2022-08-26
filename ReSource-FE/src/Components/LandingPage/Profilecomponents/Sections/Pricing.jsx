import React from "react";
import styled from "styled-components";
// Components
import PricingTable from "../Elements/PricingTable";

export default function Pricing() {
  return (
    <Wrapper id="pricing">
      <div className="whiteBg">
        <div className="landing-page-container">
          <HeaderInfo>
            <h1 className="font30 extraBold">Check Our Pricing</h1>
            <p className="font13">
              
            </p>
          </HeaderInfo>
          <TablesWrapper className="flexSpaceNull">
            <TableBox>
              <PricingTable
                icon="roller"
                price="2999/mo"
                title="Starter"
                text="1 Month"
                offers={[
                  { name: "Product Offer", cheked: true },
                  { name: "Offer", cheked: true },
                  { name: "Product Offer #2", cheked: false },
                  
                ]}
                action={() => alert("clicked")}
              />
            </TableBox>
            <TableBox>
              <PricingTable
                icon="monitor"
                price="4999/mo"
                title="Basic"
                text="3 Month"
                offers={[
                  { name: "Product Offer", cheked: true },
                  { name: "Offer", cheked: true },
                  { name: "Product Offer #2", cheked: true },
                  
                ]}
                action={() => alert("clicked")}
              />
            </TableBox>
            <TableBox>
              <PricingTable
                icon="browser"
                price="5999/mo"
                title="Golden"
                text="6 Month"
                offers={[
                  { name: "Product Offer", cheked: true },
                  { name: "Offer", cheked: true },
                  { name: "Product Offer #2", cheked: true },
                  
                ]}
                action={() => alert("clicked")}
              />
            </TableBox>
          </TablesWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 50px 0;
`;
const HeaderInfo = styled.div`
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const TablesWrapper = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const TableBox = styled.div`
  width: 31%;
  @media (max-width: 860px) {
    width: 100%;
    max-width: 370px;
    margin: 0 auto
  }
`;




