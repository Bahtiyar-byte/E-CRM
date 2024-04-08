<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const notesStore = useNotesStore()

const titleStack = ref(['Admin', 'Notes'])
const notification = computed(() => notesStore.notify)

        const optionsContact = computed(() => notesStore.searchResultContact);

const notesItem = computed(() => notesStore.data);

const form = reactive({

    title: '',

    description: '',

      contact: '',

})

const submit = async () => {
  try {

            form.contact = form.contact?.id;

    await notesStore.edit({id: route.params.id, data: {...form} })
    router.push('/notes');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContact();

    await notesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    notesStore.showNotification(e, 'error');
  }
})

    async function searchContact(val) {
      await notesStore.searchContact(val);
    }

const formatData = () => {

    form.title = notesItem.value.title

    form.description = notesItem.value.description

    form.contact = dataFormatter.contactsOneListFormatterEdit(notesItem.value.contact)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/notes')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Notes</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Notes"
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
