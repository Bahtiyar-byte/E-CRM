<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentStore } from "@/stores/Appointment/appointment";
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const appointmentStore = useAppointmentStore()

const titleStack = ref(['Admin', 'Appointment'])
const notification = computed(() => appointmentStore.notify)

        const optionsContactId = computed(() => appointmentStore.searchResultContactId);

        const optionsAssignedUserId = computed(() => appointmentStore.searchResultAssignedUserId);

const appointmentItem = computed(() => appointmentStore.data);

const form = reactive({

      contactId: '',

      assignedUserId: '',

      date: '',

    address: '',

})

const submit = async () => {
  try {

            form.contactId = form.contactId?.id;

            form.assignedUserId = form.assignedUserId?.id;

    await appointmentStore.edit({id: route.params.id, data: {...form} })
    router.push('/appointment');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContactId();

  await searchAssignedUserId();

    await appointmentStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    appointmentStore.showNotification(e, 'error');
  }
})

    async function searchContactId(val) {
      await appointmentStore.searchContactId(val);
    }

    async function searchAssignedUserId(val) {
      await appointmentStore.searchAssignedUserId(val);
    }

const formatData = () => {

    form.contactId = dataFormatter.contactsOneListFormatterEdit(appointmentItem.value.contactId)

    form.assignedUserId = dataFormatter.usersOneListFormatterEdit(appointmentItem.value.assignedUserId)

    form.date = dataFormatter.dateTimeFormatter(appointmentItem.value.date)

    form.address = appointmentItem.value.address

}

watch(() => appointmentStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Appointment notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    appointmentStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/appointment')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Appointment</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Appointment"
      form
      @submit.prevent="submit"
    >

  <FormField
      label="Contact"
    >
      <v-select
        v-model="form.contactId"
        :options="optionsContactId"
        @input="searchContactId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Assigned User "
    >
      <v-select
        v-model="form.assignedUserId"
        :options="optionsAssignedUserId"
        @input="searchAssignedUserId($event.target.value)"
      />
  </FormField>

    <FormField
      label="Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.date"
        placeholder="Your Date"
      />
    </FormField>

    <FormField
      label="Address"
    >
      <FormControl
        v-model="form.address"
        placeholder="Your Address"
        />
    </FormField>

    <BaseDivider />

    <BaseButtons>
      <BaseButton
        type="submit"
        color="info"
        label="Submit"
      />
      <BaseButton
        type="button"
        color="info"
        outline
        label="Reset"
        @click="reset"
      />
      <BaseButton
        type="cancel"
        color="danger"
        outline
        label="Cancel"
        @click="cancel"
      />
    </BaseButtons>
  </CardBox>
</SectionMain>

</template>
