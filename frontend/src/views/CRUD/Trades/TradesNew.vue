<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useTradesStore } from "@/stores/Trades/trades";
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

const tradesStore = useTradesStore()
const router = useRouter();

const notification = computed(() => tradesStore.notify)
const titleStack = ref(['Admin', 'Trades'])

const form = reactive({

      name: '',

})

onBeforeMount(async () => {

})

const submit = async () => {
  try {

    await tradesStore.newItem({ ...form })
    router.push('/trades');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

}

const cancel = () => {
  router.push('/users')
}

watch(() => tradesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Trades notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    tradesStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Trades</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Trades"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
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
