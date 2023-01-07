<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          Vehicle
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Vehicles" :to="{ name: 'Vehicles' }">
          <template #icon>
            <vehicle />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Vehicle Owners" :to="{ name: 'Vehicle Owners' }">
          <template #icon>
            <vehicle-owner />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Vehicle Categories" :to="{ name: 'Vehicle Categories' }">
          <template #icon>
            <vehicle-category />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          Parking Slot
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Parking Slots" :to="{ name: 'Parking Slots' }">
          <template #icon>
            <parking />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Parking Slot Statuses" :to="{ name: 'Parking Slot Statuses' }">
          <template #icon>
            <status />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          Booking
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Bookings" :to="{ name: 'Bookings' }">
          <template #icon>
            <booking />
          </template>
        </sidenav-collapse>
      </li>      
      <li class="nav-item">
        <sidenav-collapse navText="Booking Statuses" :to="{ name: 'Booking Statuses' }">
          <template #icon>
            <status />
          </template>
        </sidenav-collapse>
      </li>      
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          Payment
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Payments" :to="{ name: 'Payments' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>      
      <li class="nav-item">
        <sidenav-collapse navText="Payment Statuses" :to="{ name: 'Payment Statuses' }">
          <template #icon>
            <status />
          </template>
        </sidenav-collapse>
      </li>      
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          User
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Users" :to="{ name: 'Users' }">
          <template #icon>
            <user />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <!-- <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
      route="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
      label="Documentation"
      icon="ni ni-diamond"
    />
    <a
      class="btn bg-gradient-success mt-4 w-100"
      href="https://www.creative-tim.com/product/vue-soft-ui-dashboard-pro?ref=vsud"
      type="button"
      >Upgrade to pro</a
    >
  </div> -->
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
// import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";

import Status from "../../components/Icon/Status.vue";
import Vehicle from "../../components/Icon/Vehicle.vue";
import VehicleOwner from "../../components/Icon/VehicleOwner.vue";
import VehicleCategory from "../../components/Icon/VehicleCategory.vue";
import Parking from "../../components/Icon/Parking.vue";
import Booking from "../../components/Icon/Booking.vue";
// import Payment from "../../components/Icon/Payment.vue";
import User from "../../components/Icon/User.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    // SidenavCard,
    Status,
    Vehicle,
    VehicleOwner,
    VehicleCategory,
    Parking,
    Booking,
    // Payment,
    User,
    Shop,
    CreditCard,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
