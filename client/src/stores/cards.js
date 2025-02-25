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

                let last = playedAttachables.find(card => !card.attachableChildId)
                let score = last.score.find(card => card.condition === 'name_count')
                if (score) {
                    return this.attachables.filter(card => !card.playedBy && card.side === side && score.condition_target.includes(card.name))
                }
            }
        },
        playedTrees () {
            return (playerId) => this.trees.filter(card => card.playedBy === playerId)
        },
        playedAttachablesOnTreeSide () {
            return (treeParentId, side) => this.attachables.filter(card => card.treeParentId === treeParentId && card.side === side)
        },
        canPlayCard () {
            return (treeId, side) => {
                let playedAttachables = this.playedAttachablesOnTreeSide(treeId, side)
                if (!playedAttachables.length) {
                    return true
                }

                let last = playedAttachables.find(card => !card.attachableChildId)
                let score = last.score.find(card => card.condition === 'name_count')
                if (score && this.availableAttachablesByDirection(treeId, side).length) {
                    return true
                }
                return false
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
        playAttachableById (cardId, playerId, treeParentId) {
            var card = this.attachables.find(card => card._id === cardId)
            var playedAttachables = this.playedAttachablesOnTreeSide(treeParentId, card.side)
            let last = playedAttachables.find(card => !card.attachableChildId)
            if (card) {
                if (!card.playedBy) {
                    card.playedBy = playerId
                    card.treeParentId = treeParentId
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