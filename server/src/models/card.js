const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sides = ['center', 'left', 'right', 'top', 'bottom']
const tree_types = ['sycamore', 'birch', 'beech', 'douglas_fir', 'oak', 'horse_chestnut', 'linden', 'silver_fir']
const species = ['amphibian', 'tree', 'bat', 'deer', 'insect', 'cloven-hoofed_animal', 'plant', 'pawed_animal', 'mushroom', 'butterfly', 'bird']

/**
 * @swagger
 *   definitions:
 *     Card:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the card.
 *         pack:
 *           type: string
 *           description: The pack this card belongs to.
 *         cost:
 *           type: number
 *           description: The cost of using this card.
 *         name:
 *           type: string
 *           description: The name of the card.
 *         score:
 *           type: string
 *           description: The score of the card as javascript code.
 *         side:
 *           type: string
 *           enum: [center, left, right, top, bottom]
 *           description: The side placement of the card.
 *         species:
 *           type: array
 *           items:
 *             type: string
 *             enum: [amphibian, tree, bat, deer, insect, cloven-hoofed_animal, plant, pawed_animal, mushroom, butterfly, bird]
 *           description: The species classification of the card.
 *         tree_type:
 *           type: string
 *           enum: [sycamore, birch, beech, douglas_fir, oak, horse_chestnut, linden, silver_fir]
 *           description: The type of tree associated with the card.
 *         stack_limit:
 *           type: number
 *           description: The maximum number of this card that can be stacked.
 *         group_score_id:
 *           type: string
 *           description: The group score identifier for calculating scores as a group.
 */
const CardSchema = new Schema({
	pack: String,
	cost: Number,
	name: String,
	score: String,
	side: { type: String, enum: sides },
	species: [{ type: String, enum: species }],
	tree_type: { type: String, enum: tree_types },
   stack_limit: { type: Number, default: 1 },
   group_score_id: String
});

module.exports = () => {
	let collectionName = 'cards'

	if (mongoose.modelNames().indexOf(collectionName) !== -1) {
		return mongoose.model(collectionName)
	}

	return mongoose.model(collectionName, CardSchema, collectionName)
}