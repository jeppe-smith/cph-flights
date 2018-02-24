<template>
	<div class="flight-search">
		<input class="input" type="text" :placeholder="placeholder" v-model.lazy="searchTerm" v-debounce="200">

		<transition-group tag="ul" name="flight" class="flights">
			<li class="flight" v-for="(flight, index) in searchableFlights.search(searchTerm)" :key="index">
				<div class="flight__time">
					<div class="flight__original-time" v-if="flight.delayed">{{ flight.time }}</div>
					<div class="flight__actual-time">{{ flight.delayed ? flight.time_expected : flight.time }}</div>
				</div>
				<div class="flight__details">
					<div class="flight__info">
						<div class="flight__number">{{ flight.flight }}</div>
						<div class="flight__airline">{{ flight.airline }}</div>
					</div>
					<div class="flight__country">
						<div class="flight__city">{{ flight.city }}</div>
						<div class="flight__airport">{{ flight.airport }}</div>
					</div>
				</div>
			</li>
		</transition-group>
	</div>
</template>

<script>
	import Fuse from 'fuse.js'
	import debounce from 'v-debounce'

	export default {
		name: 'flight-search',

		directives: { debounce },

		props: {
			placeholder: {
				type: String,
				default: 'Search flights (City, Airline, Time, etc.)'
			},
			flights: {
				type: Array,
				required: true
			}
		},

		data() {
			return {
				searchTerm: ''
			}
		},

		computed: {
			searchableFlights() {
				return new Fuse(this.flights, {
					shouldSort: true,
					threshold: 0.6,
					location: 0,
					distance: 100,
					maxPatternLength: 32,
					minMatchCharLength: 1,
					keys: [ 'airline', 'airport', 'city', 'delayed', 'flight', 'time', 'time_expected' ]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input {
		border: none;
		outline: none;
		height: 3rem;
		width: 100%;
		padding: 1rem;
		border-radius: 2px;
		box-shadow: 0 3px 6px rgba(0,0,0,0.2);
		font: inherit;
		font-size: 1.2rem;
	}

	.flights {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.flight {
		background: #fff;
		margin: 1rem 0;
		border-radius: 2px;
		box-shadow: 0 2px 2px rgba(0,0,0,0.1);		
		display: flex;
		align-items: stretch;
	}

	.flight__time {
		padding: 1rem;
		border-right: 1px solid #eee;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.flight__original-time {
		font-size: 0.8rem;
		text-decoration: line-through;
	}

	.flight__actual-time {
		font-size: 1.5rem;
	}

	.flight__info {
		display: flex;
		color: #aaa;
		font-size: 0.8rem;
	}

	.flight__details {
		padding: 1rem;
	}

	.flight__number {
		margin-right: 0.5rem;
	}

	.flight__city {
		font-weight: bold;
	}

	.flight__airport {
		font-size: 0.8rem;
	}

	// Animation
	.flight-enter-active, .flight-leave-active {
		transition: all 0.5s ease-out;
		will-change: opacity transform;
	}

	.flight-enter, .flight-leave-to {
		opacity: 0;
		transform: translateX(1rem);
	}
</style>
