import AuthService from "../Service/AuthService.js"


const AuthController= {
    signUp: async (req,res)=>{
        try {
            const language = req.headers["accept-language"]
            const {firstName, lastName,email,password,confirmPassword} = req.body

            const data = await AuthService.signUp(firstName, lastName,email,password,confirmPassword,language)

            res.status(data.status).send({message: data.message, success:data.success})

        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    },
    signIn : async (req,res)=>{
        try {
            const language = req.headers["accept-language"]
            const {email, password} = req.body

            const data = await AuthService.signIn(email,password,language)

            if(data.status < 400){
                if(data.success){
                    res.status(data.status).send({message: data.message,success:data.success,user: data.user})
                }else{
                    res.status(data.status).send({message: data.message,success:data.success})
                }
            }else{
                res.status(data.status).send({message: data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    },
    signOut: async (req,res)=>{
        try {
            const language = req.headers["accept-language"]
            const {user_id} = req.body

            const data = await AuthService.signOut(user_id)

            if(data.status < 400){
                res.status(data.status).send({message: data.message, success:data.success})
            }else{
                res.status(data.status).send({message: data.message})
            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    }
}

export default AuthController