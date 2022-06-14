<template>
  <div id="app" class="">
    <div class="row no-gutters">
      <div class="col-12">
        <NavBar id="cus-nav" v-if="currentRoute != 'login'"/>
      </div>
      <div class="d-none d-md-block col-md-5 col-lg-3">
        <MunuStatic id="m-static" v-if="currentRoute != 'login'"/>
      </div>
      <div :class="currentRoute != 'login' ? 'col-12 col-md-7 col-lg-9' : 'col-12'">
        <router-view/>
      </div>
    </div>
    
    <b-sidebar
      id="sidebar-backdrop"
      ref="appSideBar"
      title="Clicknext"
      :header-class="'d-none'"
      backdrop-variant="dark"
      backdrop
      shadow
    >
      <div class="row">
        <div class="col-12 d-flex a-logo">
          <img class="mx-auto" src="https://image.makewebeasy.net/makeweb/0/m14BHwk4P/Home/clicknext_logo2x.png?v=202012190947" alt="Logo">
        </div>
        <div class="col-12">
          <Menu @menuSelected="onSelectedMenu"/>
        </div>
      </div>
    </b-sidebar>
    <b-button class="d-none" v-b-toggle.backdrop>Toggle Sidebar</b-button>
  </div>
</template>

<script>
import Modal from './components/Modal.vue';
import NavBar from './components/NavBar.vue';
import MunuStatic from './components/MunuStatic.vue';
import Menu from './components/Menu.vue';
import store from './store';

export default {
  created() {
    if(!store.state.isLogin && this.currentRoute != 'login') this.$router.push('/')
  },
  computed: {
    currentRoute() {
        return this.$route.name;
    }
  },
  components: { NavBar, MunuStatic, Menu },
  methods: {
    onSelectedMenu(e) {
      this.$refs['appSideBar'].hide();
    } 
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(238, 238, 238);
  position: relative;
}

#cus-nav {
  position: relative;
  z-index: 99;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.bg-cn-primary {
  background-color: #e1032b;
}
.txt-cn-primary {
  background-color: #e1032b;
}
.a-logo img {
  width: 50%;
}
</style>
