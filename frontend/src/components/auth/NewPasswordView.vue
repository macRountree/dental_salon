<script setup>
import AuthAPI from '@/api/AuthAPI';
import {onMounted, inject, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const toast = inject('toast');
const route = useRoute();
const router = useRouter();
const {token} = route.params;
console.log(token, 'TOKEN');

const validToken = ref(false);

onMounted(async () => {
  try {
    const {data} = await AuthAPI.verifyPasswordResetToken(token);
    validToken.value = true;
  } catch (error) {
    toast.open({
      type: 'error',
      message: error.response.data.msg,
      duration: 3000,
    });
  }
});

const handleSubmit = async ({password}) => {
  try {
    const {data} = await AuthAPI.updatePassword(token, {password});
    toast.open({
      type: 'success',
      message: data.msg,
      duration: 3000,
    });
    setTimeout(() => {
      router.push({name: 'login'});
    }, 3000);
  } catch (error) {
    toast.open({
      type: 'error',
      message: error.response.data.msg,
      duration: 3000,
    });
  }
  console.log('desde password', password);
};
</script>
<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      New Password
    </h1>
    <p class="text-lg text-white text-center my-5">Create Your New Password</p>

    <!-- //*Need Email exist and generate TOKEN -->
    <FormKit
      id="newPassForm"
      type="form"
      :actions="false"
      incomplete-message="Error devilering. Check notification"
      @submit="handleSubmit"
    >
      <!-- @submit validate all fields and storage in object "data" inside functions handleSubmit -->
      <!-- name === model name in backend 
     {
    "name":"Mac",
    "email": "TEST3@TEST.com",
    "password":"123456789"
} -->

      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Enter New Password"
        validation="required|length:8"
        :validation-messages="{
          required: 'password is required',
          length: 'Password must be at least 8 characters',
        }"
      />
      <FormKit type="submit">Reset Password</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center font-black text-2xl text-white">
    Token No Valido
  </p>
</template>
