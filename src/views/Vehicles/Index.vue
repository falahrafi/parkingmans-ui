<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Add Vehicles'}" class="btn btn-add ms-2 mb-3">
          <i class="fas fa-plus"></i>&ensp; Tambah Vehicle
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Vehicles</h6>
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
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Plate Number
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Category
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Description
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Image
                    </th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Vehicle Owner ID
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Actions
                    </th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="vehicle, index in vehicles.data" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold text-black">{{ vehicle.id }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ vehicle.plateNumber }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ getCategory(vehicle.vehicleCategoryId) }}</span>
                    </td>
                    <td style="width: 20%">
                      <p class="text-secondary text-wrap text-xs font-weight-bold">{{ vehicle.description }}</p>
                    </td>
                    <td>
                      <div>
                        <img :src="'images/'+vehicle.image" width="150" class="img-thumbnail mb-2" />
                      </div>
                      <!-- <span class="text-secondary text-xs font-weight-bold">{{ vehicle.image }}</span> -->
                    </td>
                    <td class="text-center">
                      <span class="text-secondary text-xs font-weight-bold label-black">{{ vehicle.vehicleOwnerId }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <router-link
                        :to="{ name: 'Edit Vehicles', params: {id: vehicle.id}}"
                        class="btn btn-edit"
                        >
                        <i class="fas fa-pen"></i>
                      </router-link>
                      <button
                        class="btn btn-delete ms-2"
                        @click.prevent="destroy(vehicle.id, index)"
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
    let vehicles = ref([]);
    let categories = ref([]);

    let isFullyLoaded = ref([]);
    
    onMounted(() => {
      // Ambil data vehicle
      axios.get(base_url + '/api/v1/vehicles')
      .then((result) => {
        isFullyLoaded.value = true;
        vehicles.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });

      // Ambil data vehicle categories
      axios.get(base_url + '/api/v1/vehicle_categories')
      .then((result) => {
        categories.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });
    });

    function getCategory(id) {
      let cn;
      if (categories.value.data) {
        categories.value.data.forEach(c => {
          if (c.id == id) {
            cn = c.categoryName;
          }
        });
      }
      return cn;
    }

    function destroy(id, index) {
      axios.delete(
        base_url + '/api/v1/vehicles/' + id
      )
      .then(() => {
        vehicles.value.data.splice(index, 1)
      })
      .catch((err) => {
        console.log(err.response.data.errors)
      })
    }    

    return {
      vehicles,
      isFullyLoaded,
      getCategory,
      destroy
    }
  }
};
</script>
