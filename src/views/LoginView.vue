<template>
  <div class="container">
    <div class="row m-display justify-content-center align-items-center">
      <div class="col-12 col-md-6 col-lg-5 h-75">
        <Login/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'LogineView',
  components: {
    Login
  }
}
</script>

<style scoped>
  .m-display {
    height: 100vh;
  }
</style>