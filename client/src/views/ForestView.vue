<template>
	<PackSelector />
</template>

<script>
import PackSelector from '@/components/PackSelector.vue';

export default {
	name: 'Forestview',
	components: {
		PackSelector
	},
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