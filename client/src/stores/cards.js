import { defineStore } from 'pinia'
import axios from 'axios'

export const useCardsStore = defineStore('cards', {
    state () {
        return {
            cards: []
        }
    },
    getters: {
        allCards () {
            return this.cards
        },
        availableCards () {
            return this.cards.filter(card => !card.playedBy)
        },
        availableCardsByDirection () {
            return (side) => this.cards.filter(card => !card.playedBy && card.side === side)
        },
        playedParentCards () {
            return (playerId) => this.cards.filter(card => card.playedBy === playerId && !card.parentId)
        },
        playedChildCards () {
            return (playerId, parentId) => this.cards.filter(card => card.playedBy === playerId && card.parentId === parentId)
        }
    },
    actions: {
        loadCards (packIds) {
            packIds.forEach(id => {
                axios.get(`http://localhost:3001/card/pack/${id}`)
                    .then((res) => {
                        this.cards = this.cards.concat(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })    
        },
        playCardById (cardId, playerId) {
            var card = this.cards.find(card => card._id === cardId)
            if (card) {
                if (!card.playedBy) {
                    card.playedBy = playerId
                } else {
                    console.log(`Card with id ${cardId} has already been played by ${playerId}`)
                }
            } else {
                console.log(`Card with id ${cardId} could not be found`)
            }
        },
        playChildCardById (cardId, playerId, parentId) {
            var card = this.cards.find(card => card._id === cardId)
            if (card) {
                if (!card.playedBy) {
                    card.playedBy = playerId
                    card.parentId = parentId
                } else {
                    console.log(`Card with id ${cardId} has already been played by ${playerId}`)
                }
            } else {
                console.log(`Card with id ${cardId} could not be found`)
            }
        },
        playCardByName (cardName, playerId) {
            var cards = this.cards.filter(card => card.name === cardName && !card.playedBy)
            if (cards) {
                cards[0].playedBy = playerId
            } else {
                console.log(`Cards with name ${cardName} could not be found`)
            }
        },
        removeCardById (cardId, playerId) {
            var card = this.cards.find(card => card._id === cardId)
            if (card) {
                if (card.playedBy) {
                    card.playedBy = undefined
                } else {
                    console.log(`Card with id ${cardId} is already not in play by ${playerId}`)
                }
            } else {
                console.log(`Card with id ${cardId} could not be found`)
            }
        }
    }
})