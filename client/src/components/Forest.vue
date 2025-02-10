<template>
	<p>Forest</p>
	<div>
		<p>Add Tree</p>
		<i class="fa fa-plus" @click="toggleAddTree"></i>
	</div>

	<p>Played Cards</p>
	<ul>
		<li v-for="card in cardsStore.playedCards(playerId)">
			{{card.name}}
		</li>
	</ul>

	<div v-if="showTreePopup">
		<ul>
			<li v-for="tree in trees">
				{{tree.name}}
				<i class="fa fa-plus" @click="addTree(tree._id)"></i>
			</li>
		</ul>
	</div>
</template>

<script>
import { useCardsStore } from '@/stores/cards';
import { mapStores } from 'pinia';

export default {
	data() {
		return {
			showTreePopup: false,
		}
	},
    props: {
		playerId: {
			type: Number,
			required: true
		}
    },
	computed: {
		trees () {
			return this.cardsStore.availableCards.filter(card => card.species.includes('tree'))
		},
		...mapStores(useCardsStore)
	},
	methods: {
		toggleAddTree () {
			this.showTreePopup = !this.showTreePopup
		},
		addTree (cardId) {
			this.cardsStore.playCard(cardId, this.playerId)
			this.showTreePopup = !this.showTreePopup
		}
	},
	mounted() {
        
	}
}
</script>