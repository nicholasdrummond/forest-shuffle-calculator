<template>
	<p>Forest Builder</p>
    <p>Player Count {{players}}</p>
	<Forest :player-id="1"></Forest>
</template>

<script>
import { useCardsStore } from '@/stores/cards';
import { mapStores } from 'pinia';
import Forest from './Forest.vue';

export default {
	components: {
		Forest
	},
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