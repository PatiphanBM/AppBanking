<template>
  <div class="row p-2 mt-4">
    <div class="col-12">
      <div class="d-flex align-items-center m-item rounded" @click="onSelectedMenu(1)">
        <i class="fa-solid fa-building-columns mr-2 pl-4"></i>
        <b>Deposit/Withdraw</b> 
      </div>
    </div>
    <div class="col-12">
      <div class="d-flex align-items-center m-item rounded mt-2" @click="onSelectedMenu(2)">
        <i class="fa-solid fa-money-bill-transfer mr-2 pl-4"></i>
        <b>Transaction</b> 
      </div>
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'Menu',
  methods: {
    onSelectedMenu(id) {
      if(id == 1) {
        if(this.$route.name != 'depositwithdraw') {
          this.$router.push('/depositwithdraw')
        }
      } else {
        if(this.$route.name != 'transaction') {
          this.$router.push('/transaction')
        }
      }

      this.$emit('menuSelected', id)
    }
  }
}
</script>

<style scoped>
.m-item {
  height: 50px;
  font-size: 1.2rem;
}
.m-item:hover {
  color: white;
  background-color: #e1032b;
  cursor: pointer;
}
</style>
