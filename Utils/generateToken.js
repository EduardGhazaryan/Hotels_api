import jwt from "jsonwebtoken"

export const generateAccessToken = (user)=>{
    const payload = {
        _id : user._id,
        email: user.email
    }

    const access_token = jwt.sign(payload,process.env.ACCESS_TOKEN,{
        expiresIn : "1d"
    })

    return access_token
}
