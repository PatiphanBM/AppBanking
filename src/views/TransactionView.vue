<template>
  <div class="container-fluid">
    <div class="row m-display justify-content-center">
      <div class="col-12">
        <Transaction/>
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from '@/components/Transaction.vue';
export default {
    name: "TransactionView",
    components: { Transaction }
}
</script>

<style scoped>
 .m-display {
    height: 94vh;
  }
</style>