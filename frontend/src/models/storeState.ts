import cartState from "./cartState.ts";
import {userState} from "./userState.ts";


type storeState = {
    cart: cartState,
    user: userState,
}

export default storeState;