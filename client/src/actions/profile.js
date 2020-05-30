import axios from "axios";
import {setAlert} from './alert'
import { GET_PROFILE, PROFILE_ERROR } from "./types";

//get current users profiles
export const getCurrentProfile = () => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatchEvent({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatchEvent({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}