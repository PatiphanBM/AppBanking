<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center cus-card w-100">
      <h1 class="mb-4">Sign in</h1>
      <div class="col-12 mt-4">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text"><i class="fa-solid fa-at"></i></span>
          </b-input-group-prepend>
          <b-form-input class="login-input" size="lg" placeholder="Email" v-model="email" @input="showAlert = false">
          </b-form-input>
        </b-input-group>

        <b-input-group class="mt-3">
          <b-input-group-prepend>
            <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
          </b-input-group-prepend>
          <b-form-input class="login-input" size="lg" placeholder="Password" v-model="password" @input="showAlert = false">
          </b-form-input>
        </b-input-group>
        <b-alert class="mt-1" :show="showAlert" variant="danger">Email or password is incorrect.</b-alert>

        <p class="my-3">Forgot password?</p>

        <b-button class="w-75 bg-cn-primary mb-3 mt-4" pill variant="danger" @click="onLogin()">SIGN IN</b-button>

        <div class="ln-con">
          <hr>
          <div class="ln-in px-2">OR</div>
        </div>
        
        <div class="row justify-content-center ">
          <div class="col-auto"><i class="fa-brands fa-google"></i></div>
          <div class="col-auto"><i class="fa-brands fa-facebook-f"></i></div>
          <div class="col-auto"><i class="fa-brands fa-twitter"></i></div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showAlert: false,
      msg: ''
    }
  },
  methods: {
    onLogin() {
      if(store.state.userInfo.email == this.email && store.state.userInfo.password == this.password) {
        if(!this.validateEmail(this.email)) {
          this.msg = 'Email is incorrect.'
          this.showAlert = true
          return;
        }
        store.dispatch('updateLoginStatus', true);
        this.$router.push('/depositwithdraw')
        this.showAlert = false
      } else {
        this.msg = 'Email or password is incorrect.'
        this.showAlert = true
      }
    },
    validateEmail(email){
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    }
  }
}
</script>

<style scoped>
  .cus-card {
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: -1px 13px 14px 3px rgba(0,0,0,0.27);
    -webkit-box-shadow: -1px 13px 14px 3px rgba(0,0,0,0.27);
    -moz-box-shadow: -1px 13px 14px 3px rgba(0,0,0,0.27);
  }
  .login-input {
    font-size: 1rem;
  }
  .ln-con {
    position: relative;
  }
  .ln-in {
    position: absolute;
    top: -10px;
    left: 45%;
    transition: translateX(-50%);
    background-color: #fff;
  }
</style>