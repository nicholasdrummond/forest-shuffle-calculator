<template>
	<p>Forest</p>
	<div>
		<p>Add Tree</p>
		<i class="fa fa-plus" @click="toggleAddTree"></i>
	</div>

	<p>Played Cards</p>
	<ul>
		<li v-for="card in cardsStore.playedParentCards(playerId)">
			{{card.name}}
			<i class="fa fa-arrow-left" @click="toggleAddChildCard(card._id, 'left')"></i>
			<i class="fa fa-arrow-up" @click="toggleAddChildCard(card._id, 'top')"></i>
			<i class="fa fa-arrow-right" @click="toggleAddChildCard(card._id, 'right')"></i>
			<i class="fa fa-arrow-down" @click="toggleAddChildCard(card._id, 'bottom')"></i>
			<ul>
				<li v-for="childCard in cardsStore.playedChildCards(playerId, card._id)">
					{{childCard.name}} on {{childCard.side}}
				</li>
			</ul>
		</li>
	</ul>

	<div v-if="showTreePopup">
		<ul>
			<li v-for="tree in availableTrees">
				{{tree.count}}: {{tree.name}}
				<i class="fa fa-plus" @click="addTree(tree.name)"></i>
			</li>
		</ul>
	</div>

	<div v-if="targetCardId && direction">
		<ul>
			<li v-for="card in cardsStore.availableCardsByDirection(direction)">
				{{card.name}}
				<i class="fa fa-plus" @click="addChildCard(card._id)"></i>
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
			targetCardId: null,
			direction: ''
		}
	},
    props: {
		playerId: {
			type: Number,
			required: true
		}
    },
	computed: {
		availableTrees () {
			let trees = this.cardsStore.availableCards.filter(card => card.species.includes('tree'))
			const nameCountMap = trees.reduce((map, obj) => {
				map.set(obj.name, (map.get(obj.name) || 0) + 1);
				return map;
			}, new Map());
			return [...nameCountMap].map(([name, count]) => ({ name, count }));
		},
		...mapStores(useCardsStore)
	},
	methods: {
		toggleAddTree () {
			this.showTreePopup = !this.showTreePopup
		},
		toggleAddChildCard (cardId, direction) {
			// If the same option is clicked again, hide the menu
			if (this.targetCardId === cardId && this.direction === direction) {
				this.targetCardId = null
				this.direction = ''
			} else { // Else populate the menu
				this.targetCardId = cardId
				this.direction = direction
			}
		},
		addTree (name) {
			this.cardsStore.playCardByName(name, this.playerId)
			this.showTreePopup = !this.showTreePopup
		},
		addChildCard (cardId) {
			this.cardsStore.playChildCardById(cardId, this.playerId, this.targetCardId)
			this.direction = ''
			this.targetCardId = null
		}
	},
	mounted() {
        
	}
}
</script>