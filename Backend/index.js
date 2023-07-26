const express = require('express')
const app = express()
const port = 500
const mongoDB = require('./database')


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next()
})

const mongoconnect = require('./database')
mongoconnect().catch(err => console.log(err)).then(()=>{console.log('server connected')})


app.use(express.json())

app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))


app.get('/',(req,res)=>{
    res.send('hello node')
})

app.listen(port,()=>{
    console.log(`example app listen on port ${port}`)
})