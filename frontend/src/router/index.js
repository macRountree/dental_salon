import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppoinmentLayout from '../components/appoinments/AppointmentLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppoinmentLayout,
      children: [
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
      ],
    },
  ],
});

export default router;
