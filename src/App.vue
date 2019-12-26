<template>
  <div id="app" @keyup.prevent.tab.exact="moveNext"
                @keydown.prevent.shift.tab.exact="movePrev">

    <Control ref="first" :value="firstValue"  @update="updateFirst($event)" :helperFunc="sum" :helperName="'Сумма'" />
    <Control ref="second" :value="secondValue" @update="updateSecond($event)" :helperFunc="constant" :helperName="'Константа'"/>
    <Control ref="third" :value="secondValue" @update="updateSecond($event)" />

  </div>
</template>

<script>
import {mapState} from 'vuex'
import Control from './components/Control'

export default {
  name: 'app',
  components: {
    Control
  },
  computed: mapState({
      firstValue: 'firstValue',
      secondValue: 'secondValue'
  }),

  methods: {
    updateFirst(value){
      this.$store.dispatch('updateFirst', value)
    },
    updateSecond(value){
      this.$store.dispatch('updateSecond', value)
    },
    sum(){
      this.$store.dispatch('sum')
    },
    constant(){
      this.$store.dispatch('constant')
    },
    moveNext(){
      let that = this
        let refs = Object.values(that.$refs)
        for (let i = 0; i<refs.length-1; i++){
          if (refs[i].isActive){
            refs[i].hide();
            i++;
            refs[i].show();
          }
        }
    },
    movePrev(){
      let that = this
        let refs = Object.values(that.$refs)
        for (let i = 1; i<=refs.length-1; i++){
          if (refs[i].isActive){
            refs[i].hide();
            i--;
            refs[i].show();
          }
        }
    }
  },

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  height: 200px;
}
</style>
