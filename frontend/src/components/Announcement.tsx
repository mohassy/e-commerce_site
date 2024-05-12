// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from "styled-components";



const Container = styled.div`
  height: 30px;
  color: white;
  background-color: teal;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`
const Announcement = () => {
    return (
        <Container>
            Super Deal! Free Shipping Orders Over $50
        </Container>
    );
};

export default Announcement;