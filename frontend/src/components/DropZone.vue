<script setup>
import { ref } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';
import { mdiFileUploadOutline } from '@mdi/js';

const props = defineProps({
  file: {
    type: Object,
    default: null,
  },
  formats: {
    type: String,
    default: '',
  },
  setFile: {
    type: Function
  }
});

const inputFile = ref(null);
const active = ref(false);
const error = ref('');

const onFilesAdded = (files) => {
  if (files && files[0]) {
    const newFile = files[0];
    const fileExtension = newFile.name.split('.').pop().toLowerCase();

    if (props.formats.includes(fileExtension) || !props.formats) {
      props.setFile(newFile);
      error.value = '';
    } else {
      error.value = `Allowed formats: ${props.formats}`;
    }
  }
};

const toggleActive = () => {
  active.value = !active.value;
};

const drop = (e) => {
  const files = e.dataTransfer.files;

  onFilesAdded(files);
  active.value = false;
};
</script>

<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="drop"
    class="mb-4 w-full flex justify-center items-center"
  >
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      :class="active ? 'border-pavitra-blue' : 'border-pavitra-600'"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <BaseIcon
          :path="mdiFileUploadOutline"
          size="32"
          class="mx-auto mb-2"
          :class="file ? 'text-pavitra-blue' : 'text-pavitra-600'"
        />
        <p v-if="error" class="mb-2 text-sm text-red-600">
          {{ error }}
        </p>
        <div v-if="file" class="px-4 py-2 max-w-full flex-grow-0 overflow-x-hidden bg-gray-100 border-gray-200 border rounded">
          <span class="text-ellipsis max-w-full line-clamp-1">
            {{ file.name }}
          </span>
        </div>
        <p v-else class="mb-2 text-sm text-gray-500">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p v-if="formats" class="text-xs text-gray-500">
          {{ formats }}
        </p>
      </div>
      <input
        id="dropzone-file"
        ref="inputFile"
        type="file"
        :accept="formats"
        class="hidden"
        @change="(e) => onFilesAdded(e.target.files)"
      />
    </label>
  </div>
</template>
