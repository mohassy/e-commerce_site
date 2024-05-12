import cartProduct from "./cartProduct.ts";
import {User_t} from "./User_t.ts";

export type addCartProduct = {
    type: string,
    payload: cartProduct
}

export type decreaseCartQuantity = {
    type: string,
    payload: {index: number}
}
export type increaseCartQuantity = {
    type: string,
    payload: {index: number}
}

export type loginUser = {
    type: string,
    payload: User_t
}

