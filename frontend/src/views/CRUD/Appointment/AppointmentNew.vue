<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const appointmentStore = useAppointmentStore()
const router = useRouter();

const notification = computed(() => appointmentStore.notify)
const titleStack = ref(['Admin', 'Appointment'])

        const optionsContactId = computed(() => appointmentStore.searchResultContactId);

        const optionsAssignedUserId = computed(() => appointmentStore.searchResultAssignedUserId);

const form = reactive({

      contactId: '',

      assignedUserId: '',

      date: '',

      address: '',

})

onBeforeMount(async () => {

  await searchContactId();

  await searchAssignedUserId();

})

const submit = async () => {
  try {

            form.contactId = form.contactId.id;

            form.assignedUserId = form.assignedUserId.id;

    await appointmentStore.newItem({ ...form })
    router.push('/appointment');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.contactId = '';

        form.assignedUserId = '';

        form.date = '';

        form.address = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchContactId(val) {
      await appointmentStore.searchContactId(val);
    }

    async function searchAssignedUserId(val) {
      await appointmentStore.searchAssignedUserId(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Appointment</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Appointment"
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
        type="reset"
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
