const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
	count: Number,
	cost: Number,
	name: String,
	score: {
		operator: { type: String, enum: ['map', 'multiplication', 'fixed'] },
		condition: { type: String, enum: ['attached_count', 'tree_type_count', 'sub_species', 'most_total', 'dependant', 'dependant_shared', 'tree_full', 'species_count', 'species_tree_count', 'tree_max_species', 'direction', 'name_tree_type'] },
		condition_target: { type: String },
		operand: { type: mongoose.Schema.Types.Mixed }
	},
	side: { type: String, enum: ['center', 'left', 'right', 'top', 'bottom'] },
	species: [{ type: String, enum: species }],
	tree_type: { type: String, enum: tree_types }
});

module.exports = () => {
	let collectionName = 'cards'

	if (mongoose.modelNames().indexOf(collectionName) !== -1) {
		return mongoose.model(collectionName)
	}

	return mongoose.model(collectionName, CardSchema, collectionName)
}