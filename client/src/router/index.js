import { createRouter, createWebHistory } from 'vue-router'
import ForestView from '../views/ForestView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'forest-builder',
			component: ForestView,
		},
	],
})

export default router
