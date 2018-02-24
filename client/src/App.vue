<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
		name: 'app'
  }
</script>

<style lang="scss">
	/* Not using scoped css here because it breaks styles applied to html and body */

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Titillium Web', sans-serif;
    margin: 0;
    padding: 0;
	}

	* {
		box-sizing: border-box;
	}
</style>
