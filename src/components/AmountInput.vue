<template>
  <div class="w-100">
    <input 
      class="form-control" 
      v-model="amount" 
      type="number" 
      @change="sender"
      @blur="blur"
      @input="input"
    >
    <p class="text-left text-danger" v-if="msg">*{{msg}}</p>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus';

export default {
  name: 'AmountInput',
  props: {
    msg: String,
    dfAmount: Number
  },
  created() {
    EventBus.$on('cleared', (e) => {
      this.clearkHandler(e)
    })
  },
  data() {
    return {
      amount: this.dfAmount || ''
    }
  },
  methods: {
    focus() {
      if(this.amount == 0) {
        this.amount = ''
      }
    },
    blur() {
      if(this.amount == 0) {
        this.amount = ''
      }
      this.sender()
    },
    input(e) {
      let _num = Number(e.target.value)
      if(_num > 100000) {
        this.amount = 100000
      }
      this.sender()
    },
    clearkHandler(e) {
      this.amount = ''
      this.sender()
    },
    sender() {
      this.$emit('onAmountChange', this.amount)
    }
  },
}

</script>

<style>

</style>