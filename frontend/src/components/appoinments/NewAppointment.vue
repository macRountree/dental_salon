<script setup>
//*
import {useAppointmentsStore} from '@/stores/appointments';
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
const appointmentStore = useAppointmentsStore();

//*Clear the appointment data when the component is unmounted
onMounted(() => {
  appointmentStore.clearAppointmentData();
});
</script>
<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{name: 'new-appointment'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white rounded-sm"
      :class="
        route.name === 'new-appointment'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-600'
      "
      >Services</RouterLink
    >
    <RouterLink
      :to="{name: 'appointment-details'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white rounded-sm"
      :class="
        route.name === 'appointment-details'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-600'
      "
      >Appointment & Summary</RouterLink
    >
  </nav>
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
