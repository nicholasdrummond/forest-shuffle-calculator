const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sides = ['center', 'left', 'right', 'top', 'bottom']
const tree_types = ['sycamore', 'birch', 'beech', 'douglas_fir', 'oak', 'horse_chestnut', 'linden', 'silver_fir']
const species = ['amphibian', 'tree', 'bat', 'deer', 'insect', 'cloven-hoofed_animal', 'plant', 'pawed_animal', 'mushroom', 'butterfly', 'bird']

/**
   * @swagger
   * tags:
   *   name: Cards
   *   description: Playable Cards
   */

/**
   * @swagger
   * definitions:
   *   Cards:
   *     name: card
   *     description: Card
   *     in: body
   *     properties:
   *       side:
   *         type: string
   *         enum: [center, left, right, top, bottom]
   */

const CardSchema = new Schema({
	pack: String,
	count: Number,
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