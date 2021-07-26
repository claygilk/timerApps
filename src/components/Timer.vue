<template>
  <div>
    
    <h1>Timer</h1>
    
    <h2 v-if="isDone && isStarted">Done!</h2>
    <h2 v-else> {{ this.testDisplay }} </h2>
    
    <div class="container">
      <div class="row align-items-center">
        <h3 class="col">Hours</h3>
        <h3 class="col">Minutes</h3>
        <h3 class="col">Seconds</h3>
      </div>
    </div>
    <div id="setter">

      <!-- <input type="number" v-model="setHours"> -->
      <span class="display-4"> {{setHours}} </span>
      <div class="btn-group-vertical">
        <button @click="plus('hr')" class="btn btn-primary btn-sm shadow-none">+</button>
        <button @click="minus('hr')" class="btn btn-primary btn-sm shadow-none">-</button>
      </div>

      <!-- <input type="number" v-model="setMinutes"> -->
      <span class="display-4"> {{setMinutes}} </span>
      <div class="btn-group-vertical">
        <button @click="plus('min')" class="btn btn-primary btn-sm shadow-none">+</button>
        <button @click="minus('min')" class="btn btn-primary btn-sm shadow-none">-</button>
      </div>
      
      
      <span class="display-4"> {{setSeconds}} </span>
      <div class="btn-group-vertical">
        <button @click="plus('sec')" class="btn btn-primary btn-sm shadow-none">+</button>
        <button @click="minus('sec')" class="btn btn-primary btn-sm shadow-none">-</button>
      </div>

      <!-- <input type="number" v-model="setSeconds"> -->
      <span id="clear" @click="clearTimer">X</span>
      
    </div>

    <br>

      <button class="rounded-pill btn btn-primary shadow-none" v-if="!isActive" @click="startTimer" >Start</button>
      <button class="rounded-pill btn btn-primary shadow-none" v-if="isActive && isPaused" @click="resumeTimer">Resume</button>
      <button class="rounded-pill btn btn-primary shadow-none" v-if="isActive && !isPaused" @click="pauseTimer">Pause</button>
      <!-- <button v-if="isDone" @click="resetTimer">Reset</button> -->
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      setSeconds: 0,
      setMinutes: 0,
      setHours: 0,
      totalSetSeconds: 0,
      timer: null,
      isActive: false,
      isPaused: false,
      isStarted: false,
    }
  },
 
  methods: {
    plus(num) {
      if(num === 'hr'){
        this.setHours++
      } 
      else if (num === 'min'){
        this.setMinutes++
      } 
      else {
        this.setSeconds++
      }
    },
    minus(num){
      if(num === 'hr'){
        this.setHours--
      } 
      else if (num === 'min'){
        this.setMinutes--
      } 
      else {
        this.setSeconds--
      }
    },
    startTimer() {
      this.totalSetSeconds = (this.setSeconds * 1) + (this.setMinutes * 60) + (this.setHours * 3600)
      this.$store.commit("START_TIMER", this.totalSetSeconds)

      this.timer = setInterval(this.runTimer, 1000)

      this.isActive = true;
      this.isStarted = true;
    },
    runTimer() {
      if (!this.isPaused) {
        this.$store.commit("RUN_TIMER")
        console.log('tick');
      }
    },
    pauseTimer() {
      this.isPaused = true;
    },
    resumeTimer() {
      this.isPaused = false;
    },
    resetTimer() {
      this.isActive = false
      this.isPaused = false
      this.isStarted =  false
    },
    clearTimer(){
      this.$store.commit('CLEAR_TIMER')
      this.resetTimer()
      clearInterval(this.timer)
      this.timer = null
      this.setMinutes = 0
      this.totalSetSeconds = 0
    }
  },

  computed: {
    testDisplay() {
      let remaining = this.$store.state.countdownTime

      let hours = 0
      let minutes = 0
      let seconds = 0

      while (remaining >= 3600) {
        hours++
        remaining -= 3600
      }
      while (remaining >= 60) {
        minutes++
        remaining -= 60
      }
      while (remaining > 0) {
        seconds++
        remaining--
      }

      let displayHours = hours < 10 ? "0" + hours : hours
      let displayMinutes = minutes < 10 ? "0" + minutes : minutes
      let displaySeconds = seconds < 10 ? "0" + seconds : seconds

      return `${displayHours}:${displayMinutes}:${displaySeconds}`
    },

    isDone() {
      if (this.$store.state.countdownTime === 0 && this.isStarted) {
        clearInterval(this.timer)
        return true;
      }
      return false;
    }
  }

}
</script>

<style>
#setter {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

input {
  width: 3em;
  height: auto;
}

button {
  width: 6em;
  border-radius: 10px;
}

#clear {
  background-color: crimson;
  color: white;
  border-radius: 2px;
  font-size: 1.2em;
  margin: 0.5em;
  padding: 0.25em;
  cursor: pointer;
  width: 21px;
}
</style>