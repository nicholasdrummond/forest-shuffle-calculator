<template>
	<div v-for="pack in packs">
		<div class="pack-container" :class="{'pack-selected': pack.selected}" @click="togglePackSelection(pack)">
			<p>Name: {{pack.name}}</p>
			<br/>
		</div>
	</div>
	<p>Selected Packs: {{selectedPacks}}</p>
</template>

<script>
export default {
	emits: ['selectionToggled'],
	data() {
		return {
			packs: [],
		}
	},
	computed: {
		selectedPacks () {
			return this.packs.filter(x => x.selected).map(x => x.name).join() || 'None'
		},
		selectedPackIds () {
			return this.packs.filter(x => x.selected).map(x => x._id)
		}
	},
	methods: {
		togglePackSelection (pack) {
			pack.selected = !pack.selected
			this.$emit('selectionToggled', this.selectedPackIds)
		}
	},
	mounted() {
		this.$axios.get('pack')
			.then(async (res) => {
				this.packs = res.data
			})
			.catch((err) => {
				console.log(err)
			})
	}
}
</script>

<style>
	.pack-container {
		display: flex;
		cursor: pointer;
	}

	.pack-selected {
		display: flex;
		cursor: pointer;
		border-style: solid;
	}
</style>