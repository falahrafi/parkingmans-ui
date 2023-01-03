<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Payments' }" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Ubah Payment</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="update()">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputBooking">
                    <b>Booking ID</b>
                  </label>
                  <select id="inputBooking" class="form-select" v-model="payment.bookingId">
                    <option hidden value="none">Pilih booking ID...</option>
                    <option v-for="booking, index in bookings.data" :key="index" :value="booking.id">
                      {{ booking.id }}
                    </option>
                  </select>
                  <div v-if="validation.bookingId" class="text-danger">
                    {{ validation.bookingId[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputAmount">
                    <b>Amount (Rupiah)</b>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">Rp</span>
                    <input id="inputAmount" type="number" class="form-control" min="1000" step="1000"
                      placeholder="Masukkan biaya parkir..." v-model="payment.amount">
                  </div>
                  <div v-if="validation.amount" class="text-danger">
                    {{ validation.amount[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputMethod">
                    <b>Method</b>
                  </label>
                  <select id="inputMethod" class="form-select" v-model="payment.method">
                    <option hidden value="none">Pilih metode pembayaran...</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfers">Bank Transfers</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                  <div v-if="validation.method" class="text-danger">
                    {{ validation.method[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputStatus">
                    <b>Status</b>
                  </label>
                  <select id="inputStatus" class="form-select" v-model="payment.statusId">
                    <option hidden value="none">Pilih status...</option>
                    <option value="0">Pending</option>
                    <option value="1">Completed</option>
                    <option value="2">Expired</option>
                    <option value="3">Cancelled</option>
                  </select>
                  <div v-if="validation.statusId" class="text-danger">
                    {{ validation.statusId[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPaidBy">
                    <b>Paid By</b>
                  </label>
                  <input id="inputPaidBy" type="text" class="form-control" placeholder="Masukkan nama pembayar..."
                    v-model="payment.paidBy">
                  <div v-if="validation.paidBy" class="text-danger">
                    {{ validation.paidBy[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputNotes">
                    <b>Notes</b>
                  </label>
                  <textarea id="inputNotes" class="form-control" rows="3" placeholder="Masukkan catatan..."
                    v-model="payment.notes">
                                  </textarea>
                  <div v-if="validation.notes" class="text-danger">
                    {{ validation.notes[0] }}
                  </div>
                </div>
              </div>
              <button class="btn btn-edit mt-2">
                <i class="fas fa-pen"></i>&ensp; Simpan Perubahan
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;

    // Data Binding
    let payment = reactive({
      bookingId: 'none',
      amount: '',
      method: 'none',
      statusId: 'none',
      notes: '',
      paidBy: '',
      paidDate: '',
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    function update() {
      axios.put(
        base_url + '/api/v1/payments/' + route.params.id,
        payment
      )
        .then(() => {
          router.push({
            name: 'Payments'
          });
        })
        .catch((err) => {
          validation.value = err.response.data.errors
          if (payment.bookingId == 'none') validation.value.bookingId = ['The booking field is required.']
          if (payment.method == 'none') validation.value.method = ['The method field is required.']
          if (payment.statusId == 'none') validation.value.statusId = ['The status field is required.']
        })        
    }

    // Reactive State
    let statuses = ref([]);
    let bookings = ref([]);

    onMounted(() => {
      // Ambil data payment statuses
      axios.get(base_url + '/api/v1/payment_statuses')
        .then((result) => {
          statuses.value = result.data;
        }).catch((err) => {
          console.log(err.response)
        });

      // Ambil data bookings
      axios.get(base_url + '/api/v1/bookings')
        .then((result) => {
          bookings.value = result.data;
        }).catch((err) => {
          console.log(err.response)
        });

      // Untuk mengisi nilai asli pada kolom-kolom di payment
      axios.get(
        base_url + '/api/v1/payments/' + route.params.id
      )
        .then((result) => {     
          payment.bookingId = result.data.data.bookingId
          payment.amount = result.data.data.amount
          payment.method = result.data.data.method
          payment.statusId = result.data.data.statusId
          payment.notes = result.data.data.notes
          payment.paidBy = result.data.data.paidBy
          payment.paidDate = result.data.data.paidDate
        })
        .catch((err) => {
          console.log(err.response)
        });          
    });

    function setCurrentDateTime() {
      payment.paidDate = moment().format().split('+')[0].split('T').join(' ')
    }

    return {
      payment,
      statuses,
      bookings,
      validation,
      router,
      route,
      update,
      setCurrentDateTime
    }
  }
};
</script>
