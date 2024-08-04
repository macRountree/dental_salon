<script setup>
import {useUserAuthStore} from '@/stores/userAuth';
import AdminAppointment from './AdminAppointment.vue';
const userStore = useUserAuthStore();
</script>
<template>
  <p class="text-white text-lg mt-5">Admin your Appointments</p>

  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
    Loading . . . .
  </p>

  <div>
    <p v-if="userStore.noAppointment">No Appointments Yet</p>
    <div>
      <AdminAppointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
