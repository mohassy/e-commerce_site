// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from "styled-components";
import Announcement from "../components/Announcement.tsx";
import Footer from "../components/Footer.tsx";
import Navbar from "../components/Navbar.tsx";
import {Add, Remove} from "@mui/icons-material";
import {mobile} from "../responsive.ts";
import {useDispatch, useSelector} from "react-redux";
import storeState from "../models/storeState.ts";
import {decreaseQuantity, increaseQuantity} from "../redux/cartRedux.ts";
import {Link} from "react-router-dom";



const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding: "10px"})}
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
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props: any) => props.type == "filled" && "none"};
  background-color: ${(props: any) => props.type == "filled" ? "black" : "transparent"};
  color: ${(props: any) => props.type == "filled" && "white"};

  ${mobile({margin: "5px", padding: "5px", fontWeight: "200"})}
  
`;
const TopTexts = styled.div`
  ${mobile({display: "none"})};
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection: "column"})};
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

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({color}: any) => color};
  border: 1px solid lightgrey;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin: "5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom: "20px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  padding: 10px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${({type}: any) => type === "total" && "700"};
  font-size: ${({type}: any) => type === "total" && "24px"};
`

const SummaryItemText = styled.span`
  
`

const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`
const Cart = () => {
    const cart = useSelector((state:storeState) => state.cart)
    const dispatch = useDispatch();
    function addHandler(index: number) {
        dispatch(increaseQuantity({index}));
    }

    function removeHandler(index: number) {
        dispatch(decreaseQuantity({index}));
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to={'/products'}>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>

                    <TopTexts>
                        <TopText>Shopping Bag ({cart.quantity})</TopText>
                        <TopText>Your Wishlist ({cart.quantity})</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product, index )=>{
                            return (
                                <Container key={index.toString().concat(product.id.toString())}>
                                <Product>
                                    <ProductDetail>
                                        <Image
                                            src={product.img}></Image>
                                        <Details>
                                            <ProductName><b>Product:</b> {product.title.toUpperCase()}</ProductName>
                                            <ProductId><b>Id:</b> {product.id}</ProductId>
                                            <ProductColor color={product.color}/>
                                            <ProductSize><b>Condition: </b>{product.condition}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <Remove onClick={()=> removeHandler(index)}/>
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <Add onClick={()=>addHandler(index)}/>
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {(product.quantity * product.price).toFixed(2)}</ProductPrice>
                                    </PriceDetail>
                                </Product>
                                <Hr/>
                            </Container>)
                        })}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ {(cart.total * 0.1).toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ {(-cart.total * 0.1).toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>
                        <Button>CHECKOUT NOW</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    );
};

export default Cart;