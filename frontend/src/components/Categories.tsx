// @ts-ignore
import React from 'react';
// @ts-ignore
import styled from "styled-components";
import { categories } from "../data.ts";
import CategoryItem from "./CategoryItem.tsx";
import {mobile} from "../responsive.ts";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({padding: "0px", flexDirection: "column"})}
`
const Categories = () => {
    return (
        <Container>
            {categories.map((item: any) => (
                <CategoryItem item={item} key={item.id}/>
            ))}
        </Container>
    );
};

export default Categories;