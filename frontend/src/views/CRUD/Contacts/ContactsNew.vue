<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const contactsStore = useContactsStore()
const router = useRouter();

const notification = computed(() => contactsStore.notify)
const titleStack = ref(['Admin', 'Contacts'])

const form = reactive({

      firstName: '',

      lastName: '',

      email: '',

      name: '',

      phone: '',

      address: '',

      type: false,

})

onBeforeMount(async () => {

})

const submit = async () => {
  try {

            form.type = form.type.label;

    await contactsStore.newItem({ ...form })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.firstName = '';

        form.lastName = '';

        form.email = '';

        form.name = '';

        form.phone = '';

        form.address = '';

        form.type = false;

}

const cancel = () => {
  router.push('/users')
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Contacts"
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
        :options="[{id: 0, label: 'Lead'},
                    {id: 1, label: 'Prospect'},
                    {id: 2, label: 'Customer'},
                    ]"
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
