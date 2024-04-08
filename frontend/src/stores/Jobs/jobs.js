import { defineStore } from 'pinia'
import axios from 'axios'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultAssigned_userId: [],

            searchResultAssignedTeamId: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`jobs${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/jobs/${id}`);
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
        const result = await axios.post('/jobs', { data: payload });
        this.showNotification('Jobs has been created', 'success');
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
        const result = await axios.put(`/jobs/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Jobs has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchAssigned_userId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAssigned_userId(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setAssigned_userId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAssigned_userId([]);
              }
            },

            async searchAssignedTeamId(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/teams/autocomplete?query=${val}&limit=100`,
                  );
                  this.setAssignedTeamId(result.data);
                } else {
                  const result = await axios(`/teams/autocomplete?limit=100`);
                  this.setAssignedTeamId(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setAssignedTeamId([]);
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

        setAssigned_userId(payload) {
            this.searchResultAssigned_userId = payload
        },

        setAssignedTeamId(payload) {
            this.searchResultAssignedTeamId = payload
        },

  }
})
