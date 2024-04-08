<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTemplatesStore } from "@/stores/Templates/templates";
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
const templatesStore = useTemplatesStore()

const titleStack = ref(['Admin', 'Templates'])
const notification = computed(() => templatesStore.notify)

        const optionsTrade = computed(() => templatesStore.searchResultTrade);

      const optionsUnitOfMeasurement = [{id: 0, label: 'SQ'},{id: 1, label: 'LF'},]

const templatesItem = computed(() => templatesStore.data);

const form = reactive({

      trade: [],

    material: '',

    materialCost: '',

    Labor: '',

    laborCost: '',

    markup: '',

    profitMargin: '',

    totalPrice: '',

    description: '',

      unitOfMeasurement: '',

})

const submit = async () => {
  try {

            form.trade = form.trade.map(item => item.id);

            form.unitOfMeasurement = form.unitOfMeasurement.label;

    await templatesStore.edit({id: route.params.id, data: {...form} })
    router.push('/templates');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchTrade();

    await templatesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    templatesStore.showNotification(e, 'error');
  }
})

    async function searchTrade(val) {
      await templatesStore.searchTrade(val);
    }

const formatData = () => {

    form.trade = dataFormatter.tradesManyListFormatterEdit(templatesItem.value.trade)

    form.material = templatesItem.value.material

    form.materialCost = templatesItem.value.materialCost

    form.Labor = templatesItem.value.Labor

    form.laborCost = templatesItem.value.laborCost

    form.markup = templatesItem.value.markup

    form.profitMargin = templatesItem.value.profitMargin

    form.totalPrice = templatesItem.value.totalPrice

    form.description = templatesItem.value.description

    form.unitOfMeasurement = optionsUnitOfMeasurement.find(el => el.label === templatesItem.value.unitOfMeasurement)

}

watch(() => templatesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Templates notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    templatesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/templates')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Templates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Templates"
      form
      @submit.prevent="submit"
    >

    <FormField
        label="Trade"
      >
        <v-select
          v-model="form.trade"
          :options="optionsTrade"
          multiple
          @input="searchTrade($event.target.value)"
        />
    </FormField>

    <FormField
      label="Material"
    >
      <FormControl
        v-model="form.material"
        placeholder="Your Material"
        />
    </FormField>

    <FormField
      label="Material Cost"
    >
      <FormControl
        type="number"
        v-model="form.materialCost"
        placeholder="Your Material Cost"
      />
    </FormField>

    <FormField
      label="Labor"
    >
      <FormControl
        v-model="form.Labor"
        placeholder="Your Labor"
        />
    </FormField>

    <FormField
      label="Labor Cost"
    >
      <FormControl
        type="number"
        v-model="form.laborCost"
        placeholder="Your Labor Cost"
      />
    </FormField>

    <FormField
      label="Markup"
    >
      <FormControl
        type="number"
        v-model="form.markup"
        placeholder="Your Markup"
      />
    </FormField>

    <FormField
      label="Profit Margin"
    >
      <FormControl
        type="number"
        v-model="form.profitMargin"
        placeholder="Your Profit Margin"
      />
    </FormField>

    <FormField
      label="Total Price"
    >
      <FormControl
        type="number"
        v-model="form.totalPrice"
        placeholder="Your Total Price"
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

    <FormField label="Measurement">
      <FormControl
        v-model="form.unitOfMeasurement"
        :options="optionsUnitOfMeasurement"
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
