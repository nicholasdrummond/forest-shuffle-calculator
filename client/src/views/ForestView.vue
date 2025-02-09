<template>
	<PackSelector v-if="!forestView" @selectionToggled="setSelectedPacks"/>
	<ForestBuilder v-else />

	<footer>
		<button v-if="!forestView" @click="openForest">Next</button>
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
			forestView: false
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
			this.forestView = true
			this.cardsStore.loadCards(this.selectedPackIds)
		}
	},
	mounted() {

	}
}
</script>