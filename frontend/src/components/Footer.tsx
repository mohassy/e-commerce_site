// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from "styled-components";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import logo from "./../assets/logo.svg"
import {mobile} from "../responsive.ts";

const Container = styled.div`
  display: flex;
  ${mobile({flexDirection: "column"})}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display: "none"})}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({backgroundColor: "#f8f3f3"})}
`

const Logo = styled.img`
  width: 50%;
`

const Desc = styled.p`
  margin: 20px 20px;
`

const SocailContainer = styled.div`
  display: flex;
  margin-left: 20px;
`

const SocailIcon = styled.div`
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${({color}: any)=>color};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin:0;
  padding:0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;

`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`
const ContactItem = styled.span`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const Payment = styled.img`
  width: 50%;
`
const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo src={logo}></Logo>
                <Desc>
                    Welcome to the best place to buy and sell your personal electronics.
                    Tech Traders is an ecommerce website where you can trade your new or even heavily used products at the best prices possible.
                    Make a trade today with the click of a button!
                </Desc>
                <SocailContainer>
                    <SocailIcon color={"3B5999"}>
                        <FacebookIcon/>
                    </SocailIcon>
                    <SocailIcon color={"E1306C"}>
                        <InstagramIcon/>
                    </SocailIcon>
                    <SocailIcon color={"1DA1F2"}>
                        <TwitterIcon/>
                    </SocailIcon>
                    <SocailIcon color={"E60023"}>
                        <PinterestIcon/>
                    </SocailIcon>
                </SocailContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem> <PlaceIcon style={{marginRight: "10px"}}/> 622 Dixie road South Winchester 98336</ContactItem>
                <ContactItem> <PhoneIcon style={{marginRight: "10px"}}/> +1 234 533 3245</ContactItem>
                <ContactItem><EmailIcon style={{marginRight: "10px"}}/> contact@techtrader.dev</ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt=""/>
            </Right>
        </Container>
    );
};

export default Footer;