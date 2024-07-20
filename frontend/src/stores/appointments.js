import {defineStore} from 'pinia';
import {computed, onMounted, ref} from 'vue';
export const useAppointmentsStore = defineStore('appointments', () => {
  const services = ref([]);
  const date = ref('');

  const hours = ref([]);

  const time = ref('');

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`);
    }
  });
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
        alert('Choose only 2 services per day');
        return;
      }

      services.value.push(service);
    }
  }

  function createAppointment() {
    /*Create object with Appointment details */

    const appointmentObj = {
      services: services.value,
      date: date.value,
      time: time.value,
      total: totalAmount,
    };
    console.log(appointmentObj, 'Res Created');
  }

  //*CONFIRM if a services is select or not
  const isServiceSelected = computed(() => {
    console.log();
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

  return {
    services,
    date,
    hours,
    time,
    createAppointment,
    onServiceSelected,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    isValidReservation,
  };
});
