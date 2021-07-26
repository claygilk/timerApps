<template>
  <div id="app">
    <div id="nav">
      <router-link v-bind:to="{name: 'interval'}">Interval</router-link> 
      <router-link v-bind:to="{name: 'stopwatch'}">Stopwatch</router-link>
      <router-link v-bind:to="{name: 'timer'}">Timer</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
