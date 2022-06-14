import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { v1 as uuidv1 } from 'uuid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalAmount: 0,
    isLogin: false,
    userInfo: {
      email: 'admin@banking.com',
      password: '1234'
    },
    transactions: [],
  },
  getters: {
  },
  mutations: {
    UpdateTransaction(state, list) {
      state.transactions = list;
    },
    UpdateLoginStatus(state, status) {
      state.isLogin = status
    },
    UpdateAmount(state, amount) {
      state.totalAmount = amount
    }
  },
  actions: {
    async createTransaction({commit}, transaction) {
      let _transactions = this.state.transactions;
      let transItem = {
        id: uuidv1(),
        date: new Date(),
        amount: Number(transaction.amount),
        status: transaction.status,
        email: this.state.userInfo.email
      };

      _transactions.push(transItem);
      commit('UpdateTransaction', _transactions);

      this.dispatch('updateAmount', transaction)
    },
    async updateTransaction({commit}, transactions) {
      if(transactions != []) transactions.forEach(item => item.amount = Number(item.amount));
      commit('UpdateTransaction', transactions);
    },
    async updateAmount({commit}, transaction) {
      let _amount = this.state.totalAmount;
      if(transaction.status == 1) {
        _amount += transaction.amount;
      } else {
        _amount -= transaction.amount;
      }
      commit('UpdateAmount', _amount)
    },
    async updateToTalAmount({commit}, amount) {
      let _amount = Number(amount)
      commit('UpdateAmount', _amount)
    },
    async updateLoginStatus({commit}, status) {
      commit('UpdateLoginStatus', status)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
