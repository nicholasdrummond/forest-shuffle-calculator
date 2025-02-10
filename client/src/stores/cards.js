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
        playedCards () {
            return (playerId) => this.cards.filter(card => card.playedBy === playerId)
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
        playCard (cardId, playerId) {
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
        removeCard (cardId, playerId) {
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