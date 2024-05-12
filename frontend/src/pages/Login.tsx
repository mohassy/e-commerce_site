// @ts-ignore
import React, {useState} from 'react';
// @ts-ignore
import styled from "styled-components";
import {mobile} from "../responsive.ts";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/login.ts";
import storeState from "../models/storeState.ts";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background: white;
  ${mobile({width: "75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin:10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  transition: all 0.5s ease;
  color: white;
  background: teal;
  cursor: pointer;
  &:hover{
    background: pink;
  }
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`

const Error = styled.span`
  color: red;
`
const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isFetching = useSelector((state: storeState) => state.user.isFetching);
    const isError = useSelector((state: storeState) => state.user.isError);

    // @ts-ignore
    const loginHandler = async (event) => {
        event.preventDefault();
        const user = await login(dispatch, userName, password)
        console.log(user)
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="Username" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}/>
                    <Input type="password" placeholder="Password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                    <Button onClick={loginHandler} disabled={isFetching}>Login</Button>
                    {isError && <Error>Something went wrong...</Error>}
                    <Link>DON'T REMEMBER PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;