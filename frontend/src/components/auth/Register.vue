<script setup>
import AuthAPI from '@/api/AuthAPI';
import {inject} from 'vue';
import {reset} from '@formkit/vue'; //*  Reset fields after submit
const toastSignIn = inject('toast');
const handleSubmit = async ({password_confirm, ...fronEndData}) => {
  console.log(fronEndData, 'DATA formKit'); //* {name , email , password}
  try {
    const {data} = await AuthAPI.register(fronEndData);

    toastSignIn.open({message: data.msg, duration: 5000, type: 'success'});
    reset('signup'); //* Reset fields after submit
  } catch (error) {
    toastSignIn.open({
      message: error.response.data.msg,
      duration: 5000,
      type: 'error',
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Create Account
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Create account in Dental App
  </p>

  <FormKit
    id="signup"
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
      type="text"
      label="Name"
      name="name"
      placeholder="Enter Name"
      validation="required|length:3"
      :validation-messages="{
        required: 'Name is required',
        length: 'Name must be at least 3 characters',
      }"
    />
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
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Enter Password"
      validation="required|length:8"
      :validation-messages="{
        required: 'password is required',
        length: 'Password must be at least 8 characters',
      }"
    />
    <!--? Confirm check name "password" to validate the input upside , then validate the name  _confirm in input below  -->
    <FormKit
      type="password"
      label="Confirm Password"
      name="password_confirm"
      placeholder="Confirm Password"
      validation="required|confirm"
      :validation-messages="{
        required: 'password is required',
        confirm: 'Password does not match',
      }"
    />
    <FormKit type="submit">Create Account </FormKit>
  </FormKit>
</template>
