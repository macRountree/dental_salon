<script setup>
import {formatCurrency} from '@/helpers';
import {displayDate} from '@/helpers/dates.js';
import {useAppointmentsStore} from '@/stores/appointments';

const appointStore = useAppointmentsStore();
defineProps({
  appointment: {
    type: Object,
  },
});
// console.log(appointment.totalAmount);
</script>
<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-blue-500 font-black">
      Date:
      <span class="font-light">{{ displayDate(appointment.date) }}</span> -
      Time:
      <span class="font-light">{{ appointment.time }}</span>
    </p>
    <p class="text-lg font-black">Appointmet Services:</p>
    <div v-for="service in appointment.services">
      <p>
        {{ service.name }}
      </p>
      <p class="text-2xl font-black text-blue-500">
        {{ formatCurrency(service.price) }}
      </p>
    </div>
    <p class="text-2xl font-black text-right">
      Total:
      <span class="text-blue-600">{{
        formatCurrency(appointment.totalAmount)
      }}</span>
    </p>
    <div class="flex gap-2 items-center">
      <RouterLink
        :to="{name: 'edit-appointment', params: {id: appointment._id}}"
        class="bg-slate-600 rounded-lg p-3 text-white uppercase font-black flex-1 md:flex-none"
      >
        Edit
      </RouterLink>
      <button
        class="bg-red-600 rounded-lg p-3 text-white uppercase font-black flex-1 md:flex-none"
        @click="appointStore.cancelAppointment(appointment._id)"
      >
        Delete Appointment
      </button>
    </div>
  </div>
</template>
