// @ts-ignore
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import styled from "styled-components";
import {mobile} from "../responsive.ts";


const Container = styled.div`
  box-sizing: border-box;
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign: "center"})}
  
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  border: none;
  ${mobile({justifyContent: "center", width: "40%"})}
`
const Input = styled.input`
  width: 80%;
  padding: 20px;
  border: none;
  &:focus{
    outline: solid 2px teal;
  }
`
const Button = styled.button`
  border: none;
  padding: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  width: 15%;
  &:hover{
    width: 20%;
  }
  transition: width ease-in-out 0.25s;
`
const NewsLetter = () => {
    return (
        <Container>
            <Title>News Letter</Title>
            <Desc>Get timely updates from favorite products</Desc>
            <InputContainer>
                <Input placeholder={'Your email'}>
                </Input>
                <Button>
                    <SendIcon/>
                </Button>
            </InputContainer>
        </Container>
    );
};

export default NewsLetter;