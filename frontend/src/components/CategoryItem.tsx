// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from "styled-components";
import {mobile} from "../responsive.ts";
import {Link} from "react-router-dom";


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`

const Image = styled.img`
  width: 100%; //100% of Container
  height: 100%; //100% of Container
  object-fit: cover; //Crops image instead of stretching or compressing
  ${mobile({height: "40vh"})}
`

const Info = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: #000 2px 2px 3px;
`

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: grey;
  font-weight: 700;
  letter-spacing: 5px;
  border-radius: 50px;
  cursor: pointer;
`


const CategoryItem = ({item}: any) => {
    return (
        <Container>
            <Link to = {`/products/${item.cat}`}>
                <Image src={item.img}/>
                <Info>
                    <Title>{item.title}</Title>
                    <Button> SHOP NOW </Button>
                </Info>
            </Link>
        </Container>
    );
};

export default CategoryItem;