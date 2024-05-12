// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {useEffect, useState} from 'react';
import Product from "./Product.tsx";
import ProductType from "../models/Product_t.ts"
//import {popularProducts} from "../data.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styled from "styled-components";
import {mobile} from "../responsive.ts";
import {publicRequest} from "../requestMethods.ts";


const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${mobile({gridTemplateColumns: "repeat(1, 1fr)"})}
  background-color: azure;
`

interface Props {
    cat?: string,
    filters?: {
        color: string,
        condition: string
    },
    sort?: string,
    from?: string
}


const Products = ({ cat, filters, sort, from}: Props ) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
    const pageNumber =  0;

    useEffect(() =>{
        const getProducts = async ()=>{
            try {
                let url;
                if(cat == null){
                   url = `device/page/${pageNumber}`
                }else if(cat.split("/")[1] === 'search'){
                    url = `device/search/${cat.split("/")[2].replace("%20", " ")}/${pageNumber}`
                }
                else{
                    url = `device/type/${cat}/${pageNumber}`;
                }
                const res = await publicRequest.get(url);
                setProducts(res.data);
                setFilteredProducts(res.data)
            }catch (e) {
                console.log(e)
            }
        }
        getProducts();

    }, [cat]);


    useEffect(()=>{
        setFilteredProducts(
            products.filter((item) =>{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const color = ((filters.color === "ANY") ? true : (item.colors.includes(filters.color)));
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const condition = ((filters.condition === "ANY") ? true : (item.conditions.includes(filters.condition)));
                return color && condition;
            })
        );
    }, [filters]);
    useEffect(() => {
        switch(sort){
            case "asc":
                setSortedProducts(filteredProducts.slice().sort((a, b) => (a.price - b.price)));
                break;
            case "desc":
                setSortedProducts(filteredProducts.slice().sort((a, b) => (b.price - a.price)));
                break;
            default:
        }
    }, [sort, filteredProducts]);
    return (
        <Container>
            {
                cat || from !== 'home' ?
                sortedProducts.map(product =>
                    <Product product={product} key={product.id.toString()}/>
                )
                    :
                products.slice(0, 8).map(product =>
                    <Product product={product} key={product.id.toString()}/>
                )
            }
        </Container>
    );
};

export default Products;