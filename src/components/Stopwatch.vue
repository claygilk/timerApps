<template>
  <div>
    <h1>Stopwatch</h1>
    <div class="display">
        <h2>{{ displayMinutes }} : {{ displaySeconds }} . {{ displayMili }}</h2>
    </div>
    <div class="buttons">
        <button v-if="!isActive" @click="startTimer" class="start" :class="{ active: isActive}">Start</button>
        <button v-if="isActive" @click="stopTimer" :class="{ active: isActive, stop: true }">Stop</button>
        <button @click="resetTimer" :class="{ active: !isActive }">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
            timer: null,
            mili:0,
        }
    },
    methods: {
        startTimer() {
            this.timer = setInterval(this.runTimer, 10)
            this.isActive = true;
        },
        runTimer() {
            this.mili++
        },
        stopTimer() {
            clearInterval(this.timer)
            this.isActive = false;
        },
        resetTimer() {
            this.stopTimer()
            this.mili = 0
            this.displayMili = 0
            this.displaySeconds = 0
            this.displayMinutes = 0
        }
    },
    computed: {
        displaySeconds(){
            let ds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
            return ds
        },
        displayMinutes() {
            let dm = this.minutes < 10 ? "0" + this.minutes : this.minutes;
            return dm
        },
        displayMili(){
            let dmi = this.miliseconds < 10 ? "0" + this.miliseconds : this.miliseconds;
            return dmi
        },
        miliseconds() {
            return Math.floor(this.mili % 100)
        },
        seconds(){
            return Math.floor((this.mili / 100) % 60)
        },
        minutes() {
            return Math.floor((this.mili / 6000) % 60)
        }
    }
}
</script>

<style>
button {
    border-radius: 20%;
    border-style: none;
    font-size: 1.5em;
    padding: 1em;
    margin: 1em;
    
}



button.start {
    background-color: rgb(17, 158, 99);
    width: 98px;

    
}

button.stop {
    background-color: rgb(223, 74, 74);
    width: 98px;
}
</style>