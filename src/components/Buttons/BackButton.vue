<script setup lang="ts">
import ActionButton from '@/components/Buttons/ActionButton.vue';
</script>

<template>
  <ActionButton
    data-cy="back-button"
    icon="arrow-left"
    @click="() => $router.go(-1)"
  />
</template>
