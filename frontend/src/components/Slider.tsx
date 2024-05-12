// @ts-ignore
import React, {useState} from 'react';
// @ts-ignore
import styled from "styled-components";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import {sliderItems} from "../data.ts";
import {mobile} from "../responsive.ts";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({display: "none"})}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props: any) => props.direction === "left" && "10px"};
  right: ${(props: any) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props: any) => props.slideIndex *-100}vw)
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props: any) => props.bg};
    
`
const ImgContainer = styled.div`
  height: 100%;
  flex:1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  object-fit: cover;
  padding: 50px;
  width: 100%;
`

const InfoContainer = styled.div`
  flex:2;
`

const Title = styled.h1`
  font-size: 70px;
`
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction: string) => {
        if(direction == "left"){
            setSlideIndex( slideIndex > 0? slideIndex-1 : 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0)
        }
    }

    return <Container>
        <Arrow direction={'left'} onClick={()=>handleClick('left')}>
            <ArrowLeftOutlinedIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex} >
            {sliderItems.map((item) => <Slide key={item.id} bg={item.bg}>
                    <ImgContainer>
                        <Image src={item.img}></Image>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Link to={'/products'}>
                            <Button>SHOW NOW</Button>
                        </Link>

                    </InfoContainer>
                </Slide>)}
        </Wrapper>
        <Arrow direction={'right'} onClick={()=>handleClick('right')}>
            <ArrowRightOutlinedIcon/>
        </Arrow>
    </Container>;
};

export default Slider;