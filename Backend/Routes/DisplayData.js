const express = require('express')
const router = express.Router()

console.log([global.food_items])

router.post('/foodData', (req , res)=>{
    try{
        res.send([global.food_items , global.foodCatigory])
        console.log(global.food_items)
    }catch(err){
        console.log(err)
        res.status(404).send('server error')
    }
    
})

module.exports = router;