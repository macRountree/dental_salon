<script setup>
import ServicesItem from '../ServicesItem.vue';
import {useServicesStore} from '@/stores/services';
const store = useServicesStore();
</script>
<template>
  <h2 class="text-4xl font-extrabold text-white">Services</h2>
  <p class="text-white text-lg">Choose at least 1 service for an appointment</p>

  <div class="grid grid-cols-2 gap-5">
    <!-- MongoDB uses _id -->
    <ServicesItem
      v-for="service in store.services"
      :key="service._id"
      :service="service"
    />
  </div>
</template>
