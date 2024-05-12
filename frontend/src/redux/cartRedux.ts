import {createSlice} from "@reduxjs/toolkit";
import cartState, {initialCartState} from "../models/cartState.ts";
import {addCartProduct, decreaseCartQuantity, increaseCartQuantity} from "../models/actions.ts";






const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers:{
        addProduct:(state:cartState, action: addCartProduct)=>{
            state.quantity += 1;
            state.products.push(action.payload)
            state.total+= (action.payload.price) * (action.payload.quantity);
        },
        decreaseQuantity:(state: cartState, action : decreaseCartQuantity) =>{
            if(state.products[action.payload.index].quantity > 1){
                state.products[action.payload.index].quantity -= 1;
                state.total -= state.products[action.payload.index].price;
            }
        },
        increaseQuantity:(state: cartState, action : increaseCartQuantity) =>{
            if(state.products[action.payload.index].quantity < state.products[action.payload.index].stock){
                state.products[action.payload.index].quantity += 1;
                state.total += state.products[action.payload.index].price;
            }
        },
        resetCart: (state)=>{
            state.products = [];
            state.total = 0;
            state.quantity = 0;
        }
    }
})

export const {addProduct, decreaseQuantity, increaseQuantity, resetCart} = cartSlice.actions
export default cartSlice.reducer;