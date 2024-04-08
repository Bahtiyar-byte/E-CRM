<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamsStore } from "@/stores/Teams/teams";
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
const teamsStore = useTeamsStore()

const titleStack = ref(['Admin', 'Teams'])
const notification = computed(() => teamsStore.notify)

        const optionsMembers = computed(() => teamsStore.searchResultMembers);

const teamsItem = computed(() => teamsStore.data);

const form = reactive({

    name: '',

    description: '',

      members: [],

})

const submit = async () => {
  try {

            form.members = form.members.map(item => item.id);

    await teamsStore.edit({id: route.params.id, data: {...form} })
    router.push('/teams');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchMembers();

    await teamsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    teamsStore.showNotification(e, 'error');
  }
})

    async function searchMembers(val) {
      await teamsStore.searchMembers(val);
    }

const formatData = () => {

    form.name = teamsItem.value.name

    form.description = teamsItem.value.description

    form.members = dataFormatter.usersManyListFormatterEdit(teamsItem.value.members)

}

watch(() => teamsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Teams notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    teamsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/teams')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Teams</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Teams"
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

    <FormField
      label="Description"
    >
      <FormControl
        v-model="form.description"
        placeholder="Your Description"
        />
    </FormField>

    <FormField
        label="Members"
      >
        <v-select
          v-model="form.members"
          :options="optionsMembers"
          multiple
          @input="searchMembers($event.target.value)"
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
