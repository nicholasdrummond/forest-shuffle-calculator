const Card = require('../models/card')
const Pack = require('../models/pack')

const packs = require('./packs.json')

require('./database').connect()

function throwerr(err) {
    console.log('Error filling database')
    console.log(err)
    process.exit()
}

Pack().deleteMany({})
    .then(deletedPacks => {
        console.log(`Deleted ${deletedPacks.deletedCount} packs`)
        Card().deleteMany({})
            .then(deletedCards => {
                console.log(`Deleted ${deletedCards.deletedCount} cards`)
                Pack().insertMany(packs.map(pack => ({ name: pack.name })))
                .then(insertedPacks => {
                    console.log(`Inserted ${insertedPacks.length} packs`)
                    Card().insertMany(packs.map((pack, index) => { return pack.cards.map(card => ({ pack: insertedPacks[index]._id, ...card }))}).flat(1))
                        .then((insertedCards) => {
                            console.log(`Inserted ${insertedCards.length} packs`)
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
            })
    })

