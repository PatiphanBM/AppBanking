<template>
  <div class="container-fluid">
    <div class="row m-display justify-content-center">
      <!-- <div class="col-12 col-md-6 col-lg-5 h-75"> -->
      <div class="col-12 p-0">
        <DepositWithdraw/>
      </div>
    </div>
  </div>
</template>

<script>

import DepositWithdraw from '@/components/DepositWithdraw.vue'

export default {
  name: 'DepositWithdrawView',
  components: {
    DepositWithdraw
  }
}
</script>

<style scoped>
  .m-display {
    height: 94vh;
  }
</style>