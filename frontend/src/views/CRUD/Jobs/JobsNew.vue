<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useJobsStore } from "@/stores/Jobs/jobs";
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

const jobsStore = useJobsStore()
const router = useRouter();

const notification = computed(() => jobsStore.notify)
const titleStack = ref(['Admin', 'Jobs'])

        const optionsAssigned_userId = computed(() => jobsStore.searchResultAssigned_userId);

        const optionsAssignedTeamId = computed(() => jobsStore.searchResultAssignedTeamId);

const form = reactive({

      description: '',

      type: false,

      status: false,

      assigned_userId: [],

      assignedTeamId: [],

      category: false,

})

onBeforeMount(async () => {

  await searchAssigned_userId();

  await searchAssignedTeamId();

})

const submit = async () => {
  try {

            form.type = form.type.label;

            form.assigned_userId = form.assigned_userId.map(item => item.id);

            form.assignedTeamId = form.assignedTeamId.map(item => item.id);

            form.category = form.category.label;

    await jobsStore.newItem({ ...form })
    router.push('/jobs');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.description = '';

        form.type = false;

        form.status = false;

        form.assigned_userId = [];

        form.assignedTeamId = [];

        form.category = false;

}

const cancel = () => {
  router.push('/users')
}

    async function searchAssigned_userId(val) {
      await jobsStore.searchAssigned_userId(val);
    }

    async function searchAssignedTeamId(val) {
      await jobsStore.searchAssignedTeamId(val);
    }

watch(() => jobsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Jobs notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    jobsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Jobs</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Jobs"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Description"
    >
      <FormControl
        v-model="form.description"
        placeholder="Your Description"
      />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="[{id: 0, label: 'New'},
                    {id: 1, label: 'Repair'},
                    {id: 2, label: 'Service'},
                    {id: 3, label: 'Inspection'},
                    {id: 4, label: 'Insurance'},
                    {id: 5, label: 'Retail'},
                    {id: 6, label: 'Waranty'},
                    ]"
      />
    </FormField>

    <FormField
      label="Status"
      wrap-body
    >
      <FormCheckRadioPicker
        v-model="form.status"
        name="status"
        type="radio"

        :options="{ 'Active': 'Active', 'Approved': 'Approved', 'Quoted': 'Quoted', 'Completed': 'Completed', 'Invoiced': 'Invoiced', }"

      />
    </FormField>

    <FormField
        label="Assigned User "
      >
        <v-select
          v-model="form.assigned_userId"
          :options="optionsAssigned_userId"
          multiple
          @input="searchAssigned_userId($event.target.value)"
        />
    </FormField>

    <FormField
        label="Assigned Team "
      >
        <v-select
          v-model="form.assignedTeamId"
          :options="optionsAssignedTeamId"
          multiple
          @input="searchAssignedTeamId($event.target.value)"
        />
    </FormField>

    <FormField label="Category">
      <FormControl
        v-model="form.category"
        :options="[{id: 0, label: 'Commercial'},
                    {id: 1, label: 'Property Management'},
                    {id: 2, label: 'Residential'},
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
