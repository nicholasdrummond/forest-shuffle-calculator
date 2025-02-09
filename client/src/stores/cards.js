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
        }
    }
})