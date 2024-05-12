// @ts-ignore
import React, {useEffect, useState} from 'react';
// @ts-ignore
import styled from "styled-components";
import Navbar from "../components/Navbar.tsx";
import Announcement from "../components/Announcement.tsx";
import Products from "../components/Products.tsx";
import NewsLetter from "../components/NewsLetter.tsx";
import Footer from "../components/Footer.tsx";
import {mobile} from "../responsive.ts";
import {useLocation} from "react-router-dom";


const Container = styled.div`

`

const Title = styled.h1`
  margin: 20px 40px;
`

const FilterContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  ${mobile({margin: "0px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between"})}
`

const FilterText = styled.span`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
  ${mobile({marginRight: "0px"})}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin: "10px 0px"})}
`

const Option = styled.option`
  font-size: 20px;
  font-weight: 500;
`
interface Filters {
    color: string,
    condition: string
}

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[1] === 'search' ? location.pathname : location.pathname.split("/")[2];
    const [title, setTitle] = useState("");
    const [filters, setFilter] = useState<Filters>({color: "ANY", condition: "ANY"})
    const [sort, setSort] = useState("asc")
    const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter({
            ...filters,
            [e.target.name]: value
        });
    };
    const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSort(e.target.value);
    };

    useEffect(()=>{
        if(cat == null){
            setTitle('Products')
        }else if(cat.split("/")[1] === 'search'){
            setTitle(cat.split("/")[2].replace("%20", " "))
        }else{
            setTitle(cat.replace("%20", " "))
        }
    }, [cat])

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{title}</Title>
            <FilterContainer>
                <Filter className="d-flex justify-content-center">
                    <FilterText>Filter Products</FilterText>
                    <Select className="form-select" defaultValue={"ANY"} name={"color"} onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option value={"ANY"}>Any</Option>
                        <Option value={"WHITE"}>White</Option>
                        <Option value={"BLACK"}>Black</Option>
                        <Option value={"RED"}>Red</Option>
                        <Option value={"BLUE"}>Blue</Option>
                        <Option value={"YELLOW"}>Yellow</Option>
                        <Option value={"GREEN"}>Green</Option>
                    </Select>
                    <Select className="form-select" defaultValue={"ANY"} name={"condition"} onChange={handleFilters}>
                        <Option disabled>Condition</Option>
                        <Option value={"ANY"}>Any</Option>
                        <Option value={"NEW"} >New</Option>
                        <Option value={"SLIGHTLY_USED)"}>Slightly Used</Option>
                        <Option value={"USED"}>Used</Option>
                        <Option value={"HEAVILY_USED"}>Heavily Used</Option>
                    </Select>
                </Filter>
                <Filter className="d-flex justify-content-center">
                    <FilterText>Sort Products</FilterText>
                    <Select className="form-select" defaultValue={"asc"} onChange={handleSort}>
                        <Option value={"asc"} >Price (asc)</Option>
                        <Option value={"desc"}>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <NewsLetter/>
            <Footer/>
        </Container>
    );
};

export default ProductList;