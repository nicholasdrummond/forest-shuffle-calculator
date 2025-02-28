<template>
	<p>Forest</p>
	<p>Score: {{cardsStore.playerScore(playerId)}}</p>
	<div>
		<p>Add Tree</p>
		<i class="fa fa-plus" @click="toggleAddTree"></i>
	</div>

	<p>Played Cards</p>
	<ul>
		<li v-for="card in cardsStore.playedTrees(playerId)">
			{{card.name}}
			<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'left').length" class="fa fa-arrow-left" @click="toggleAddAttachable(card._id, 'left')"></i>
			<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'top').length" class="fa fa-arrow-up" @click="toggleAddAttachable(card._id, 'top')"></i>
			<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'right').length" class="fa fa-arrow-right" @click="toggleAddAttachable(card._id, 'right')"></i>
			<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'bottom').length" class="fa fa-arrow-down" @click="toggleAddAttachable(card._id, 'bottom')"></i>
			<ul>
				<li v-for="childCard in cardsStore.playedAttachablesOnTreeSide(card._id, 'left')">
					{{childCard.name}} on {{childCard.side}}
				</li>
				<li v-for="childCard in cardsStore.playedAttachablesOnTreeSide(card._id, 'top')">
					{{childCard.name}} on {{childCard.side}}
				</li>
				<li v-for="childCard in cardsStore.playedAttachablesOnTreeSide(card._id, 'right')">
					{{childCard.name}} on {{childCard.side}}
				</li>
				<li v-for="childCard in cardsStore.playedAttachablesOnTreeSide(card._id, 'bottom')">
					{{childCard.name}} on {{childCard.side}}
				</li>
			</ul>
		</li>
	</ul>

	<div v-if="showTreePopup">
		<ul>
			<li v-for="tree in groupedTrees">
				{{tree.count}}: {{tree.name}}
				<i class="fa fa-plus" @click="addTree(tree)"></i>
			</li>
		</ul>
	</div>

	<div v-if="targetCardId && direction">
		<ul>
			<li v-for="card in cardsStore.availableAttachablesByDirection(targetCardId, direction)">
				{{card.name}}
				<i class="fa fa-plus" @click="addAttachable(card._id)"></i>
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
		groupedTrees () {
			return Object.values(
				this.cardsStore.availableTrees.reduce((acc, obj) => {
					if (!acc[obj.name]) {
						acc[obj.name] = { name: obj.name, count: 0, ids: [] };
					}
					acc[obj.name].count++;
					acc[obj.name].ids.push(obj._id);
					return acc;
				}, {})
			)
		},
		...mapStores(useCardsStore)
	},
	methods: {
		toggleAddTree () {
			this.showTreePopup = !this.showTreePopup
		},
		toggleAddAttachable (cardId, direction) {
			// If the same option is clicked again, hide the menu
			if (this.targetCardId === cardId && this.direction === direction) {
				this.targetCardId = null
				this.direction = ''
			} else { // Else populate the menu
				this.targetCardId = cardId
				this.direction = direction
			}
		},
		addTree (tree) {
			this.cardsStore.playTreeById(tree.ids.shift(), this.playerId)
			this.showTreePopup = !this.showTreePopup
		},
		addAttachable (cardId) {
			this.cardsStore.playAttachableById(cardId, this.playerId, this.targetCardId)
			this.direction = ''
			this.targetCardId = null
		}
	},
	mounted() {
        
	}
}
</script>