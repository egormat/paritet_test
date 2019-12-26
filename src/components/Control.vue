<template>
  <div v-if="!isActive" @click="show" class="control">
    {{value | splitNumber}}
  </div>

  <div v-else
       v-click-outside="hide"
       @keyup.enter="hide"
       @keyup.esc="cancel"
       class="active">

    <input type="number"
           @keydown="validate"
           :value="value"
           @input="updateValue"
           ref="inputField"
           min="0"
           >
    <button v-if="helperFunc" @click="helperFunc">{{helperName}}</button>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Control',
  directives: {
    ClickOutside
  },
  props: ['value', 'helperFunc', 'helperName'],
  data() {
    return {
      isActive: false,
      prevState: 0,
    }
  },

  methods: {
    show() {
      this.prevState = +this.value;
      this.isActive = true;
      this.$nextTick(function() {
        this.$refs.inputField.focus();
        this.$refs.inputField.select();
      })
    },
    hide() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
    updateValue(e) {
      if (!e.target.value){
        this.$emit('update', 0)
      }
      else {
        this.$emit('update', e.target.value)
      }
    },
    validate(e){
      if(!((e.keyCode > 95 && e.keyCode < 106)
          || (e.keyCode > 47 && e.keyCode < 58)
          || e.keyCode == 8)) {
          e.preventDefault()
     }
    },
    cancel() {
      this.isActive = !this.isActive
      this.$emit('update', this.prevState)
    }
  },

  filters: {
    splitNumber:  function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }
}
</script>


<style lang="scss">
.control {
  cursor: pointer;
  position: relative;
  font-size: 18px;
  &:after {
    position: absolute;
    top: -3px;
    margin-left: 5px;
    content: url('../assets/icon.png');
  }

  &:hover {
    color: #00467F;
  }
}

.active{
  font-size: 18px;
  display: flex;
  flex-direction: column;

  button {
    background: none;
    border: 0;
    width: 50px;
    color: #0070CD;
    font-size: 10px;
    text-align: left;
    cursor: pointer;
  }

  input {
    font-size: 18px;
    width: 130px;
    height: 30px;
  }

  }

</style>
