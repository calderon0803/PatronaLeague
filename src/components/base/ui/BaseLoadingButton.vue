<!-- TODO: transition not working -->
<script setup>
import { ref, unref, watch } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: "Button",
  },
  isShrinkable: {
    type: Boolean,
    required: false,
    default: true,
  },

  // has icon
  icon: {
    type: String,
    required: false,
    default: null,
  },
  iconUrl: {
    type: String,
    required: false,
    default: null,
  },
});

const isLoading = ref(props.isLoading);
const maxWidth = ref("auto");
const buttonElement = ref(null);

/**
 * Method to set the width value of the button
 * @param {*} element element to get width from
 * @returns width value
 * @description
 * This function is used to get the width of the button
 * element.
 * The button will be size "auto" either when it is not loading or
 * when it is loading but it is not shrinkable.
 * The button will be size "40px" when it is loading and it is shrinkable.
 */
const setWidthValue = (element) => {
  maxWidth.value = props.isLoading
    ? props.isShrinkable
      ? "40px"
      : getComputedStyle(unref(element)).width
    : "auto";
};

// WATCHERS
watch(
  () => props.isLoading,
  () => {
    setWidthValue(buttonElement);
    isLoading.value = props.isLoading;
  }
);

// METHODS
const leave = (element) => {
  const width = getComputedStyle(element).width;

  element.style.width = width;
  element.style.position = "relative";
  element.style.visibility = "hidden";
  element.style.height = "auto";

  const height = getComputedStyle(element).height;

  element.style.width = null;
  element.style.position = null;
  element.style.visibility = null;
  element.style.height = 0;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  // Trigger the animation.
  // We use `requestAnimationFrame` because we need
  // to make sure the browser has finished
  // painting after setting the `height`
  // to `0` in the line above.
  requestAnimationFrame(() => {
    element.style.height = height;
    element.style.width = width;
  });
};

const afterEnter = (element) => {
  element.style.height = "auto";
  element.style.width = "auto";
};

const enter = (element) => {
  const height = getComputedStyle(element).height;

  element.style.height = height;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).height;

  element.style.width = maxWidth.value;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element).width;

  // Trigger the animation.
  // We use `requestAnimationFrame` because we need
  // to make sure the browser has finished
  // painting after setting the `height`
  // to `height` in the line above.
  requestAnimationFrame(() => {
    element.style.height = "auto";
    element.style.width = "auto";
  });
};
</script>
<template>
  <Transition
    name="shrink"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <button
      v-if="true"
      ref="buttonElement"
      class="button"
      :class="isLoading && isShrinkable ? 'loading' : ''"
    >
      <span v-if="!isLoading" class="text">
        <!-- icon -->
        <span v-if="icon" class="icon is-small mr-1 label">
          <i :class="icon" />
        </span>
        {{ buttonText }}
      </span>
      <span v-else class="spinner"></span>
    </button>
  </Transition>
</template>
<style lang="scss" scoped>
.button {
  display: flex; /* Flexbox para centrar el contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  position: relative;
  border: none;
  border-radius: 4px;
  box-shadow: app-variables.$box-shadow;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;
  min-height: 32px;
  max-height: 40px;
  min-width: 32px;

  // width: v-bind(maxWidth);
  outline: none;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-out;
  will-change: height width;

  &.loading {
    padding: 0; /* Elimina el padding para centrar el spinner */
  }

  .text {
    font-family: app-variables.$app-font;
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .spinner {
    display: block;
    position: relative;

    // left: calc(50% - 16px);
    width: 32px;
    height: 32px;
    background: transparent;
    box-sizing: border-box;
    border-top: 4px solid white;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-radius: 100%;
    animation: spin 0.6s ease-out infinite;
  }

  &__primary {
    background: app-variables.$primary-color;
    color: #fff;
    border-radius: 100px;
  }

  &__secondary {
    background: app-variables.$secondary-color;
    color: #fff;
    border-radius: 4px;
  }

  &__tonal {
    margin-top: 1rem;
    background: app-variables.$secondary-color-light;
    color: app-variables.$color-med;
    text-align: center;
  }

  @media (max-width: app-variables.$breakpoint-desktop-to-medium-resolution) {
    letter-spacing: 1px;
    margin: 0.25rem;
    padding: 0.25rem 0.75rem;
  }
  @media (max-width: app-variables.$breakpoint-small-desktop-to-desktop) {
    font-size: 14px;
    letter-spacing: 1px;
    margin: 0.25rem;
    padding: 0.25rem 0.75rem;
  }
}

.button:hover {
  filter: contrast(1.1);
  transition: all 0.2s ease-out;
}

// .loading {
//   border-radius: 50px;

//   // width: 40px;
//   padding: 0;
// }

// .button.loading::after {
//   border-radius: 100%;
// }

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

// Button transition
.shrink-enter-active,
.shrink-leave-active {
  transition: all 0.2s ease-out;
}

.shrink-enter,
.shrink-leave-to {
  height: 0;
  width: 0;
}
</style>
