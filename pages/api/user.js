import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://uksuvqctqonlaevvbjww.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjE5MDE5OSwiZXhwIjoxOTQxNzY2MTk5fQ.LEW2giswtWAjY3YiafC80Lgyz6WiLuQwo-9BJR-jtv0");

export default async function handler(req, res) {
    const {
        query , body , method
    }  = req;

    switch(method){
        case 'POST' : 
            const {data , error} = await supabase.from('users').insert([
                {
                    id : body.id , 
                    name : body.name , 
                    favLanguage : body.favLanguage,
                    email : body.email
                }
            ])
            if(error){
                res.send(error);
            }
            else{
                res.status(200).json({
                    status : 'success',
                    data : data
                })
            }
        break;
    }

}
  