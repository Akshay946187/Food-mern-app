const express = require('express');
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcript = require('bcryptjs')
const jwtsecret = "mynameisakshayand#"

router.post("/createUser", [
    body('email').isEmail(),
    body('passward', 'Passward must be 5 Char').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const solt = await bcript.genSalt(10)
    let seqPassward = await bcript.hash(req.body.passward,solt)

    try {
        await user.create({
            name: req.body.name,
            passward: seqPassward,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ succes: true })
    }
    catch (err) {
        console.log(err)
        res.json({ succes: false })
    }
})

router.post("/loginuser", [
    body('email').isEmail(),
    body('passward', 'Passward must be 5 Char').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let email = req.body.email;
    try {
        let userData = await user.findOne({ email })
        if (!userData) {
            return res.status(400).json({ errors: "Email was not currect" })
        }
        const pwdCompare = await bcript.compare(req.body.passward , userData.passward)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "passward was not currect" })
        }

        const data = {
            user : {
                id : userData.id
            }
        }
        const authToken = jwt.sign(data , jwtsecret)
        return res.json({ success: true,authToken : authToken })
    }
    catch (err) {
        console.log(err)
        res.json({ succes: false })
    }
})


module.exports = router;