<template>
	<div v-for="pack in packs">
		<p>Name: {{pack.name}}</p>
		<p>Card Count: {{pack.cards?.length}}</p>
		<br/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			packs: []
		}
	},
	methods: {
		async getCards (pack) {
			this.$axios.get(`card/pack/${pack._id}`)
				.then((res) => {
					pack.cards = res.data
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
	mounted() {
		this.$axios.get('pack')
			.then(async (res) => {
				this.packs = res.data
				for (var pack of this.packs) {
					await this.getCards(pack)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}
}
</script>