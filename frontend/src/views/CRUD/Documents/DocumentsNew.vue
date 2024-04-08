<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const documentsStore = useDocumentsStore()
const router = useRouter();

const notification = computed(() => documentsStore.notify)
const titleStack = ref(['Admin', 'Documents'])

        const optionsJobId = computed(() => documentsStore.searchResultJobId);

const form = reactive({

      jobId: '',

      url: '',

})

onBeforeMount(async () => {

  await searchJobId();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

    await documentsStore.newItem({ ...form })
    router.push('/documents');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.jobId = '';

        form.url = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await documentsStore.searchJobId(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Documents</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Documents"
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
