<template>
	<div v-for="card in cards">
		<p>Name: {{card.name}}</p>
		<p>Tree Type: {{card.tree_type}}</p>
		<br/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cards: []
		}
	},
	props: {

	},
	methods: {

	},
	mounted() {
		this.$axios.get('card')
			.then((res) => {
				this.cards = res.data
			})
			.catch((err) => {
				console.log(err)
			})
	}
}
</script>