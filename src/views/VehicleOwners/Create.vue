<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Vehicle Owners'}" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Vehicle Owner</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="store()">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputUsername">
                    <b>Username</b>
                  </label>
                  <input 
                    id="inputUsername"
                    type="text"
                    class="form-control"
                    placeholder="Masukkan username..."
                    v-model="vehicleOwner.username"
                  >
                  <div v-if="validation.username" class="text-danger">
                    {{ validation.username[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword">
                    <b>Password</b>
                  </label>
                  <input
                    id="inputPassword"
                    type="password"
                    class="form-control"
                    placeholder="Masukkan password..."
                    v-model="vehicleOwner.password"
                  >
                  <div v-if="validation.password" class="text-danger">
                    {{ validation.password[0] }}
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="inputFullname">
                    <b>Nama Lengkap</b>
                  </label>
                  <input
                    id="inputFullname"
                    type="text"
                    class="form-control"
                    placeholder="Masukkan nama lengkap..."
                    v-model="vehicleOwner.fullname"
                  >
                  <div v-if="validation.fullname" class="text-danger">
                    {{ validation.fullname[0] }}
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="inputAvatar">
                    <b>Avatar</b>
                  </label>
                  <input
                    id="inputAvatar"
                    type="text"
                    class="form-control"
                    placeholder="Masukkan avatar..."
                    v-model="vehicleOwner.avatar"
                  >
                  <div v-if="validation.avatar" class="text-danger">
                    {{ validation.avatar[0] }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputContact">
                    <b>Contact</b>
                  </label>
                  <input
                    id="inputContact"
                    type="tel"
                    class="form-control"
                    placeholder="Masukkan contact..."
                    v-model="vehicleOwner.contact"
                  >
                  <div v-if="validation.contact" class="text-danger">
                    {{ validation.contact[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail">
                    <b>Email</b>
                  </label>
                  <input
                    id="inputEmail"
                    type="email"
                    class="form-control"
                    placeholder="Masukkan email..."
                    v-model="vehicleOwner.email"
                  >
                  <div v-if="validation.email" class="text-danger">
                    {{ validation.email[0] }}
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
    const vehicleOwner = reactive({
      username: '',
      password: '',
      fullname: '',
      avatar: '',
      contact: '',
      email: '',
    });

    const validation = ref([]);

    const router = useRouter();

    function store() {
      axios.post(
        base_url + '/api/v1/vehicle_owners',
        vehicleOwner
      )
      .then(() => {
        router.push({
          name: 'Vehicle Owners'
        });
      })
      .catch((err) => {
        validation.value = err.response.data.errors
      })
    }

    return {
      vehicleOwner,
      validation,
      router,
      store
    }
  }
};
</script>
