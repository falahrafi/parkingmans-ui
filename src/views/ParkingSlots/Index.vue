<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12 col-lg-8">
        <router-link :to="{ name: 'Add Parking Slots'}" class="btn btn-add ms-2 mb-3">
          <i class="fas fa-plus"></i>&ensp; Tambah Parking Slot
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Parking Slots</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table text-center align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-black"
                    >
                      ID
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Slot Number
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Status
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Actions
                    </th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="parkingSlot, index in parkingSlots.data" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold text-black">{{ parkingSlot.id }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold label-black">{{ parkingSlot.slotNumber }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ getStatus(parkingSlot.statusId) }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <router-link
                        :to="{ name: 'Edit Parking Slots', params: {id: parkingSlot.id}}"
                        class="btn btn-edit"
                        >
                        <i class="fas fa-pen"></i>
                      </router-link>
                      <button
                        class="btn btn-delete ms-2"
                        @click.prevent="destroy(parkingSlot.id, index)"
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
    let parkingSlots = ref([]);
    let statuses = ref([]);
    
    onMounted(() => {
      // Ambil data parking slot
      axios.get(base_url + '/api/v1/parking_slots')
      .then((result) => {
        parkingSlots.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });

      // Ambil data parking slot statuses
      axios.get(base_url + '/api/v1/parking_slot_statuses')
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

    function destroy(id, index) {
      axios.delete(
        base_url + '/api/v1/parking_slots/' + id
      )
      .then(() => {
        parkingSlots.value.data.splice(index, 1)
      })
      .catch((err) => {
        console.log(err.response.data.errors)
      })
    }    

    return {
      parkingSlots,
      getStatus,
      destroy
    }
  }
};
</script>
