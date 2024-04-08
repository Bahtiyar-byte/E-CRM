<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactsStore } from "@/stores/Contacts/contacts";
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
const contactsStore = useContactsStore()

const titleStack = ref(['Admin', 'Contacts'])
const notification = computed(() => contactsStore.notify)

      const optionsType = [{id: 0, label: 'Lead'},{id: 1, label: 'Prospect'},{id: 2, label: 'Customer'},]

const contactsItem = computed(() => contactsStore.data);

const form = reactive({

    firstName: '',

    lastName: '',

    email: '',

    name: '',

    phone: '',

    address: '',

      type: '',

})

const submit = async () => {
  try {

            form.type = form.type.label;

    await contactsStore.edit({id: route.params.id, data: {...form} })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

    await contactsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    contactsStore.showNotification(e, 'error');
  }
})

const formatData = () => {

    form.firstName = contactsItem.value.firstName

    form.lastName = contactsItem.value.lastName

    form.email = contactsItem.value.email

    form.name = contactsItem.value.name

    form.phone = contactsItem.value.phone

    form.address = contactsItem.value.address

    form.type = optionsType.find(el => el.label === contactsItem.value.type)

}

watch(() => contactsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Contacts notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    contactsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/contacts')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Contacts"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="First Name"
    >
      <FormControl
        v-model="form.firstName"
        placeholder="Your First Name"
        />
    </FormField>

    <FormField
      label="Last Name"
    >
      <FormControl
        v-model="form.lastName"
        placeholder="Your Last Name"
        />
    </FormField>

    <FormField
      label="Email"
    >
      <FormControl
        v-model="form.email"
        placeholder="Your Email"
        />
    </FormField>

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
        />
    </FormField>

    <FormField
      label="Phone"
    >
      <FormControl
        v-model="form.phone"
        placeholder="Your Phone"
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

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="optionsType"
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
