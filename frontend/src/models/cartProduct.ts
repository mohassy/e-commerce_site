import Product_t from "./Product_t.ts"

type cartProduct = Product_t & {
    quantity: number;
    color: string,
    condition: string
};
export default cartProduct;