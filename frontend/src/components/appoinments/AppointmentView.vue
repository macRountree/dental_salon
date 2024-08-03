<script setup>
import VueTailwindDatePicker from 'vue-tailwind-datepicker';
import {formatCurrency} from '@/helpers';
import SelectedServices from '../SelectedServices.vue';
//*Need this store cause we need to access the selected services
import {useAppointmentsStore} from '@/stores/appointments.js';
import {ref} from 'vue';

const store = useAppointmentsStore();
const formatter = ref({
  date: 'YYYY/MM/DD',
  month: 'MMM',
});
//*Disable the dates before today, weekends and next month
const disableDate = date => {
  const today = new Date();
  return (
    date < today ||
    date.getMonth() > today.getMonth() + 1 ||
    [0, 6].includes(date.getDay())
  );
};
</script>
<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">
    Details Appointment and Summary
  </h2>
  <p class="text-white text-lg mt-5">
    Please review the details of your appointment and confirm
  </p>
  <!-- List the dental services that user selected -->
  <h3 class="text-3xl font-extrabold text-white mt-5">Services</h3>

  <p v-if="store.noServicesSelected" class="text-red-500 text-2xl text-center">
    <span>Not services selected</span>
  </p>
  <div v-else class="grid gap-5">
    <SelectedServices
      v-for="service in store.services"
      :key="service._id"
      :service="service"
    />
    <p class="text-right text-white text-2xl">
      Total:
      <span class="font-black">
        {{ formatCurrency(store.totalAmount) }}
      </span>
    </p>
    <div class="space-y-8">
      <h3 class="text-3xl font-extrabold text-white">Date and Time</h3>

      <div class="lg:flex gap-5 items-start">
        <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
          <VueTailwindDatePicker
            :disable-date="disableDate"
            disable-in-range
            i18n="en-us"
            as-single
            no-input
            :formatter="formatter"
            v-model="store.date"
          />
        </div>
        <div
          v-if="store.isDateSelected"
          class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
        >
          <button
            v-for="hour in store.hours"
            class="block text-blue-500 font-black rounded-lg text-xl p-3 disabled:opacity-50"
            :class="
              store.time === hour ? 'bg-blue-500 text-white' : ' bg-white'
            "
            @click="store.time = hour"
            :disabled="store.disableScheduletime(hour) ? true : false"
          >
            <!-- Disable the button if the time is not available -->
            {{ hour }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="store.isValidReservation" class="flex justify-end">
      <button
        type="button"
        class="w-full md:w-auto bg-blue-500 p-2 ring-1 ring-inset ring-blue-700 hover:ring-blue-300 text-white font-black uppercase rounded-lg"
        @click="store.saveAppointment"
      >
        Confirm Reservation
      </button>
    </div>
  </div>
</template>
