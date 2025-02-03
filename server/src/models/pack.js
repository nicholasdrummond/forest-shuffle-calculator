const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
   * @swagger
   * tags:
   *   name: Packs
   *   description: Packs
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