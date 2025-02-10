<template>
	<PackSelector v-if="!forestView" @selectionToggled="setSelectedPacks"/>
	<ForestBuilder v-else />

	<footer>
		<button v-if="!forestView" @click="openForest">Next</button>
		<p v-if="errorMessage">{{errorMessage}}</p>
	</footer>
</template>

<script>
import PackSelector from '@/components/PackSelector.vue'
import ForestBuilder from '@/components/ForestBuilder.vue'
import { mapStores } from 'pinia';
import { useCardsStore } from '@/stores/cards';

export default {
	name: 'Forestview',
	components: {
		PackSelector,
		ForestBuilder
	},
	data() {
		return {
			selectedPackIds: [],
			forestView: false,
			errorMessage: null
		}
	},
	props: {

	},
	computed: {
		...mapStores(useCardsStore)
	},
	methods: {
		setSelectedPacks (selectedPackIds) {
			this.selectedPackIds = selectedPackIds
		},
		openForest () {
			if (this.selectedPackIds.length < 1) {
				this.errorMessage = 'Please select at least 1 pack'
			} else {
				this.errorMessage = null
				this.forestView = true
				this.cardsStore.loadCards(this.selectedPackIds)
			}
		}
	},
	mounted() {

	}
}
</script>