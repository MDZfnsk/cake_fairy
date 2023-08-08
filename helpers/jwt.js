// const expressJwt = require('express-jwt');

const { expressjwt: jwt } = require("express-jwt");


function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL
    
    return jwt({
        secret,
        algorithms: ['HS256'],        
        
    }).unless({
        path: [
            {url: `${api}/products` , methods: ['GET', 'OPTIONS']}, 
            {url: /\/public(.*)/ , methods: ['GET', 'OPTIONS']},
            {url: /\/api\/products(.*)/ , methods: ['GET', 'OPTIONS']},            
            {url: /\/api\/categories(.*)/ , methods: ['GET', 'OPTIONS']},
            {url: /\/api\/stores(.*)/ , methods: ['GET', 'OPTIONS']},
            {url: /\/api\/ratings(.*)/ , methods: ['GET', 'OPTIONS']},          
            `${api}/users/register`, 
            `${api}/users/login`,
            `${api}/admins/login`,           
            
            // { url: /(.*)/}
        ]
    })
}



module.exports = authJwt;



// isRevoked: isRevoked


// async function isRevoked(req,token){
//     // console.log(token.payload.isAdmin);
//     if(!token.payload.isAdmin){
//         return true;
//     }else{
//         // console.log('Yeah');
//         return false;
//     }
    
// }