// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from "styled-components";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {Link} from "react-router-dom";
import {addProduct} from "../redux/cartRedux.ts";
import Product_t from "../models/Product_t.ts";
import {useDispatch} from "react-redux";
const Container = styled.div`
  box-sizing: border-box;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  position: relative;
`
const Circle = styled.div`
  flex: 1;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  margin: 5px;
  position: absolute;
`
const Image = styled.img`
  max-width: 75%;
  max-height: 75%;
  object-fit: cover;
  z-index: 2;
`
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  background-color: rgba(0,0,0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover{
    opacity: 1;
  }
`
const Icon = styled.div`
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  
  &:hover{
    background: #e9f5f5;
    transform: scale(1.1);
    
  }
`

const Button = styled.button`
  background: transparent;
  border-radius: 50%;
  border: 0px;

`

interface Props {
    product: Product_t;
}

const Product = ({product} : Props) => {
    const dispatch = useDispatch();
    const quantity = 1;
    const color: string = product.colors[0];
    const condition: string = product.conditions[0];

    const addToCartHandler = (event: React.ChangeEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        dispatch(addProduct({...product, quantity, color, condition}));
    }

    return (
        <Container>
            <Circle/>
            <Image src={product.img}/>
            <Info>
                <Icon>
                    <Button onClick={addToCartHandler}>
                        <ShoppingCartOutlinedIcon/>
                    </Button>
                </Icon>
                <Icon>
                    <Link to={`/product/${product.id}`}>
                        <SearchOutlinedIcon/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlinedIcon/>
                </Icon>
            </Info>
        </Container>
    );
};

export default Product;