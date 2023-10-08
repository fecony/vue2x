<template>
  <div class="grid h-screen px-4 place-content-center">
    <div class="text-center">
      <h1 class="font-black text-gray-200 text-9xl">404</h1>

      <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

      <span class="flex items-baseline justify-center mt-4 space-x-2 text-gray-500">
        <p>We can't find</p>
        <pre
          class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-md"
          >{{ $route.path }}</pre
        >
        <p>page.</p>
      </span>

      <router-link
        :to="{ name: 'home' }"
        class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white transition-colors duration-300 bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >Go Back Home</router-link
      >
    </div>
  </div>
</template>
