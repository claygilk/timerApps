<template>
<div>
  <h1>Interval</h1>
  
  <div class="main" v-if="!isStarted">
    <h2>Work</h2>
    <Setter unit="sec" @update="changeWork"/>
    
    <h2>Rest</h2>
    <Setter unit="sec" @update="changeRest"/>
    
    <h2>Cycles</h2>
    <Setter unit="cycles" @update="changeCycles"/>

  </div>
  <div v-else>
    <div v-if="this.$store.state.mode === 'work'" class="working">

    <h1 v-if="!this.$store.state.isFinished">{{ this.$store.state.currentWork }}</h1>
    <h1 v-if="this.$store.state.isFinished">Done!</h1>

    </div>
    <div v-else class="resting">

    <h1>{{ this.$store.state.currentRest }}</h1>

    </div>
    
    <h2> {{ this.$store.state.currentCycle }} / {{ this.$store.state.workoutInterval.cycles }}</h2>
  </div>

  <button v-if="!isStarted" class="btn" @click="start">START</button>
  <button v-if="isStarted && !isPaused" class="btn" @click="pause">PAUSE</button>
  <button v-if="isStarted && isPaused" class="btn" @click="resume">RESUME</button>

</div>
  
</template>

<script>
import Setter from './Setter.vue'

export default {
  components: {
    Setter,
  },
  data(){
    return{
      isStarted: false,
      isPaused: false,
      isWork: false,
      isRest: false,
      timer: false,
      round: 1,
      workout : {
        work: 0,
        rest: 0,
        cycles: 0,
      }
    }
  },
  methods: {
    start() {
      this.isStarted = true

      this.$store.commit('START_INTERVAL', this.workout)

      this.timer = setInterval(this.runInterval, 1000)
      console.log(this.timer);
    },
    runInterval(){
      if (!this.isPaused && !this.$store.state.isFinished) {
        this.$store.commit('RUN_INTERVAL')
      }
    },
    pause() {
      this.isPaused = true
    },
    resume() {
      this.isPaused = false
    },
    changeWork(newNumber) {
      this.workout.work = newNumber;
    },
    changeRest(newNumber) {
      this.workout.rest = newNumber;
    },
    changeCycles(newNumber) {
      this.workout.cycles = newNumber;
    }
  }

}
</script>

<style>
div.main {
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
}

button.btn {
  background-color: darkblue;
  color: white;
}

div.working {
  border: solid 3px red;
  border-radius: 10px;
}

div.resting {
  border: solid 3px green;
  border-radius: 10px;
}
</style>