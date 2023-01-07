<template>
  <div class="py-4 container-fluid">
    <div class="row justify-content-center mb-5">
      <div class="col-lg-11 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-3 me-4 text-center mt-5 mt-lg-0">
                <img
                  class="w-100 position-relative z-index-2 dashboard-photo"
                  src="../assets/img/falah-photo.jpg"
                  alt="Falah"
                />                
              </div>
              <div class="col-lg-8">
                <div class="d-flex flex-column h-100">
                  <p class="mb-1 pt-2 text-bold">20.01.53.0033</p>
                  <h5 class="font-weight-bolder">Muhammad Falah Abdurrafi</h5>
                  <p class="dashboard-paragraph">
                    Aplikasi ini dikembangkan untuk memenuhi tugas proyek akhir dari mata kuliah <b>Web Service</b> yang diampu oleh bapak <b>Mardi Siswo Utomo</b>.
                  </p>
                  <router-link
                    class="btn btn-add"
                    :to="{ name: 'Vehicles' }"
                  >
                    Lihat Table
                    <i
                      class="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-8 mb-lg-0 mb-4">
        <div class="card">
          <div class="p-3 pb-0 card-header bg-dark text-center">
            <h5 class="mb-2 text-white"><b>Layanan API</b></h5>
          </div>
          <div class="card-body p-3 bg-dark">
            <p class="endpoint-api-text">
              <b>GET&ensp;</b> https://falahrafi-webservice.my.id/api/v1/<span class="opacity-5">{nama_table}</span>
            </p>
            <p class="endpoint-api-text">
              <b>POST&ensp;</b> https://falahrafi-webservice.my.id/api/v1/<span class="opacity-5">{nama_table}</span>
            </p>
            <p class="endpoint-api-text">
              <b>PUT&ensp;</b> https://falahrafi-webservice.my.id/api/v1/<span class="opacity-5">{nama_table}</span>/<span class="opacity-5">{id}</span>
            </p>
            <p class="endpoint-api-text">
              <b>DELETE&ensp;</b> https://falahrafi-webservice.my.id/api/v1/<span class="opacity-5">{nama_table}</span>/<span class="opacity-5">{id}</span>
            </p>
            <div class="text-center mt-4">
              <a :href="`${publicPath}files/Dok-API-WS-A1-2001530033.pdf`" class="btn btn-edit ms-2 mb-3">
                <i class="fas fa-file-download"></i>&ensp;Download Dokumentasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "dashboard-default",
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  }
};
</script>
