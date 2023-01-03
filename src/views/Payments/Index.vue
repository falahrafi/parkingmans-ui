<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Add Payments'}" class="btn btn-add ms-2 mb-3">
          <i class="fas fa-plus"></i>&ensp; Tambah Payment
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Payments</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-black"
                    >
                      ID
                    </th>
                    <th class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Paid Date
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Paid By
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Amount
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Method
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Status
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Notes
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Booking ID
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Actions
                    </th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="payment, index in payments.data" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold text-black">{{ payment.id }}</span>
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{ payment.paidDate }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ payment.paidBy }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ getAmount(payment.amount) }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ payment.method }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ getStatus(payment.statusId) }}</span>
                    </td>
                    <td style="width: 20%">
                      <p class="text-secondary text-wrap text-xs font-weight-bold">{{ payment.notes }}</p>
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold label-black">{{ payment.bookingId }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <router-link
                        :to="{ name: 'Edit Payments', params: {id: payment.id}}"
                        class="btn btn-edit"
                        >
                        <i class="fas fa-pen"></i>
                      </router-link>
                      <button
                        class="btn btn-delete ms-2"
                        @click.prevent="destroy(payment.id, index)"
                        >
                        <i class="fas fa-trash"></i>
                      </button>                
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref, getCurrentInstance } from 'vue';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;
    
    // Reactive State
    let payments = ref([]);
    let statuses = ref([]);
    
    onMounted(() => {
      // Ambil data payment
      axios.get(base_url + '/api/v1/payments')
      .then((result) => {
        payments.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });

      // Ambil data payment statuses
      axios.get(base_url + '/api/v1/payment_statuses')
      .then((result) => {
        statuses.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });
    });

    function getStatus(id) {
      let sn;
      if (statuses.value.data) {
        statuses.value.data.forEach(c => {
          if (c.id == id) {
            sn = c.statusName;
          }
        });
      }
      return sn;
    }

    function getAmount(a) {
      // Create our number formatter.
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      return formatter.format(a)
    }

    function destroy(id, index) {
      axios.delete(
        base_url + '/api/v1/payments/' + id
      )
      .then(() => {
        payments.value.data.splice(index, 1)
      })
      .catch((err) => {
        console.log(err.response.data.errors)
      })
    }    

    return {
      payments,
      getStatus,
      getAmount,
      destroy
    }
  }
};
</script>
