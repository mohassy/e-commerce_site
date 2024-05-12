import {User_t} from "./User_t.ts";

export type userState  = {
    currentUser: User_t,
    isFetching: boolean,
    isError: boolean
}
