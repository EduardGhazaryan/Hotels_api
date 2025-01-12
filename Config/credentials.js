import allowedOrigins from "./allowedOrigins.js"


const Credentials = (req,res,next)=>{
    const origin = req.headers.origin

    if(allowedOrigins.includes(origin)){
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    next()
}

export default Credentials