import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultContactId: [],

            searchResultAssignedUserId: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`appointment${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/appointment/${id}`);
        this.showNotification('Users has been deleted', 'success');
        await this.fetch()
      } catch (e) {
        console.log('deleteItem error', e)
        // dispatch('snackbar/showSnackbar', e, { root: true });
      }
    },
    async newItem(payload) {
      this.startLoading();
      try {
        const result = await axios.post('/appointment', { data: payload });
        this.showNotification('Appointment has been created', 'success');
        this.getData(result.data)
      } catch (e) {
        console.log(e)
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async edit(payload) {
      this.startLoading();
      try {
        const result = await axios.put(`/appointment/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Appointment has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchContactId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/contacts/autocomplete?query=${val}&limit=100`,
                  );
                  this.setContactId(result.data);
                } else {
                  const result = await axios(`/contacts/autocomplete?limit=100`);
                  this.setContactId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setContactId([]);
              }
            },

            async searchAssignedUserId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAssignedUserId(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setAssignedUserId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAssignedUserId([]);
              }
            },

    startLoading() {
      this.loading = false;
    },
    getData(payload) {
      this.data = payload;
    },
    finishLoading() {
      this.loading = false;
    },
    showNotification(payload, type) {
      this.notify.showNotification = true
      this.notify.textNotification = payload
      this.notify.typeNotification = type
    },
    hideNotification() {
      this.notify.showNotification = false
      this.notify.textNotification = ''
    },

        setContactId(payload) {
            this.searchResultContactId = payload
        },

        setAssignedUserId(payload) {
            this.searchResultAssignedUserId = payload
        },

  }
})
