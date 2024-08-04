<script setup>
import {useRoute} from 'vue-router';

//*add nav with routes
const route = useRoute();

const authRoutes = [
  {
    name: 'signin',
    text: 'Create Account',
  },
  {
    name: 'login',
    text: 'Login',
  },
  {
    name: 'forgot-password',
    text: 'Forgot Password',
  },
];
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-20">
    <RouterView />
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        v-for="authRoute in authRoutes"
        class="uppercase font-bold text-white hover:text-blue-500 border border-white hover:border-blue-500 px-5 py-2 rounded-lg"
        :class="{hidden: authRoute.name === route.name}"
        :to="{name: authRoute.name}"
      >
        {{ authRoute.text }}
      </RouterLink>
    </nav>
  </div>
</template>
