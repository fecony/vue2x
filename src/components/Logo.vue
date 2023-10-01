<template>
  <router-link
    :to="{ name: 'home' }"
    class="mx-auto mb-10"
    data-cy="home-link"
  >
    <feather
      class="text-amber-500 animate-pulse"
      size="2rem"
      stroke-width="3"
      fill="currentColor"
      type="zap"
    />
  </router-link>
</template>

<script setup lang="ts"></script>
