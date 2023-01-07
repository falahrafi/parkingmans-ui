<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Vehicle Owners'}" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Ubah Vehicle Owner</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="update()">
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
              <!-- <div class="form-row">
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
              </div> -->
              <div class="form-row">
                <div class="form-group col">
                  <label for="inputAvatar" class="form-label">
                    Avatar
                  </label>
                  <div v-if="previewImage">
                    <img :src="previewImage" width="150" class="img-thumbnail mb-2" />
                  </div>
                  <input class="form-control" type="file" id="inputAvatar" @change="upload">
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
              <button class="btn btn-edit mt-2">
                <i class="fas fa-pen"></i>&ensp; Simpan Perubahan
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
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;

    // Data Binding
    let vehicleOwner = reactive({
      username: '',
      password: '',
      fullname: '',
      avatar: '',
      contact: '',
      email: '',
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios.get(
        base_url + '/api/v1/vehicle_owners/' + route.params.id
      )
      .then((result) => {
        vehicleOwner.username = result.data.data.username
        vehicleOwner.password = result.data.data.password
        vehicleOwner.fullname = result.data.data.fullname
        vehicleOwner.avatar = result.data.data.avatar
        vehicleOwner.contact = result.data.data.contact
        vehicleOwner.email = result.data.data.email
        previewImage.value = '../../images/' + result.data.data.avatar
      })
      .catch((err) => {
        console.log(err.response)
      });
    });

    function update() {
      // Siapkan Form Data
      let formData = new FormData()
      formData.append('username', vehicleOwner.username)
      formData.append('password', vehicleOwner.password)
      formData.append('fullname', vehicleOwner.fullname)
      formData.append('avatar', vehicleOwner.avatar)
      formData.append('contact', vehicleOwner.contact)
      formData.append('email', vehicleOwner.email)
      
      // Karena axios.put tidak bisa memproses FormData
      formData.append("_method", "PUT");
      axios.post(
        base_url + '/api/v1/vehicle_owners/' + route.params.id,
        formData
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

    let previewImage = ref([]);
    previewImage.value = null;

    function upload(e) {
      let files = e.target.files[0]
      previewImage.value = URL.createObjectURL(files)
      vehicleOwner.avatar = files
    }

    return {
      vehicleOwner,
      validation,
      router,
      update,
      previewImage,
      upload
    }
  }
};
</script>
