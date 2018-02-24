<template>
	<div class="arrivals">
		
		<flight-search :flights="flights"/>

		<spinner class="spinner" v-if="fetching" />

		<span class="error" v-if="error">Oh, no. Something went wrong. :(</span>

	</div>
</template>

<script>
	import axios from 'axios'
	import FlightSearch from '@/components/flight-search'
	import Spinner from '@/components/spinner'

	export default {
		name: 'arrivals',

		data() {
			return {
				fetching: false,
				error: false,
				flights: [],
				searchTerm: ''
			}
		},

		components: { FlightSearch, Spinner },

		methods: {
			updateSearchTerm(value) {
				this.searchTerm = value
			}
		},

		mounted() {
			this.fetching = true

			axios.get('/api/arrivals')
				.then(response => {
					this.fetching = false
					this.flights = response.data
				})
				.catch(error => {
					this.fetching = false
					this.error = true
					
					console.log(error)
				})
		}
	}
</script>

<style lang="scss" scoped>
	.arrivals {
		background: #ff793f;
		min-height: 100vh;
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.spinner {
		margin: auto;
	}
</style>
