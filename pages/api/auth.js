let jwt = require('jsonwebtoken');
import { mySecretKey } from '../libs/githubAuth';


export default function handler(req, res){
    if(req.method === 'GET'){
        const user_id = req.body.id;
    }
}