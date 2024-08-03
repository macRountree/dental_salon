import {ref, onMounted, computed} from 'vue';
import {defineStore} from 'pinia';
import {useRouter} from 'vue-router';
import AuthAPI from '@/api/AuthAPI';
import AppointmentAPI from '@/api/AppointmentAPI';

export const useUserAuthStore = defineStore('user', () => {
  const router = useRouter();
  const user = ref({});
  const userAppointments = ref([]);
  const loading = ref(true);
  onMounted(async () => {
    try {
      const {data} = await AuthAPI.auth();
      console.log(data.user);
      user.value = data.user;
      //*   console.log(user.value, 'Desde API store');
      await getUserAppointments();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });

  const getUserName = computed(() => {
    return user.value?.name ? user.value?.name : '';
  });

  async function getUserAppointments() {
    const {data} = await AppointmentAPI.getUserAppointments(user.value._id);
    //* console.log(data);
    userAppointments.value = data;
  }
  function logOut() {
    localStorage.removeItem('AUTH_TOKEN');
    user.value = {};
    router.push({name: 'login'});
  }
  const noAppointment = computed(() => userAppointments.value.length === 0);

  return {
    user,
    getUserAppointments,
    userAppointments,
    getUserName,
    logOut,
    noAppointment,
    loading,
  };
});
