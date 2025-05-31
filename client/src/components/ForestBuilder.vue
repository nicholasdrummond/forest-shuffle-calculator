<template>
	<div class="container">
		<h3>Forest Builder</h3>
		<p>Player Count {{playerIds.length}}</p><i class="fa fa-plus mb-3" @click="addPlayer"></i><br/>

		<div class="row">
			<div class="col-12 col-sm-6 col-lg-3 mb-4 position-relative" v-for="id in playerIds" style="display: inline-block; margin: 10px">
				<i v-if="id !== initialPlayer" class="fa fa-minus text-danger position-absolute end-0 me-2 mt-1 z-1" @click="removePlayer(id)"></i>
				<Forest :player-id="id"></Forest>
			</div>
		</div>
	</div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import { useCardsStore } from '@/stores/cards';
import { mapStores } from 'pinia';
import Forest from './Forest.vue';

export default {
	components: {
		Forest
	},
	data() {
		return {
			initialPlayer: uuid(),
			playerIds: [],
		}
	},
    props: {

    },
	computed: {
		...mapStores(useCardsStore)
	},
	methods: {
		addPlayer () {
			this.playerIds.push(uuid())
		},
		removePlayer (id) {
			if (id !== this.initialPlayer) {
				this.playerIds.splice(this.playerIds.indexOf(id), 1)
				this.cardsStore.removeCardsByPlayerId(id)
			} else {
				console.log('Cannot remove initial player.')
			}
		}
	},
	mounted() {
        this.playerIds.push(this.initialPlayer)
	}
}
</script>