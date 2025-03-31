import Cart from "../Model/Cart.js";
import CartItem from "../Model/CartItem.js";
import HotelRoom from "../Model/HotelRoom.js";
import ReserveHistory from "../Model/ReserveHistory.js";
import ReserveHistoryItem from "../Model/ReserveHistoryItem.js";
import User from "../Model/User.js";



const isToday = (endDate) => {
    const dbDate = new Date(endDate);
  
    const today = new Date();
  
    return (
      dbDate.getFullYear() === today.getFullYear() &&
      dbDate.getMonth() === today.getMonth() &&
      dbDate.getDate() === today.getDate() ||
      dbDate.getDate() < today.getDate()
    );
  };



// export async function archiveReserve(){
//     const findAllItems = await CartItem.find()
    
//     if(findAllItems.length > 0){
        
//         findAllItems.map(async (item)=>{
//             console.log("crone work-----",item.reserve_end);
//             if(isToday(item.reserve_end)){
                
//                 const findUser = await User.findById(item.user_id).populate("reserve_history")
//                 let reserveHistory
//                 if(findUser.reserve_history){
//                     reserveHistory = await ReserveHistory.findById(findUser.reserve_history)
//                 }else{
//                     reserveHistory = new ReserveHistory({
//                         user : findUser._id,
//                         reserved_hotels : []
//                     })

//                     await reserveHistory.save()
//                     findUser.reserve_history = reserveHistory._id
//                     await findUser.save()
//                 }

//                 const newReserveItem = new ReserveHistoryItem({
//                     reserves_history_id: reserveHistory._id,
//                     user_id : item.user_id,
//                     hotel : item.hotel,
//                     reserved_room : item.reserved_room,
//                     firstName : item.firstName,
//                     lastName : item.lastName,
//                     email : item.email,
//                     phone :  item.phone,
//                     country : item.country,
//                     people_count : item.people_count,
//                     description : item.description? item.description : "",
//                     reserve_start: item.reserve_start,
//                     reserve_end: item.reserve_end,
//                     total_spent: item.total_spent
//                 })

//                 await newReserveItem.save()

//                 reserveHistory.reserved_hotels = [...reserveHistory.reserved_hotels, newReserveItem]
//                 await reserveHistory.save()

//                 const removeInCart = await Cart.updateOne(
//                     { _id: item.cart_id},
//                     { $pull: { reserved_hotels: item._id } }
//                   );
//                 const removeInRoom = await HotelRoom.updateOne(
//                     { _id: item.reserved_room },
//                     { $pull: { reserves: item._id } }
//                   );

//                 const remove = await CartItem.findByIdAndDelete(item._id)
                
//             }
//         })
//     }
// }







export async function archiveReserve() {
    const findAllItems = await CartItem.find();
    
    if (findAllItems.length > 0) {
        for (const item of findAllItems) {  // 🔹 Use for...of to handle async properly
            console.log("cron work-----", item.reserve_end);

            if (isToday(item.reserve_end)) {
                const findUser = await User.findById(item.user_id).populate("reserve_history");

                let reserveHistory;
                if (findUser.reserve_history) {
                    reserveHistory = await ReserveHistory.findById(findUser.reserve_history);
                } else {
                    reserveHistory = new ReserveHistory({
                        user: findUser._id,
                        reserved_hotels: []
                    });

                    await reserveHistory.save();
                    findUser.reserve_history = reserveHistory._id;
                    await findUser.save();
                }

                const newReserveItem = new ReserveHistoryItem({
                    reserves_history_id: reserveHistory._id,
                    user_id: item.user_id,
                    hotel: item.hotel,
                    reserved_room: item.reserved_room,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    phone: item.phone,
                    country: item.country,
                    people_count: item.people_count,
                    description: item.description ? item.description : "",
                    reserve_start: item.reserve_start,
                    reserve_end: item.reserve_end,
                    total_spent: item.total_spent
                });

                await newReserveItem.save();

                // 🔹 Use `$push` in MongoDB update to avoid re-saving multiple times
                await ReserveHistory.updateOne(
                    { _id: reserveHistory._id },
                    { $push: { reserved_hotels: newReserveItem._id } }
                );

                await Cart.updateOne(
                    { _id: item.cart_id },
                    { $pull: { reserved_hotels: item._id } }
                );

                await HotelRoom.updateOne(
                    { _id: item.reserved_room },
                    { $pull: { reserves: item._id } }
                );

                await CartItem.findByIdAndDelete(item._id);
            }
        }
    }
}

