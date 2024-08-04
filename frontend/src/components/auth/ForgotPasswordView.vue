<script setup>
import AuthAPI from '@/api/AuthAPI';
import {inject} from 'vue';
import {reset} from '@formkit/core';
const toast = inject('toast');
const handleSubmit = async ({email}) => {
  try {
    const {data} = await AuthAPI.forgotPassword({email});

    toast.open({
      type: 'success',
      message: data.msg,
    });
    reset('forgot');
  } catch (error) {
    console.log(error.response.data.msg);
    toast.open({
      type: 'error',
      message: error.response.data.msg,
    });
  }
  console.log(email);
};
</script>
<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Forgot my Password
  </h1>
  <p class="text-2xl text-white text-center my-5">Recover the access account</p>

  <!-- //*Need Email exist and generate TOKEN -->
  <FormKit
    id="forgot"
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
      type="email"
      label="Email"
      name="email"
      placeholder="Enter E-mail"
      validation="required|email"
      :validation-messages="{
        required: 'email is required',
        email: 'invalid E-mail. Please enter a valid E-mail',
      }"
    />

    <FormKit type="submit">Send</FormKit>
  </FormKit>
</template>
