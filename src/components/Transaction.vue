<template>
  <div class="h-75">
    <div class="col-12 banner"></div>
    <div class="row justify-content-center re">
      <div class="col-11 col-md-10 tb-con bg-white p-lg-4">
        <h4>ประวัติรายการฝาก-ถอน</h4>
        <div class="col-12 tb-scr">
          <b-table 
            striped hover 
            :items="items" 
            :fields="fields"
          >
            <template #cell(date)="row">
              {{ getDate(row.item.date) }}
            </template>

            <template #cell(amount)="row">
              {{getPrice(row.item.amount)}}
            </template>

            <template #cell(status)="row">
              <div :class="row.item.status == 1 ? 'text-success' : 'text-danger'">{{row.item.status == 1 ? 'ฝาก' : 'ถอน'}}</div>
            </template>

            <template #cell(action)="row">
              <b-button class="btn-sm ml-1 mb-1" variant="warning" @click="onUpdate(row.item)"><i class="fa-solid fa-pen-to-square"></i></b-button>
              <b-button class="btn-sm ml-1 mb-1" variant="danger" @click="onDelete(row.item)"><i class="fa-solid fa-trash"></i></b-button>
            </template>
          </b-table>
        </div>
        <div class="col-12 col-md-10 text-left mt-2">
          <p>ทั้งหมด {{(items || []).length}}</p>
        </div>
        
      </div>
    </div>
    <b-modal 
      id="modal-center" 
      ref="modal-center"  
      :title="modalHead"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <p class="">
        ของวันที่ {{getDate(modalItem.date)}} <br>
        จากอีเมล {{modalItem.email}} <br>
        จำนวนเงิน*
        <AmountInput :dfAmount="Number(modalItem.amount)" :msg="msgAmount" @onAmountChange="handleAmount"/>
      </p>
    </b-modal>

    <b-modal 
      id="modal-error" 
      ref="modal-error"
      :title="modalError"
    ><p class="">{{errorMsg}}</p>
    </b-modal>
  </div>
</template>

<script>
import store from '@/store'
import AmountInput from './AmountInput.vue'

export default {
  name: "Transaction",
  created() {
    // store.dispatch('updateTransaction', []);
    // store.dispatch('updateToTalAmount', 0);
  },
  data() {
    return {
      fields: ["date", "amount", "status", "email", "action"],
      modalHead: '',
      modalError: '',
      errorMsg: '',
      modalItem: {},
      msgAmount: '',
      editType: 1
    };
  },
  methods: {
    onUpdate(item) {
      this.modalHead = 'แก้ไขจำนวนเงินฝาก'
      this.modalItem = {...item}
      this.editType = 1
      this.$refs['modal-center'].show();
    },
    onDelete(item) {
      this.modalHead = 'ยืนยันการลบ'
      this.modalItem = {...item}
      this.editType = 2
      this.$refs['modal-center'].show();
    },
    resetModal() {
      this.modalItem = {}
    },
    handleOk() {
      let _ths = this
      let _trans = store.state.transactions
      if(this.editType == 1) {
        _trans = _trans.map(item => {
          if(item.id == _ths.modalItem.id) item = _ths.modalItem
          return item
        })
      } else {
        _trans = store.state.transactions.filter(item => item.id != this.modalItem.id)
      }

      let _dep = 0
      let _wtd = 0

      _trans.forEach(item => {
        item.amount = Number(item.amount)
        if(item.status == 1) _dep += item.amount
        else _wtd += item.amount
      })

      let _sum = _dep - _wtd
      if(_sum < 0) {
        this.modalError = 'ไม่สำเร็จ'
        this.errorMsg = 'จำนวนเงินคงเหลือไม่พอ'
        this.$refs['modal-error'].show();
        return;
      }

      store.dispatch('updateTransaction', _trans);
      store.dispatch('updateToTalAmount', _sum);
    },
    handleAmount(val) {
      this.modalItem.amount = val
    },
    getDate(date) {
      let _date = new Date(date);
      return `${_date.getDate()}/${_date.getMonth()}/${_date.getFullYear()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`;
    },
    getPrice(num) {
      return new Intl.NumberFormat().format(num)
    }
  },
  computed: {
    items() {
      return store.state.transactions;
    }
  },
  components: { AmountInput }
}
</script>

<style scoped>
.re {
  position: relative;
}
.tb-con {
  position: absolute;
  height: 70vh;
  border-radius: 30px;
  overflow: hidden;
  top: -100px;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
    -webkit-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
}
.tb-scr {
  overflow: scroll;
  height: 85%;
}
.banner {
  height: 20vh;
  border-radius: 0px 0px 80px 80px;
  background-color:#e1032b;
}
</style>