import {computed, onMounted, ref, watch} from 'vue';
import {defineStore} from 'pinia';
import {useRouter} from 'vue-router';
import AppointmentAPI from '@/api/AppointmentAPI';
import {convertToIso, convertToYYYYMMDD} from '@/helpers/dates';
import {inject} from 'vue';
import {useUserAuthStore} from './userAuth';
export const useAppointmentsStore = defineStore('appointments', () => {
  const appointmentId = ref('');
  const toast = inject('toast');
  const services = ref([]);
  const date = ref('');

  const hours = ref([]);

  const time = ref('');
  const appointmentsByDate = ref([]);
  const router = useRouter();
  const userStore = useUserAuthStore();

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`);
    }
  });

  watch(date, async () => {
    time.value = '';
    if (date.value === '') return;
    const {data} = await AppointmentAPI.getByDate(date.value);
    appointmentsByDate.value = data;

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        appointmentIdDate => appointmentIdDate._id !== appointmentId.value
      );

      time.value = data.filter(
        appointmentIdDate =>
          appointmentIdDate._id === appointmentId.value[0].time
      );
    } else {
      appointmentsByDate.value = data;
    }
  });

  function setSelectedAppointment(appointment) {
    //*Brings services selected when push Edit button
    services.value = appointment.services;

    //*need convert the dates  in new Format()

    date.value = convertToYYYYMMDD(appointment.date);

    //*
    time.value = appointment.time;

    appointmentId.value = appointment._id;
    console.log(appointmentId.value, 'ID en setSeelectedAppointemn');
  }

  //*handle service Selected {avoid duplicate services, and diselected}
  function onServiceSelected(service) {
    if (
      services.value.some(
        selectedServices => selectedServices._id === service._id
      )
    ) {
      services.value = services.value.filter(
        selectedService => selectedService._id !== service._id
      );
    } else {
      if (services.value.length === 2) {
        toast.open({
          message: 'Choose only 2 services per day',
          type: 'warning',
          duration: 5000,
        });
        return;
      }

      services.value.push(service);
    }
  }

  async function saveAppointment() {
    /*Create object with Appointment details */

    const appointmentObj = {
      services: services.value.map(service => service._id),
      date: convertToIso(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    if (appointmentId.value) {
      try {
        //*call App API
        const {data} = await AppointmentAPI.update(
          appointmentId.value,
          appointmentObj
        );
        toast.open({
          message: data.msg,
          type: 'success',
          duration: 5000,
        });
      } catch (error) {
        console.log(error, 'No entro');
      }
    } else {
      try {
        //*call App API
        const {data} = await AppointmentAPI.create(appointmentObj);
        toast.open({
          message: data.msg,
          type: 'success',
          duration: 5000,
        });
      } catch (error) {
        console.log(error);
      }
    }
    clearAppointmentData();
    userStore.getUserAppointments();
    router.push({name: 'my-appointments'});
  }

  //*Clear appointmet Object after confirmation button

  function clearAppointmentData() {
    appointmentId.value = '';
    services.value = [];
    date.value = '';
    time.value = '';
  }

  async function cancelAppointment(id) {
    if (confirm('Would you delete this Appointment?')) {
      try {
        const {data} = await AppointmentAPI.delete(id);

        toast.open({
          message: data.msg,
          type: 'success',
          duration: 2000,
        });
        //*need userAPpoimntment for update the state
        userStore.userAppointments = userStore.userAppointments.filter(
          appointment => appointment._id !== id
        );
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: 'error',
          duration: 2000,
        });
      }
    }

    console.log(id);
  }
  //*CONFIRM if a services is select or not
  const isServiceSelected = computed(() => {
    return id => {
      return services.value.some(service => service._id === id);
    };
  });

  const noServicesSelected = computed(() => services.value.length === 0);

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isValidReservation = computed(() => {
    return services.value.length && date.value.length && time.value.length;
  });

  const isDateSelected = computed(() => {
    return date.value ? true : false;
  });

  //* BRings appointmentsByDate and return true or false if appointment.time === hour selected ... if true.. then disabled de duplicated hour
  const disableScheduletime = computed(() => {
    return hour => {
      return appointmentsByDate.value.find(
        appointment => appointment.time === hour
      );
    };
  });
  return {
    services,
    date,
    hours,
    time,
    clearAppointmentData,
    setSelectedAppointment,
    appointmentsByDate,
    saveAppointment,
    onServiceSelected,
    cancelAppointment,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    isDateSelected,
    isValidReservation,
    disableScheduletime,
  };
});
