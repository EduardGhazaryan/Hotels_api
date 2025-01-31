import Cart from "../Model/Cart.js"
import CartItem from "../Model/CartItem.js"
import HotelRoom from "../Model/HotelRoom.js"
import Hotels from "../Model/Hotels.js"
import ReserveHistory from "../Model/ReserveHistory.js"
import ReserveHistoryItem from "../Model/ReserveHistoryItem.js"
import User from "../Model/User.js"


const CartService = {
    getCart : async (id,language)=>{
        try {
            if(id){
                const findUser = await User.findById(id)
                if(findUser){
                    const findCart = await Cart.findOne({user:id}).populate({
                        path: 'reserved_hotels',
                        populate: [
                          { path: 'hotel' }, 
                          { path: 'reserved_room' } 
                        ]
                      });

                      
                      

                    if(findCart){
                        const result = {
                            _id: findCart._id,
                            user: findCart.user,
                            reserved_hotels: findCart.reserved_hotels.map((el)=>{
                                return {
                                    _id: el._id,
                                    cart_id : el.cart_id,
                                    user_id : el.user_id,
                                    hotel : {
                                        _id: el.hotel._id,
                                        name: el.hotel.name,
                                        country: el.hotel.country[language] || el.hotel.country.en,
                                        city: el.hotel.city,
                                        address: el.hotel.address,
                                        number: el.hotel.number,
                                        map: el.hotel.map,
                                        mainImage: el.hotel.mainImage,
                                        images: el.hotel.images,
                                        hotel_rooms: el.hotel.hotel_rooms
                                    },
                                    reserved_room: {
                                        _id: el.reserved_room._id,
                                        room_type: el.reserved_room.room_type,
                                        room_price: el.reserved_room.room_price,
                                        room_images: el.reserved_room.room_images,
                                        capacity: el.reserved_room.capacity,
                                        area: el.reserved_room.area,
                                        beds: el.reserved_room.beds[language] || el.reserved_room.beds.en,
                                        about: el.reserved_room.about[language] || el.reserved_room.about.en,
                                        facilities: el.reserved_room.facilities[language] || el.reserved_room.facilities.en,
                                        reserves: el.reserved_room.reserves,
                                        createdAt: el.reserved_room.createdAt,
                                        updatedAt: el.reserved_room.updatedAt
                                    },
                                    firstName : el.firstName,
                                    lastName : el.lastName,
                                    email : el.email,
                                    phone : el.phone,
                                    country : el.country,
                                    people_count : el.people_count,
                                    description : el.description,
                                    reserve_start : el.reserve_start,
                                    reserve_end : el.reserve_end,
                                    total_spent : el.total_spent,
                                    
                                }
                            })
                          }
                        return {status:200,success:true, cart:result}
                    }else{
                        const newCart = new Cart({
                            user : findUser._id,
                            reserved_hotels : []

                        })
                        await newCart.save()
                        findUser.cart = newCart._id
                        findUser.save()
                        return {status:200,success:true, cart:newCart}
                    }

                }else{
                    return {status:404, success:false, message:"User Not Found Invalid ID"}
                }

            }else{
                return {status:400, success: false, message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status: 500, success:false, message: "Internal Server Error"}
        }
    },
    getReserveHistory : async (id ,language)=>{
        try {
            if(id){
                const findUser = await User.findById(id)
                if(findUser){
                    const findReserveHistory = await ReserveHistory.findById(findUser.reserve_history).populate({
                        path: 'reserved_hotels',
                        populate: [
                            { path: 'hotel' }, 
                            { path: 'reserved_room' } 
                          ]
                      });

                      if(findReserveHistory){
                        const a = await ReserveHistory.find()
                        
                        const result = {
                            _id: findReserveHistory._id,
                            user: findReserveHistory.user,
                            reserved_hotels: findReserveHistory.reserved_hotels.map((el)=>{
                                console.log(el.hotel.country);
                                return {
                                    _id: el._id,
                                    reserves_history_id : el.reserves_history_id,
                                    user_id : el.user_id,
                                    hotel : {
                                        _id: el.hotel._id,
                                        name: el.hotel.name,
                                        country: el.hotel.country[language] || el.hotel.country.en,
                                        city: el.hotel.city,
                                        address: el.hotel.address,
                                        number: el.hotel.number,
                                        map: el.hotel.map,
                                        mainImage: el.hotel.mainImage,
                                        images: el.hotel.images,
                                        hotel_rooms: el.hotel.hotel_rooms
                                    },
                                    reserved_room: {
                                        _id: el.reserved_room._id,
                                        room_type: el.reserved_room.room_type,
                                        room_price: el.reserved_room.room_price,
                                        room_images: el.reserved_room.room_images,
                                        capacity: el.reserved_room.capacity,
                                        area: el.reserved_room.area,
                                        beds: el.reserved_room.beds[language] || el.reserved_room.beds.en,
                                        about: el.reserved_room.about[language] || el.reserved_room.about.en,
                                        facilities: el.reserved_room.facilities[language] || el.reserved_room.facilities.en,
                                        reserves: el.reserved_room.reserves,
                                        createdAt: el.reserved_room.createdAt,
                                        updatedAt: el.reserved_room.updatedAt
                                    },
                                    reserve_start : el.reserve_start,
                                    reserve_end : el.reserve_end,
                                    total_spent : el.total_spent
                                }
                            })
                          }
                        return {status:200,success:true, reserveHistory:result}
                      }else{
                        const newReserveHistory = new ReserveHistory({
                            user : findUser._id,
                            reserved_hotels : []
                        })
                        await newReserveHistory.save()
                        findUser.reserve_history = newReserveHistory._id
                        await findUser.save()
                        return {status:200,success:true, reserveHistory:newReserveHistory}

                      }
                }else{
                    return {status: 404, success: false, message: "User Not Found Invalid ID"}
                }
            }else{
                return {status: 400, success : false, message: "Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status:500, success:false,message:"Internal Server Error"}
        }
    },
    addReserve : async (userID,roomID,reserve_start,reserve_end,total_spent,firstName,lastName,email,phone,country,description,people_count,language)=>{
        try {
            if(userID,roomID,reserve_start,reserve_end,total_spent,firstName,lastName,email,phone,country){
                const newStartDate = new Date(reserve_start);
                const newEndDate = new Date(reserve_end);
                const findUser = await User.findById(userID)
                
                if(findUser){
                    const findCart = await Cart.findOne({user: userID})
                    const findRoom = await HotelRoom.findById(roomID).populate({
                        path : "reserves",
                        select: "user_id reserve_start reserve_end"
                    })
                    if(findCart){
                        if(findRoom){
                                const findHotel = await Hotels.findById(findRoom.hotel_id)
                                const checkReserves = findRoom.reserves.some(reserve=>{
                                const existingStartDate = new Date(reserve.reserve_start);
                                const existingEndDate = new Date(reserve.reserve_end);
                                
                                return (
                                    (newStartDate < existingEndDate && newEndDate > existingStartDate ) 
                                )
                            })

                            

                            if(checkReserves){
                                let messagesLang = {
                                    en : "The hotel room is already booked for the date you selected, please select another date",
                                    ru : "Номер в отеле уже забронирован на выбранную вами дату пожалуйста выберите другую дату",
                                    am : "հյուրանոցի սենյակը արդեն ամրագրված է ձեր ընտրած ամսաթվի համար, խնդրում ենք ընտրել այլ ամսաթիվ"
                                }
                                return {status: 201, success:false, message : messagesLang[language]}
                            }else{
                                const newCartItem = new CartItem({
                                    cart_id : findCart._id,
                                    user_id : findUser._id,
                                    hotel : findRoom.hotel_id,
                                    reserved_room : findRoom,
                                    firstName,
                                    lastName,
                                    email,
                                    phone,
                                    country,
                                    people_count,
                                    description : description ? description : "",
                                    reserve_start,
                                    reserve_end,
                                    total_spent
                                })

                                await newCartItem.save()

                                findCart.reserved_hotels = [...findCart.reserved_hotels,newCartItem._id]
                                findRoom.reserves = [...findRoom.reserves, newCartItem._id]

                                await Promise.all([findCart.save(),findRoom.save() ])

                                const result = {
                                    _id: newCartItem._id,
                                    cart_id : newCartItem.cart_id,
                                    user_id : newCartItem.user_id,
                                    hotel : {
                                        _id: findHotel._id,
                                        name: findHotel.name,
                                        country: findHotel.country[language] || findHotel.country.en,
                                        city: findHotel.city,
                                        address: findHotel.address,
                                        number: findHotel.number,
                                        map: findHotel.map,
                                        mainImage: findHotel.mainImage,
                                        images: findHotel.images,
                                        hotel_rooms: findHotel.hotel_rooms
                                    },
                                    reserved_room: {
                                        _id: findRoom._id,
                                        room_type: findRoom.room_type,
                                        room_price: findRoom.room_price,
                                        room_images: findRoom.room_images,
                                        capacity: findRoom.capacity,
                                        area: findRoom.area,
                                        beds: findRoom.beds[language] || findRoom.beds.en,
                                        about: findRoom.about[language] || findRoom.about.en,
                                        facilities: findRoom.facilities[language] || findRoom.facilities.en,
                                        reserves: findRoom.reserves,
                                        createdAt: findRoom.createdAt,
                                        updatedAt: findRoom.updatedAt
                                    },
                                    firstName,
                                    lastName,
                                    email,
                                    phone,
                                    country,
                                    people_count,
                                    description : description ? description : "",
                                    reserve_start,
                                    reserve_end,
                                    total_spent
                                }

                                return {status: 201, success:true, message : "Your Reserve is Completed", reserve: result}

                            }

                        }else{
                        return {status: 404, success: false, message: "Hotel Room Not Found Invalid Room ID"}

                        }
                    }else{
                        if(findRoom){
                            const newCart = new Cart({
                                user : findUser._id,
                                reserved_hotels : []
    
                            })
                            await newCart.save()
                            findUser.cart = newCart._id
                            findUser.save()
                            const findHotel = await Hotels.findById(findRoom.hotel_id)
                            const checkReserves = findRoom.reserves.some(reserve=>{
                                const existingStartDate = new Date(reserve.reserve_start);
                                const existingEndDate = new Date(reserve.reserve_end);
                                
                                return (
                                        (newStartDate < existingEndDate && newEndDate > existingStartDate ) 
                                        )
                                 })

                        if(checkReserves){
                            let messagesLang = {
                                en : "The hotel room is already booked for the date you selected, please select another date",
                                ru : "Номер в отеле уже забронирован на выбранную вами дату пожалуйста выберите другую дату",
                                am : "հյուրանոցի սենյակը արդեն ամրագրված է ձեր ընտրած ամսաթվի համար, խնդրում ենք ընտրել այլ ամսաթիվ"
                            }
                            return {status: 201, success:false, message : messagesLang[language]}
                        }else{
                            const newCartItem = new CartItem({
                                cart_id : newCart._id,
                                user_id : findUser._id,
                                hotel : findRoom.hotel_id,
                                reserved_room : findRoom,
                                firstName,
                                lastName,
                                email,
                                phone,
                                country,
                                people_count,
                                description : description ? description : "",
                                reserve_start,
                                reserve_end,
                                total_spent
                            })

                            await newCartItem.save()

                            newCart.reserved_hotels = [...newCart.reserved_hotels,newCartItem._id]
                            findRoom.reserves = [...findRoom.reserves, newCartItem._id]

                            await Promise.all([newCart.save(),findRoom.save() ])

                            const result = {
                                _id: newCartItem._id,
                                cart_id : newCartItem.cart_id,
                                user_id : newCartItem.user_id,
                                hotel : {
                                    _id: findHotel._id,
                                    name: findHotel.name,
                                    country: findHotel.country[language] || findHotel.country.en,
                                    city: findHotel.city,
                                    address: findHotel.address,
                                    number: findHotel.number,
                                    map: findHotel.map,
                                    mainImage: findHotel.mainImage,
                                    images: findHotel.images,
                                    hotel_rooms: findHotel.hotel_rooms
                                },
                                reserved_room: {
                                    _id: findRoom._id,
                                    room_type: findRoom.room_type,
                                    room_price: findRoom.room_price,
                                    room_images: findRoom.room_images,
                                    capacity: findRoom.capacity,
                                    area: findRoom.area,
                                    beds: findRoom.beds[language] || findRoom.beds.en,
                                    about: findRoom.about[language] || findRoom.about.en,
                                    facilities: findRoom.facilities[language] || findRoom.facilities.en,
                                    reserves: findRoom.reserves,
                                    createdAt: findRoom.createdAt,
                                    updatedAt: findRoom.updatedAt
                                },
                                firstName,
                                lastName,
                                email,
                                phone,
                                country,
                                people_count,
                                description : description ? description : "",
                                reserve_start,
                                reserve_end,
                                total_spent
                            }

                            return {status: 201, success:true, message : "Your Reserve is Completed", reserve: result}

                        }

                    }else{
                    return {status: 404, success: false, message: "Hotel Room Not Found Invalid Room ID"}

                    }
                        
                    }
                }else{
                    return {status: 404, success: false, message: "User  Not Found Invalid User ID"}
                }
            }else{
                return {status:400, success:false, message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status: 500, success:false, message: "Internal Server Error"}
        }
    },
    chnageReserve : async(id,firstName,lastName,email,phone,country,people_count,description,reserve_start,reserve_end,language)=>{
        try {
            
          if(firstName || lastName || email || phone || country || people_count || description || reserve_start || reserve_end){
            const updatedData = await CartItem.findById(id).populate([
                { path: 'hotel' }, 
                { path: 'reserved_room' } 
              ])
            const findRoom = await HotelRoom.findById(updatedData.reserved_room).populate({
                path : "reserves",
                select: "user_id reserve_start reserve_end"
            })
            const newStartDate = new Date(reserve_start);
            const newEndDate = new Date(reserve_end);

            const checkReserves = findRoom.reserves.some(reserve=>{
                const existingStartDate = new Date(reserve.reserve_start);
                const existingEndDate = new Date(reserve.reserve_end);
                
                return (
                    (newStartDate < existingEndDate && newEndDate > existingStartDate ) 
                )
            })
          

            if(checkReserves){
                let messagesLang = {
                    en : "The hotel is already booked for the date you selected, please select another date",
                    ru : "Отель уже забронирован на выбранную вами дату пожалуйста выберите другую дату",
                    am : "Հյուրանոցն արդեն ամրագրված է ձեր ընտրած ամսաթվի համար, խնդրում ենք ընտրել այլ ամսաթիվ"
                }
                return {status: 201, success:false, message : messagesLang[language]}
            }else{
                let isOk = true

                if(reserve_start && reserve_start){
                    const newStartDate = new Date(reserve_start);
                    const newEndDate = new Date(reserve_end);
                    
                    isOk = newStartDate < newEndDate ?  true :  false
                }else{
                    if(reserve_start){
                        const newStartDate = new Date(reserve_start);
                        const newEndDate = new Date(updatedData.reserve_end);
                    
                        isOk = newStartDate < newEndDate ?  true :  false
                    }
                    if(reserve_end){
                        const newStartDate = new Date(updatedData.reserve_start);
                        const newEndDate = new Date(reserve_end);
                        
                        isOk = newStartDate < newEndDate ?  true :  false
                    }
                  
                }

                if(isOk){
                    updatedData.firstName = firstName ? firstName : updatedData.firstName
                    updatedData.lastName = lastName ? lastName : updatedData.lastName
                    updatedData.email = email ? email : updatedData.email
                    updatedData.phone = phone ? phone : updatedData.phone
                    updatedData.country = country ? country : updatedData.country
                    updatedData.description = description ? description : updatedData.description
                    updatedData.people_count = people_count ? people_count : updatedData.people_count
                    updatedData.reserve_start = reserve_start ? reserve_start : updatedData.reserve_start
                    updatedData.reserve_end = reserve_end ? reserve_end : updatedData.reserve_end
    
                    await updatedData.save()
    
                    const result = {
                        _id: updatedData._id,
                        cart_id : updatedData.cart_id,
                        user_id : updatedData.user_id,
                        hotel : {
                            _id: updatedData.hotel._id,
                            name: updatedData.hotel.name,
                            country: updatedData.hotel.country[language] || updatedData.hotel.country.en,
                            city: updatedData.hotel.city,
                            address: updatedData.hotel.address,
                            number: updatedData.hotel.number,
                            map: updatedData.hotel.map,
                            mainImage: updatedData.hotel.mainImage,
                            images: updatedData.hotel.images,
                            hotel_rooms: updatedData.hotel.hotel_rooms
                        },
                        reserved_room: {
                            _id: updatedData.reserved_room._id,
                            room_type: updatedData.reserved_room.room_type,
                            room_price: updatedData.reserved_room.room_price,
                            room_images: updatedData.reserved_room.room_images,
                            capacity: updatedData.reserved_room.capacity,
                            area: updatedData.reserved_room.area,
                            beds: updatedData.reserved_room.beds[language] || updatedData.reserved_room.beds.en,
                            about: updatedData.reserved_room.about[language] || updatedData.reserved_room.about.en,
                            facilities: updatedData.reserved_room.facilities[language] || updatedData.reserved_room.facilities.en,
                            reserves: updatedData.reserved_room.reserves,
                            createdAt: updatedData.reserved_room.createdAt,
                            updatedAt: updatedData.reserved_room.updatedAt
                        },
                        firstName : updatedData.firstName,
                        lastName : updatedData.lastName,
                        email : updatedData.email,
                        phone : updatedData.phone,
                        country : updatedData.country,
                        description : updatedData.description ? updatedData.description : "",
                        reserve_start : updatedData.reserve_start,
                        reserve_end : updatedData.reserve_end,
                        total_spent : updatedData.total_spent
                    }
                  
                      return { status: 202, message: "Update successful", success:true,result };
                }else{
                    return {status: 400, message: "Please change Your Dates the Start Date will be before End Date", success:false}
                }


            }
      

            
          }else{
            return {status:400, message : "No Data For Update"}
          }
              
            
        } catch (error) {
            console.error(error)
            return {status: 500, success:false, message:"Internal Srever Error"}
        }
    },
    removeReserve : async(id,language)=>{
        try {
            if(id){
                const findReserve = await CartItem.findById(id)
                if(findReserve){
                    const removeInCart = await Cart.updateOne(
                        { _id: findReserve.cart_id },
                        { $pull: { reserved_hotels: id } }
                      );
                    const removeInRoom = await HotelRoom.updateOne(
                        { _id: findReserve.reserved_room },
                        { $pull: { reserves: id } }
                      );

                      console.log("d---",removeInCart);
                    const findCart = await Cart.findById(findReserve.cart_id).populate({
                        path: 'reserved_hotels',
                        populate: [
                          { path: 'hotel' }, 
                          { path: 'reserved_room' } 
                        ]
                      });
                    const remove = await CartItem.findByIdAndDelete(id)

                    const result = {
                        _id: findCart._id,
                        user: findCart.user,
                        reserved_hotels: findCart.reserved_hotels.map((el)=>{
                            return {
                                _id: el._id,
                                cart_id : el.cart_id,
                                user_id : el.user_id,
                                hotel : {
                                    _id: el.hotel._id,
                                    name: el.hotel.name,
                                    country: el.hotel.country[language] || el.hotel.country.en,
                                    city: el.hotel.city,
                                    address: el.hotel.address,
                                    number: el.hotel.number,
                                    map: el.hotel.map,
                                    mainImage: el.hotel.mainImage,
                                    images: el.hotel.images,
                                    hotel_rooms: el.hotel.hotel_rooms
                                },
                                reserved_room: {
                                    _id: el.reserved_room._id,
                                    room_type: el.reserved_room.room_type,
                                    room_price: el.reserved_room.room_price,
                                    room_images: el.reserved_room.room_images,
                                    capacity: el.reserved_room.capacity,
                                    area: el.reserved_room.area,
                                    beds: el.reserved_room.beds[language] || el.reserved_room.beds.en,
                                    about: el.reserved_room.about[language] || el.reserved_room.about.en,
                                    facilities: el.reserved_room.facilities[language] || el.reserved_room.facilities.en,
                                    reserves: el.reserved_room.reserves,
                                    createdAt: el.reserved_room.createdAt,
                                    updatedAt: el.reserved_room.updatedAt
                                },
                                firstName : el.firstName,
                                lastName : el.lastName,
                                email : el.email,
                                phone : el.phone,
                                country : el.country,
                                description : el.description ? el.description : "",
                                reserve_start : el.reserve_start,
                                reserve_end : el.reserve_end,
                                total_spent : el.total_spent
                            }
                        })
                      }

                    return {status:200,success:true, message:"Successfully Deleted", cart: result}
                }else{
                    return {status:404, success:false, message: "Internal Server Error"}
                }
            }else{
                return {status:400, success:false, message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status:500, success:false,message:"Internal Server Error"}
        }
    },
    removeHistoryItem : async(id,language)=>{
        try {
            if(id){
                const findHistoryItem = await ReserveHistoryItem.findById(id)
                if(findHistoryItem){
                    const removeReserveHistory = await ReserveHistory.updateOne(
                        { _id: findHistoryItem.reserves_history_id},
                        { $pull: { reserved_hotels: id } }
                      );
                    const findReserveHistory = await ReserveHistory.findById(findHistoryItem.reserves_history_id).populate({
                        path: 'reserved_hotels',
                        populate: [
                          { path: 'hotel' }, 
                          { path: 'reserved_room' } 
                        ]
                      });

                    const removeHistoryItem = await ReserveHistoryItem.findByIdAndDelete(id)

                    const result = {
                        _id: findReserveHistory._id,
                        user: findReserveHistory.user,
                        reserved_hotels: findReserveHistory.reserved_hotels.map((el)=>{
                            return {
                                _id: el._id,
                                cart_id : el.cart_id,
                                user_id : el.user_id,
                                hotel : {
                                    _id: el.hotel._id,
                                    name: el.hotel.name,
                                    country: el.hotel.country[language] || el.hotel.country.en,
                                    city: el.hotel.city,
                                    address: el.hotel.address,
                                    number: el.hotel.number,
                                    map: el.hotel.map,
                                    mainImage: el.hotel.mainImage,
                                    images: el.hotel.images,
                                    hotel_rooms: el.hotel.hotel_rooms
                                },
                                reserved_room: {
                                    _id: el.reserved_room._id,
                                    room_type: el.reserved_room.room_type,
                                    room_price: el.reserved_room.room_price,
                                    room_images: el.reserved_room.room_images,
                                    capacity: el.reserved_room.capacity,
                                    area: el.reserved_room.area,
                                    beds: el.reserved_room.beds[language] || el.reserved_room.beds.en,
                                    about: el.reserved_room.about[language] || el.reserved_room.about.en,
                                    facilities: el.reserved_room.facilities[language] || el.reserved_room.facilities.en,
                                    reserves: el.reserved_room.reserves,
                                    createdAt: el.reserved_room.createdAt,
                                    updatedAt: el.reserved_room.updatedAt
                                },
                                firstName : el.firstName,
                                lastName : el.lastName,
                                email : el.email,
                                phone : el.phone,
                                country : el.country,
                                description : el.description ? el.description : "",
                                reserve_start : el.reserve_start,
                                reserve_end : el.reserve_end,
                                total_spent : el.total_spent
                            }
                        })
                      }

                      return {status:200, success:true, reservesHistory :result}


                }else{
                    return {status:404, success:false, message:"Item Not Found Invalid ID"}
                }

            }else{
                return {status: 400 , success:false, message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status:500, success:false, message: "Internal Server Error"}
        }
    },
    clearCart : async (id,language)=>{
        try {
            if(id){
                const findCart = await Cart.findById(id).populate({
                    path: 'reserved_hotels',
                    populate: [
                      { path: 'hotel' }, 
                      { path: 'reserved_room' } 
                    ]
                  });
                if(findCart){
                    findCart.reserved_hotels.map(async (hotel)=>{
                        const removeCartItem = await CartItem.findByIdAndDelete(hotel._id) 
                        const removeInRoom = await HotelRoom.updateOne(
                            { _id: hotel.reserved_room},
                            { $pull: { reserves: hotel._id} }
                          );
                    })
                    const removeUserCart = await User.updateOne(
                        { _id: findCart.user },       
                        { $unset: { cart: "" } }      
                      );
                      

                    const removeCart = await Cart.findByIdAndDelete(id)

                    return {status:200,success:true, cart : []}

                }else{
                    return {status:404, success: false, message:"Cart Not Found Invalid ID"}
                }

            }else{
                return {status:400, success:false,message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status: 500 , success:false, message:"Internal Server Error"}
        }
    },
    clearHistory : async (id,language)=>{
        try {
            if(id){
                const findHistory = await ReserveHistory.findById(id).populate({
                    path: 'reserved_hotels',
                    populate: [
                      { path: 'hotel' }, 
                      { path: 'reserved_room' } 
                    ]
                  });
                if(findHistory){
                    findHistory.reserved_hotels.map(async (hotel)=>{
                        const removeHistoryItem = await ReserveHistoryItem.findByIdAndDelete(hotel._id) 
                        })
                    const removeUserHistory = await User.updateOne(
                        { _id: findHistory.user },       
                        { $unset: { reserve_history: "" } }      
                      );
                      

                    const removeReserveHistory = await ReserveHistory.findByIdAndDelete(id)

                    return {status:200,success:true, reserveHistory : []}

                }else{
                    return {status:404, success: false, message:"Reserve History Not Found Invalid ID"}
                }

            }else{
                return {status:400, success:false,message:"Bad Request"}
            }
            
        } catch (error) {
            console.error(error)
            return {status: 500 , success:false, message:"Internal Server Error"}
        }
    }
   
}

export default CartService