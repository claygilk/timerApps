import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countdownTime: 0,
    workoutInterval: null,
    currentWork: 0,
    currentRest: 0,
    currentCycle: 1,
    mode: 'work',
    isFinished: false,
  },
  mutations: {
    START_TIMER(state, setTime){
      state.countdownTime = setTime;
    },
    RUN_TIMER(state){
      state.countdownTime--
    },
    CLEAR_TIMER(state){
      state.countdownTime = 0
    },
    START_INTERVAL(state, interval) {
      state.workoutInterval = interval

      state.currentWork = state.workoutInterval.work
      state.currentRest = state.workoutInterval.rest
    },
    RUN_INTERVAL(state) {
      console.log('running interval');

      if(!state.isFinished)
      {
        
      
        if (state.mode === 'work') 
        {
          state.currentWork--

          if (state.currentWork === 0) 
          {
            state.currentWork = state.workoutInterval.work
            state.mode = 'rest'
          }

        } 
      
        else 
        {
          state.currentRest--

          if (state.currentRest === 0) 
          {
            state.currentRest = state.workoutInterval.rest
            state.mode = 'work'

            state.currentCycle++

            if (state.currentCycle > state.workoutInterval.cycles) 
            {
              state.isFinished = true;
              state.currentCycle = state.workoutInterval.cycles
              console.log('DONE!');
            }
          }
        }
      }

      
    }
  },
  actions: {
  },
  modules: {
  }
})
