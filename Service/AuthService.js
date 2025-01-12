import bcrypt from "bcrypt"
import User from "../Model/User.js"
import { generateAccessToken } from "../Utils/generateToken.js"

const AuthService = {
    signUp : async (firstName, lastName,email,password,confirmPassword,language)=>{
        if(firstName, lastName,email,password,confirmPassword){
            const findUser = await User.findOne({email})
            if(!findUser){
                if(password === confirmPassword){
                    const hashedPassword = bcrypt.hashSync(password,10)
                    const access_token = generateAccessToken({
                        firstName,
                        lastName,
                        email,
                        password : hashedPassword
                    })
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password : hashedPassword,
                        access_token
                    })

                    await newUser.save()

                    if(language){
                        if(language === "am"){
                            return {status: 200, message: "Դուք հաջողությամբ գրանցվել եք, այժմ կարող եք մուտք գործել" ,success:true};
                        }
                        if(language === "ru"){
                            return {status: 200, message: "Вы успешно зарегистрировались, теперь вы можете войти в систему" ,success:true};
                        }
                        if(language === "en"){
                            return {status: 200, message: "You Have Successfully Registered, Now You Can Loge In" ,success:true};
                        }
                    }else{
                        return {status: 200, message: "You Have Successfully Registered, Now You Can Loge In" ,success:true};
                    }

                }else{
                    if(language){
                        if(language === "am"){
                            return {status: 200, message: "Ձեր գաղտնաբառերը չեն համընկնում", success:false}
                        }
                        if(language === "ru"){
                            return {status: 200, message: "Ваши пароли не совпадают", success:false}
                        }
                        if(language === "en"){
                            return {status: 200, message: "Your Passwords Don't Match", success:false}
                        }
                    }else{
                        return {status: 200, message: "Your Passwords Don't Match", success:false}
                    }

                }
                
            }else{
                if(language){
                    if(language === "am"){
                        return {status: 200, message: "Այս էլփոստով օգտատեր արդեն գոյություն ունի", success:false}
                    }
                    if(language === "ru"){
                        return {status: 200, message: "Пользователь с таким адресом электронной почты уже существует", success:false}
                    }
                    if(language === "en"){
                        return {status: 200, message: "User With This Email Already Exists", success:false}
                    }
                }else{
                    return {status: 200, message: "User With This Email Already Exists", success:false}
                }
                
            }
        }else{
            return {status:400, success:false, message:"Bad Request"}
        }
    },
    signIn : async (email,password,language)=>{
        if(email,password){
            const findUser = await User.findOne({email})
            if(findUser){
                if(bcrypt.compareSync(password,findUser.password)){
                    const access_token = generateAccessToken(findUser)
                    findUser.access_token = access_token
                    await findUser.save()

                    return {status: 200, message: "You Have Successfully Logged In", success:true, user : findUser}


                }else{
                    if(language){
                        if(language === "am"){
                            return {status: 200, message: "Ինչ-որ բան այն չէ, խնդրում ենք ստուգել ձեր գաղտնաբառը" ,success:false};
                        }
                        if(language === "ru"){
                            return {status: 200, message: "Что-то не так. Проверьте пароль." ,success:false};
                        }
                        if(language === "en"){
                            return {status: 200, message: "Something is Wrong Please Check Your Password" ,success:false};
                        }
                    }else{
                        return {status: 200, message: "Something is Wrong Please Check Your Password" ,success:false};
                    }
                }

            }else{
                if(language){
                    if(language === "am"){
                        return {status: 200, message: "Ինչ-որ բան այն չէ, խնդրում ենք ստուգել ձեր էլփոստի հասցեն" ,success:true};
                    }
                    if(language === "ru"){
                        return {status: 200, message: "Что-то не так. Проверьте адрес электронной почты." ,success:true};
                    }
                    if(language === "en"){
                        return {status: 200, message: "Something is Wrong Please Check Your Email Address" ,success:true};
                    }
                }else{
                    return {status: 200, message: "Something is Wrong Please Check Your Email Address" ,success:true};
                }
            }
        }else{
            return {status:400, success:false, message:"Bad Request"}
        }
    },
    signOut : async (user_id)=>{
        if(user_id){
            const findUser = await User.findOneAndUpdate({id: user_id},{access_token :""})
            if(findUser){
                return { status: 200,message: "You Have Successfully Sign Out", success:true };
            } else {
              return { status: 200, message: "Invalid User ID" , success:false};
            }
        }else{
            return {status:400, success:false, message:"Bad Request"}
        }
    }
}

export default AuthService