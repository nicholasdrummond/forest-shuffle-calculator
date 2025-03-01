const express = require('express')
const router = express.Router()

const Pack = require('../models/pack')

/**
 * @swagger
 * /pack:
 *   get:
 *     summary: Retrieve a list of packs
 *     description: Fetch all available packs from the database.
 *     responses:
 *       200:
 *         description: A list of packs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pack'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        let packs = await Pack().find({})
        res.status(200).send(packs)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;