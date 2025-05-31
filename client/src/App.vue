<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <RouterLink class="navbar-brand" to="/builder">Forest Builder</RouterLink>
		<div class="d-flex">
          <RouterLink class="nav-link text-white" to="/about">About</RouterLink>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <RouterView />
    </main>
  </div>
</template>

<style>
	@import 'bootstrap/dist/css/bootstrap.css'
</style>
