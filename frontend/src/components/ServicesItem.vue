<script setup>
//*Need defineto pass props to the component (ServicesView.vue)

import {formatCurrency} from '../helpers/index.js';
import {useAppointmentsStore} from '@/stores/appointments.js';

const {isServiceSelected, onServiceSelected} = useAppointmentsStore();

defineProps({
  service: {
    type: Object,
  },
});
</script>
<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer"
    :class="
      isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'
    "
    @click="onServiceSelected(service)"
  >
    <p class="text-2xl font-light">{{ service.name }}</p>

    <p
      class="text-4xl font-black"
      :class="
        isServiceSelected(service._id)
          ? 'bg-blue-500 text-white'
          : ' text-blue-600'
      "
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
