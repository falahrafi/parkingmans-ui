<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Add Bookings'}" class="btn btn-add ms-2 mb-3">
          <i class="fas fa-plus"></i>&ensp; Tambah Booking
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Bookings</h6>
            <h3 v-if="isFullyLoaded==false" class="text-center mt-4 mb-5">
              <div class="spinner-border loading-spinner" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="loading-text">
                Sedang mengambil data...
              </div>
            </h3>
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
                      Booked Date
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Vehicle ID
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Vehicle Owner ID
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Duration
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Status
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Parking Slot ID
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Notes
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Actions
                    </th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking, index in bookings.data" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold text-black">{{ booking.id }}</span>
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold">{{ booking.bookedDate }}</span>
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold label-black">{{ booking.vehicleId }}</span>
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold label-black">{{ booking.vehicleOwnerId }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ getDuration(booking.duration) }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ getStatus(booking.statusId) }}</span>
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold label-black">{{ booking.parkingSlotId }}</span>
                    </td>
                    <td style="width: 20%">
                      <p class="text-secondary text-wrap text-xs font-weight-bold">{{ booking.notes }}</p>
                    </td>
                    <td class="align-middle text-center">
                      <router-link
                        :to="{ name: 'Edit Bookings', params: {id: booking.id}}"
                        class="btn btn-edit"
                        >
                        <i class="fas fa-pen"></i>
                      </router-link>
                      <button
                        class="btn btn-delete ms-2"
                        @click.prevent="destroy(booking.id, index)"
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
    let bookings = ref([]);
    let statuses = ref([]);

    let isFullyLoaded = ref([]);
    
    onMounted(() => {
      // Ambil data booking
      axios.get(base_url + '/api/v1/bookings')
      .then((result) => {
        isFullyLoaded.value = true;
        bookings.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });

      // Ambil data booking statuses
      axios.get(base_url + '/api/v1/booking_statuses')
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

    function getDuration(d) {
      if (d==1) return d + ' hour';
      else if (d<24) return d + ' hours';
      else {
        d/=24;
        if (d==1) return d + ' day'
        else return d + ' days'
      }
    }

    function destroy(id, index) {
      axios.delete(
        base_url + '/api/v1/bookings/' + id
      )
      .then(() => {
        bookings.value.data.splice(index, 1)
      })
      .catch((err) => {
        console.log(err.response.data.errors)
      })
    }    

    return {
      bookings,
      isFullyLoaded,
      getStatus,
      getDuration,
      destroy
    }
  }
};
</script>
