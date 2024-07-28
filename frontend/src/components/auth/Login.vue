<script setup>
import AuthAPI from '@/api/AuthAPI';
import {inject} from 'vue';
import {useRouter} from 'vue-router';

const toastLogIn = inject('toast');
const router = useRouter();
const handleSubmit = async loginDATA => {
  // console.log(loginDATA, 'DATA Login');

  try {
    const {
      data: {token},
    } = await AuthAPI.login(loginDATA);

    //* Save token in local storage
    localStorage.setItem('AUTH_TOKEN', token);
    router.push({name: 'my-appointments'});
  } catch (error) {
    toastLogIn.open({
      message: error.response.data.msg,
      duration: 5000,
      type: 'error',
    });
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Log In</h1>
  <p class="text-2xl text-white text-center my-5">Log in to Dental App</p>
  <FormKit
    id="loginForm"
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
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Enter Password"
      validation="required"
      :validation-messages="{
        required: 'password is required',
      }"
    />
    <!--? Confirm check name "password" to validate the input upside , then validate the name  _confirm in input below  -->

    <FormKit type="submit">Log In</FormKit>
  </FormKit>
</template>
