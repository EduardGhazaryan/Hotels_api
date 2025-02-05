import UserService from "../Service/UserService.js";

const UserController = {
    getUser: async(req,res)=>{
        try {
          
          const user_id = req.user._id
    
          const data = await UserService.getUser(user_id)
    
          if(data.status < 400){
            res.status(data.status).send({user: data.user, success: data.success})
          }else{
            res.status(data.status).send({message: data.message, success: data.success})
          }
          
        } catch (error) {
          console.error(error)
          res.status(500).send({message:"Internal Server Error", success: false})
        }
      },
    changeUser : async(req,res)=>{
        try {
            const {id} = req.params
            const {firstName,lastName,email,password} = req.body
            const language = req.headers["accept-language"] ? req.headers["accept-language"] : "en";

            const data = await UserService.changeUser(id,firstName,lastName,email,password,language)

            if(data.status < 400){
                res.status(data.status).send({message: data.message,success:data.success, user : data.user, token: data.token})
            }else{
            res.status(data.status).send({message: data.message,success:data.success})

            }
            
        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    },
    removeUser : async(req,res)=>{
        try {
            const {id} = req.params

            const data = await UserService.removeUser(id)

            res.status(data.status).send({message: data.message,success:data.success})

        } catch (error) {
            console.error(error)
            res.status(500).send({message: "Internal Server Error"})
        }
    }
}

export default UserController