<template>
	<p>Forest Builder Placeholder</p>
    <p>Card Count {{cards.length}}</p>
</template>

<script>
export default {
	data() {
		return {
			cards: [],
		}
	},
    props: {
        packIds: {
            type: Array,
            required: true
        }
    },
	computed: {

	},
	methods: {

	},
	mounted() {
        packIds.forEach(id => {
            this.$axios.get(`card/pack/${id}`)
				.then((res) => {
					this.cards.concat(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
        })
	}
}
</script>