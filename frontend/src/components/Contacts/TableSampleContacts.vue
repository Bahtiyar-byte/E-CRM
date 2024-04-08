<script setup>
import { computed, ref } from 'vue'
import { useContactsStore } from "@/stores/Contacts/contacts";
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import dataFormatter from '@/helpers/dataFormatter';
import { useRouter } from 'vue-router';
import FormControl from '@/components/FormControl.vue';

const $router = useRouter();

const props = defineProps({
  checkable: Boolean,
  sortTitle: String,
  sortDirection: String
})

const emit = defineEmits(['sort']);
/* Fetch data */
const contactsStore = useContactsStore()
contactsStore.fetch()

/* Delete item */
const deleteItem = () => {
  contactsStore.deleteItem(currentId.value)
}

const items = computed(() => contactsStore.data)

const headers = [

{ text: 'First Name', value: 'firstName'},
{ text: 'Last Name', value: 'lastName'},
{ text: 'Email', value: 'email'},
{ text: 'Name', value: 'name'},
{ text: 'Phone', value: 'phone'},
{ text: 'Address', value: 'address'},
{ text: 'Type', value: 'type'},]
const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentId = ref(0);

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value && items.value.length && items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
  }
}

const showModal = (client) => {
  currentId.value = client.id
  isModalDangerActive.value = true
}

const sort = (title) => {
  let sortTitle = title;
  let sortDirection = '';
  if (props.sortTitle !== title) {
    sortDirection = 'asc';
  } else {
    if (props.sortDirection === 'asc') {
      sortDirection = 'desc';
    } else {
      sortDirection = '';
      sortTitle = '';
    }
  }
  emit('sort', {sortTitle, sortDirection});
}

</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Contacts modal"
  >
    <ul
      v-for="item in headers"
      :key="item"
    >
      <li>{{ item.text }}</li>
    </ul>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
    :deleteItem="deleteItem"
  >
    <p>Are you sure you want to delete this item?</p>
  </CardBoxModal>

  <div
    v-if="checkedRows.length"
    class="p-3 bg-gray-100/50 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700"
    >
      {{ checkedRow[headers[0].value] }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
      <th v-if="checkable" />

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'firstName' && props.sortDirection]"
        @click="sort('firstName')"
      >First Name</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'lastName' && props.sortDirection]"
        @click="sort('lastName')"
      >Last Name</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'email' && props.sortDirection]"
        @click="sort('email')"
      >Email</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'name' && props.sortDirection]"
        @click="sort('name')"
      >Name</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'phone' && props.sortDirection]"
        @click="sort('phone')"
      >Phone</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'address' && props.sortDirection]"
        @click="sort('address')"
      >Address</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'type' && props.sortDirection]"
        @click="sort('type')"
      >Type</th>

        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="client in itemsPaginated"
        :key="client.id"
        @click="$router.push(`/contacts/${client.id}/edit`)"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

              <td data-label="firstName">
                {{ client.firstName }}
              </td>

              <td data-label="lastName">
                {{ client.lastName }}
              </td>

              <td data-label="email">
                {{ client.email }}
              </td>

              <td data-label="name">
                {{ client.name }}
              </td>

              <td data-label="phone">
                {{ client.phone }}
              </td>

              <td data-label="address">
                {{ client.address }}
              </td>

              <td data-label="type">
                {{ client.type }}
              </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="`/contacts/${client.id}/edit`"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click.stop="() => showModal(client)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      <FormControl class="w-[70px]" type="select" :options="[10, 20, 50, 100]" v-model="perPage"/>
    </BaseLevel>
  </div>
</template>
