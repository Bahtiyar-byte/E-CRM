<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentsStore } from "@/stores/Documents/documents";
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
const documentsStore = useDocumentsStore()

const titleStack = ref(['Admin', 'Documents'])
const notification = computed(() => documentsStore.notify)

        const optionsJobId = computed(() => documentsStore.searchResultJobId);

const documentsItem = computed(() => documentsStore.data);

const form = reactive({

      jobId: '',

    url: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

    await documentsStore.edit({id: route.params.id, data: {...form} })
    router.push('/documents');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

    await documentsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    documentsStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await documentsStore.searchJobId(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsOneListFormatterEdit(documentsItem.value.jobId)

    form.url = documentsItem.value.url

}

watch(() => documentsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Documents notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    documentsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/documents')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Documents</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Documents"
      form
      @submit.prevent="submit"
    >

  <FormField
      label="Job"
    >
      <v-select
        v-model="form.jobId"
        :options="optionsJobId"
        @input="searchJobId($event.target.value)"
      />
  </FormField>

    <FormField
      label="Url"
    >
      <FormControl
        v-model="form.url"
        placeholder="Your Url"
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
