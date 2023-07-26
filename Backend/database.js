const mongoose = require('mongoose')

const mongoconnect = async ()=>{
    await mongoose.connect("mongodb+srv://aki748434:akshay@cluster0.ghlgpx1.mongodb.net/GoFood?retryWrites=true&w=majority")
    console.log('data base connected')
    const fetchData = await mongoose.connection.db.collection("food_items")
    fetchData.find({}).toArray(async function (err,data){
        const foodCatigory = await mongoose.connection.db.collection("foodCatigory");
        foodCatigory.find({}).toArray(function (err , catData){
            if(err) console.log(err)
        else {
            global.food_items = data
            global.foodCatigory = catData;
        }
        })
       
    })
}

module.exports = mongoconnect
