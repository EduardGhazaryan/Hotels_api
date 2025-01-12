import jwt from "jsonwebtoken"

const isAuth = (req,res, next)=>{
    const access_token = req?.headers?.authorization
    try {
        if(access_token){
            const new_token = access_token.split(" ")[1]

            jwt.verify(new_token, process.env.ACCESS_TOKEN, (err, decoded)=>{
                if(err) return res.status(404).send({message:"Invalid Token"})
                    req.user = decoded
                    next()
            })
        }else{
            return res.status(400).send({message:"Access Token Not Found"})
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).send({message:"Internal Server Error"})
    }
}

export default isAuth