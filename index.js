require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
const PORT=process.env.PORT

//get all routes
const paymentroute=require('./api/moncash/payment')
// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(cors())

app.use('/payment',paymentroute)

app.get('*',(req,res)=>{
    res.status(404).json({
        status:false,
        message:'PAGE INTROUVABLE '
    })
})

app.listen(PORT,(req,res)=>{
    console.log(`Application demarre sur le port : ${PORT}`)
})
