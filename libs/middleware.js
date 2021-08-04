const jwt = require('jsonwebtoken');
const { mySecretKey } = require('./githubAuth');
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