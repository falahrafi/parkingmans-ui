<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <h6>Payment Statuses</h6>
            <h5 v-if="isFullyLoaded==false" class="text-center my-5">
              <div class="spinner-border loading-spinner" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="loading-text">
                Sedang mengambil data...
              </div>
            </h5>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="container">
              <div
                class="custom-card mb-3"
                v-for="paymentStatus, index in paymentStatuses.data" :key="index"
              >
                <span class="label-id-orange">{{ paymentStatus.id }}</span>
                &nbsp;{{ paymentStatus.statusName }}
              </div>
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
    let paymentStatuses = ref([]);

    let isFullyLoaded = ref([]);
    
    onMounted(() => {
      // Ambil data vehicle categories
      axios.get(base_url + '/api/v1/payment_statuses')
      .then((result) => {
        isFullyLoaded.value = true;
        paymentStatuses.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });
    });

    return {
      paymentStatuses,
      isFullyLoaded,
    }
  }
};
</script>
