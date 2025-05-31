import { createRouter, createWebHistory } from 'vue-router'
import ForestView from '../views/ForestView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/builder',
			name: 'forest-builder',
			component: ForestView,
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		}
	],
})

export default router
