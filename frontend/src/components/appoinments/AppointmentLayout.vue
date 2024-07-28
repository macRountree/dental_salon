<script setup>
import {RouterLink, RouterView} from 'vue-router';

import {useUserAuthStore} from '../../stores/userAuth.js';

const userName = useUserAuthStore();
</script>
<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">Dental Salon</h1>
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center justify-end">
        <p class="text-white text-right">Hello: {{ userName.getUserName }}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md uppercase font-extrabold"
          @click="userName.logOut"
        >
          Log Out
        </button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <RouterLink
          :to="{name: 'my-appointments'}"
          class="bg-blue-500 hover:bg-blue-900 p-2 ring-1 ring-inset ring-blue-700 hover:ring-blue-300 text-white font-black uppercase rounded-lg"
        >
          My Appointments
        </RouterLink>
        <RouterLink
          :to="{name: 'new-appointment'}"
          class="bg-blue-500 hover:bg-blue-900 p-2 ring-1 ring-inset ring-blue-700 hover:ring-blue-300 text-white font-black uppercase rounded-lg"
        >
          New Appointment
        </RouterLink>
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>
