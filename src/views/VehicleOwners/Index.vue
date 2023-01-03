<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Add Vehicle Owners'}" class="btn btn-add ms-2 mb-3">
          <i class="fas fa-plus"></i>&ensp; Tambah Vehicle Owner
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Vehicle Owners</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-black"
                    >
                      ID
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Avatar
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Owner
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Contact
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Email
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="vehicleOwner, index in vehicleOwners.data" :key="index">
                    <td class="align-middle text-center">
                      <span class="text-secondary text-xs font-weight-bold text-black">{{ vehicleOwner.id }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ vehicleOwner.avatar }}</span>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div>
                          <soft-avatar
                            :img="img1"
                            size="sm"
                            border-radius="lg"
                            class="me-3"
                            alt="user1"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ vehicleOwner.fullname }}</h6>
                          <p class="text-xs text-secondary mb-0">
                            {{ vehicleOwner.username }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ vehicleOwner.contact }}</span>
                    </td>
                    <td>
                      <span class="text-secondary text-xs font-weight-bold">{{ vehicleOwner.email }}</span>
                    </td>
                    <td>
                      <router-link
                        :to="{ name: 'Edit Vehicle Owners', params: {id: vehicleOwner.id}}"
                        class="btn btn-edit"
                        >
                        <i class="fas fa-pen"></i>
                      </router-link>
                      <button
                        class="btn btn-delete ms-2"
                        @click.prevent="destroy(vehicleOwner.id, index)"
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
import SoftAvatar from "@/components/SoftAvatar.vue";
// import SoftButton from "@/components/SoftButton.vue";
// import SoftBadge from "@/components/SoftBadge.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";

import axios from 'axios';
import { onMounted, ref, getCurrentInstance } from 'vue';

export default {
  name: "authors-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
    };
  },
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;
    
    // Reactive State
    let vehicleOwners = ref([]);
    
    onMounted(() => {
      // Get data from API Endpoint
      axios.get(base_url + '/api/v1/vehicle_owners')
      .then((result) => {
        vehicleOwners.value = result.data;
      }).catch((err) => {
        console.log(err.response)
      });
    });

    function destroy(id, index) {
      axios.delete(
        base_url + '/api/v1/vehicle_owners/' + id
      )
      .then(() => {
        vehicleOwners.value.data.splice(index, 1)
      })
      .catch((err) => {
        console.log(err.response.data.errors)
      })
    }    

    return {
      vehicleOwners,
      destroy
    }
  },
  components: {
    SoftAvatar,
    // SoftButton,
    // SoftBadge,
  },
};
</script>
