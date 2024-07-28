import {ref, onMounted, computed} from 'vue';
import {defineStore} from 'pinia';
import {useRouter} from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

export const useUserAuthStore = defineStore('user', () => {
  const router = useRouter();
  const user = ref({});

  onMounted(async () => {
    try {
      const {data} = await AuthAPI.auth();

      user.value = data;
      console.log(user.value.user.name, 'Desde API store');
    } catch (error) {
      console.log(error);
    }
  });

  const getUserName = computed(() => {
    return user.value.user?.name ? user.value.user?.name : '';
  });

  function logOut() {
    localStorage.removeItem('AUTH_TOKEN');
    user.value = {};
    router.push({name: 'login'});
  }

  return {user, getUserName, logOut};
});
