<template>
<div>
  <div class="col-12">
    <div class="col-12 banner"></div>
    <div class="col-12">
      <div class="row no-gutters justify-content-center c-con">
        <div class="col-10 col-md-7 col-lg-7 bg-white p-4 c-in">
          <b>ยอดเงินคงเหลือ</b>
          <hr class="">
          <h1><b>{{getPrice(totalAmount)}} <span class="curr">THB</span></b></h1>
        </div>
      </div>
      
    </div>
  </div>
  <div class="col-12 pt-4 s-con"></div>
  <div class="col-12">
    <div class="row no-gutters justify-content-center">
      <div class="col-10 col-md-7 col-lg-7 bg-white p-4 am-con">
        <div class="col-12 mb-4">
          <AmountInput  :msg="msgAmount" @onAmountChange="handleAmount" />
        </div>
        
        <div class="d-flex flex-row">
          <div class="col-6"><b-btn variant="success" class="w-100" @click="onClickBtn(1)">Deposit</b-btn></div>
        <div class="col-6"><b-btn variant="danger" class="w-100" @click="onClickBtn(2)">Withdraw</b-btn></div>
        </div>
        
      </div>
      
    </div>
  </div>

  <b-modal 
    id="modal-center" 
    ref="modal-center"  
    :title="modalHead"
    @ok="handleOk"
  >
    <p class="">
      จำนวนเงิน {{amount}} บาท
    </p>
  </b-modal>

  <b-modal id="modal-error" ref="modal-error" :title="modalError">
    <p class="">{{ errorMsg }}</p>
  </b-modal>
</div>
  
</template>

<script>
import store from "@/store";
import { EventBus } from '@/event-bus';
import AmountInput from "./AmountInput.vue";

export default {
  name: "DepositWithdraw",
  components: { AmountInput },
  mounted() {
  },
  data() {
    return {
      amount: 0,
      modalHead: "",
      msgAmount: "",
      modalError: "",
      errorMsg: "",
      status: 1
    };
  },
  methods: {
    onClickBtn(status) {
      this.status = status
      this.modalHead =  "ยืนยันการฝาก-ถอน"
      this.$refs['modal-center'].show()
    },
    handleOk() {
      this.onCreateTrans(this.status);
    },
    onCreateTrans(status) {
      console.log('create')
      if (this.amount == 0) {
        this.msgAmount = "กรุณาใส่ตัวเลขมากกว่า 1";
        return;
      }
      if(status == 2 && this.amount > this.totalAmount) {
        this.errorMsg = "ยอดเงินคงเหลือไม่พอ"
        this.$refs['modal-error'].show()
        return;
      }
      let _trans = {
        amount: this.amount,
        status: status,
      };
      store.dispatch("createTransaction", _trans);
      EventBus.$emit('cleared', true)
    },
    handleAmount(val) {
      this.amount = Number(val);
      this.msgAmount = "";
    },
    getPrice(num) {
      return new Intl.NumberFormat().format(num)
    }
  },
  computed: {
    totalAmount() {
      return store.state.totalAmount;
    },
  },
  
};
</script>

<style scoped>
  .banner {
    height: 20vh;
    border-radius: 0px 0px 80px 80px;
    background-color:#e1032b;
  }
  .curr {
    color: #e1032b;
    font-size: 1.4rem;
  }
  .c-con {
    position: relative;
  }
  .c-in {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
    -webkit-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
  }
  .s-con {
    height: 100px;
  }
  .am-con {
    border-radius: 30px;
    box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
    -webkit-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 1px 6px 5px 0px rgba(0,0,0,0.15);
  }
</style>