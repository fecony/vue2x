<template>
  <main
    class="flex flex-col justify-start h-screen max-w-screen-lg px-4 py-8 mx-auto space-y-2 sm:px-6 sm:py-12 lg:px-8"
  >
    <Logo />
    <header class="text-left">
      <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">{{ title }}</h1>
    </header>

    <slot />
  </main>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>
