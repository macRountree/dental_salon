//*Endpoints for Auth

import api from '@/lib/axios';

export default {
  register(data) {
    return api.post('/auth/register', data);
  },
  /*Need token URL to verify account */
  verifyAccount(token) {
    return api.get(`/auth/verify/${token}`);
  },
  login(data) {
    return api.post('/auth/login', data);
  },
  auth() {
    return api.get('/auth/user');
  },
};
