import HotelRoom from "../Model/HotelRoom.js";
import Hotels from "../Model/Hotels.js"


const HotelsService = {
    getHotels: async (country, city, language) => {
        try {
            const allHotels = await Hotels.find().populate({
                path: "hotel_rooms", 
                model: HotelRoom ,
                populate: [
                    { path: 'reserves',select: "user_id reserve_start reserve_end" }, 
                  ]
            });

            if (!allHotels || allHotels.length === 0) {
                return { status: 404, success: false, message: "Hotels Not Found" };
            }

            let filteredHotels = allHotels;

            if (country) {
                filteredHotels = filteredHotels.filter(hotel =>
                    hotel.country[language]?.toLowerCase() === country.toLowerCase()
                );
            }

            if (city) {
                filteredHotels = filteredHotels.filter(hotel =>
                    hotel.city[language]?.toLowerCase() === city.toLowerCase()
                );
            }

            const result = filteredHotels.map(hotel => ({
                _id: hotel._id,
                name: hotel.name,
                country: hotel.country[language] || hotel.country.en,
                city: hotel.city[language] || hotel.city.en,
                address: hotel.address,
                number: hotel.number,
                map: hotel.map,
                mainImage: hotel.mainImage,
                images: hotel.images,
                hotel_rooms: hotel.hotel_rooms.map(room => ({
                    _id: room._id,
                    room_type: room.room_type,
                    room_price: room.room_price,
                    room_images: room.room_images,
                    capacity: room.capacity,
                    area: room.area,
                    beds: room.beds[language] || room.beds.en,
                    about: room.about[language] || room.about.en,
                    facilities: room.facilities[language] || room.facilities.en,
                    reserves: room.reserves,
                    createdAt: room.createdAt,
                    updatedAt: room.updatedAt
                }))
            }));

            return { status: 200, success: true, data: result };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: "Internal Server Error" };
        }
    },
    getSingleHotel : async (id,language)=>{
        try {
            if(id){

                const findHotel = await Hotels.findById(id).populate({
                    path: "hotel_rooms", 
                    model: HotelRoom ,
                    populate: [
                        { path: 'reserves',select: "user_id reserve_start reserve_end" }, 
                      ]
                })

                if(findHotel){
                    const result = {
                        _id: findHotel._id,
                        name: findHotel.name,
                        country: findHotel.country[language] || findHotel.country.en,
                        city: findHotel.city[language] || findHotel.city.en,
                        address: findHotel.address,
                        number: findHotel.number,
                        map: findHotel.map,
                        mainImage: findHotel.mainImage,
                        images: findHotel.images,
                        hotel_rooms: findHotel.hotel_rooms.map(room => ({
                            _id: room._id,
                            room_type: room.room_type,
                            room_price: room.room_price,
                            room_images: room.room_images,
                            capacity: room.capacity,
                            area: room.area,
                            beds: room.beds[language] || room.beds.en,
                            about: room.about[language] || room.about.en,
                            facilities: room.facilities[language] || room.facilities.en,
                            reserves: room.reserves,
                            createdAt: room.createdAt,
                            updatedAt: room.updatedAt
                        }))
                    };

                    return {status: 200, success: true, hotel : result}
                }else{
                    return {status : 400, success: false, message : "Hotel Not Found Invalid ID"}
                }
            }else{
                return {status: 400, success:false, message : "Bad Request"}
            }
            
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: "Internal Server Error" };
        }
    },
    getHotelRoom : async (id,language)=>{
        try {
            if(id){
                const findRoom = await HotelRoom.findById(id).populate({
                    path : "reserves",
                    select: "user_id reserve_start reserve_end"
                })
                if(findRoom){
                    const result = {
                            _id: findRoom._id,
                            room_type: findRoom.room_type,
                            room_price: findRoom.room_price,
                            room_images: findRoom.room_images,
                            capacity: findRoom.capacity,
                            area: findRoom.area,
                            beds: findRoom.beds[language] || findRoom.beds.en,
                            about: findRoom.about[language] || findRoom.about.en,
                            facilities: findRoom.facilities[language] || findRoom.facilities.en,
                            hotel_id : findRoom.hotel_id,
                            reserves: findRoom.reserves,
                            createdAt: findRoom.createdAt,
                            updatedAt: findRoom.updatedAt
                    }

                    return {status:200, success:true, room : result}

                  
                }else{
                    return  {status:404, message:"Room Not Found Invalid ID", success:false}
                }
            }else{
                return {status: 400, message:"Bad Request", success:false}
            }
            
        } catch (error) {
            console.error(error)
            return { status: 500, success: false, message: "Internal Server Error" };
        }
    }
}

export default HotelsService