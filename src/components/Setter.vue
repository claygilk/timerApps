<template>
  <div class="setter">
      <div class="btn" @click="minus" @mousedown="start(false)" @mouseup="stop" @mouseleave="stop">-</div>
      <div class="number"> {{ showNumber }}</div>
      <div class="btn" @click="plus" @mousedown="start(true)" @mouseup="stop" @mouseleave="stop">+</div>
  </div>
</template>

<script>
export default {
    props: ['unit'],
    data() {
        return {
            number: 0,
            interval: false,
        }
    },
    computed: {
        showNumber() {
            let minutes = 0
            let seconds = 0

            let remaining = this.number

            while (remaining >= 60) {
                minutes++
                remaining -= 60
            }
            while (remaining > 0) {
                seconds++
                remaining--
            }

            let displayMinutes = minutes < 10 ? "0" + minutes : minutes
            let displaySeconds = seconds < 10 ? "0" + seconds : seconds

            if (this.unit === 'sec') {
                return `${displayMinutes}:${displaySeconds}`
            } else {
                return this.number
            }
        }
    },
    methods: {
        start(isPlus) {
            if (this.unit === 'sec') {
                if(!this.interval){
                    if(isPlus){
                        this.interval = setInterval(() => this.number++, 200)
                        this.$emit('update', this.number )
                    } else {
                        this.interval = setInterval(() => this.number--, 200)
                        this.$emit('update', this.number )
                    }
                }
            } 
        },
        stop(){
            clearInterval(this.interval)
            this.interval = false
        },
        plus(){
            this.number++

            this.$emit('update', this.number )
        },
        minus(){
            this.number--
        }
    }

}
</script>

<style>
div.number {
    width: 2em;
}

div.setter{
    display: flex;
    justify-content: space-around;
}

div.btn {
    background-color: darkblue;
    color: white;
    font-size: 2em;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer
}
</style>