<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Parking Slots'}" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Parking Slot</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="store()">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputSlotNumber">
                    <b>Slot Number</b>
                  </label>
                  <input 
                    id="inputSlotNumber"
                    type="number"
                    min="1"
                    class="form-control"
                    placeholder="Masukkan nomor kendaraan..."
                    v-model="parkingSlot.slotNumber"
                  >
                  <div v-if="validation.slotNumber" class="text-danger">
                    {{ validation.slotNumber[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputStatus">
                    <b>Status</b>
                  </label>
                  <select id="inputStatus" class="form-select" v-model="parkingSlot.statusId">
                    <option hidden value="none">Pilih status...</option>
                    <option value="0" selected>Available</option>
                    <option value="1">Occupied</option>
                    <option value="2">Reserved</option>
                  </select>
                  <div v-if="validation.statusId" class="text-danger">
                    {{ validation.statusId[0] }}
                  </div>
                </div>
              </div>
              <button class="btn btn-add mt-2">
                <i class="fas fa-plus"></i>&ensp; Tambahkan
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
import { reactive, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;

    // Data Binding
    const parkingSlot = reactive({
      slotNumber: '',
      statusId: 'none',
    });

    const validation = ref([]);

    const router = useRouter();

    function store() {
      axios.post(
        base_url + '/api/v1/parking_slots',
        parkingSlot
      )
      .then(() => {
        router.push({
          name: 'Parking Slots'
        });
      })
      .catch((err) => {
        validation.value = err.response.data.errors
        if (parkingSlot.statusId == 'none') validation.value.statusId = ['The status field is required.']
      })
    }

    return {
      parkingSlot,
      validation,
      router,
      store
    }
  }
};
</script>
