<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
    validate: (value) => {
      return ["text", "number"].includes(value);
    },
  },
  modelValue: {
    type: [String, Number],
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  helperText: {
    type: String,
    required: false,
    default: "",
  },
  showHelper: {
    type: Boolean,
    required: false,
    default: true,
  },
  helperType: {
    type: String,
    required: false,
    default: "error",
    validate: (value) => {
      return ["info", "warning", "error"].includes(value);
    },
  },
  placeholder: {
    type: String,
    required: false,
    default: "Introduzca algo...",
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
  showName: {
    type: Boolean,
    required: false,
    default: true,
  },
  minDate: {
    type: String,
    required: false,
    default: "",
  },
  maxDate: {
    type: String,
    required: false,
    default: "",
  },
  minNumber: {
    type: Number,
    required: false,
    default: 0,
  },
  maxNumber: {
    type: Number,
    required: false,
    default: 0,
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const iconPath = ref(
  new URL(`/src/assets/icons/${props.helperType}.svg`, import.meta.url).href
);
</script>
<template>
  <div class="input-container">
    <label v-if="showName" class="input-container__label" :for="name">{{
      name
    }}</label>
    <input
      :id="name"
      v-model="value"
      :min="type == 'date' ? minDate : minNumber"
      :max="type == 'date' ? maxDate : maxNumber"
      class="input-container__input"
      :type="type"
      :name="name"
      :placeholder="props.placeholder"
      :class="
        !isValid && props.showHelper
          ? `input-container__input--${props.helperType}`
          : ''
      "
    />
    <span
      v-if="props.showHelper"
      class="input-container__helper"
      :for="helperText"
      :class="`input-container__helper--${props.helperType}`"
    >
      <img
        v-show="helperText != ''"
        class="input-icon"
        alt="info icon"
        :src="iconPath"
      />

      {{ helperText }}
    </span>
  </div>
</template>
