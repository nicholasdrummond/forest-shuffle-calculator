<template>
	<p>Forest Builder Placeholder</p>
    <p>Player Count {{players}}</p>
	<p>Card Cound {{this.cardsStore.allCards.length}}</p>
</template>

<script>
import { useCardsStore } from '@/stores/cards';
import { mapStores } from 'pinia';

export default {
	data() {
		return {
			players: 1,
		}
	},
    props: {

    },
	computed: {
		...mapStores(useCardsStore)
	},
	methods: {

	},
	mounted() {
        
	}
}
</script>