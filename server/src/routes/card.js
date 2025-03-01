const express = require('express')
const router = express.Router()

const Card = require('../models/card')

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Retrieve a list of cards
 *     description: Fetch all available cards from the database.
 *     responses:
 *       200:
 *         description: A list of cards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	try {
		let cards = await Card().find({})
		res.status(200).send(cards)
	} catch (e) {
		res.status(500).send(e)
	}
})

/**
 * @swagger
 * /cards/pack/{packId}:
 *   get:
 *     summary: Retrieve a list of cards from a specific pack
 *     description: Fetch all cards that belong to a specific pack.
 *     parameters:
 *       - in: path
 *         name: packId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the pack to retrieve cards from.
 *     responses:
 *       200:
 *         description: A list of cards from the specified pack.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       500:
 *         description: Server error
 */
router.get('/pack/:packId', async (req, res) => {
	try {
		let cards = await Card().find({ pack: req.params.packId })
		res.status(200).send(cards)
	} catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router;