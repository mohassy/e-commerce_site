import cartProduct from "./cartProduct.ts";

type cartState = {
    products: cartProduct[],
    quantity: number,
    total: number
}

export const initialCartState: cartState = {
    products: [],
    quantity: 0,
    total: 0,
};

export default cartState;