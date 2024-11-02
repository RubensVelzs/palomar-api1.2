import jwt from 'jsonwebtoken';

export const createAccessToken = (id: number)=>{
  return new Promise((resolve, reject) => {
    jwt.sign(String(id), "secret", (err, token)=> {
       if(err) reject(err);
        resolve(token);
      });
});
}

