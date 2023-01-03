import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";

import Vehicles from "@/views/Vehicles/Index.vue";
import VehiclesCreate from "@/views/Vehicles/Create.vue";
import VehiclesEdit from "@/views/Vehicles/Edit.vue";

import VehicleOwners from "@/views/VehicleOwners/Index.vue";
import VehicleOwnersCreate from "@/views/VehicleOwners/Create.vue";
import VehicleOwnersEdit from "@/views/VehicleOwners/Edit.vue";

import VehicleCategories from "@/views/VehicleCategories/Index.vue";

import ParkingSlots from "@/views/ParkingSlots/Index.vue";
import ParkingSlotsCreate from "@/views/ParkingSlots/Create.vue";
import ParkingSlotsEdit from "@/views/ParkingSlots/Edit.vue";

import ParkingSlotStatuses from "@/views/ParkingSlotStatuses/Index.vue";

import Bookings from "@/views/Bookings/Index.vue";
import BookingsCreate from "@/views/Bookings/Create.vue";
import BookingsEdit from "@/views/Bookings/Edit.vue";

import BookingStatuses from "@/views/BookingStatuses/Index.vue";

import Payments from "@/views/Payments/Index.vue";
import PaymentsCreate from "@/views/Payments/Create.vue";
import PaymentsEdit from "@/views/Payments/Edit.vue";

import PaymentStatuses from "@/views/PaymentStatuses/Index.vue";

import Users from "@/views/Users/Index.vue";
import UsersCreate from "@/views/Users/Create.vue";
import UsersEdit from "@/views/Users/Edit.vue";

import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: Vehicles,
  },
  {
    path: "/vehicles/create",
    name: "Add Vehicles",
    component: VehiclesCreate,
  },
  {
    path: "/vehicles/edit/:id",
    name: "Edit Vehicles",
    component: VehiclesEdit,
  },
  {
    path: "/vehicle-owners",
    name: "Vehicle Owners",
    component: VehicleOwners,
  },
  {
    path: "/vehicle-owners/create",
    name: "Add Vehicle Owners",
    component: VehicleOwnersCreate,
  },
  {
    path: "/vehicle-owners/edit/:id",
    name: "Edit Vehicle Owners",
    component: VehicleOwnersEdit,
  },
  {
    path: "/vehicle-categories",
    name: "Vehicle Categories",
    component: VehicleCategories,
  },
  {
    path: "/parking-slots",
    name: "Parking Slots",
    component: ParkingSlots,
  },
  {
    path: "/parking-slots/create",
    name: "Add Parking Slots",
    component: ParkingSlotsCreate,
  },
  {
    path: "/parking-slots/edit/:id",
    name: "Edit Parking Slots",
    component: ParkingSlotsEdit,
  },
  {
    path: "/parking-slot-statuses",
    name: "Parking Slot Statuses",
    component: ParkingSlotStatuses,
  },
  {
    path: "/bookings",
    name: "Bookings",
    component: Bookings,
  },
  {
    path: "/bookings/create",
    name: "Add Bookings",
    component: BookingsCreate,
  },
  {
    path: "/bookings/edit/:id",
    name: "Edit Bookings",
    component: BookingsEdit,
  },
  {
    path: "/booking-statuses",
    name: "Booking Statuses",
    component: BookingStatuses,
  },
  {
    path: "/payments",
    name: "Payments",
    component: Payments,
  },
  {
    path: "/payments/create",
    name: "Add Payments",
    component: PaymentsCreate,
  },
  {
    path: "/payments/edit/:id",
    name: "Edit Payments",
    component: PaymentsEdit,
  },
  {
    path: "/payment-statuses",
    name: "Payment Statuses",
    component: PaymentStatuses,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/users/create",
    name: "Add Users",
    component: UsersCreate,
  },
  {
    path: "/users/edit/:id",
    name: "Edit Users",
    component: UsersEdit,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
