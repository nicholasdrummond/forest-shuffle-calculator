<template>
	<PackSelector @selectionToggled="setSelectedPacks"/>

	<footer>
		<button @click="">Next</button>
	</footer>
</template>

<script>
import PackSelector from '@/components/PackSelector.vue';
import ForestBuilder from '@/components/ForestBuilder.vue';

export default {
	name: 'Forestview',
	components: {
		PackSelector,
		ForestBuilder
	},
	data() {
		return {
			selectedPackIds: []
		}
	},
	props: {

	},
	methods: {
		setSelectedPacks (selectedPackIds) {
			this.selectedPackIds = selectedPackIds
		}
	},
	mounted() {

	}
}
</script>