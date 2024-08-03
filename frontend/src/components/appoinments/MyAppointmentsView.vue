<script setup>
import {useUserAuthStore} from '@/stores/userAuth';
import AppointmetGrid from './AppointmetGrid.vue';
const userStore = useUserAuthStore();
</script>
<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">My Appointments</h2>
  <p class="text-white text-lg mt-5">
    Here you can see all your appointments, you can cancel them or see more
    details.
  </p>
  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
    Loading Appointments ....
  </p>

  <div v-else>
    <p
      v-if="userStore.noAppointment"
      class="text-white text-2xl text-center mt-5"
    >
      Not Appointments Yet
    </p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <AppointmetGrid
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
