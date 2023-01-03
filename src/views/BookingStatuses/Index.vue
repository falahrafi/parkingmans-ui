<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card mb-4">
          <div class="card-header pb-0 mb-3">
            <h6>Booking Statuses</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="container">
              <div
                class="custom-card mb-3"
                v-for="bookingStatus, index in bookingStatuses.data" :key="index"
              >
                <span class="label-id-orange">{{ bookingStatus.id }}</span>
                &nbsp;{{ bookingStatus.statusName }}
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
    let bookingStatuses = ref([]);
    
    onMounted(() => {
      // Ambil data vehicle categories
      axios.get(base_url + '/api/v1/booking_statuses')
      .then((result) => {
        bookingStatuses.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });
    });

    return {
      bookingStatuses
    }
  }
};
</script>
