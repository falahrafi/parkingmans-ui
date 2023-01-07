/**
=========================================================
* Vue Soft UI Dashboard - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import "./assets/css/custom-button.css";
import "./assets/css/custom.css";

const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);

appInstance.config.devtools = true;

appInstance.config.globalProperties.baseUrl = 'https://falahrafi-webservice.my.id';
// appInstance.config.globalProperties.baseUrl = "http://127.0.0.1:8000";

appInstance.mount("#app");
