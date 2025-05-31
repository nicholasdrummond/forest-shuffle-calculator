<template>
	<div class="col-12">
		<div class="card h-100">
      		<div class="card-body">
				<h5 class="card-title">Forest</h5>
				<p class="card-text">Score: {{cardsStore.playerScore(playerId)}}</p>
				<div class="mb-3">
					<label class="form-label">Cave</label>
					<input class="form-control" type="text" @input="updateCave">
				</div>
				<div class="mb-3 d-flex align-items-center">
					<span class="me-2">Add Tree</span>
					<i class="fa fa-plus text-success cursor-pointer" @click="toggleAddTree"></i>
				</div>

				<h6 class="mt-4">Played Cards</h6>
				<ul class="list-group mb-3">
					<li class="list-group-item" v-for="card in cardsStore.playedTrees(playerId)">
						<div class="d-flex justify-content-between align-items-center">
							<span>
								{{card.name}} {{card.isFlipped ? '(flipped)' : ''}}
							</span>
						</div>
						<div>
							<i class="fa fa-refresh me-2 cursor-pointer" @click="cardsStore.flipCard(card._id)"></i>
							<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'left').length" class="fa fa-arrow-left me-2 cursor-pointer" @click="toggleAddAttachable(card._id, 'left')"></i>
							<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'top').length" class="fa fa-arrow-up me-2 cursor-pointer" @click="toggleAddAttachable(card._id, 'top')"></i>
							<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'right').length" class="fa fa-arrow-right me-2 cursor-pointer" @click="toggleAddAttachable(card._id, 'right')"></i>
							<i v-if="cardsStore.availableAttachablesByDirection(card._id, 'bottom').length" class="fa fa-arrow-down me-2 cursor-pointer" @click="toggleAddAttachable(card._id, 'bottom')"></i>
							<i class="fa fa-minus text-danger cursor-pointer" @click="removeCard(card._id)"></i>
						</div>
						
						<ul class="mt-2 ps-3">
							<li v-for="childCard in cardsStore.playedAttachablesOnTree(card._id)">
								{{childCard.name}} on {{childCard.side}} <i class="fa fa-minus text-danger ms-2 cursor-pointer" @click="removeCard(childCard._id)"></i>
							</li>
						</ul>
					</li>
				</ul>

				<div v-if="showTreePopup" class="mb-3">
					<ul class="list-group">
						<li class="list-group-item d-flex justify-content-between align-items-center" v-for="tree in groupedTrees">
							{{tree.count}}: {{tree.name}}
							<i class="fa fa-plus text-success cursor-pointer" @click="addTree(tree)"></i>
						</li>
					</ul>
				</div>

				<div class="mb-3" v-if="targetCardId && direction">
					<ul class="list-group">
						<li class="list-group-item d-flex justify-content-between align-items-center" v-for="card in cardsStore.availableAttachablesByDirection(targetCardId, direction)">
							{{card.name}}
							<i class="fa fa-plus text-success cursor-pointer" @click="addAttachable(card._id)"></i>
						</li>
					</ul>
				</div>
			</div>
		</div>
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
			type: String,
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
		},
		removeCard (cardId) {
			this.cardsStore.removeCardByCardId(cardId)
			this.direction = ''
			this.targetCardId = null
		},
		updateCave (event) {
			event.target.value = event.target.value.replace(/[^0-9]/g, '')
			this.cardsStore.setCaveCount(this.playerId, parseInt(event.target.value))
		}
	},
	mounted() {
        this.cardsStore.setCaveCount(this.playerId, 0)
	}
}
</script>