<script setup>
//*
import AppointmentAPI from '@/api/AppointmentAPI';
import {useAppointmentsStore} from '@/stores/appointments';
import {onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
const appointmentsStore = useAppointmentsStore();
const route = useRoute();
const router = useRouter();

const {id} = route.params;
onMounted(async () => {
  try {
    //* console.log(id);
    const {data} = await AppointmentAPI.getById(id);
    appointmentsStore.setSelectedAppointment(data);
    //*   console.log(appointmentsStore, 'From appointmentStore');
  } catch (error) {
    //*If other user try to access the appointment , it will redirect to the dashboard
    router.push({name: 'my-appointments'});
  }
});
</script>
<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{name: 'edit-appointment'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white rounded-sm"
      :class="
        route.name === 'edit-appointment'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-600'
      "
      >Services</RouterLink
    >
    <RouterLink
      :to="{name: 'edit-appointment-details'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white rounded-sm"
      :class="
        route.name === 'edit-appointment-details'
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
