<script setup>
import {onMounted, inject} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');
const router = useRouter();
const route = useRoute();

const {token} = route.params;
//*Need onMount to get the token from the route

onMounted(async () => {
  try {
    const {data} = await AuthAPI.verifyAccount(token);
    toast.open({
      message: data.msg,
      type: 'success',
      duration: 5000,
    });
    setTimeout(() => {
      router.push({name: 'login'});
    }, 4000);
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      duration: 5000,
      type: 'error',
    });
  }
});
</script>

<template>
  <div>
    <h2 class="text-white">DESDE Confirmar CUent</h2>
  </div>
</template>
