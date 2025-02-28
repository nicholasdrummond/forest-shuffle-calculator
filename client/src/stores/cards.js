import { defineStore } from 'pinia'
import axios from 'axios'

export const useCardsStore = defineStore('cards', {
    state () {
        return {
            trees: [],
            attachables: []
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
        playedAttachablesOnTreeSide () {
            return (treeId, side) => this.attachables.filter(card => card.treeId === treeId && card.side === side)
        },
        playerScore () {
            return (playerId) => {
                let attachables = this.playedAttachables(playerId)
                let trees = this.playedTrees(playerId)
                let biota = this.playedCards(playerId)
                let allAttachables = this.allPlayedAttachables
                let allTrees = this.allPlayedTrees
                let allBiota = this.allPlayedCards

                let result = 0
                let calculatedGroupIds = []

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

                return result
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
            var playedAttachables = this.playedAttachablesOnTreeSide(treeId, card.side)
            let last = playedAttachables.find(card => !card.attachableChildId)
            if (card) {
                if (!card.playedBy) {
                    card.playedBy = playerId
                    card.treeId = treeId
                    if (last) last.attachableChildId = cardId
                } else {
                    console.log(`Attachable with id ${cardId} has already been played by ${playerId}`)
                }
            } else {
                console.log(`Attachable with id ${cardId} could not be found`)
            }
        },
        removeCardById (cardId, playerId) {
            // Seperate methods for trees and attachables?
            /*var card = this.cards.find(card => card._id === cardId)
            if (card) {
                if (card.playedBy) {
                    card.playedBy = undefined
                } else {
                    console.log(`Card with id ${cardId} is already not in play by ${playerId}`)
                }
            } else {
                console.log(`Card with id ${cardId} could not be found`)
            }*/
        }
    }
})