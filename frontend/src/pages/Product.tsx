// @ts-ignore
import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import styled from "styled-components";
import Announcement from "../components/Announcement.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import NewsLetter from "../components/NewsLetter.tsx";
import {Add, Remove} from "@mui/icons-material";
import {mobile} from "../responsive.ts";
import {useLocation} from "react-router-dom";
import Product_t, {initialProduct} from "../models/Product_t.ts";
import {publicRequest} from "../requestMethods.ts";
import {addProduct} from "../redux/cartRedux.ts";
import {useDispatch} from "react-redux";


const Container = styled.div`

`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({padding: "10px", flexDirection: "column"})}
`
const ImgContainer = styled.div`
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  object-fit: cover;
  max-height: 50vh;
  ${mobile({height: "40vh"})}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding: "10px"})}
`

const Title = styled.h1`
  font-weight: 200;
`

const Desc = styled.div`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display:flex;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`

const FilterColor = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid lightgrey;
  border-radius: 50%;
  background-color: ${(props: any)=> props.color};
  margin: 0px 5px;
  cursor: pointer;
`

const FilterConditionSelect = styled.select`
  margin-left: 20px;
  padding: 5px;
`

const FilterConditionOption = styled.option`
  margin-left: 10px;
  padding: 5px;
`
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;
const AmountContainer = styled.div`
  display:flex;
  align-content: center;
  font-weight: 700;
  justify-content: center;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  font-weight: 1500;
  border: 2px solid teal;
  display:flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  background: white;
  ${mobile({margin: "0px 0px", alignItems: "center"})}
`;
const Button = styled.button`
  padding: 15px;
  border: 1px solid teal;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover{
    background-color: teal;
    color: white;
    border-color: black;
  }
  ${mobile({margin: "10px 0px"})}
`;



const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("color");
    const [condition, setCondition] = useState("condition");
    const [product, setProduct] = useState<Product_t>(initialProduct);

    const dispatch = useDispatch();

    useEffect(()=> {
        const getProduct = async ()=> {
            try {
                const res = await publicRequest.get(`device/${id}`);
                console.log(res.data);
                setProduct(res.data);
            }catch (err){
                console.log(err)
            }
        };
        getProduct();
    }, [id]);

    useEffect(()=>{
        setColor(product.colors[0]);
        setCondition(product.conditions[0]);
    }, [product]);

    function addHandler() {
        if(quantity < product.stock)
            setQuantity(quantity + 1);
    }

    function removeHandler() {
        if(quantity > 1)
            setQuantity(quantity - 1);
    }

    function colorHandler (event: React.ChangeEvent<HTMLInputElement> ){
        setColor(event.target.value);
    }

    function handleCondition(event: React.ChangeEvent<HTMLInputElement>){
        setCondition(event.target.value);
    }

    function addToCartHandler(){
        dispatch(addProduct({...product, quantity, color, condition}));
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.specs.map((spec, index) => <p key={index}>{spec}</p>)}
                    </Desc>
                    <Price>$ {product.price.toFixed(2)}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                                {product.colors.map(color => <FilterColor value={color} onClick={colorHandler} color={color} key={color}/>)}
                        </Filter>
                        <Filter>
                            <FilterTitle>Condition</FilterTitle>
                            <FilterConditionSelect onChange={handleCondition}>
                                {product.conditions.map(condition => <FilterConditionOption value={condition} key={condition}>{condition.replace("_", " ")}</FilterConditionOption>)}
                            </FilterConditionSelect>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={removeHandler}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={addHandler}/>
                        </AmountContainer>
                        <Button onClick={addToCartHandler} >ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter/>
            <Footer/>

        </Container>
    );
};

export default Product;