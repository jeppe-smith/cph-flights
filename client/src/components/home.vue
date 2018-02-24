<template>
  <div class="home">
    <router-link to="/departures" class="link link--departures">
			<icon-departure fill="#fff" width="4rem" height="4rem" />			
			<span>Search departures</span>
		</router-link>
		<router-link to="/arrivals" class="link link--arrivals">
			<icon-arrival fill="#fff" width="4rem" height="4rem" />
			<span>Search arrivals</span>
		</router-link>
  </div>
</template>

<script>
	import IconDeparture from '@/assets/svg/icon-departure.svg'
	import IconArrival from '@/assets/svg/icon-arrival.svg'	

  export default {
		name: 'home',
		
		components: {
			'icon-departure': IconDeparture,
			'icon-arrival': IconArrival
		}
  }
</script>

<style lang="scss" scoped>
	.link {
		width: 100%;
		height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: rgba(#fff, 0.75);
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: bold;

		&--arrivals {
			background: #227093;
		}

		&--departures {
			background: #ff793f;
		}

		> span {
			margin-top: 1rem;
		}
	}
</style>