const router = require('express').Router()
const axios = require('axios')
const ENPOINT_API='https://topup.pgecom.com/api/moncash/token'
const USER_ID = process.env.USER_ID

router.post('/', async(req, res) => {
    const { gdes } = req.body
    await axios({
        url: ENPOINT_API,
        method: 'POST',
        data: {
            gdes,
            userID: USER_ID
        }
    }).then((reponse) => {
        res.status(200).json(reponse.data);
    }).catch((error) => {
        console.log(error);
    })
    
})


router.post('/dollartogdes',async(req,res)=>{
    const {dollars}=req.body
    //get value dollar 
    const {data}=await axios({
        url:'https://topup.pgecom.com/api/setting/globalsetting',
        method:'GET'
    })

    //store value
    const moncashFees=data.monCashFees
    //value + 10 %
    const valueAfterCal=(dollars*moncashFees)*1.10
    await axios({
        url: ENPOINT_API,
        method: 'POST',
        data: {
            gdes:valueAfterCal,
            userID: USER_ID
        }
    }).then((reponse) => {
        res.status(200).json(reponse.data);
    }).catch((error) => {
        console.log(error);
    })
})

module.exports = router