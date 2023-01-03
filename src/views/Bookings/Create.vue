<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Bookings'}" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Booking</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="store()">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputVehicle">
                    <b>Vehicle</b>
                  </label>
                  <select id="inputVehicle" class="form-select" v-model="booking.vehicleId">
                    <option hidden value="none">Pilih kendaraan...</option>
                    <option v-for="vehicle, index in vehicles.data" :key="index" :value="vehicle.id" @click="setVehicleOwnerId(vehicle.vehicleOwnerId)">
                      {{ vehicle.id }} - [{{vehicle.plateNumber }}]
                    </option>
                  </select>
                  <div v-if="validation.vehicleId" class="text-danger">
                    {{ validation.vehicleId[0] }}
                  </div>              
                </div>
                <div class="form-group col-md-6">
                  <label for="inputVehicleOwner">
                    <b>Vehicle Owner ID</b>
                  </label>
                  <input 
                    id="inputVehicleOwner"
                    type="text"
                    class="form-control"
                    placeholder="..."
                    v-model="booking.vehicleOwnerId"
                    readonly
                  >
                  <div v-if="validation.vehicleOwnerId" class="text-danger">
                    {{ validation.vehicleOwnerId[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputParkingSlot">
                    <b>Parking Slot</b>
                  </label>
                  <select id="inputParkingSlot" class="form-select" v-model="booking.parkingSlotId">
                    <option hidden value="none">Pilih parking slot...</option>
                    <option v-for="parkingSlotAvailable, index in parkingSlotsAvailable.data" :key="index" :value="parkingSlotAvailable.id">
                      {{ parkingSlotAvailable.id }} (Slot Number = {{ parkingSlotAvailable.slotNumber }})
                    </option>
                  </select>
                  <div v-if="validation.parkingSlotId" class="text-danger">
                    {{ validation.parkingSlotId[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputDuration">
                    <b>Duration (hours)</b>
                  </label>
                  <input id="inputDuration" type="number" class="form-control" min="1" placeholder="Masukkan durasi (jam)..."
                    v-model="booking.duration">
                  <div v-if="validation.duration" class="text-danger">
                    {{ validation.duration[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputStatus">
                    <b>Status</b>
                  </label>
                  <select id="inputStatus" class="form-select" v-model="booking.statusId">
                    <option hidden value="none">Pilih status...</option>
                    <option value="0">Processing</option>
                    <option value="1">Approved</option>
                    <option value="2">Rejected</option>
                    <option value="3">Cancelled</option>
                    <option value="4">Completed</option>
                  </select>
                  <div v-if="validation.statusId" class="text-danger">
                    {{ validation.statusId[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputNotes">
                    <b>Notes</b>
                  </label>
                  <textarea id="inputNotes" class="form-control" rows="3" placeholder="Masukkan catatan..."
                    v-model="booking.notes">
                                  </textarea>
                  <div v-if="validation.notes" class="text-danger">
                    {{ validation.notes[0] }}
                  </div>
                </div>
              </div>
              <button class="btn btn-add mt-2" @click="setCurrentDateTime()">
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
import moment from 'moment';
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;

    // Data Binding
    let booking = reactive({
      vehicleId: 'none',
      vehicleOwnerId: '',
      parkingSlotId: 'none',
      duration: '',
      statusId: 'none',
      notes: '',
      bookedDate: '',
    });

    const validation = ref([]);

    const router = useRouter();

    function store() {
      axios.post(
        base_url + '/api/v1/bookings',
        booking
      )
      .then(() => {
        router.push({
          name: 'Bookings'
        });
      })
      .catch((err) => {
        validation.value = err.response.data.errors
        if (booking.statusId == 'none') validation.value.statusId = ['The status field is required.']
        if (booking.vehicleId == 'none') validation.value.vehicleId = ['The vehicle field is required.']
        if (booking.parkingSlotId == 'none') validation.value.parkingSlotId = ['The parking slot field is required.']
      })
    }

    // Reactive State
    let statuses = ref([]);
    let vehicles = ref([]);
    let parkingSlotsAvailable = ref([]);

    onMounted(() => {
      // Ambil data booking statuses
      axios.get(base_url + '/api/v1/booking_statuses')
        .then((result) => {
          statuses.value = result.data;
        }).catch((err) => {
          console.log(err.response)
        });

      // Ambil data vehicles
      axios.get(base_url + '/api/v1/vehicles')
        .then((result) => {
          vehicles.value = result.data;
        }).catch((err) => {
          console.log(err.response)
        });        

      // Ambil data parking slots
      axios.get(base_url + '/api/v1/parking_slots')
        .then((result) => {
          // Hanya masukkan parking slot yang available
          let psa = {data: []};
          result.data.data.forEach(r => {
            if (r.statusId==0) {
              psa.data.push(r);
            }
          });
          parkingSlotsAvailable.value = psa;
        })
        .catch((err) => {
          console.log(err.response)
        });        
    });

    function setCurrentDateTime() {
      booking.bookedDate = moment().format().split('+')[0].split('T').join(' ')
    }

    function setVehicleOwnerId(id) {
      booking.vehicleOwnerId = id;
    }

    return {
      booking,
      statuses,
      vehicles,
      parkingSlotsAvailable,
      validation,
      router,
      store,
      setCurrentDateTime,
      setVehicleOwnerId
    }
  }
};
</script>
