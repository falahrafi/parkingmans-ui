<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Vehicles' }" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Ubah Vehicle</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="update()">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputCategory">
                    <b>Category</b>
                  </label>
                  <select id="inputCategory" class="form-select" v-model="vehicle.vehicleCategoryId">
                    <option hidden value="0">Pilih kategori...</option>
                    <option value="1" selected>Car</option>
                    <option value="2">Motorcycle</option>
                    <option value="3">Bicycle</option>
                    <option value="4">Truck</option>
                    <option value="5">Bus</option>
                  </select>
                  <div v-if="validation.vehicleCategoryId" class="text-danger">
                    {{ validation.vehicleCategoryId[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPlateNumber">
                    <b>Plate Number</b>
                  </label>
                  <input id="inputPlateNumber" type="text" class="form-control"
                    placeholder="Masukkan nomor kendaraan..." v-model="vehicle.plateNumber">
                  <div v-if="validation.plateNumber" class="text-danger">
                    {{ validation.plateNumber[0] }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputDescription">
                    <b>Description</b>
                  </label>
                  <textarea id="inputDescription" class="form-control" rows="3"
                    placeholder="Masukkan deskripsi kendaraan..." v-model="vehicle.description">
                  </textarea>
                  <div v-if="validation.description" class="text-danger">
                    {{ validation.description[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputImage">
                    <b>Image</b>
                  </label>
                  <input id="inputImage" type="text" class="form-control" placeholder="Masukkan gambar..."
                    v-model="vehicle.image">
                  <div v-if="validation.image" class="text-danger">
                    {{ validation.image[0] }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputOwner">
                    <b>Owner</b>
                  </label>
                  <select id="inputOwner" class="form-select" v-model="vehicle.vehicleOwnerId">
                    <option hidden value="0">Pilih pemilik kendaraan...</option>
                    <option v-for="vehicleOwner, index in vehicleOwners.data" :key="index" :value="vehicleOwner.id">
                      {{ vehicleOwner.id }} - {{ vehicleOwner.fullname }}
                    </option>
                  </select>
                  <div v-if="validation.vehicleOwnerId" class="text-danger">
                    {{ validation.vehicleOwnerId[0] }}
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
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;

    // Data Binding
    const vehicle = reactive({
      vehicleCategoryId: 0,
      plateNumber: '',
      description: '',
      image: '',
      vehicleOwnerId: 0,
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    function update() {
      axios.put(
        base_url + '/api/v1/vehicles/' + route.params.id,
        vehicle
      )
      .then(() => {
        router.push({
          name: 'Vehicles'
        });
      })
      .catch((err) => {
        validation.value = err.response.data.errors
        if (vehicle.vehicleOwnerId == 0) validation.value.vehicleOwnerId = ['The vehicle owner field is required.']
        if (vehicle.vehicleCategoryId == 0) validation.value.vehicleCategoryId = ['The vehicle category field is required.']
      })
    }

    // Reactive State
    let vehicleOwners = ref([]);

    onMounted(() => {
      // Untuk menu pilihan vehicle owner
      axios.get(base_url + '/api/v1/vehicle_owners')
        .then((result) => {
          vehicleOwners.value = result.data;
        }).catch((err) => {
          console.log(err.response)
        });


      // Untuk mengisi nilai asli pada kolom-kolom di vehicle
      axios.get(
        base_url + '/api/v1/vehicles/' + route.params.id
      )
      .then((result) => {
        vehicle.vehicleCategoryId = result.data.data.vehicleCategoryId
        vehicle.plateNumber = result.data.data.plateNumber
        vehicle.description = result.data.data.description
        vehicle.image = result.data.data.image
        vehicle.vehicleOwnerId = result.data.data.vehicleOwnerId
      })
      .catch((err) => {
        console.log(err.response)
      });      

    });

    return {
      vehicle,
      vehicleOwners,
      validation,
      router,
      update
    }
  }
};
</script>
