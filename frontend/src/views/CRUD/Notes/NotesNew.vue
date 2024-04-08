<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from "@/stores/Notes/notes";
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

const notesStore = useNotesStore()
const router = useRouter();

const notification = computed(() => notesStore.notify)
const titleStack = ref(['Admin', 'Notes'])

        const optionsContact = computed(() => notesStore.searchResultContact);

const form = reactive({

      title: '',

      description: '',

      contact: '',

})

onBeforeMount(async () => {

  await searchContact();

})

const submit = async () => {
  try {

            form.contact = form.contact.id;

    await notesStore.newItem({ ...form })
    router.push('/notes');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.title = '';

        form.description = '';

        form.contact = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchContact(val) {
      await notesStore.searchContact(val);
    }

watch(() => notesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Notes notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    notesStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Notes</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Notes"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Title"
    >
      <FormControl
        v-model="form.title"
        placeholder="Your Title"
      />
    </FormField>

    <FormField
      label="Description"
    >
      <FormControl
        v-model="form.description"
        placeholder="Your Description"
      />
    </FormField>

  <FormField
      label="Contact"
    >
        <v-select
          v-model="form.contact"
          :options="optionsContact"
          @input="searchContact($event.target.value)"
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
