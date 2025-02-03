const express = require('express')
const router = express.Router()

const Card = require('../models/card')

router.get('/', async (req, res) => {
	try {
		let cards = await Card().find({})
		res.status(200).send(cards)
	} catch (e) {
		res.status(500).send(e)
	}
})

router.get('/pack/:packId', async (req, res) => {
	try {
		let cards = await Card().find({ pack: req.params.packId })
		res.status(200).send(cards)
	} catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router;