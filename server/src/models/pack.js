const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 *   definitions:
 *     Pack:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the pack.
 *         name:
 *           type: string
 *           description: The name of the pack.
 */
const PackSchema = new Schema({
    name: String
});

module.exports = () => {
    let collectionName = 'packs'

    if (mongoose.modelNames().indexOf(collectionName) !== -1) {
        return mongoose.model(collectionName)
    }

    return mongoose.model(collectionName, PackSchema, collectionName)
}