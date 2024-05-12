// @ts-ignore
import React, {useState} from "react";
// @ts-ignore
import styled from "styled-components";
import { mobile } from "../responsive";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {useDispatch, useSelector} from "react-redux";
import logo from "./../assets/logo.svg";
import {Link, useLocation} from "react-router-dom";
import storeState from "../models/storeState.ts";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {logout} from "../redux/userRedux.ts";
import {resetCart} from "../redux/cartRedux.ts";

const Container = styled.div`
  height: 80px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 2px solid #05896c;
  border-radius: 500px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 0 5px;
`;
const Input = styled.input`
  border: none;
  border-radius: 500px;
  width: 100px;
  padding: 5px;
  &:focus {
    width: 250px;
    outline: none;
  }
  transition: width cubic-bezier(0.4,-0.28, 0.58, 1.31) 0.5s;

  ${mobile({width: "50px"})}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 70%;
  object-fit: cover;
  ${mobile({width: 50})}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Form = styled.form``

const Greeting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Logout = styled.button`
  padding: 1px 20px;
  margin-left: 25px;
  font-weight: bold;
  color: steelblue;
  background-color: transparent;
  border: 1px solid lightsteelblue;
  border-radius: 500px;
  &:hover{
    background-color: azure;
  }
`



const Navbar = () => {
  const quantity = useSelector((state : storeState)=> state.cart.quantity);
  const user = useSelector((state: storeState)=> state.user.currentUser)
  const [keyWord, setKeyWord] = useState("");
  const baseURL = useLocation().pathname.split("/")[0];

  const dispatch = useDispatch();
  function logoutHandler(){
    dispatch(logout());
    dispatch(resetCart());
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Form action={`${baseURL}/search/${keyWord}`}>
              <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setKeyWord(e.target.value)} placeholder={"Search"}></Input>
              <Link to={`${baseURL}/search/${keyWord}`}>
                <SearchIcon style={{ color: "#05896CFF", fontSize: 26, cursor: "pointer" }}></SearchIcon>
              </Link>
            </Form>
          </SearchContainer>
        </Left>
        <Center>
          <Link to={'/'}>
            <Logo src={logo}></Logo>
          </Link>
        </Center>
        <Right>
          {!user ?
              <>
                <Link to={'/register'}>
                  <MenuItem>Sign up</MenuItem>
                </Link>
                <Link to={'/login'}>
                  <MenuItem>Log in</MenuItem>
                </Link>
              </>:
              <>
                <AccountCircleIcon style={{ color: "#05896CFF", cursor: "pointer", marginRight: "3px" }}/>
                <Greeting>{user.firstName}</Greeting>
                <Logout onClick={logoutHandler}>
                  Logout
                </Logout>
              </>


          }
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={quantity} color={"primary"}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;