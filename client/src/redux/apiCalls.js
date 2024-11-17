import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
console.log(BASE_URL);
 
export const login = async (dispatch, user)=>{
    
    const publicRequest = axios.create({
        baseURL: BASE_URL,
    });

    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
    }catch(err){
        console.log(err);
        dispatch(loginFailure())
    }
}