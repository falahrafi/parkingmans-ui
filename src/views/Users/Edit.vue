<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'Users' }" class="btn btn-back ms-2 mb-3">
          <i class="fas fa-arrow-left"></i>&ensp; Kembali
        </router-link>
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Ubah User</h6>
          </div>
          <div class="card-body p-4">

            <form @submit.prevent="update()">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="inputUsername">
                    <b>Username</b>
                  </label>
                  <input id="inputUsername" type="text" class="form-control" placeholder="Masukkan username..."
                    v-model="user.username">
                  <div v-if="validation.username" class="text-danger">
                    {{ validation.username[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword">
                    <b>Password</b>
                  </label>
                  <input id="inputPassword" type="password" class="form-control" placeholder="Masukkan password..."
                    v-model="user.password">
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
                  <input id="inputFullname" type="text" class="form-control" placeholder="Masukkan nama lengkap..."
                    v-model="user.fullname">
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
                  <input id="inputAvatar" type="text" class="form-control" placeholder="Masukkan avatar..."
                    v-model="user.avatar">
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
                  <input id="inputContact" type="tel" class="form-control" placeholder="Masukkan contact..."
                    v-model="user.contact">
                  <div v-if="validation.contact" class="text-danger">
                    {{ validation.contact[0] }}
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputEmail">
                    <b>Email</b>
                  </label>
                  <input id="inputEmail" type="email" class="form-control" placeholder="Masukkan email..."
                    v-model="user.email">
                  <div v-if="validation.email" class="text-danger">
                    {{ validation.email[0] }}
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="inputUserLevel">
                  <b>User Level</b>
                </label>
                <select id="inputUserLevel" class="form-select" v-model="user.userLevel">
                  <option hidden value="none">Pilih user level...</option>
                  <option value="1">[1] Basic User</option>
                  <option value="2">[2] Admin</option>
                </select>
                <div v-if="validation.userLevel" class="text-danger">
                  {{ validation.userLevel[0] }}
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
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const base_url = getCurrentInstance().appContext.config.globalProperties.baseUrl;

    // Data Binding
    const user = reactive({
      username: '',
      password: '',
      fullname: '',
      avatar: '',
      contact: '',
      email: '',
      userLevel: 'none',
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    function update() {
      // Siapkan Form Data
      let formData = new FormData()
      formData.append('username', user.username)
      formData.append('password', user.password)
      formData.append('fullname', user.fullname)
      formData.append('avatar', user.avatar)
      formData.append('contact', user.contact)
      formData.append('email', user.email)
      formData.append('userLevel', user.userLevel)

      // Karena axios.put tidak bisa memproses FormData
      formData.append("_method", "PUT");
      axios.post(
        base_url + '/api/v1/users/' + route.params.id,
        formData
      )
        .then(() => {
          router.push({
            name: 'Users'
          });
        })
        .catch((err) => {
          validation.value = err.response.data.errors
          if (user.userLevel == 'none') validation.value.userLevel = ['The user level is required.']
        })
    }

    onMounted(() => {
      // Untuk mengisi nilai asli pada kolom-kolom di user
      axios.get(
        base_url + '/api/v1/users/' + route.params.id
      )
        .then((result) => {
          user.username = result.data.data.username
          user.password = result.data.data.password
          user.fullname = result.data.data.fullname
          user.avatar = result.data.data.avatar
          user.contact = result.data.data.contact
          user.email = result.data.data.email
          user.userLevel = result.data.data.userLevel
          previewImage.value = '../../images/' + result.data.data.avatar
        })
        .catch((err) => {
          console.log(err.response)
        });
    });   

    let previewImage = ref([]);
    previewImage.value = null;

    function upload(e) {
      let files = e.target.files[0]
      previewImage.value = URL.createObjectURL(files)
      user.avatar = files
    }

    return {
      user,
      validation,
      router,
      route,
      update,
      previewImage,
      upload
    }
  }
};
</script>
