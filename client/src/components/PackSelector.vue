<template>
	<div class="container">
    	<div class="row">
			<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="pack in packs">
				<div class="card h-100 pack-container" :class="{'pack-selected': pack.selected}" @click="togglePackSelection(pack)">
					<div class="card-body">
						<h5 class="card-title">{{pack.name}}</h5>
					</div>
				</div>
			</div>
		</div>
		
		<p class="mt-4">Selected Packs: {{selectedPacks}}</p>
	</div>
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
		border-color: blue;
	}
</style>