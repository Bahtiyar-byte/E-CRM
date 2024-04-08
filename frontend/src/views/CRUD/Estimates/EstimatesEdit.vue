<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEstimatesStore } from "@/stores/Estimates/estimates";
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
const estimatesStore = useEstimatesStore()

const titleStack = ref(['Admin', 'Estimates'])
const notification = computed(() => estimatesStore.notify)

        const optionsJobId = computed(() => estimatesStore.searchResultJobId);

        const optionsTemplateId = computed(() => estimatesStore.searchResultTemplateId);

      const optionsStatus = [{id: 0, label: 'Draft'},{id: 1, label: 'Sent'},{id: 2, label: 'Approved'},{id: 3, label: 'Rejected'},{id: 4, label: 'Follow Up'},]

const estimatesItem = computed(() => estimatesStore.data);

const form = reactive({

      jobId: '',

      templateId: '',

      status: '',

      validUntil: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.templateId = form.templateId?.id;

            form.status = form.status.label;

    await estimatesStore.edit({id: route.params.id, data: {...form} })
    router.push('/estimates');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchTemplateId();

    await estimatesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    estimatesStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await estimatesStore.searchJobId(val);
    }

    async function searchTemplateId(val) {
      await estimatesStore.searchTemplateId(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsOneListFormatterEdit(estimatesItem.value.jobId)

    form.templateId = dataFormatter.templatesOneListFormatterEdit(estimatesItem.value.templateId)

    form.status = optionsStatus.find(el => el.label === estimatesItem.value.status)

    form.validUntil = dataFormatter.dateTimeFormatter(estimatesItem.value.validUntil)

}

watch(() => estimatesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Estimates notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    estimatesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/estimates')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Estimates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Estimates"
      form
      @submit.prevent="submit"
    >

  <FormField
      label="Job "
    >
      <v-select
        v-model="form.jobId"
        :options="optionsJobId"
        @input="searchJobId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Template "
    >
      <v-select
        v-model="form.templateId"
        :options="optionsTemplateId"
        @input="searchTemplateId($event.target.value)"
      />
  </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="optionsStatus"
      />
    </FormField>

    <FormField
      label="Valid Until"
    >
      <FormControl
        type="datetime-local"
        v-model="form.validUntil"
        placeholder="Your Valid Until"
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
