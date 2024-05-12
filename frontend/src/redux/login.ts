import {errorLogin, startLogin, successfulLogin} from "./userRedux.ts";
import {publicRequest} from "../requestMethods.ts";
import {User_t} from "../models/User_t.ts";
// @ts-ignore
export const login = async (dispatch, username: string, password: string) =>{
    dispatch(startLogin())
    try {
        // @ts-ignore
        const header = {
            'Authorization' : 'Basic ' + btoa(username + ':' + password)
        }
        // @ts-ignore
        const response = await publicRequest.post("/auth/login",{}, {headers:  header})
        const user:User_t = {
            ...response.data.user,
            token: response.data.token
        }
        dispatch(successfulLogin({...user}))
    }catch (err){
        console.log(err)
        dispatch(errorLogin())
    }
}