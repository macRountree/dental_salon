<script setup>
import {RouterLink, RouterView} from 'vue-router';
</script>
<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">Dental Salon</h1>
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center justify-end">
        <p class="text-white text-right">Hello: User</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md uppercase font-extrabold"
        >
          Log Out
        </button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <button
          class="text-gray-200 p-3 uppercase text-xs font-black rounded-lg"
        >
          My Appointments
        </button>
        <RouterLink
          :to="{name: 'new-appointment'}"
          class="bg-blue-700 text-gray-200 p-3 uppercase text-xs font-black rounded-lg"
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
