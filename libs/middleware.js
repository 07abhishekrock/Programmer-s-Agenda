const jwt = require('jsonwebtoken');
const { mySecretKey } = require('./githubAuth');
import cookie from 'cookie';
import { supabase } from '../js/supabase';

export const checkForCookies = (req) => {
    try{
        if(req.cookies && req.cookies.token){
            const token = req.cookies.token;
            const decoded = jwt.verify(token , mySecretKey);
            return [true , decoded];
        }
        else{
            throw new Error('problem with cookies');
        }
    }
    catch(e){
        console.error('error while looking for cookies');
        return [false , null];
    }
}

export const convertDateFormat = (given_date)=>{
    const date = new Date(given_date);
    const [day , month , month_date , year] = date.toDateString().split(' ');
    let date_suffix = '';
    switch(+month_date % 10){
        case 1 : date_suffix = 'st';break;
        case 2 : date_suffix = 'nd';break;
        case 3 : date_suffix = 'rd';break;
        default : date_suffix = 'th';break;
    }
    return <>
    {month_date}<sup>{date_suffix}</sup>&nbsp;{month} {year} 
    </>
}




export const getAllProjects = async (data , req , res)=>{

    //first check in cookies if item exists
    const cookies = req.cookies;
    if(cookies && cookies.projectsList){
        return JSON.parse(cookies.projectsList);
    }

    const {data : project_data , error : project_error} = await supabase.from('projects').select('userId , projectName , id').eq('userId',data.id);

    let projects = [];
    if(project_data && !project_error){
        projects = project_data || [];
        console.log('projects' , projects);
        res.setHeader('Set-Cookie', cookie.serialize('projectsList',JSON.stringify(projects),{
            maxAge : 3600 * 24 * 24,
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
        }));
    }
    else {
        console.error('Error while finding projects');
    }

    return projects;
}