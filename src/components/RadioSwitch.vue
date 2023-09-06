<template>
  <div
    @click="handleClick"
    :checked="isSelected"
    class="radio-switch"
    :class="[
      $attrs.class ? $attrs.class : '',
      { 'disabled': isDisabled }
    ]"
  >
    <input
      :id="radioId"
      :checked="isSelected"
      v-bind="modifiedAttrs"
      class="radio-input"
      type="radio"
    >
    <div
      v-bind="labelAttributes"
      class="radio-label"
      :for="radioId"
    >
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, useAttrs, useSlots, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'

type AnyElementOf<T extends readonly string[]> = T[number]
const RadioTypesArray = ['radio', 'card'] as const
type RadioTypes = AnyElementOf<typeof RadioTypesArray>
</script>

<script setup lang="ts">
const props = defineProps({
  /**
   * Sets whether or not radio is selected
   */
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: 'on',
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  labelAttributes: {
    type: Object as any,
    default: () => ({}),
  },
  selectedValue: {
    type: [String, Number, Boolean, Object],
    required: true,
  },
  radioId: {
    type: String,
    required: true,
  },
})

const slots = useSlots()

const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')

const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

const emit = defineEmits<{
  (e: 'change', value: string | boolean | number | object): void
  (e: 'update:modelValue', value: string | boolean | number | object): void
}>()

const handleClick = (): void => {
  emit('change', props.selectedValue)
  emit('update:modelValue', props.selectedValue)
}

const attrs = useAttrs()

const modifiedAttrs = computed(() => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})
</script>

<style lang="scss" scoped>

$text-color-default: rgba(0, 0, 0, 0.9);
$text-color-card: rgba(0, 0, 0, 0.65);
$text-color-disabled: rgba(0, 0, 0, 0.25);

$border-color-card: #bababa;
$border-color-card-checked: #666;

$background-color-card-checked: #eaeaff;
$background-color-card-disabled: rgba(0, 0, 0, 0.1);

$shadow-color: rgba(0, 0, 0, 0.15);

@mixin kRadioDisabled {
  background-color: $background-color-card-disabled;
  cursor: not-allowed;
  opacity: 0.6;

  &:hover {
    background-color: $background-color-card-disabled;
    border-color: $border-color-card;
  }
}

@mixin kRadioChecked {
  background-color: $background-color-card-checked;
  border-color: $border-color-card-checked;
  -webkit-box-shadow: 0px 4px 10px $shadow-color;
  box-shadow: 0px 4px 10px $shadow-color;
}

@mixin kRadioCheckedAndDisabled {
  &:hover {
    background-color: $background-color-card-checked;
    border-color: $border-color-card-checked;
  }
}

.radio-switch {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100px;
  font-size: 9px;  
  background-color: #fff;
  border: 1px solid $border-color-card;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;

  .radio-label {
    width: 100%;
    font-size: 10px;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    line-height: 20px;
  }

  &.disabled {
    .radio-label {
      color: $text-color-disabled;
    }
  }

  .radio-input {
    display: none;
  }

  &[disabled], &.disabled {
    > label {
      cursor: not-allowed;
    }
  }

  .radio-label {
    color: $text-color-card;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }

  &:has(.radio-input:disabled) {
    @include kRadioDisabled;
  }

  // Firefox disabled state handling
  &[disabled=""], &[disabled="true"] {
    @include kRadioDisabled;
  }

  &:hover {
    background-color: $background-color-card-checked;
    border-color: $border-color-card-checked;
  }

  &:has(.radio-input:checked) {
    @include kRadioChecked;
  }

  // Firefox checked state handling
  &[checked=""], &[checked="true"] {
    @include kRadioChecked;
  }

  &:has(.radio-input:checked:disabled) {
    @include kRadioCheckedAndDisabled;
  }

  // Firefox checked AND disabled state handling
  &[checked=""][disabled=""], &[checked="true"][disabled="true"] {
    @include kRadioCheckedAndDisabled;
  }
}
</style>
