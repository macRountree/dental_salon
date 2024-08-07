import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppoinmentLayout from '../components/appoinments/AppointmentLayout.vue';
import AuthAPI from '@/api/AuthAPI';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/admin/AdminLayout.vue'),
      meta: {requiresAdmin: true},
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () =>
            import('../components/admin/AppointmentsAdminView.vue'),
        },
      ],
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppoinmentLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () =>
            import('../components/appoinments/MyAppointmentsView.vue'),
        },
        {
          path: 'new',
          component: () =>
            import('../components/appoinments/NewAppointment.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',

              component: () =>
                import('../components/appoinments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'appointment-details',

              component: () =>
                import('../components/appoinments/AppointmentView.vue'),
            },
          ],
        },
        {
          path: ':id/edit',
          component: () =>
            import('../components/appoinments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',

              component: () =>
                import('../components/appoinments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'edit-appointment-details',

              component: () =>
                import('../components/appoinments/AppointmentView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../components/auth/AuthLayout.vue'),
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: () => import('../components/auth/Register.vue'),
        },
        {
          path: 'confirm-account/:token',
          name: 'confirm-account',
          component: () => import('../components/auth/ConfirmAccount.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../components/auth/Login.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../components/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'forgot-password/:token',
          name: 'new-password',
          component: () => import('../components/auth/NewPasswordView.vue'),
        },
      ],
    },
  ],
});

//* Validate all info before shows up
export default router;
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);
  if (requiresAuth) {
    try {
      const {data} = await AuthAPI.auth();

      if (data.user.admin) {
        next({name: 'admin'});
      } else {
        next();
      }
    } catch (error) {
      next({name: 'login'});
    }
  } else {
    next();
  }
});
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin);
  if (requiresAdmin) {
    try {
      await AuthAPI.admin();
      next();
    } catch (error) {
      next({name: 'login'});
    }
  } else {
    next();
  }
});
