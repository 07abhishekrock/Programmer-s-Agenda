import axios from "axios"
import { clientId, clientSecret, useAxios } from "../libs/githubAuth"
import { mySecretKey } from "../libs/githubAuth"
import { supabase } from "../js/supabase"
import cookie from 'cookie';
const jwt = require('jsonwebtoken');

export default function AuthComponent(props){
    
    return (
        <>
            <div>Redirecting you to the main page ... Your code is {props.code}</div>
            <span>{props.user ? 'Welcome ' + props.user : 'Request timed out'}</span>
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
                const token = jwt.sign({ id: user.data.id , iat : (new Date()).getTime() , avatar : user.data.avatar_url , username : user.data.login} ,  mySecretKey);
                const db_response = (await supabase.from('users').select('id'));
                if(db_response.data.length === 0){
                    await supabase.from('users').insert([
                        {id : user.data.id , username : user.data.login , avatarURL : user.data.avatar_url}
                    ])
                }

                context.res.setHeader('Set-Cookie', cookie.serialize('token',token,{
                    maxAge : 3600 * 24 * 24,
                    httpOnly : true,
                    secure : true,
                    sameSite : 'strict',
                }));
                return (
                    {props : {code : context.query.code , user : user.data.id}}
                )
            }
            else{
                return (
                    {props : { code : 'no code received' , user : null}}
                )
            }
        }
        return (
            {props : {code : 'no code received'}}
        )
    }
    catch(e){
        console.error(e);
        return {
            redirect : {
                destination : '/login',
                permanent : false
            }
        }
    }
}
