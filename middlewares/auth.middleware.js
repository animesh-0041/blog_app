
const jwt = require('jsonwebtoken');



const auth=async(req,res,next)=>{
const token = req.headers.authorization;
        if(token){
            
            try {
                jwt.verify(token, 'blogs', function(err, decoded) {
                    if(decoded){
                        req.body.username=decoded.username;
                        req.body.date=new Date().toISOString().slice(0,10);
                        next()
                    }
                    else{
                        res.status(400).send({"msg":err})
                    }
                  });
            } catch (error) {
                res.send(error)
            }
        }
        else{
            res.status(400).send({"msg":"Please login!"})
        }
}

module.exports={
    auth
}