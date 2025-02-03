const Card = require('../models/card')
const pack = require('../models/pack')
const Pack = require('../models/pack')

const packs = require('./packs.json')

require('./database').connect()

function throwerr(err) {
    console.log('Error filling database')
    console.log(err)
    process.exit()
}

Pack().insertMany(packs.map(pack => ({ name: pack.name })))
    .then(insertedPacks => {
        console.log('Inserted packs')
        Card().insertMany(packs.map((pack, index) => { return pack.cards.map(card => ({ pack: insertedPacks[index]._id, ...card }))}).flat(1))
            .then(() => {
                console.log('Inserted cards')
                console.log('Successfully filled database')
                process.exit()
            })
            .catch(err => {
                throwerr(err)
            })
    })
    .catch(err => {
        throwerr(err)
    })