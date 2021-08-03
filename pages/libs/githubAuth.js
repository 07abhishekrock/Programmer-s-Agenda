import { useState , useEffect } from "react";
import axios from 'axios';


export const clientId = '5630cd35eff437fb7cb1';
export const clientSecret = 'df744c659e303d22c906cfcf6f800244b3e7f4ae';
export const  mySecretKey = 'ff104761-fd9d-48cb-b568-51846825e556';


export const useAxios = (url , resp_function , options = {type : 'GET'})=>{
    const [error , set_error] = useState(null);
    const [fetch_response_data , set_fetch_response_data] = useState({});
    useEffect(async ()=>{
        let response;
        try{
            switch(options.type){
                case 'GET' : 
                response = await axios.get(url,{
                    headers : options.headers || {}
                });
                set_fetch_response_data(await resp_function(response.data));
                break;
                
                case 'POST' : 
                response = await axios.post(url , options.body);
                set_fetch_response_data(await resp_function(response.data));
            }
        }
        catch(e){
            set_fetch_response_data(null);
            set_error(e);
        }
    },[])
    return [fetch_response_data , error];
}
