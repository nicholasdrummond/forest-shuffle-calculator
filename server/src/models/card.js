const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operators = ['map', 'multiplication', 'fixed']
const conditions = ['attached_count', 'tree_type_count', 'sub_species', 'most_total', 'dependant', 'dependant_shared', 'tree_full', 'species', 'tree_type', 'species_count', 'species_tree_count', 'tree_max_species', 'direction', 'on_tree_type', 'name_count', 'tree_count']
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
	score: [{
		operator: { type: String, enum: operators },
		condition: { type: String, enum: conditions },
		condition_target: [{ type: String }],
		condition_count: { type: Number },
		operand: { type: mongoose.Schema.Types.Mixed }
	}],
	side: { type: String, enum: sides },
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