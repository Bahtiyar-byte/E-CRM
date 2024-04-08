<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const templatesStore = useTemplatesStore()
const router = useRouter();

const notification = computed(() => templatesStore.notify)
const titleStack = ref(['Admin', 'Templates'])

        const optionsTrade = computed(() => templatesStore.searchResultTrade);

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

      unitOfMeasurement: false,

})

onBeforeMount(async () => {

  await searchTrade();

})

const submit = async () => {
  try {

            form.trade = form.trade.map(item => item.id);

            form.unitOfMeasurement = form.unitOfMeasurement.label;

    await templatesStore.newItem({ ...form })
    router.push('/templates');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.trade = [];

        form.material = '';

        form.materialCost = '';

        form.Labor = '';

        form.laborCost = '';

        form.markup = '';

        form.profitMargin = '';

        form.totalPrice = '';

        form.description = '';

        form.unitOfMeasurement = false;

}

const cancel = () => {
  router.push('/users')
}

    async function searchTrade(val) {
      await templatesStore.searchTrade(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Templates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Templates"
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
        :options="[{id: 0, label: 'SQ'},
                    {id: 1, label: 'LF'},
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
