import axios from "axios"
import { useEffect } from "react"
import { clientId, clientSecret, useAxios } from "./libs/githubAuth"
import { mySecretKey } from "./libs/githubAuth"
import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default function AuthComponent(props){
    
    useEffect(()=>{
    },[])

    return (
        <>
        <div>Redirecting you to the main page ... Your code is {props.code}</div>
        </>
    )
}

export async function getServerSideProps(context){
    try{
    if(context.query && context.query.code){
        const response_data = await axios.post('https://github.com/login/oauth/access_token',{
            client_id : clientId,
            client_secret : clientSecret,
            code : context.query.code
        })
        let access_token = null; 
        if(response_data.data){
            const response_string = response_data.data;
            access_token = response_string.split('&')[0].split('=')[1];
            const user = await axios.get('https://api.github.com/user' , {
                headers : {
                    authorization : 'bearer ' + access_token
                }
            });
            const token = jwt.sign({ id: user.data.login , iat : (new Date()).getTime()}, mySecretKey);
            context.res.setHeader('Set-Cookie', cookie.serialize('token',token,{
                maxAge : 3600,
                httpOnly : true,
                secure : true,
                sameSite : 'strict'
            }));
            return (
                {props : {code : context.query.code , authToken : token}}
            )
        }
        else{
            return (
                {props : { code : 'no code received'}}
            )
        }
    }
    return (
        {props : {code : 'no code received'}}
    )
    }
    catch(e){
        return ({
            redirect : {
                destination : '/login',
                permanent : false
            }
        })
    }
}
