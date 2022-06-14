<template>
  <div class="con w-100">
    <div class="row w-100 h-100 justify-content-between align-items-center m-0">

      <div class="col-auto my-auto pl-4 d-block d-md-none">
        <b-button variant="outline-danger" v-b-toggle.sidebar-backdrop><i class="fa-solid fa-bars"></i></b-button>
      </div>

      <div class="col-auto logo my-auto pl-0 pl-sm-4">
        <img src="https://image.makewebeasy.net/makeweb/0/m14BHwk4P/Home/clicknext_logo2x.png?v=202012190947" alt="Logo">
      </div>

      <div class="col-auto my-auto">
        <b-btn variant="outline-danger" @click="onLogOut">Log out</b-btn>
      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'NavBar',
  methods: {
    onLogOut() {
      store.dispatch('updateLoginStatus', false)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .con {
    height: 55px;
    background-color: #fff;
    box-shadow: -1px 7px 14px -12px rgba(0,0,0,0.53);
    -webkit-box-shadow: -1px 7px 14px -12px rgba(0,0,0,0.53);
    -moz-box-shadow: -1px 7px 14px -12px rgba(0,0,0,0.53);
  }
  .logo img {
    height: 50px;
    width: 100%;
  }
</style>