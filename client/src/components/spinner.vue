<template>
	<div class="spinner"></div>
</template>

<script>
	export default {
		name: 'spinner'
	}
</script>
 
<style lang="scss" scoped>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.spinner {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		border: 4px solid transparent;
		border-top-color: rgba(#eee, 0.5);
		animation: spin 1s infinite linear;
	}
</style>
 