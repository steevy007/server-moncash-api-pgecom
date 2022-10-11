const router = require('express').Router()
const axios = require('axios')
const USER_ID = process.env.USER_ID
router.post('/', async (req, res) => {
    const { gdes } = req.body

    console.log(req.body.gdes)


    await axios({
        url: 'https://topup.pgecom.com/api/moncash/token',
        method: 'POST',
        data: {
            gdes:gdes,
            userID: USER_ID
        }
    }).then((reponse) => {
        res.json(reponse.data)
    }).catch((error) => {
        res.json(error)
    })

})

module.exports = router