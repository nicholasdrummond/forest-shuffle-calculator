const express = require('express')
const router = express.Router()

const Pack = require('../models/pack')

router.get('/', async (req, res) => {
    try {
        let packs = await Pack().find({})
        res.status(200).send(packs)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;