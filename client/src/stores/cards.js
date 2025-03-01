import { defineStore } from 'pinia'
import axios from 'axios'
import clonedeep from 'lodash.clonedeep'

export const useCardsStore = defineStore('cards', {
    state () {
        return {
            trees: [],
            attachables: [],
            caves: new Map()
        }
    },
    getters: {
        availableTrees () {
            return this.trees.filter(card => !card.playedBy)
        },
        availableAttachablesByDirection () {
            return (treeId, side) => {
                let playedAttachables = this.playedAttachablesOnTreeSide(treeId, side)
                if (!playedAttachables.length) {
                    return this.attachables.filter(card => !card.playedBy && card.side === side)
                }

                if (playedAttachables.length < playedAttachables[0].stack_limit || playedAttachables[0].stack_limit === -1) {
                    return this.attachables.filter(card => !card.playedBy && card.side === side && card.name === playedAttachables[0].name)
                }

                return []
            }
        },
        caveCount () {
            return (playerId) => this.caves.get(playerId) ?? 0
        },
        playedTrees () {
            return (playerId) => this.trees.filter(card => card.playedBy === playerId)
        },
        playedAttachables () {
            return (playerId) => this.attachables.filter(card => card.playedBy === playerId)
        },
        playedCards () {
            return (playerId) => this.playedTrees(playerId).concat(this.playedAttachables(playerId))
        },
        allPlayedTrees () {
            return this.trees.filter(card => card.playedBy)
        },
        allPlayedAttachables () {
            return this.attachables.filter(card => card.playedBy)
        },
        allPlayedCards () {
            return this.allPlayedTrees.concat(this.allPlayedAttachables)
        },
        playedAttachablesOnTree () {
            return (treeId) => this.attachables.filter(card => card.treeId === treeId)
        },
        playedAttachablesOnTreeSide () {
            return (treeId, side) => this.attachables.filter(card => card.treeId === treeId && card.side === side)
        },
        playerScore () {
            return (playerId) => {
                let attachables = this.playedAttachables(playerId)
                let trees = clonedeep(this.playedTrees(playerId))
                for (var tree of trees) {
                    if (tree.isFlipped) {
                        delete tree.name
                        delete tree.score
                        delete tree.species
                        delete tree.tree_type
                        delete tree.group_score_id
                    }
                }
                let biota = trees.concat(attachables)
                let allAttachables = this.allPlayedAttachables
                let allTrees = clonedeep(this.allPlayedTrees)
                for (var tree of allTrees) {
                    if (tree.isFlipped) {
                        delete tree.name
                        delete tree.score
                        delete tree.species
                        delete tree.tree_type
                        delete tree.group_score_id
                    }
                }
                let allBiota = allTrees.concat(allAttachables)

                let result = 0
                let calculatedGroupIds = []

                let preconditionCards = allBiota.filter(c => c.precondition)
                for (var card of preconditionCards) {
                    let self = card
                    eval(card.precondition)
                }

                for (var bio of biota) {
                    if (bio.score) {
                        let self = bio
                        if (bio.group_score_id) {
                            if (calculatedGroupIds.includes(bio.group_score_id)) {
                                continue
                            } else {
                                calculatedGroupIds.push(bio.group_score_id)
                            }
                        }
                        result += eval(bio.score)
                    }
                }

                return result + this.caveCount(playerId)
            }
        }
    },
    actions: {
        loadCards (packIds) {
            packIds.forEach(id => {
                axios.get(`http://localhost:3001/card/pack/${id}`)
                    .then((res) => {
                        this.trees = this.trees.concat(res.data.filter(card => card.species.includes('tree')))
                        this.attachables = this.attachables.concat(res.data.filter(card => !card.species.includes('tree')))
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })    
        },
        playTreeById (cardId, playerId) {
            var card = this.trees.find(card => card._id === cardId)
            if (card) {
                if (!card.playedBy) {
                    card.playedBy = playerId
                } else {
                    console.log(`Tree with id ${cardId} has already been played by ${playerId}`)
                }
            } else {
                console.log(`Tree with id ${cardId} could not be found`)
            }
        },
        playAttachableById (cardId, playerId, treeId) {
            var card = this.attachables.find(card => card._id === cardId)
            if (card) {
                if (!card.playedBy) {
                    card.playedBy = playerId
                    card.treeId = treeId
                } else {
                    console.log(`Attachable with id ${cardId} has already been played by ${playerId}`)
                }
            } else {
                console.log(`Attachable with id ${cardId} could not be found`)
            }
        },
        setCaveCount (playerId, count) {
            this.caves.set(playerId, isNaN(count) ? 0 : count)
        },
        removeCardByCardId (cardId) {
            var card = this.allPlayedCards.find(card => card._id === cardId)
            if (card) {
                if (card.playedBy) {
                    delete card.playedBy
                    delete card.treeId
                    this.attachables.filter(c => c.treeId === card._id).forEach(c => {
                        if (c.playedBy) {
                            delete c.playedBy
                            delete c.treeId
                            delete c.isFlipped
                        } else {
                            console.log(`Card with id ${c._id} is already not in play`)
                        }
                    })
                } else {
                    console.log(`Card with id ${cardId} is already not in play`)
                }
            } else {
                console.log(`Card with id ${cardId} could not be found`)
            }
        },
        removeCardsByPlayerId (playerId) {
            this.playedCards(playerId).forEach(card => {
                if (card.playedBy) {
                    delete card.playedBy
                    delete card.treeId
                    delete card.isFlipped
                } else {
                    console.log(`Card with id ${card._id} is already not in play`)
                }
            })
        },
        flipCard (cardId) {
            var card = this.allPlayedTrees.find(card => card._id === cardId)
            if (card.isFlipped) {
                delete card.isFlipped
            } else {
                card.isFlipped = true
            }
        }
    }
})